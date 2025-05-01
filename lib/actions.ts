"use server";

import { prisma } from "@/lib/prisma";

export async function createPost(name: string) {
  if (!name.trim()) return;
  return prisma.post.create({
    data: { name },
  });
}
