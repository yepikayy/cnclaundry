import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { priceCategories, formatPrice } from "@/lib/price-list";

export function PriceListDetail() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {priceCategories.map((cat, i) => {
        const Icon = cat.icon;
        return (
          <ScrollReveal key={cat.title} delay={i * 0.05}>
            <div className="h-full bg-white border border-slate-100 rounded-2xl p-6 hover:border-sky-100 hover:shadow-sm transition-all">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-sky-500" />
                </span>
                <h3 className="font-semibold text-slate-800 text-sm">{cat.title}</h3>
              </div>
              <ul className="space-y-2.5">
                {cat.items.map((item) => (
                  <li key={item.name} className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-slate-600">{item.name}</span>
                    <span className="flex items-baseline gap-1 shrink-0 text-right">
                      {item.price !== null ? (
                        <>
                          <span className="font-semibold text-slate-800">{formatPrice(item.price)}</span>
                          {item.note && <span className="text-xs text-slate-400">{item.note}</span>}
                        </>
                      ) : (
                        <span className="text-xs font-medium text-sky-600">{item.note}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
