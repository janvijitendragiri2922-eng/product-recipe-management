"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductDetails from "./ProductDetails";
import type { Product } from "../types/product";

export default function SessionProductDetails() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const id = params.id;
    const savedProduct = sessionStorage.getItem(`product-${id}`);

    if (savedProduct) {
      try {
        setProduct(JSON.parse(savedProduct) as Product);
      } catch {
        sessionStorage.removeItem(`product-${id}`);
      }
    }
  }, [params.id]);

  if (!product) {
    return (
      <div>
        <center>
          <p>
            <strong>Product details not found.</strong>
          </p>
          <button onClick={() => router.back()} className="cancel-button">
            Back
          </button>
        </center>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}
