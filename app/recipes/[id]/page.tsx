import { getRecipeById } from "../../services/recipeService";
import RecipeDetails from "../../components/RecipeDetails";


type RecipeDetailsPageProps = {
  params: Promise<{
    id: number;
  }>;
};

export default async function RecipeDetailsPage({
  params,
}: RecipeDetailsPageProps) {
  const { id } = await params;
  const recipe = await getRecipeById(id);
  console.log("Recipe all data:", recipe);

  return (
    <main>
      <h1>Recipe Details ─── ⋆⋅☆⋅⋆ ──</h1>
       <RecipeDetails recipe={recipe} /> 
     
    </main>
  );
}
