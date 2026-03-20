import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import ToastProvider from "@/components/ui/ToastProvider";

export const metadata = {
  title: "eDermaCare - Your Skincare & Dermatology Platform",
  description:
    "Find the best skincare products and consult with expert dermatologists",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <main>{children}</main>
          <ToastProvider />
        </StoreProvider>
      </body>
    </html>
  );
}
