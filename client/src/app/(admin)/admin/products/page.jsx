"use client";

import Link from "next/link";
import { Plus, ShoppingBag } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProductManagementTable from "@/components/admin/ProductManagementTable";

const AdminProductsPage = () => {
  return (
    <div className="space-y-3">
      <AdminPageHeader
        badge="Product Management"
        icon={ShoppingBag}
        title="Manage Product Catalog"
        description="Create new products and keep your catalog clean, updated, and organized for users."
        action={
          <Link
            href={ROUTES.ADMIN_PRODUCTS_NEW}
            className="inline-flex items-center gap-2 rounded-lg bg-[#2FA4A9] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#25888d]"
          >
            <Plus size={20} />
            Add New Product
          </Link>
        }
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <ProductManagementTable />
      </div>
    </div>
  );
};

export default AdminProductsPage;
