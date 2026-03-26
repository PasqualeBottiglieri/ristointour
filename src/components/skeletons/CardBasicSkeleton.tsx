export default function CardBasicSkeleton() {
  return (
    <div className="flex items-center gap-4 bg-white rounded-lg p-4 border border-stone-200">
      <div className="w-16 h-16 rounded-lg bg-stone-200 animate-pulse shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="h-4 w-32 bg-stone-200 rounded animate-pulse mb-2" />
        <div className="h-3 w-24 bg-stone-200 rounded animate-pulse mb-2" />
        <div className="h-3 w-20 bg-stone-200 rounded animate-pulse" />
      </div>
      <div className="shrink-0 flex items-center gap-1">
        <div className="w-9 h-9 rounded-full bg-stone-200 animate-pulse" />
        <div className="w-9 h-9 rounded-full bg-stone-200 animate-pulse" />
      </div>
    </div>
  );
}
