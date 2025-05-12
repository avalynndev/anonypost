import { db } from "@/db";
import { post, reply } from "@/schema";

export async function GET(req: Request) {
  const posts = await db.select().from(post);
  const replies = await db.select().from(reply);

  const postsWithReplies = posts.map((p) => ({
    ...p,
    replies: replies.filter((r) => r.postId === p.id),
  }));

  return new Response(JSON.stringify(postsWithReplies));
}
