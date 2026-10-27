"use client";

import { useRouter } from "next/navigation";
import type { Recipe } from "../types/recipe";

type RecipeCardProps = {
  recipe: Recipe;
  onDelete: (id: number) => void;
  onUpdate: (id:number,updatedRecipe:Recipe)=>Promise<void>;
};

export default function RecipeCard({ recipe, onDelete, onUpdate }: RecipeCardProps) {
  const router = useRouter();

  return (
    <div className="product-card">
      <img 
           src={recipe.image} 
           alt={recipe.name}
            className="recipe-image"  
              width={200}
        height={200}
        style={{
          width:"100%",
          height:"300px",
          objectFit:"contain",
          
        }}/>

      <div className="recipe-content">
        <h2>{recipe.name}</h2>

        <p>
          <strong>Cuisine:</strong>👩🏻‍🍳 {recipe.cuisine}
        </p>

        <p>
          <strong>Difficulty:</strong>📊 {recipe.difficulty}
        </p>

        <p>
          <strong>Rating:</strong> ⭐ {recipe.rating}
        </p>

        <p>
          <strong>Calories:</strong> 🔥{recipe.caloriesPerServing}
        </p>

        <div className="recipe-time">
          <span>Prep:♨️ {recipe.prepTimeMinutes} min</span>

          <span>Cook:🍳 {recipe.cookTimeMinutes} min</span>
        </div>
        <div className="recipe-actions">
      <button
          onClick={() =>{
            
            router.push(`/recipes/${recipe.id}`)}}
          className="view-button"
        >
          View Product
        </button>  


  <button
          onClick={() => {
            const confirmDelete = window.confirm("Are you sure???");
            if (confirmDelete) {
              onDelete(recipe.id);
            }
          }}
          className="delete-button"
        >
          Delete
        </button>
        </div>
      </div>
    </div>
  );
}
