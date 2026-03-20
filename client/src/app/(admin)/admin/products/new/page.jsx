"use client";

import ProductForm from "@/components/admin/ProductForm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { PackagePlus } from "lucide-react";

const CreateProductPage = () => {
  return (
    <div className="space-y-2">
      <AdminPageHeader
        badge="Create Product"
        icon={PackagePlus}
        title="Add New Product"
        description="Fill in product details, assign the brand and category, then upload product images."
      />

      <div className="w-full rounded-2xl max-w-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <ProductForm />
      </div>
    </div>
  );
};

export default CreateProductPage;
