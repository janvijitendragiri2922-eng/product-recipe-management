import type { Product } from "../types/product";
const BASE_URL = "https://dummyjson.com";

// export async function getProduct() {
//    const response = await fetch (`${BASE_URL}/products`);
//    const data= await response.json();
//    return data.products;
   
// }

export async function getProduct(limit:number,skip:number){
   const response = await fetch (`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
   const data = await response.json();
   return data;
}

export async function addProduct(
   product:{
       title: string;
      price: number; 
      thumbnail: string ;
      description:string;
      rating:number;
      stock:number;
      category:string;
   }
){
   const response = await fetch (`${BASE_URL}/products/add`,{
      method : "POST",
   });
   const data = await response.json();
   return data;
}


export async function getProductById (id:number){
   const response = await fetch (`${BASE_URL}/products/${id}`);
   const data = await response.json();
   return data;
}

export async function searchProduct(query:string){
   const response = await fetch (`${BASE_URL}/products/search?q=${query}`);
   const data = await response.json();
   return data.products;
}

export async function deleteProduct(id:number){
   console.log ("DELETE ID:",id);

   const response = await fetch (`${BASE_URL}/products/${id}`,{
          method:"DELETE",
   });
   const data = await response.json();
   return data;

}



export async function sortProduct(sortBy:string,order:"asc"|"desc"){
   const response = await fetch (`${BASE_URL}/products?sortBy=${sortBy}&order=${order}`);
   const data = await response.json();
   console.log("Sort API data",data);
   return data; 
}


export async function updateProduct(id:number,product:Partial<Product>){
   const response = await fetch (`${BASE_URL}/products/${id}`,{
      method:"PUT",
   });
   const data = await response.json();
   return data;
}

// export async function getCategoryProduct(category:string){
//    const response = await fetch (`${BASE_URL}/products/category/${category}`);
//    const data = await response.json();
//    return data;
// }