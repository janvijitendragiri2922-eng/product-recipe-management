"use client";
import { useState } from "react";
import type { Product } from "../types/product";
type UpdateProductProps = {
  product: Product;
  onUpdate: (updatedProduct: Product) => void;
  onCancel: () => void;
};

export default function UpdateProduct({
  product,
  onUpdate,
  onCancel,
}: UpdateProductProps) {
  const [title, setTitile] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [thumbnail, setThumbnail] = useState(product.thumbnail);
  const [description, setDescription] = useState(product.description);
  const [rating, setRating] = useState(product.rating);
  const [stock, setStock] = useState(product.stock);
  const [category, setCategory] = useState(product.category);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const updatedProduct: Product = {
      ...product,
      title: title,
      price: Number(price),
      thumbnail: thumbnail,
      description: description,
      rating: Number(rating),
      stock: Number(stock),
      category: category,
    };
    onUpdate(updatedProduct);
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="product-card">
      <h2>Edit Product</h2>
      <br />
      <label>Product Name:</label>
      <input
        className="input"
        type="text"
        value={title}
        onChange={(e) => setTitile(e.target.value)}
        placeholder="Enter Product Name..."
      />
      <label>Product Price:</label>
      <input
        className="input"
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="Product Price..."
      />
      <label>Product URL:</label>
      <input
        className="input"
        type="text"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
        placeholder="Product URL..."
      />
      <label>Product Description:</label>
      <input
        className="input"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder=" Product Description..."
      />
      <label>Product Rating:</label>
      <input
        className="input"
        type="number"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        placeholder=" Product Rating..."
      />
      <label>Product Stock:</label>
      <input
        className="input"
        type="number"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
        placeholder=" Product Stock..."
      />
      <label>Product Category:</label>
      <input
        className="input"
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder=" Product Category..."
      />

      <button type="submit" className="edit-btn">
        Update Product
      </button>
      <button type="button" onClick={onCancel} className="cancel-btn">
        Cancel
      </button>
      </div>
    </form>
  );
}
