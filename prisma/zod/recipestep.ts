import * as z from "zod"
import * as imports from "../null"
import { CompleteRecipe, RelatedRecipeModel, CompleteRecipeIngredientStep, RelatedRecipeIngredientStepModel } from "./index"

export const RecipeStepModel = z.object({
  id: z.string(),
  description: z.string(),
  recipeId: z.string(),
})

export interface CompleteRecipeStep extends z.infer<typeof RecipeStepModel> {
  recipe: CompleteRecipe
  ingredients: CompleteRecipeIngredientStep[]
}

/**
 * RelatedRecipeStepModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRecipeStepModel: z.ZodSchema<CompleteRecipeStep> = z.lazy(() => RecipeStepModel.extend({
  recipe: RelatedRecipeModel,
  ingredients: RelatedRecipeIngredientStepModel.array(),
}))
