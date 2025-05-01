import { NextRequest, NextResponse } from "next/server";
import { addReply } from "@/lib/posts";

export async function POST(req: NextRequest) {
  const { postId, reply } = await req.json();
  const post = await addReply(postId, reply);
  return NextResponse.json(post);
}
