"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2, PencilLine } from "lucide-react";
import { toast } from "react-toastify";
import ProductForm from "@/components/admin/ProductForm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { adminService } from "@/services/adminService";

const EditProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await adminService.getProductById(id);
        setProduct(data);
      } catch (error) {
        toast.error(error.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        badge="Edit Product"
        icon={PencilLine}
        title="Update Product"
        description="Update product details and save changes."
      />

      <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        {loading ? (
          <div className="flex h-56 items-center justify-center">
            <Loader2 className="h-7 w-7 animate-spin text-[#2FA4A9]" />
          </div>
        ) : product ? (
          <ProductForm product={product} />
        ) : (
          <p className="text-sm text-slate-600">Product not found.</p>
        )}
      </div>
    </div>
  );
};

export default EditProductPage;
