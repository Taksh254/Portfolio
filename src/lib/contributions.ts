// Server-side loader for the GitHub contribution heatmap.
//
// 1. The calendar comes from GitHub itself: the GraphQL API when GITHUB_TOKEN is set
//    (a token for this account also counts private repos), otherwise the public
//    calendar at github.com/users/<login>/contributions (counts private repos only
//    when "Include private contributions on my profile" is on).
// 2. GitHub's calendar ignores commits that live only on a non-default branch, so
//    commits on the branches in EXTRA_BRANCHES that are not yet in their base branch
//    are added on top. Once a branch is merged, GitHub counts them itself and they
//    drop out of the compare, so nothing is counted twice.

export interface ContributionDay {
  date: string;
  level: number;
  tooltip: string;
}

export interface ContributionsPayload {
  username: string;
  totalContributions: number;
  days: ContributionDay[];
  source: "graphql" | "public-calendar";
  extraCommits: number;
  fetchedAt: string;
}

export const GITHUB_LOGIN = "Taksh254";
const TIME_ZONE = "Asia/Kolkata";
export const REVALIDATE_SECONDS = 300;

const EXTRA_BRANCHES = [
  // GrowNova OS internship work, kept on its own branch.
  { repo: "kaniskoChakraborty/Grownova-0.1", base: "main", head: "Taksh" },
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function ordinal(n: number) {
  const s = n % 100 >= 11 && n % 100 <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[n % 10] || "th";
  return `${n}${s}`;
}

function tooltipFor(date: string, count: number) {
  const [, m, d] = date.split("-").map(Number);
  const when = `${MONTHS[m - 1]} ${ordinal(d)}`;
  return count === 0 ? `No contributions on ${when}.` : `${count} contribution${count === 1 ? "" : "s"} on ${when}.`;
}

function githubHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "taksh-portfolio",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

type Counts = Map<string, number>;

async function fromGraphQL(login: string): Promise<Counts> {
  const query = `query($login: String!) { user(login: $login) { contributionsCollection { contributionCalendar {
    weeks { contributionDays { date contributionCount } } } } } }`;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { ...githubHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { login } }),
    next: { revalidate: REVALIDATE_SECONDS },
  });
  const json = await res.json();
  if (!res.ok || json.errors) throw new Error(`GraphQL ${res.status}`);
  const counts: Counts = new Map();
  for (const week of json.data.user.contributionsCollection.contributionCalendar.weeks) {
    for (const day of week.contributionDays) counts.set(day.date, day.contributionCount);
  }
  return counts;
}

async function fromPublicCalendar(login: string): Promise<Counts> {
  const res = await fetch(`https://github.com/users/${login}/contributions`, {
    headers: { "User-Agent": "taksh-portfolio", Accept: "text/html" },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`calendar ${res.status}`);
  const html = await res.text();

  // Each day is a <td data-date="…" id="contribution-day-component-…">; its count is in
  // a matching <tool-tip for="that id">N contributions on …</tool-tip>.
  const tips = new Map<string, number>();
  for (const m of html.matchAll(/<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const n = /^\s*(\d+)\s+contribution/.exec(m[2]);
    tips.set(m[1], n ? Number(n[1]) : 0);
  }
  const counts: Counts = new Map();
  for (const m of html.matchAll(/<td\b[^>]*>/g)) {
    const tag = m[0];
    const date = /\bdata-date="(\d{4}-\d{2}-\d{2})"/.exec(tag)?.[1];
    const id = /\bid="([^"]+)"/.exec(tag)?.[1];
    if (!date || !id) continue;
    counts.set(date, tips.get(id) ?? 0);
  }
  if (counts.size < 300) throw new Error(`calendar parse: only ${counts.size} days`);
  return counts;
}

const dayInZone = new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" });

async function unmergedBranchCommits(login: string): Promise<Counts> {
  const counts: Counts = new Map();
  await Promise.all(
    EXTRA_BRANCHES.map(async ({ repo, base, head }) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${repo}/compare/${base}...${head}?per_page=250`, {
          headers: githubHeaders(),
          next: { revalidate: REVALIDATE_SECONDS },
        });
        if (!res.ok) return;
        const json = await res.json();
        for (const c of json.commits ?? []) {
          if (c.author?.login?.toLowerCase() !== login.toLowerCase()) continue;
          const date = dayInZone.format(new Date(c.commit.author.date));
          counts.set(date, (counts.get(date) ?? 0) + 1);
        }
      } catch {
        // A branch we can't read just isn't added.
      }
    })
  );
  return counts;
}

// GitHub shades days by quartiles of the non-zero counts; do the same so added
// commits shade consistently with the rest of the calendar.
function levelsFor(counts: number[]) {
  const nonZero = counts.filter((c) => c > 0).sort((a, b) => a - b);
  const q = (p: number) => nonZero[Math.min(nonZero.length - 1, Math.floor(p * nonZero.length))] ?? 0;
  const [q1, q2, q3] = [q(0.25), q(0.5), q(0.75)];
  return (c: number) => (c <= 0 ? 0 : c <= q1 ? 1 : c <= q2 ? 2 : c <= q3 ? 3 : 4);
}

export async function loadContributions(login = GITHUB_LOGIN): Promise<ContributionsPayload> {
  let source: ContributionsPayload["source"] = "public-calendar";
  let counts: Counts;
  if (process.env.GITHUB_TOKEN) {
    try {
      counts = await fromGraphQL(login);
      source = "graphql";
    } catch {
      counts = await fromPublicCalendar(login);
    }
  } else {
    counts = await fromPublicCalendar(login);
  }

  const extra = await unmergedBranchCommits(login);
  let extraCommits = 0;
  for (const [date, n] of extra) {
    if (!counts.has(date)) continue; // outside the calendar's one-year window
    counts.set(date, (counts.get(date) ?? 0) + n);
    extraCommits += n;
  }

  const dates = [...counts.keys()].sort();
  const values = dates.map((d) => counts.get(d) ?? 0);
  const level = levelsFor(values);
  const days = dates.map((date, i) => ({ date, level: level(values[i]), tooltip: tooltipFor(date, values[i]) }));

  return {
    username: login,
    totalContributions: values.reduce((a, b) => a + b, 0),
    days,
    source,
    extraCommits,
    fetchedAt: new Date().toISOString(),
  };
}
