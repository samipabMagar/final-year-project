import Input from "@/components/ui/Input";
import { Search } from "lucide-react";

const ProductSearchBar = ({ searchDraft, onSearchDraftChange }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur-sm">
      <div className="relative overflow-hidden rounded-xl border border-slate-200/60 bg-white p-3">
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
            onChange={(event) => onSearchDraftChange(event.target.value)}
            className="h-12 bg-white pl-10"
          />
        </div>
        <p className="relative mt-2 text-xs text-slate-500">Results update automatically as you type.</p>
      </div>
    </div>
  );
};

export default ProductSearchBar;
