import ProductCard from "@/components/products/ProductCard";

const ProductResultsGrid = ({ isLoading, products }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white/95" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white/95 px-6 py-12 text-center backdrop-blur-sm">
        <h3 className="text-xl font-semibold text-slate-900">No products found</h3>
        <p className="mt-2 text-slate-600">
          Try adjusting your filters, search terms, or price range to discover more products that match your skin needs.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
  );
};

export default ProductResultsGrid;
