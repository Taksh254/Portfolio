// Refreshes src/data/githubContributions.json from GitHub's contribution calendar.
// Runs in GitHub Actions (see .github/workflows/contributions.yml) with GITHUB_TOKEN.
// Private contributions are included only if "Include private contributions on my
// profile" is turned on in GitHub settings, same as the public profile graph.
import { writeFileSync } from "node:fs";

const login = process.env.GH_LOGIN || "Taksh254";
const token = process.env.GITHUB_TOKEN;
if (!token) throw new Error("GITHUB_TOKEN is not set");

const query = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`;

const res = await fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({ query, variables: { login } }),
});
const json = await res.json();
if (!res.ok || json.errors) throw new Error(JSON.stringify(json.errors || json));

const cal = json.data.user.contributionsCollection.contributionCalendar;
const LEVEL = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const ordinal = (n) => {
  const s = n % 100 >= 11 && n % 100 <= 13 ? "th" : { 1: "st", 2: "nd", 3: "rd" }[n % 10] || "th";
  return `${n}${s}`;
};

const days = cal.weeks.flatMap((w) => w.contributionDays).map(({ date, contributionCount: c, contributionLevel }) => {
  const [, m, d] = date.split("-").map(Number);
  const when = `${MONTHS[m - 1]} ${ordinal(d)}`;
  return {
    date,
    level: LEVEL[contributionLevel] ?? 0,
    tooltip: c === 0 ? `No contributions on ${when}.` : `${c} contribution${c === 1 ? "" : "s"} on ${when}.`,
  };
});

const out = { username: login, totalContributions: cal.totalContributions, days };
writeFileSync("src/data/githubContributions.json", JSON.stringify(out, null, 2) + "\n");
console.log(`${login}: ${cal.totalContributions} contributions, ${days.length} days (${days[0].date} → ${days.at(-1).date})`);
