"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Demonstration route error", error);
  }, [error]);
  return (
    <main className="interior-main">
      <section className="interior-hero page-width">
        <p className="eyebrow">Something went wrong</p>
        <h1>This demonstration needs a fresh start.</h1>
        <p>No submitted information was retained. Try the route again when you are ready.</p>
        <button className="button button-primary" type="button" onClick={reset}>
          Try again
        </button>
      </section>
    </main>
  );
}
