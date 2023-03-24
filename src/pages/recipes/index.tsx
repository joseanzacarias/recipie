import { type NextPage } from "next";
import Image from "next/image";
import { api } from "~/utils/api";

const Recipes: NextPage = () => {
  const { data: recipes } = api.recipe.getAll.useQuery();

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="text-xl">Your Recipes</div>
      <div className="grid grid-flow-row-dense grid-cols-2 gap-8">
        {/* search input */}
        <div className="rounded-lg border border-black">
          <div>Search </div>
          <input type="text" aria-label="Search by name" />
        </div>

        {/* filter input */}
        <div className=" rounded-lg border border-black">
          <div>Filter </div>
          <input type="text" aria-label="Filter" />
        </div>
        {/* recipes list */}
        {recipes?.map(({ name, photos, tags }) => (
          <div className=" flex h-24 rounded-lg bg-neutral-100 drop-shadow-md">
            <div className="m-4 mr-auto flex flex-col justify-between">
              <div className="text-xl capitalize">{name}</div>

              {/* tag list */}
              <div className="flex flex-row  gap-2">
                {tags?.map(({ name }) => (
                  <div className="rounded-full border border-neutral-600 bg-neutral-200 px-2 text-sm text-neutral-600">
                    {name}
                  </div>
                ))}
              </div>
            </div>
            {/* photo */}
            <div className="relative h-full w-24 rounded-r-lg">
              <Image
                alt={`${name} cover photo`}
                src={
                  photos.find((photo) => photo.isCover)?.url ??
                  "https://img.freepik.com/premium-vector/vegetable-fruit-vegetarian-food-symbol-cartoon-illustration-vector_201904-1566.jpg"
                }
                fill
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Recipes;
