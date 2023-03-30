import * as z from "zod"
import { CompleteRecipeStep, RelatedRecipeStepModel, CompleteRecipeIngredient, RelatedRecipeIngredientModel } from "./index"

export const RecipeIngredientStepModel = z.object({
  recipeId: z.string(),
  ingredientId: z.string(),
  stepId: z.string(),
})

export interface CompleteRecipeIngredientStep extends z.infer<typeof RecipeIngredientStepModel> {
  step: CompleteRecipeStep
  ingredient: CompleteRecipeIngredient
}

/**
 * RelatedRecipeIngredientStepModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRecipeIngredientStepModel: z.ZodSchema<CompleteRecipeIngredientStep> = z.lazy(() => RecipeIngredientStepModel.extend({
  step: RelatedRecipeStepModel,
  ingredient: RelatedRecipeIngredientModel,
}))
