"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import { productService } from "@/services/productService";
import Input from "@/components/ui/Input";
import { Search } from "lucide-react";

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

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const normalizedSearch = searchDraft.trim();

      setFilters((previous) => {
        if (previous.search === normalizedSearch) {
          return previous;
        }

        return {
          ...previous,
          search: normalizedSearch,
        };
      });
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchDraft]);

  const displayedProducts = useMemo(() => {
    return sortProducts(products, filters.sort);
  }, [products, filters.sort]);

  const handleFilterChange = (key, value) => {
    setFilters((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const handleResetFilters = () => {
    setSearchDraft("");
    setFilters(initialFilters);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-[#EAF8F8] via-[#F8FAFC] to-[#EEF7FB]" />
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#2FA4A9]/12 blur-3xl" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-[#F5E6B3]/20 blur-3xl" />
      </div>

      <section className="relative z-10 border-b border-slate-200/80 bg-transparent">
        <div className="mx-auto w-full max-w-7xl px-6 py-5">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-[#2FA4A9]/6 via-transparent to-[#F5E6B3]/15" />

            <div className="relative mb-2 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-800">Search Products</p>
              <span className="inline-flex items-center rounded-full border border-[#E7C873]/45 bg-[#F5E6B3]/35 px-2.5 py-1 text-[11px] font-semibold text-[#8A6B21]">
                Live
              </span>
            </div>

            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
              <Input
                id="product-search"
                placeholder="Search by product name, ingredient, or concern..."
                value={searchDraft}
                onChange={(event) => setSearchDraft(event.target.value)}
                className="h-12 bg-white pl-10"
              />
            </div>
            <p className="relative mt-2 text-xs text-slate-500">Results update automatically as you type.</p>
          </div>
        </div>
      </section>

      <main className="relative z-10 mx-auto w-full max-w-7xl space-y-6 px-6 py-8">
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

          {isLoading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white/95" />
              ))}
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white/95 px-6 py-12 text-center backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-slate-900">No products found</h3>
              <p className="mt-2 text-slate-600">
                Try adjusting your filters, search terms, or price range to discover more products that match your skin needs.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {displayedProducts.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductCatalog;
