import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),

  getPosts: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  addReply: publicProcedure
    .input(
      z.object({
        postId: z.number(),
        reply: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { postId, reply } = input;
      return await ctx.db.post.update({
        where: { id: postId },
        data: {
          replies: {
            push: reply,
          },
        },
      });
    }),
});
