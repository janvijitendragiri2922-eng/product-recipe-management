import type { Recipe, RecipeInput } from "../types/recipe";
const BASE_URL = "https://dummyjson.com";


export async function getRecipes(limit:number,skip:number){
   const response = await fetch (`${BASE_URL}/recipes?limit=${limit}&skip=${skip}`);
   const data = await response.json();
   return data;
}

export async function createRecipe(recipe: RecipeInput): Promise<Recipe> {

   const response = await fetch (`${BASE_URL}/recipes/add`,{
      method : "POST",
   });
  if (!response.ok) {
    throw new Error("Failed to create recipe");
  }

  const data: Recipe = await response.json();

  console.log("Created Recipe:", data);

  return data;
}


export async function getRecipeById (id:number){
   const response = await fetch (`${BASE_URL}/recipes/${id}`);
   const data = await response.json();
   return data;
}

export async function searchRecipes(query:string){
   const response = await fetch (`${BASE_URL}/recipes/search?q=${query}`);
   const data = await response.json();
   return data.recipes;
}

export async function deleteRecipe(id:number){
   console.log ("DELETE ID:",id);

   const response = await fetch (`${BASE_URL}/recipes/${id}`,{
          method:"DELETE",
   });
   const data = await response.json();
   return data;

}



export async function sortRecipe(sortBy:string,order:"asc"|"desc"){
   const response = await fetch (`${BASE_URL}/recipes?sortBy=${sortBy}&order=${order}`);
   const data = await response.json();
   console.log("Sort API data",data);
   return data; 
}


export async function updateRecipe(id:number,recipe:Partial<Recipe>){
   const response = await fetch (`${BASE_URL}/recipes/${id}`,{
      method:"PUT",
   });
   const data = await response.json();
   return data;
}

// export async function getCategoryProduct(category:string){
//    const response = await fetch (`${BASE_URL}/products/category/${category}`);
//    const data = await response.json();
//    return data;
// }



  export async function fetchRecipes(page:number) 
  {
        const recipePage=10;
           const skip = (page - 1) * recipePage;
        const data = await getRecipes(recipePage, skip) ;
       

        return data.recipes;
      }