"use client";

import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import {
  PRODUCT_CATEGORIES,
  SKIN_TYPES,
  SORT_OPTIONS,
} from "@/constants/productFilters";
import { RotateCcw, SlidersHorizontal } from "lucide-react";

const ProductFilters = ({
  filters,
  brands,
  onFilterChange,
  onResetFilters,
}) => {
  // Active filter count (excluding sort and empty values)
  const activeCount = [
    "category",
    "skinType",
    "brandId",
    "minPrice",
    "maxPrice",
  ].filter((key) => filters[key] !== "" && filters[key] != null).length;

  return (
    <aside className="h-fit rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-24">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl bg-[#2FA4A9]/10 p-2 text-[#2FA4A9]">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Filters</h2>
            <p className="text-[11px] text-slate-400">Narrow your results</p>
          </div>
        </div>
        {activeCount > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2FA4A9] text-[10px] font-bold text-white">
            {activeCount}
          </span>
        )}
      </div>

      <div className="space-y-5 p-5">
        <div className="space-y-3 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Sort, Category &amp; Skin Type
          </p>

          <Select
            id="product-sort"
            label="Sort by"
            value={filters.sort}
            onChange={(e) => onFilterChange("sort", e.target.value)}
            className="h-11"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>

          <Select
            id="product-category"
            label="Category"
            value={filters.category}
            onChange={(e) => onFilterChange("category", e.target.value)}
            className="h-11"
          >
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat.value ?? "all-categories"} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </Select>

          <Select
            id="product-skin-type"
            label="Skin type"
            value={filters.skinType}
            onChange={(e) => onFilterChange("skinType", e.target.value)}
            className="h-11"
          >
            {SKIN_TYPES.map((skin) => (
              <option key={skin.value ?? "all-skin"} value={skin.value}>
                {skin.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-3 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Brand &amp; Budget
          </p>

          <Select
            id="product-brand"
            label="Brand"
            value={filters.brandId}
            onChange={(e) => onFilterChange("brandId", e.target.value)}
            className="h-11"
          >
            <option value="">All brands</option>
            {brands.map((brand) => (
              <option key={brand.brand_id} value={brand.brand_id}>
                {brand.name}
              </option>
            ))}
          </Select>

          <div className="grid grid-cols-2 gap-3">
            <Input
              id="min-price"
              label="Min (Rs)"
              type="number"
              min="0"
              placeholder="0"
              value={filters.minPrice}
              onChange={(e) => onFilterChange("minPrice", e.target.value)}
              className="h-11"
            />
            <Input
              id="max-price"
              label="Max (Rs)"
              type="number"
              min="0"
              placeholder="5000"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange("maxPrice", e.target.value)}
              className="h-11"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#2FA4A9]/30 bg-[#2FA4A9]/8 px-4 py-3 text-sm font-bold text-[#1D7D82] transition-all hover:bg-[#2FA4A9]/15 active:scale-95"
        >
          <RotateCcw className="h-4 w-4" />
          Reset All Filters
          {activeCount > 0 && (
            <span className="ml-1 rounded-full bg-[#2FA4A9] px-1.5 py-0.5 text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default ProductFilters;
