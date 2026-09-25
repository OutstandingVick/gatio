import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = { _type?: string };

/**
 * Called by a Sanity GROQ webhook on publish. Invalidates every cached fetch
 * tagged with the document's type, so new content shows without a redeploy.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "SANITY_REVALIDATE_SECRET is not set" }, { status: 500 });
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, secret);
    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }
    if (!body?._type) {
      return NextResponse.json({ message: "Missing _type" }, { status: 400 });
    }

    revalidateTag(body._type, "max");
    // Reports and articles embed topic and author data, so refresh those lists too.
    if (body._type === "topic" || body._type === "author") {
      revalidateTag("report", "max");
      revalidateTag("article", "max");
    }
    return NextResponse.json({ revalidated: true, type: body._type, now: Date.now() });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
