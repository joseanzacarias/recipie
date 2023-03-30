import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteRecipeIngredient, RelatedRecipeIngredientModel } from "./index"

export const IngredientModel = z.object({
  id: z.string(),
  name: z.string(),
  unit: z.string(),
  unitPerPrice: z.number().nullish(),
  price: z.number().nullish(),
  userId: z.string(),
})

export interface CompleteIngredient extends z.infer<typeof IngredientModel> {
  user: CompleteUser
  recipes: CompleteRecipeIngredient[]
}

/**
 * RelatedIngredientModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedIngredientModel: z.ZodSchema<CompleteIngredient> = z.lazy(() => IngredientModel.extend({
  user: RelatedUserModel,
  recipes: RelatedRecipeIngredientModel.array(),
}))
