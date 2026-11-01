import { loadContributions } from "@/lib/contributions";

// Re-fetched from GitHub at most every 5 minutes; visitors get the cached copy.
export const revalidate = 300;

export async function GET() {
  try {
    const data = await loadContributions();
    return Response.json(data, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 502 });
  }
}
