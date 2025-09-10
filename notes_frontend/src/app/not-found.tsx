import React from "react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <section className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm" role="alert" aria-live="assertive">
        <header className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">404 – Page Not Found</h1>
          <p className="text-gray-600">The page you’re looking for doesn’t exist.</p>
        </header>
      </section>
    </main>
  );
}
