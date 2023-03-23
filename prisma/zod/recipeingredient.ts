import * as z from "zod"
import * as imports from "../null"
import { CompleteRecipe, RelatedRecipeModel, CompleteIngredient, RelatedIngredientModel, CompleteRecipeIngredientStep, RelatedRecipeIngredientStepModel } from "./index"

export const RecipeIngredientModel = z.object({
  amount: z.number(),
  recipeId: z.string(),
  ingredientId: z.string(),
})

export interface CompleteRecipeIngredient extends z.infer<typeof RecipeIngredientModel> {
  recipe: CompleteRecipe
  ingredient: CompleteIngredient
  steps: CompleteRecipeIngredientStep[]
}

/**
 * RelatedRecipeIngredientModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRecipeIngredientModel: z.ZodSchema<CompleteRecipeIngredient> = z.lazy(() => RecipeIngredientModel.extend({
  recipe: RelatedRecipeModel,
  ingredient: RelatedIngredientModel,
  steps: RelatedRecipeIngredientStepModel.array(),
}))
