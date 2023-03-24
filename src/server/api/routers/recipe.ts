import { RecipeModel, RecipeTagModel } from "prisma/zod";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const recipeRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.recipe.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        photos: true,
        tags: true,
      },
    })
  ),

  getDetailsById: protectedProcedure
    .input(z.string())
    .query(({ ctx, input: recipeId }) =>
      ctx.prisma.recipe.findFirstOrThrow({
        where: {
          id: recipeId,
          userId: ctx.session.user.id,
        },
        include: {
          ingredients: true,
          steps: true,
        },
      })
    ),

  create: protectedProcedure
    .input(RecipeModel.omit({ id: true, userId: true }))
    .mutation(({ ctx, input: recipe }) =>
      ctx.prisma.recipe.create({
        data: {
          ...recipe,
          userId: ctx.session.user.id,
        },
      })
    ),

  update: protectedProcedure
    .input(RecipeModel)
    .mutation(({ ctx, input: recipeInput }) =>
      ctx.prisma.recipe.updateMany({
        where: { id: recipeInput.id, userId: ctx.session.user.id },
        data: recipeInput,
      })
    ),

  delete: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input: recipeId }) =>
      ctx.prisma.recipe.deleteMany({
        where: {
          id: recipeId,
          userId: ctx.session.user.id,
        },
      })
    ),

  addTag: protectedProcedure
    .input(RecipeTagModel.omit({ id: true }))
    .mutation(({ ctx, input: recipeTag }) =>
      ctx.prisma.recipeTag.create({
        data: recipeTag,
      })
    ),
});
