import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { PRODUCT_CATEGORIES, SKIN_TYPES, SORT_OPTIONS } from "@/constants/productFilters";

const ProductFilters = ({
  filters,
  searchDraft,
  brands,
  onSearchDraftChange,
  onSearchSubmit,
  onFilterChange,
  onResetFilters,
}) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-slate-900">Find your product</h2>
        <p className="text-sm text-slate-600">Search by name, ingredient, category, skin type, and budget.</p>
      </div>

      <form onSubmit={onSearchSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Input
          id="product-search"
          placeholder="Search products..."
          value={searchDraft}
          onChange={(event) => onSearchDraftChange(event.target.value)}
          containerClassName="lg:col-span-2"
        />

        <Select
          id="product-category"
          value={filters.category}
          onChange={(event) => onFilterChange("category", event.target.value)}
        >
          {PRODUCT_CATEGORIES.map((category) => (
            <option key={category.value || "all-categories"} value={category.value}>
              {category.label}
            </option>
          ))}
        </Select>

        <Select
          id="product-skin-type"
          value={filters.skinType}
          onChange={(event) => onFilterChange("skinType", event.target.value)}
        >
          {SKIN_TYPES.map((skinType) => (
            <option key={skinType.value || "all-skin-types"} value={skinType.value}>
              {skinType.label}
            </option>
          ))}
        </Select>

        <Select
          id="product-brand"
          value={filters.brandId}
          onChange={(event) => onFilterChange("brandId", event.target.value)}
        >
          <option value="">All brands</option>
          {brands.map((brand) => (
            <option key={brand.brand_id} value={brand.brand_id}>
              {brand.name}
            </option>
          ))}
        </Select>

        <Select
          id="product-sort"
          value={filters.sort}
          onChange={(event) => onFilterChange("sort", event.target.value)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Input
          id="min-price"
          type="number"
          min="0"
          placeholder="Min price"
          value={filters.minPrice}
          onChange={(event) => onFilterChange("minPrice", event.target.value)}
        />

        <Input
          id="max-price"
          type="number"
          min="0"
          placeholder="Max price"
          value={filters.maxPrice}
          onChange={(event) => onFilterChange("maxPrice", event.target.value)}
        />

        <div className="flex items-center gap-2 md:col-span-2 lg:col-span-2">
          <Button type="submit" className="px-5 py-3">Apply</Button>
          <Button
            type="button"
            className="bg-slate-100 px-5 py-3 text-slate-700 hover:bg-slate-200"
            onClick={onResetFilters}
          >
            Reset
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ProductFilters;
