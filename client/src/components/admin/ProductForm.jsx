"use client";

import { adminService } from "@/services/adminService";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { toast } from "react-toastify";

const CATEGORY_OPTIONS = [
  "cleanser",
  "moisturizer",
  "serum",
  "sunscreen",
  "toner",
  "mask",
  "eye_care",
  "lip_care",
];

const formatCategoryLabel = (value) =>
  value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const ProductForm = ({ product }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImages((prevImages) => [...prevImages, ...acceptedFiles]);
  }, []);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: product?.name || "",
      brand_id: product?.brand_id || product?.brand?.brand_id || "",
      price: product?.price || "",
      category: product?.category || "",
      stock_quantity: product?.stock_quantity || 0,
      description: product?.description || "",
    },
  });

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await adminService.getBrands();
        setBrands(data);
      } catch (error) {
        toast.error(error.message || "Failed to load brands");
      }
    };

    fetchBrands();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
  });

  const removeImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const submitForm = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.brand_id) {
      formData.append("brand_id", data.brand_id);
    }
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("stock_quantity", data.stock_quantity || 0);
    if (data.description) formData.append("description", data.description);

    if (selectedImages.length > 0) {
      selectedImages.forEach((image) => {
        formData.append("images", image);
      });
    }

    try {
      setLoading(true);
      const productId = product?.product_id || product?._id;
      if (product) {
        await adminService.updateProduct(productId, formData);
        toast.success("Product updated successfully");
      } else {
        await adminService.createProduct(formData);
        toast.success("Product created successfully");
      }
      router.push(ROUTES.ADMIN_PRODUCTS);
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Product Name *
          </label>
          <input
            type="text"
            className="block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 outline-none focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary-soft)"
            placeholder="Type product name"
            required
            {...register("name")}
          />
        </div>

        <div className="w-full">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Brand *
          </label>
          <select
            className="block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 outline-none focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary-soft)"
            required
            {...register("brand_id")}
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand.brand_id} value={brand.brand_id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Price *
          </label>
          <input
            type="number"
            className="block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 outline-none focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary-soft)"
            placeholder="Rs. 10000"
            required
            {...register("price")}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Category *
          </label>
          <select
            className="block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 outline-none focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary-soft)"
            required
            {...register("category")}
          >
            <option value="">Select Category</option>
            {CATEGORY_OPTIONS.map((category) => (
              <option key={category} value={category}>
                {formatCategoryLabel(category)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Stock
          </label>
          <input
            type="number"
            className="block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 outline-none focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary-soft)"
            placeholder="10"
            {...register("stock_quantity")}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Product Images
          </label>
          <div {...getRootProps()} className="flex items-center justify-center w-full">
            <div className="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 transition hover:bg-slate-100">
              <div className="flex flex-col items-center justify-center py-10 text-slate-500">
                <svg
                  className="w-8 h-8 mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-slate-700">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs">.png, .jpg, .jpeg (Max 5MB)</p>
              </div>
              <input {...getInputProps()} type="file" />
            </div>
          </div>

          {selectedImages.length > 0 && (
            <div className="mt-4">
              {selectedImages.map((image, index) => (
                <div
                  key={index}
                  className="mt-2 flex items-center gap-5 rounded-lg border border-slate-200 bg-white p-2"
                >
                  <Image
                    className="h-14 w-14 object-contain"
                    src={URL.createObjectURL(image)}
                    width={100}
                    alt="preview"
                    height={100}
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-slate-800">{image.name}</h4>
                    <span className="text-sm text-slate-500">
                      {Math.round(image.size / 1024)} KB
                    </span>
                  </div>
                  <button
                    onClick={() => removeImage(index)}
                    type="button"
                    className="cursor-pointer bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            rows={6}
            className="block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 outline-none focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary-soft)"
            placeholder="Your description here"
            {...register("description")}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex cursor-pointer items-center rounded-lg bg-[var(--brand-primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-primary-hover)] disabled:opacity-50"
      >
        {loading ? "Saving..." : product ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
