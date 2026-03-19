import AppNavbar from "@/components/layout/AppNavbar";
import AppFooter from "@/components/layout/AppFooter";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <AppNavbar />
      <main>{children}</main>
      <AppFooter />
    </div>
  );
}
