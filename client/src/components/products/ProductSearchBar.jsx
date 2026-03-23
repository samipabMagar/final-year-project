"use client";

import { Search, Sparkles } from "lucide-react";

const QUICK_SEARCHES = [
  "Moisturizer",
  "Sunscreen",
  "Serum",
  "Cleanser",
  "Mask",
];

const ProductSearchBar = ({ searchDraft, onSearchDraftChange }) => {
  return (
    <div className="w-full">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#2FA4A9]" />

        <input
          id="product-search"
          type="text"
          value={searchDraft}
          onChange={(e) => onSearchDraftChange(e.target.value)}
          placeholder="Search by product name, ingredient, concern…"
          className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-36 text-sm font-medium text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-[#2FA4A9] focus:outline-none focus:ring-2 focus:ring-[#2FA4A9]/20 transition"
        />

        <span className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 rounded-full border border-[#E7C873]/60 bg-[#FDF6DC] px-3 py-1 text-[11px] font-bold text-[#8A6B21]">
          <Sparkles className="h-3 w-3" />
          Live Search
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
          Quick:
        </span>
        {QUICK_SEARCHES.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => onSearchDraftChange(term)}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-150 ${
              searchDraft.toLowerCase() === term.toLowerCase()
                ? "border-[#2FA4A9] bg-[#2FA4A9] text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-600 hover:border-[#2FA4A9]/50 hover:text-[#2FA4A9]"
            }`}
          >
            {term}
          </button>
        ))}

        {searchDraft && (
          <button
            type="button"
            onClick={() => onSearchDraftChange("")}
            className="ml-auto text-xs font-medium text-slate-400 hover:text-red-500 transition-colors"
          >
            Clear ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductSearchBar;
