import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  href: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://www.ristointour.it${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="max-w-7xl mx-auto px-4 pt-4 pb-2"
      >
        <ol className="flex items-center gap-1.5 text-sm font-display flex-wrap">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {i > 0 && (
                  <span className="text-stone-300 select-none">/</span>
                )}
                {isLast ? (
                  <span className="text-stone-500 truncate max-w-[200px] md:max-w-none">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-stone-400 hover:text-primary transition-colors whitespace-nowrap"
                  >
                    {i === 0 ? (
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">
                          home
                        </span>
                        <span className="hidden md:inline">{item.name}</span>
                      </span>
                    ) : (
                      item.name
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
