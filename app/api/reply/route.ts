import { db } from "@/db";
import { reply } from "@/schema";

export async function POST(req: Request) {
  const { postId, body, username } = await req.json();

  await db.insert(reply).values({
    body,
    postId,
    username,
  });

  return new Response(JSON.stringify({ success: true }));
}
