"use client";

import { useState, useEffect } from "react";

import {
  getProduct,
  searchProduct,
  deleteProduct,
  sortProduct,
  addProduct,
  updateProduct,
} from "./services/productService";

import {
  getRecipes,
  searchRecipes,
  createRecipe,
  updateRecipe,
  sortRecipe,
  deleteRecipe,
} from "./services/recipeService";

import type { Product } from "./types/product";
import type { Recipe, RecipeInput } from "./types/recipe";
import { useRouter } from "next/navigation";
import Dashboard from "./components/Dashboard";
import ProductCard from "././components/ProductCard";
import SearchBar from "./components/SearchBar";
import SortDropdown from "./components/SortDropdown";
import AddProductForm from "./components/AddProductForm";
import Pagination from "./components/Pagination";
import ProductCategory from "./components/ProductCategory";
import RecipeDetails from "./components/RecipeDetails";
import RecipeCard from "./components/RecipeCard";
import RecipeForm from "./components/RecipeForm";
import Sidebar from "./components/Siderbar";
import { useAppContext } from "./context/AppContext";

export default function Home() {
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);
  // PRODUCT STATES
  const {products, setProducts} = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [nextProductId, setNextProductId] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState("");


  // DASHBOARD STATE
  const [activePage, setActivePage] = useState<"dashboard"|"product" | "recipe">("dashboard");

  // RECIPE STATES
  const {recipes, setRecipes} = useAppContext();

  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | undefined>(
    undefined,
  );
  const [recipePage, setRecipePage] = useState(1);

  function handleLogout() {
    setShowLogout(false);
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) {
      return;
    }

    router.push("/login");
  }

  // // LOAD PRODUCT WHEN PAGE CHANGES
   useEffect(() => {
     loadProducts(currentPage);
   }, [currentPage]);
  

  //skip/previous
  const productsPerPage = 10;
  async function loadProducts(page: number) {
    const skip = (page - 1) * productsPerPage;
    const data = await getProduct(productsPerPage, skip);
    setProducts(data.products);
    setFilteredProducts(data.products);
    if (nextProductId === null) {
      setNextProductId(data.total + 1);
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  // LOAD RECIPES WHEN RECIPE PAGE OPENS
  useEffect(() => {
    if (activePage === "recipe") {
      loadRecipes(recipePage);
    }
  }, [activePage, recipePage]);

  async function loadRecipes(page: number) {
    try {
      const data = await getRecipes(10, (page - 1) * 10);
      setRecipes(data.recipes);
    } catch (error) {
      console.error("Failed to load recipes:", error);
    }
  }

  //sort product

  const handleSort = async (value: string) => {
    console.log("Selected value:", value);
    setSortOption(value);

    if (value === "") {
      loadProducts(1);
      return;
    }

    const [sortBy, order] = value.split("-");

    const data = await sortProduct(sortBy, order as "asc" | "desc");
    setFilteredProducts(data.products);
  };

  //search product
  async function handleSearch(query: string) {
    if (query.trim() === "") {
      loadProducts(currentPage);
      return;
    }
    const data = await searchProduct(query);
    setFilteredProducts(data);
  }

  // delete product
  async function handleDelete(id: number) {
    try{
    await deleteProduct(id);
    setProducts((prevProducts:Product[])=>
                                prevProducts.filter((product)=>product.id !== id)
                );
    setFilteredProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id),
    );
} catch (error){
  console.error("Product delete failed:",error);
}
  }
  //add product
  async function handleAddProduct(product: {
    title: string;
    price: number;
    thumbnail: string;
    description: string;
    rating: number;
    stock: number;
    category: string;
  }) {
    const newProduct = await addProduct(product);
    console.log("Added Product:", product);

    const completeProduct = {
      ...newProduct,
      ...product,
      id: nextProductId,
    };

   
     setProducts((prevProducts:Product[]) => [completeProduct, ...prevProducts]);
      setFilteredProducts((prevProducts) => [completeProduct, ...prevProducts]);

    setNextProductId((prev) => prev! + 1);

  }

  //update product
  async function handleUpdateProduct(id: number, updatedProduct: Product) {
    try {
      const data = await updateProduct(id, updatedProduct);

      setFilteredProducts((prevProducts) =>
        prevProducts.map((item) =>
          item.id === id
            ? {
                ...item,
                ...updatedProduct,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error("Product update failed:", error);
    }
  }

  // PRODUCT CATEGORY FILTER
  function handleCategoryChange(category: string) {
    if (!category) {
      setFilteredProducts(products);
      return;
    }

    setFilteredProducts(
      products.filter((product:any) => product.category === category),
    );
  }

  //sort product
  const handleSortRecipe = async (value: string) => {
    console.log("Selected value:", value);
    setSortOption(value);

    if (value === "") {
      loadRecipes(1);
      return;
    }

    const [sortBy, order] = value.split("-");

    const data = await sortRecipe(sortBy, order as "asc" | "desc");
    setRecipes(data.recipe);
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [query, setQuery] = useState("");

  // RECIPE ADD
  async function handleAddRecipe(recipeData: RecipeInput) {
    try {
      const newRecipe = await createRecipe(recipeData);
      const completeRecipe: Recipe = {
        ...recipeData,
        ...newRecipe,
        id: newRecipe.id,
        name: recipeData.name,
        image: recipeData.image,
      };
      setRecipes((prev) => [completeRecipe, ...prev]);
      setShowRecipeForm(false);
    } catch (error) {
      console.error("Failed to add recipe", error);
    }
  }

  // RECIPE UPDATE
  async function handleUpdateRecipe(id: number, updatedRecipe: Recipe) {
    try {
      const data = await updateRecipe(id, updatedRecipe);

      setRecipes((previous) =>
        previous.map((recipe) =>
          recipe.id === id ? { ...recipe, ...updatedRecipe, ...data } : recipe,
        ),
      );

      setEditingRecipe(undefined);
    } catch (error) {
      console.error("Product update failed:", error);
    }
  }

  //RECIPE SEARCH
  async function handleRecipeSearch(query: string) {
    try {
      if (!query.trim()) {
        await loadRecipes(recipePage);
        return;
      }
      const results = await searchRecipes(query);
      setRecipes(results);
    } catch (error) {
      console.error("Recipe search failed", error);
    }
  }

  // RECIPE DELETE
  async function handleRecipeDelete(id: number) {
    try {
      await deleteRecipe(id);
      setRecipes((previous) => previous.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error("Recipe deletion failed:", error);
      alert("Recipe delete nahi ho paayi.");
    }
  }

  return (
    <main className="dashboard-layout">
      <Sidebar
        activePage={activePage}
        onPageChange={setActivePage}

        onAdd={() => {
          setActivePage("product");
          setShowAddForm(true);
        }}
        onAddRecipe={() => {
          setActivePage("recipe");
          setEditingRecipe(undefined);
          setShowRecipeForm(true);
        }}
      />

      <section className="dashboard-content">
        <div className="logout">
          <button
            type="button"
            className="dot"
            onClick={() => setShowLogout((prev) => !prev)}
          >
            ⏻
          </button>
          {showLogout && (
            <div className="logout-dropdown">
              <button type="button" onClick={handleLogout}>
                ➜] Logout
              </button>
            </div>
          )}
        </div>
        {activePage === "dashboard" && (
      
          <Dashboard onPageChange={setActivePage}/>
        )}
        {activePage === "product" && (
          <div>
            <h1>Product Management Application ─── ⋆⋅☆⋅⋆ ──</h1>

            <div className="search-sort">
              <SearchBar onSearch={handleSearch} />

              <SortDropdown sortOption={sortOption} onSort={handleSort} />

              <ProductCategory onCategoryChange={handleCategoryChange} />

              {showAddForm && (
                <AddProductForm
                  onAdd={handleAddProduct}
                  onClose={() => setShowAddForm(false)}
                  
                />
              )}
            </div>

            <div className="product-container">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  ondelete={handleDelete}
                  onUpdate={handleUpdateProduct}
                />
              ))}

              <Pagination
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
            </div>
        )}
         
          {activePage === "recipe" && (
          <div>
            <h1>Recipe Management Application ─── ⋆⋅☆⋅⋆ ──</h1>

            <div className="search-bar">
              <input
                type="text"
                value={query}
                placeholder="Search Recipe..."
                onChange={(e) => setQuery(e.target.value)}
                className="search-bar input"
              />

              <button
                className="search-btn"
                onClick={() => handleRecipeSearch(query)}
              >
                Search
              </button>

              
            </div>
            

            {showRecipeForm && (
              <RecipeForm
                recipe={editingRecipe}
                onSubmit={handleAddRecipe}
                onClose={() => {
                  setShowRecipeForm(false);
                  setEditingRecipe(undefined);
                }}
              />
            )}

            {!showRecipeForm && (
              <>
                <div className="recipe-container">
                  {recipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                        onUpdate={handleUpdateRecipe}
                      onDelete={handleRecipeDelete}
                    />
                  ))}
                </div>

                <div className="pagination">
                  <button
                    onClick={() => setRecipePage((prev) => prev - 1)}
                    disabled={recipePage === 1}
                    className="btn"
                  >
                    Previous
                  </button>

                  <span>Page {recipePage}</span>

                  <button
                    onClick={() => setRecipePage((prev) => prev + 1)}
                    className="btn"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        )}

          
      
      </section>
    </main>
  );
}
