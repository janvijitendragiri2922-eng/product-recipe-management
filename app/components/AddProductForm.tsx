"use client";

import { useState } from "react";

type AddProductFormProps = {
  onAdd: (product: {
     title: string;
      price: number; 
      thumbnail: string ;
      description:string;
      rating:number;
      stock:number;
      category:string;
    }) => void;
  onClose: () => void;
    
};

export default function AddProductForm({
  onAdd,
  onClose,
 
}: AddProductFormProps) {
  const [title, setTitile] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description,setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [stock,setStock] = useState("");
  const [category,setCategory] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const product = {
      title: title,
      price: Number(price),
      thumbnail: thumbnail,
      description:description,
      rating:Number(rating),
      stock:Number(stock),
      category:category,
    };
    onAdd(product);
    

    setTitile("");
    setPrice("");
    setThumbnail("");
    setDescription("");
    setRating("");
    setStock("");
    setCategory("");
    
    onClose();
  }

  return (
    <div className="model">
      <div className="box">
        <button className="close-btn" onClick={onClose}>❌</button>
        <h1>Add Product ─── ⋆⋅☆⋅⋆ ──</h1>
        <form  onSubmit={handleSubmit} className="add-form">
          
          <input
           className="input"
            type="text"
            value={title}
            onChange={(e) => setTitile(e.target.value)}
            placeholder="Enter Product Name..."
            required
          />
     
          <input
          className="input"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Product Price..."
            required
          />
          <input
          className="input"
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="Product URL..."
            required
          />
          <input
           className="input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder=" Product Description..."
           
          />
            <input
           className="input"
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder=" Product Rating..."
           
          />

             <input
           className="input"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder=" Product Stock..."
           
          />

             <input
           className="input"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder=" Product Category..."
           
          />
          
          
          <button type="submit" className="add-btn">+Add Product</button>
         
        </form>
      </div>
    </div>
  );
}
