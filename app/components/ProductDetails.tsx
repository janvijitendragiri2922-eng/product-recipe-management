"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "../types/product";
import UpdateProduct from "./UpdateProduct";
import {updateProduct} from "../services/productService";


type ProductDetailsProps = {
  product:Product;
};


export default function ProductDetails({
  product,
}: ProductDetailsProps) {
  const router = useRouter();

  const [editMode, setEditMode] = useState(false);

  const [currentProduct, setCurrentProduct] =
    useState<Product>(product);

  async function handleUpdateProduct(
    updatedProduct: Product
  ) {
   
      const data = await updateProduct(
        updatedProduct.id,
       updatedProduct
      );


      console.log("Updated Product:", data);

setCurrentProduct((previousProduct)=>({
  ...previousProduct,
  ...updatedProduct,
}));
      setEditMode(false);
    

  }

  return (
    <div className="product-card">
      {editMode ? (
        <UpdateProduct
          product={currentProduct}
          onUpdate={handleUpdateProduct}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <>
        
      <img
              src={currentProduct.thumbnail} 
              alt={currentProduct.title}
              className="product-image"
            />
          <h2>{currentProduct.title}</h2>

          <p>
            <strong>Description: </strong>
            {currentProduct.description}
          </p>

          <p>
            <strong>Price: </strong>
            {currentProduct.price}
          </p>

        

          <p>
            <strong>Rating: </strong>
            {currentProduct.rating}
          </p>

          <p>
            <strong>Stock: </strong>
            {currentProduct.stock}
          </p>

          <p>
            <strong>Category: </strong>
            {currentProduct.category}
          </p>

          <button
            onClick={() => 
              setEditMode(true)}
            className="edit-btn"
          >
            Edit Product
          </button>
        </>
      )}
    
      {!editMode && (
      <button
        onClick={() => router.back()}
        className="back-btn"
      >
        Back
      </button>
)}
    </div>
  );
}