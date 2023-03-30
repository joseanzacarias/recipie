import {
  RecipeIngredientModel,
  RecipeModel,
  RecipeStepModel,
  RecipeTagModel,
} from "prisma/zod";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const recipeRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.recipe.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        coverPhoto: true,
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

  addStep: protectedProcedure
    .input(RecipeStepModel.omit({ id: true }))
    .mutation(({ ctx, input: recipeStep }) =>
      ctx.prisma.recipeStep.create({
        data: recipeStep,
      })
    ),

  addIngredient: protectedProcedure
    .input(RecipeIngredientModel)
    .mutation(({ ctx, input: recipeIngredient }) =>
      ctx.prisma.recipeIngredient.create({
        data: recipeIngredient,
      })
    ),

  updateIngredient: protectedProcedure
    .input(RecipeIngredientModel)
    .mutation(({ ctx, input: recipeIngredient }) =>
      ctx.prisma.recipeIngredient.update({
        where: {
          recipeId_ingredientId: {
            recipeId: recipeIngredient.recipeId,
            ingredientId: recipeIngredient.ingredientId,
          },
        },
        data: recipeIngredient,
      })
    ),

  removeIngredient: protectedProcedure
    .input(RecipeIngredientModel.pick({ ingredientId: true, recipeId: true }))
    .mutation(({ ctx, input: recipeIngredient }) =>
      ctx.prisma.recipeIngredient.delete({
        where: {
          recipeId_ingredientId: recipeIngredient,
        },
      })
    ),
});
