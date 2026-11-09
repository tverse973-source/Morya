"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center bg-slate-50 px-4 pt-12 pb-20">
      <div className="max-w-md text-center space-y-8">
        <div className="animate-pulse inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-200 mb-4">
          <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-4xl font-display font-bold text-text-primary">Page not found</h1>
        <p className="text-lg text-text-muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white hover:bg-brand-blue-light transition-colors"
          >
            Go home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-text-primary hover:bg-slate-100 transition-colors"
          >
            Go back
          </button>
        </div>
      </div>
    </main>
  );
}
