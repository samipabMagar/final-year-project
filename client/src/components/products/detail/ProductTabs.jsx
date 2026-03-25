"use client";

import { useState } from "react";

const ProductTabs = ({ product }) => {
  const tabs = [
    {
      key: "description",
      label: "Description",
      content: product.description,
    },
    {
      key: "ingredients",
      label: "Ingredients",
      content: product.ingredients,
    },
    {
      key: "skinType",
      label: "Skin Type",
      content: Array.isArray(product.skin_type)
        ? product.skin_type.join(", ")
        : product.skin_type,
    },
  ].filter((tab) => tab.content);

  const [activeTab, setActiveTab] = useState(tabs[0]?.key ?? "");

  if (tabs.length === 0) return null;

  return (
    <div className="mt-10">
      <div className="flex gap-1 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === tab.key
                ? "border-b-2 border-[#2FA4A9] text-[#2FA4A9]"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
        {tabs.find((t) => t.key === activeTab)?.content ??
          "No information available."}
      </div>
    </div>
  );
};

export default ProductTabs;
