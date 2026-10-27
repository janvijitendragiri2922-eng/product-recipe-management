
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { Recipe , RecipeInput} from "../types/recipe";
import UpdateRecipe from "./UpdateRecipe";
import { updateRecipe } from "../services/recipeService";

type RecipeDetailsProps = {
  recipe: Recipe;
};

export default function RecipeDetails({
  recipe,
}: RecipeDetailsProps) {
  const router = useRouter();

  const [editMode, setEditMode] = useState(false);
  const [currentRecipe, setCurrentRecipe] =
    useState<Recipe>(recipe);

  async function handleUpdateRecipe(
    updatedRecipe: Recipe
  ) {
    try {
      const data = await updateRecipe(
        updatedRecipe.id,
        updatedRecipe
      );

      console.log("Updated Recipe:", data);

      setCurrentRecipe((previousRecipe) => ({
        ...previousRecipe,
        ...updatedRecipe,
      }));

      setEditMode(false);
    } catch (error) {
      console.error("Failed to update recipe:", error);
    }
  }

  return (
    <div className="recipe-details-card">
      {editMode ? (
        <UpdateRecipe
          recipe={currentRecipe}
          onUpdate={handleUpdateRecipe}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <>
          <img
            src={currentRecipe.image}
            alt={currentRecipe.name}
            className="details-image"
          />

          <div className="details-content">
            <h2>{currentRecipe.name}</h2>

            <p>
              <strong>Cuisine:</strong>{" "}
              {currentRecipe.cuisine}
            </p>

            <p>
              <strong>Difficulty:</strong>{" "}
              {currentRecipe.difficulty}
            </p>

            <p>
              <strong>Rating:</strong> ⭐{" "}
              {currentRecipe.rating}
            </p>

            <p>
              <strong>Servings:</strong>{" "}
              {currentRecipe.servings}
            </p>

            <p>
              <strong>Calories:</strong>{" "}
              {currentRecipe.caloriesPerServing}
            </p>

            <p>
              <strong>Prep Time:</strong>{" "}
              {currentRecipe.prepTimeMinutes} minutes
            </p>

            <p>
              <strong>Cook Time:</strong>{" "}
              {currentRecipe.cookTimeMinutes} minutes
            </p>

            <h2>Ingredients</h2>

            <ul>
              {currentRecipe.ingredients}
            </ul>

            <h2>Instructions</h2>

            <ol>
              {currentRecipe.instructions}
            </ol>

            <div className="details-buttons">
              <button
                type="button"
                className="edit-btn"
                onClick={() => setEditMode(true)}
              >
                Edit Recipe
              </button>

              <button
                type="button"
                className="back-btn"
                onClick={() => router.back()}
              >
                Back
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
