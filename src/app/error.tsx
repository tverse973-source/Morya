"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Next.js error boundary:", error);
  }, [error]);

  return (
    <main className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center bg-slate-50 px-4 pt-12 pb-20">
      <div className="max-w-md text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-4">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-3xl font-display font-bold text-text-primary">Something went wrong</h1>
        <p className="text-lg text-text-muted">
          We encountered an unexpected error. Please try refreshing the page.
        </p>
        <button
          onClick={() => {
            reset();
            window.location.reload();
          }}
          className="rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white hover:bg-brand-blue-light transition-colors"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
