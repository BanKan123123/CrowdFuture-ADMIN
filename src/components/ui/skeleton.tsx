function Skeleton({
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex w-full animate-pulse">
    <div className="w-full bg-gray-200 rounded-xl p-6">
         <div className="h-6 bg-gray-300 mb-4 rounded"></div>
         <div className="h-4 bg-gray-300 rounded"></div>
    </div>
</div>
  );
}

export { Skeleton };
