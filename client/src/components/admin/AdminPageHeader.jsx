import React from "react";

const AdminPageHeader = ({ icon: Icon, badge, title, description, action }) => {
  return (
    <header className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          {badge ? (
            <span className="inline-flex items-center rounded-full bg-(--brand-primary-soft) px-3 py-1 text-xs font-semibold text-(--brand-primary-text)">
              {badge}
            </span>
          ) : null}

          <div className="mt-3 flex items-center gap-3">
            {Icon ? (
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-(--brand-primary-soft) text-(--brand-primary)">
                <Icon className="h-5 w-5" />
              </span>
            ) : null}
            <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
          </div>

          <p className="mt-3 text-sm text-slate-600 sm:text-base">{description}</p>
        </div>

        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </header>
  );
};

export default AdminPageHeader;
