// app/api/posts/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name } = await req.json();

  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: { name },
  });

  return NextResponse.json(post);
}
