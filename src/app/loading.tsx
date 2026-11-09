export const metadata = {
  title: "Loading...",
};

export default function Loading() {
  return (
    <main className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="max-w-2xl space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-200 rounded-full w-3/4"></div>
          <div className="h-4 bg-slate-200 rounded-full w-1/2"></div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse space-y-3">
              <div className="h-48 bg-slate-200 rounded-2xl"></div>
              <div className="h-4 bg-slate-200 rounded-full w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded-full w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
