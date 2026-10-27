"use client";

import type { Product } from "../types/product";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  product: Product;
  ondelete: (id: number) => void;
  onUpdate: (id:number,updatedProduct:Product)=>Promise<void>;
 
};

export default function ProductCard({ product, ondelete ,onUpdate,}: ProductCardProps) {
  const router = useRouter();
  return (
    
    
    <div className="product-card">
      <img
        src={product.thumbnail} 
        alt={product.title}
       className="product-image"
      />
   
      <div className="product-container">
        <h2>{product.title}</h2>

        <p>
          <strong>Description : </strong>
          {product.description}{" "}
        </p>

        <p>
          <strong>Price : </strong> {product.price}{" "}
        </p>
        <p>
          <strong>Rating : </strong> {product.rating}
        </p>
        <p>
          <strong>Stock :</strong> {product.stock}{" "}
        </p>
        <p>
          <strong>Category :</strong> {product.category}
        </p>

        <button
          onClick={() =>{
            sessionStorage.setItem(`product-${product.id}`,JSON.stringify(product));
            router.push(`/products/${product.id}`)}}
          className="view-button"
        >
          View Product
        </button>

        <button
          onClick={() => {
            const confirmDelete = window.confirm("Are you sure???");
            if (confirmDelete) {
              ondelete(product.id);
            }
          }}
          className="delete-button"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
