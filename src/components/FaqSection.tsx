export interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqSection({ faqs }: { faqs: FaqItem[] }) {
  return (
    <section className="mt-20 mb-8">
      <h2 className="text-2xl md:text-3xl font-black mb-6">
        Domande Frequenti
      </h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="bg-white rounded-xl border border-stone-200 overflow-hidden group"
          >
            <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-emerald-900 hover:text-primary transition-colors">
              {faq.question}
              <span className="material-symbols-outlined text-stone-400 group-open:rotate-180 transition-transform shrink-0 ml-4">
                expand_more
              </span>
            </summary>
            <p className="px-5 pb-5 text-stone-600 font-display leading-relaxed">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

/** Build FAQPage JSON-LD from FAQ items */
export function buildFaqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
