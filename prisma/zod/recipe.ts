import * as z from "zod"
import * as imports from "../null"
import { CompleteRecipePhoto, RelatedRecipePhotoModel, CompleteRecipeIngredient, RelatedRecipeIngredientModel, CompleteRecipeStep, RelatedRecipeStepModel, CompleteRecipeTag, RelatedRecipeTagModel, CompleteUser, RelatedUserModel } from "./index"

export const RecipeModel = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  type: z.string(),
  coverPhotoId: z.string().nullish(),
})

export interface CompleteRecipe extends z.infer<typeof RecipeModel> {
  coverPhoto?: CompleteRecipePhoto | null
  ingredients: CompleteRecipeIngredient[]
  photos: CompleteRecipePhoto[]
  steps: CompleteRecipeStep[]
  tags: CompleteRecipeTag[]
  user: CompleteUser
}

/**
 * RelatedRecipeModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRecipeModel: z.ZodSchema<CompleteRecipe> = z.lazy(() => RecipeModel.extend({
  coverPhoto: RelatedRecipePhotoModel.nullish(),
  ingredients: RelatedRecipeIngredientModel.array(),
  photos: RelatedRecipePhotoModel.array(),
  steps: RelatedRecipeStepModel.array(),
  tags: RelatedRecipeTagModel.array(),
  user: RelatedUserModel,
}))
