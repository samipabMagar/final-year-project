"use client";

import ProductFilters from "@/components/products/ProductFilters";
import ProductSearchBar from "@/components/products/ProductSearchBar";
import ProductResultsGrid from "@/components/products/ProductResultsGrid";
import useProductCatalog from "@/hooks/useProductCatalog";

const ProductCatalog = () => {
  const {
    brands,
    filters,
    searchDraft,
    isLoading,
    error,
    products,
    setSearchDraft,
    handleFilterChange,
    handleResetFilters,
  } = useProductCatalog();

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-[#ECFAFA] via-[#F8FCFC] to-[#EEF7FB]" />
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#2FA4A9]/14 blur-3xl" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-[#C7EDED]/35 blur-3xl" />
      </div>

      <section className="relative z-10  border-slate-200/80 bg-transparent">
        <div className="mx-auto w-full max-w-7xl px-6 py-2">
          <ProductSearchBar searchDraft={searchDraft} onSearchDraftChange={setSearchDraft} />
        </div>
      </section>

      <main className="relative z-10 mx-auto w-full max-w-7xl  px-6 py-2 pb-10">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <ProductFilters
            filters={filters}
            brands={brands}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />

          <ProductResultsGrid isLoading={isLoading} products={products} />
        </div>
      </main>
    </div>
  );
};

export default ProductCatalog;
