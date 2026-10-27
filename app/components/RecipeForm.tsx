"use client";

import { useState } from "react";
import type { Recipe, RecipeInput } from "../types/recipe";

type RecipeFormProps = {
  recipe?: Recipe;
  onSubmit: (data: RecipeInput) => void;
  onClose: () => void;
};

export default function RecipeForm({
  recipe,
  onSubmit,
  onClose,
}: RecipeFormProps) {
  const [name, setName] = useState(recipe?.name || "");

  const [cuisine, setCuisine] = useState(recipe?.cuisine || "");

  const [difficulty, setDifficulty] = useState(recipe?.difficulty || "Easy");

  
  const [rating, setRating] =  useState<number>(recipe?.rating ?? 1);

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

    if (!name || !image || !cuisine || !ingredients) {
      alert("Please fill required fields");
      return;
    }

    const recipeData: RecipeInput = {
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

    console.log("Recipe Form Data:", recipeData);

    onSubmit(recipeData);
  }

  return (
    <div className="model">
      <div className="box">
          <button className="close-btn" onClick={onClose}>❌</button>
        <h1>Add Recipe ─── ⋆⋅☆⋅⋆ ──</h1>
    <form onSubmit={handleSubmit}  className="add-form">
      
      <div className="form-group">
       

        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter recipe name"
          className="input"
        />
      </div>

    
   

        <input
          type="url"
          value={image}
          onChange={(event) => setImage(event.target.value)}
          placeholder="Enter image URL"
          className="input"
        />

        {image && (
          <img src={image} alt="Recipe Preview" className="recipe-preview" />
        )}
    

  
        

          <input
            type="text"
            value={cuisine}
            onChange={(event) => setCuisine(event.target.value)}
            placeholder="Indian"
            className="input"
          />
      

   
          

          <select
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
            className="input"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
     
       <div className="form-row">
        <div className="form-group">
        

          <input
            type="number"
            value={rating}
            className="input"
            onChange={(event) => setRating(Number(event.target.value))}
            min="0"
            max="5"
            step="0.1"
            placeholder="Enter rating"
          />
        </div>

     
        <div className="form-group">
        

          <input
            type="number"
            value={servings}
            className="input"
            onChange={(event) => setServings(event.target.value)}
          />
        </div>

        <div className="form-group">
         

          <input
            type="number"
            value={calories}
            className="input"
            onChange={(event) => setCalories(event.target.value)}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
      

          <input
            type="number"
            className="input"
            value={prepTime}
            onChange={(event) => setPrepTime(event.target.value)}
          />
        </div>

        <div className="form-group">
  

          <input
            type="number"
            className="input"
            value={cookTime}
            onChange={(event) => setCookTime(event.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
       
        <textarea
          value={ingredients}
          className="input"
          onChange={(event) => setIngredients(event.target.value)}
          placeholder="Tomato, Onion, Salt"
          rows={4}
        />
      </div>

      <div className="form-group">
       

        <textarea
          value={instructions}
          className="input"
          onChange={(event) => setInstructions(event.target.value)}
          placeholder="Enter each instruction on a new line"
          rows={6}
        />
      </div>

    
      <button type="submit" className="add-btn">+Add Recipe</button>
    </form>
    </div>
    </div>
  );
}
