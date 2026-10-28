"use client";

import { useState } from "react";
import type { Recipe } from "../types/recipe";

type UpdateRecipeProps = {
  recipe: Recipe;
  onUpdate: (updatedRecipe: Recipe) => void;
  onCancel: () => void;
};

export default function UpdateRecipe({
  recipe,
  onUpdate,
  onCancel,
}: UpdateRecipeProps) {
  const [name, setName] = useState(recipe?.name || "");

  const [cuisine, setCuisine] = useState(recipe?.cuisine || "");

  const [difficulty, setDifficulty] = useState(recipe?.difficulty || "Easy");

  const [rating, setRating] = useState<number>(recipe?.rating ?? 1);

  const [servings, setServings] = useState(recipe?.servings?.toString() || "1");

  const [prepTime, setPrepTime] = useState(
    recipe?.prepTimeMinutes?.toString() || "10",
  );

  const [cookTime, setCookTime] = useState(
    recipe?.cookTimeMinutes?.toString() || "20",
  );

  const [calories, setCalories] = useState(
    recipe?.caloriesPerServing?.toString() || "300",
  );

  const [ingredients, setIngredients] = useState(
    recipe?.ingredients?.join(", ") || "",
  );

  const [instructions, setInstructions] = useState(
    recipe?.instructions?.join("\n") || "",
  );

  const [image, setImage] = useState(recipe?.image || "");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const updatedRecipe: Recipe = {
      ...recipe,
      name,
      cuisine,

      difficulty,
      rating,
      servings: Number(servings),

      prepTimeMinutes: Number(prepTime),

      cookTimeMinutes: Number(cookTime),

      caloriesPerServing: Number(calories),

      ingredients: ingredients.split(",").map((item: string) => item.trim()),

      instructions: instructions
        .split("\n")
        .filter((item: string) => item.trim() !== ""),

      tags: [],

      mealType: ["Dinner"],
      image: image,
    };

    onUpdate(updatedRecipe);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="product-card">
      <h2>Edit Recipe</h2>
     
        <br />
        <label>Recipe Name:</label>

        <input
         className="input"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter recipe name"
        />
   


        <label>Image URL:</label>

        <input
        className="input"
          type="url"
          value={image}
          onChange={(event) => setImage(event.target.value)}
          placeholder="Enter image URL"
        />

        {image && (
          <img src={image} alt="Recipe Preview" className="recipe-preview" />
        )}
     

     
       
          <label>Cuisine:</label>

          <input
          className="input"
            type="text"
            value={cuisine}
            onChange={(event) => setCuisine(event.target.value)}
            placeholder="Indian"
          />
       

          <label>Difficulty:</label>

          <select
          className="input"
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
     

      
          <label>Rating:</label>

          <input
           className="input"
            type="number"
            value={rating}
            onChange={(event) => setRating(Number(event.target.value))}
            min="0"
            max="5"
            step="0.1"
            placeholder="Enter rating"
          />
       

     
          <label>Servings:</label>

          <input
           className="input"
            type="number"
            value={servings}
            onChange={(event) => setServings(event.target.value)}
          />
      

          <label>Calories:</label>

          <input
           className="input"
            type="number"
            value={calories}
            onChange={(event) => setCalories(event.target.value)}
          />
        

          <label>Prep Time:</label>

          <input
           className="input"
            type="number"
            value={prepTime}
            onChange={(event) => setPrepTime(event.target.value)}
          />
       
          <label>Cook Time:</label>

          <input
           className="input"
            type="number"
            value={cookTime}
            onChange={(event) => setCookTime(event.target.value)}
          />
      
   
        <label>Ingredients:</label>

        <textarea
         className="input"
          value={ingredients}
          onChange={(event) => setIngredients(event.target.value)}
          placeholder="Tomato, Onion, Salt"
          rows={4}
        />
     

        <label>Instructions:</label>

        <textarea
         className="input"
          value={instructions}
          onChange={(event) => setInstructions(event.target.value)}
          placeholder="Enter each instruction on a new line"
          rows={6}
        />
    

      <button type="submit" className="edit-btn">
        Update Recipe
      </button>

      <button type="button" onClick={onCancel} className="cancel-btn">
        Cancel
      </button>
      </div>
    </form>
  );
}
