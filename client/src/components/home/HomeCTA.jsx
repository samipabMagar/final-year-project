import Link from "next/link";
import { REGISTER_ROUTE } from "@/constants/routes";
import { CheckCircle2 } from "lucide-react";

const HomeCTA = () => (
  <section className="w-full max-w-7xl mx-auto mb-10">
    <div className="mt-1 rounded-2xl bg-[#2FA4A9] p-8 text-white">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-bold">
            Ready to start your skincare journey?
          </h3>
          <p className="mt-2 text-sm text-white/90">
            Create your account and begin with expert guidance today.
          </p>
        </div>
        <Link
          href={REGISTER_ROUTE}
          className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#1D7D82] transition hover:bg-slate-100"
        >
          <CheckCircle2 className="h-4 w-4" />
          Join eDermaCare
        </Link>
      </div>
    </div>
  </section>
);

export default HomeCTA;
