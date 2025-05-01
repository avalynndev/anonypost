import { prisma } from "@/lib/prisma";

export async function getPosts() {
  return prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function addReply(postId: number, reply: string) {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new Error("Post not found");

  const updatedReplies = [...(post.replies ?? []), reply];
  return prisma.post.update({
    where: { id: postId },
    data: { replies: updatedReplies },
  });
}
