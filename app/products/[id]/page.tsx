import { getProductById } from "@/app/services/productService";
import ProductDetails from "../../components/ProductDetails";
import SessionProductDetails from "@/app/components/SessionProductDetails";

type ProductDetailsPageProps = {
  params: Promise<{
    id: number;
  }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;
  const product = await getProductById(id);
  console.log("Product data:", product);

  return (
    <main>
      <h1>Product Details ─── ⋆⋅☆⋅⋆ ──</h1>
      {/* <ProductDetails product={product} /> */}
      <SessionProductDetails/>
    </main>
  );
}
