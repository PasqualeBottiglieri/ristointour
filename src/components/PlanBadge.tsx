type PlanType = "basic" | "premium" | "sponsor";

const planStyles: Record<PlanType, string> = {
  premium: "bg-emerald-900 text-white",
  sponsor: "bg-primary text-white",
  basic: "bg-stone-200 text-stone-600",
};

const planLabels: Record<PlanType, string> = {
  premium: "Premium",
  sponsor: "Sponsor",
  basic: "Base",
};

export default function PlanBadge({
  plan,
  className = "",
}: {
  plan: PlanType;
  className?: string;
}) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${planStyles[plan]} ${className}`}
    >
      {planLabels[plan]}
    </span>
  );
}
