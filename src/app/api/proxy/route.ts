import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  try {
    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      },
    });

    const body = await res.text();
    const contentType = res.headers.get("content-type") || "text/html";

    // Inject base tag so relative links and assets resolve correctly
    const baseTag = `<base href="${new URL(targetUrl).origin}/">`;
    const modifiedBody = body.replace(/<head([^>]*)>/i, `<head$1>${baseTag}`);

    return new NextResponse(modifiedBody, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        // Do not pass X-Frame-Options or CSP frame-ancestors
      },
    });
  } catch (error) {
    return new NextResponse(
      `Failed to proxy request: ${(error as Error).message}`,
      { status: 500 }
    );
  }
}
