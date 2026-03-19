"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import { productService } from "@/services/productService";

const initialFilters = {
  category: "",
  skinType: "",
  brandId: "",
  minPrice: "",
  maxPrice: "",
  search: "",
  sort: "newest",
};

const sortProducts = (products, sortKey) => {
  const sortedProducts = [...products];

  switch (sortKey) {
    case "price-asc":
      sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
      break;
    case "price-desc":
      sortedProducts.sort((a, b) => Number(b.price) - Number(a.price));
      break;
    case "rating-desc":
      sortedProducts.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
      break;
    case "name-asc":
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      sortedProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      break;
  }

  return sortedProducts;
};

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [searchDraft, setSearchDraft] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBrands = useCallback(async () => {
    try {
      const brandList = await productService.getBrands();
      const activeBrands = brandList.filter((brand) => brand.is_active !== false);
      setBrands(activeBrands);
    } catch (err) {
      setBrands([]);
      setError(err.message);
    }
  }, []);

  const fetchProducts = useCallback(async (activeFilters) => {
    try {
      setIsLoading(true);
      setError("");

      const productList = await productService.getProducts(activeFilters);
      const visibleProducts = productList.filter((product) => product.is_active !== false);
      setProducts(visibleProducts);
    } catch (err) {
      setProducts([]);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  useEffect(() => {
    fetchProducts(filters);
  }, [filters, fetchProducts]);

  const displayedProducts = useMemo(() => {
    return sortProducts(products, filters.sort);
  }, [products, filters.sort]);

  const handleFilterChange = (key, value) => {
    setFilters((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setFilters((previous) => ({
      ...previous,
      search: searchDraft.trim(),
    }));
  };

  const handleResetFilters = () => {
    setSearchDraft("");
    setFilters(initialFilters);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#2FA4A9]">eDermaCare Store</p>
              <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Skincare products for every routine</h1>
              <p className="mt-3 max-w-2xl text-slate-600">
                Discover dermatologist-friendly products, compare by skin type and budget, and quickly find what fits your needs.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-1 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Products</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{displayedProducts.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Brands</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{brands.length}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-7xl space-y-6 px-6 py-8">
        <ProductFilters
          filters={filters}
          searchDraft={searchDraft}
          brands={brands}
          onSearchDraftChange={setSearchDraft}
          onSearchSubmit={handleSearchSubmit}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-80 animate-pulse rounded-2xl border border-slate-200 bg-white" />
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center">
            <h3 className="text-xl font-semibold text-slate-900">No products found</h3>
            <p className="mt-2 text-slate-600">Try changing your filters or search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedProducts.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductCatalog;
