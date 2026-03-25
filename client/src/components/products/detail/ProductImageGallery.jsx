"use client";

import { useState } from "react";
import { Package } from "lucide-react";
import { resolveImageUrl } from "@/utils/products/productCardHelpers";

const ProductImageGallery = ({ images = [], productName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const mainImageUrl = images[selectedIndex]
    ? resolveImageUrl(images[selectedIndex])
    : null;

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-[#E8F7F8] to-[#DDF2F3]">
        {mainImageUrl ? (
          <img
            src={mainImageUrl}
            alt={productName}
            className="h-80 w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="flex h-80 flex-col items-center justify-center gap-2 text-[#2FA4A9]/40">
            <Package className="h-16 w-16" />
            <span className="text-sm font-medium">No image</span>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-xl border-2  transition-all duration-200 ${
                selectedIndex === i
                  ? "border-[#2FA4A9] shadow-md shadow-teal-200"
                  : " opacity-60 hover:opacity-100 border-slate-400"
              }`}
            >
              <img
                src={resolveImageUrl(img)}
                alt={`Thumbnail ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
