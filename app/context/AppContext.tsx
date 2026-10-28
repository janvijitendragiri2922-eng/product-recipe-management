"use client";
import { createContext, useContext, useState } from "react";
import type { Product } from "./types/product";
import type { Recipe, RecipeInput } from "./types/recipe";


export const AppContext = createContext<any>(null);

export function AppProvider({ children }: any) {
  const [username, setUsername] = useState("");
  const [products,setProducts] = useState<Product[]>([]);
  const [recipes,setRecipes] = useState<Recipe[]>([]);
  return (
    <AppContext.Provider value={{
                      username, 
                      setUsername,
                      products,
                      setProducts,
                      recipes,
                      setRecipes,
                       }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
