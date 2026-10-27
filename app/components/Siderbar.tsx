"use client";

import { useState } from "react";

type SidebarProps = {
  activePage: "dashboard" | "product" | "recipe" ;
  onPageChange: (page: "dashboard" | "product" | "recipe") => void;
  onAdd: () => void;
  onAddRecipe: () => void;
};

export default function Sidebar({
  activePage,
  onPageChange,
  onAdd,
  onAddRecipe,
}: SidebarProps) {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddRecipe , setShowAddRecipe] = useState(false);
  return (
    <aside className="sidebar">
      <h2>Management</h2>
      <div className="add-drop">
  <button
          className={activePage === "dashboard" ? "active" : ""}
          onClick={() => {
            onPageChange("dashboard");
        
          }}
        >
          <span>Dashboard</span>
        </button>

     <br/>
     <hr/>
     <br/>

        <button
          className={activePage === "product" ? "active" : ""}
          onClick={() => {
            onPageChange("product");
            setShowAddProduct(!showAddProduct);
          }}
        >
          <span>Product</span>
        </button>
        {showAddProduct && (
          <div className="add-drop-menu">
            <button
              onClick={() => {
                setShowAddProduct(false);
                onAdd();
              }}
            >
              + Add Product
            </button>
          </div>
        )}
      </div>
      <br/>
      <div>
          <button
          className={activePage === "recipe" ? "active" : ""}
          onClick={() => {
            onPageChange("recipe");
            setShowAddRecipe(!showAddRecipe);
          }}
        >
              <span>Recipe</span>
        </button>
        {showAddRecipe && (
          <div className="add-drop-menu">
            <button
              onClick={() => {
                setShowAddRecipe(false);
                onAddRecipe();
              }}
            >
              + Add Recipe
            </button>
          </div>
        )}
      </div>
     

    
    
      {/* <button onClick={onAddProduct}>+ Add Product</button>
            <button onClick={onAddRecipe}>+ Add Recipe</button> */}
      {/*
       <div className="add-drop">
        <button
          className="add-main"
          onClick={() => setShowAddMenu(!showAddMenu)}
        >
          <span>+Add</span>
        </button>
        {showAddMenu && (
          <div className="add-drop-menu">
            <button
              onClick={() => {
                setShowAddMenu(false);
                onAddProduct();
              }}
            >
              + Add Product
            </button>

            <button
              onClick={() => {
                setShowAddMenu(false);
                onAddRecipe();
              }}
            >
              + Add Recipe
            </button>
          </div>
        )}
      </div> */}
    </aside>
  );
}
