import * as z from "zod"
import * as imports from "../null"
import { CompleteRecipe, RelatedRecipeModel } from "./index"

export const RecipeTagModel = z.object({
  id: z.string(),
  recipeId: z.string(),
  name: z.string(),
})

export interface CompleteRecipeTag extends z.infer<typeof RecipeTagModel> {
  recipe: CompleteRecipe
}

/**
 * RelatedRecipeTagModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRecipeTagModel: z.ZodSchema<CompleteRecipeTag> = z.lazy(() => RecipeTagModel.extend({
  recipe: RelatedRecipeModel,
}))
