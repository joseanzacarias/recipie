import * as z from "zod"
import * as imports from "../null"
import { CompleteRecipe, RelatedRecipeModel } from "./index"

export const RecipePhotoModel = z.object({
  id: z.string(),
  url: z.string(),
  recipeId: z.string(),
})

export interface CompleteRecipePhoto extends z.infer<typeof RecipePhotoModel> {
  recipe: CompleteRecipe
  recipeWithCoverPhoto?: CompleteRecipe | null
}

/**
 * RelatedRecipePhotoModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRecipePhotoModel: z.ZodSchema<CompleteRecipePhoto> = z.lazy(() => RecipePhotoModel.extend({
  recipe: RelatedRecipeModel,
  recipeWithCoverPhoto: RelatedRecipeModel.nullish(),
}))
