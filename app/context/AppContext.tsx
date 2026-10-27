"use client";
import { createContext, useContext, useState } from "react";

export const AppContext = createContext<any>(null);

export function AppProvider({ children }: any) {
  const [username, setUsername] = useState("");
  const [products,setProducts] = useState([]);
  const [recipes,setRecipes] = useState([]);
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
