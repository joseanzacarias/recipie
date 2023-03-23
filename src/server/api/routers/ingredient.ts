import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const ingredientRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.ingredient.findMany({ where: { userId: ctx.session.user.id } })
  ),

  getById: protectedProcedure.input(z.string()).query(
    async ({ input, ctx }) =>
      await ctx.prisma.ingredient.findFirst({
        where: { id: input, userId: ctx.session.user.id },
      })
  ),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        unit: z.string(),
        unitPerPrice: z.number().nullable(),
        price: z.number().nullable(),
      })
    )
    .mutation(
      async ({ ctx, input }) =>
        await ctx.prisma.ingredient.create({
          data: { ...input, userId: ctx.session.user.id },
        })
    ),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        unit: z.string().optional(),
        unitPerPrice: z.number().nullable().optional(),
        price: z.number().nullable().optional(),
      })
    )
    .mutation(
      async ({ ctx, input }) =>
        await ctx.prisma.ingredient.updateMany({
          where: { id: input.id, userId: ctx.session.user.id },
          data: {
            ...input,
          },
        })
    ),

  delete: protectedProcedure.input(z.string()).mutation(
    async ({ ctx, input }) =>
      await ctx.prisma.ingredient.deleteMany({
        where: { id: input, userId: ctx.session.user.id },
      })
  ),
});
