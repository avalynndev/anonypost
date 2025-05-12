import { db } from "@/db";
import { post } from "@/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const newPost = await db
      .insert(post)
      .values({
        name,
      })
      .returning();

    return NextResponse.json({ message: "Post created", post: newPost[0] });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
