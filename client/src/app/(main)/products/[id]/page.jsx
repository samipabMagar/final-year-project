import ProductDetail from "@/components/products/ProductDetail";

// SEO metadata for the product detail page
export const metadata = {
  title: "Product Details | eDermaCare",
  description: "View detailed information about this skincare product.",
};

// In Next.js 15+/16, params is a Promise — must be awaited
const ProductDetailPage = async ({ params }) => {
  const { id } = await params;
  return <ProductDetail id={id} />;
};

export default ProductDetailPage;
