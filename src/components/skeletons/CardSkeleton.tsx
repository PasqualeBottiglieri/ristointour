export default function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      <div className="h-64 bg-stone-200 animate-pulse" />
      <div className="p-6">
        <div className="flex items-center gap-1 mb-2">
          <div className="w-3 h-3 rounded-full bg-stone-200 animate-pulse" />
          <div className="h-3 w-24 bg-stone-200 rounded animate-pulse" />
        </div>
        <div className="h-6 w-3/4 bg-stone-200 rounded animate-pulse mb-2" />
        <div className="h-4 w-full bg-stone-200 rounded animate-pulse mb-1" />
        <div className="h-4 w-2/3 bg-stone-200 rounded animate-pulse mb-6" />
        <div className="h-11 w-full bg-stone-200 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}
