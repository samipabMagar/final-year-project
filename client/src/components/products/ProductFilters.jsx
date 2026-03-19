import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { PRODUCT_CATEGORIES, SKIN_TYPES, SORT_OPTIONS } from "@/constants/productFilters";
import { RotateCcw, SlidersHorizontal } from "lucide-react";

const ProductFilters = ({
  filters,
  brands,
  onFilterChange,
  onResetFilters,
}) => {
  return (
    <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
      <div className="mb-4 flex items-center gap-2">
        <div className="rounded-lg bg-[#2FA4A9]/10 p-2 text-[#2FA4A9]">
          <SlidersHorizontal className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">Filter Products</h2>
          <p className="text-xs text-slate-500">Find your best match quickly</p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sorting & Type</p>

          <Select
            id="product-sort"
            label="Sort by"
            value={filters.sort}
            onChange={(event) => onFilterChange("sort", event.target.value)}
            className="h-12"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select
            id="product-category"
            label="Category"
            value={filters.category}
            onChange={(event) => onFilterChange("category", event.target.value)}
            className="h-12"
          >
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category.value || "all-categories"} value={category.value}>
                {category.label}
              </option>
            ))}
          </Select>

          <Select
            id="product-skin-type"
            label="Skin type"
            value={filters.skinType}
            onChange={(event) => onFilterChange("skinType", event.target.value)}
            className="h-12"
          >
            {SKIN_TYPES.map((skinType) => (
              <option key={skinType.value || "all-skin-types"} value={skinType.value}>
                {skinType.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Brand & Budget</p>

          <Select
            id="product-brand"
            label="Brand"
            value={filters.brandId}
            onChange={(event) => onFilterChange("brandId", event.target.value)}
            className="h-12"
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
              label="Min price"
              type="number"
              min="0"
              placeholder="0"
              value={filters.minPrice}
              onChange={(event) => onFilterChange("minPrice", event.target.value)}
              className="h-12"
            />

            <Input
              id="max-price"
              label="Max price"
              type="number"
              min="0"
              placeholder="5000"
              value={filters.maxPrice}
              onChange={(event) => onFilterChange("maxPrice", event.target.value)}
              className="h-12"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#2FA4A9]/35 bg-[#2FA4A9]/10 px-4 py-3 text-sm font-semibold text-[#1D7D82] transition hover:bg-[#2FA4A9]/15"
        >
          <RotateCcw className="h-4 w-4" />
          Reset All Filters
        </button>
      </div>
    </aside>
  );
};

export default ProductFilters;
