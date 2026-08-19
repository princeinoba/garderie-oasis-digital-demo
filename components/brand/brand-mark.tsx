import Link from "next/link";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="Garderie Oasis Digital Experience, home">
      <span className="brand-symbol" aria-hidden="true">
        <span className="brand-sun" />
        <span className="brand-leaf brand-leaf-left" />
        <span className="brand-leaf brand-leaf-center" />
        <span className="brand-leaf brand-leaf-right" />
      </span>
      <span className="brand-copy">
        <strong>Garderie Oasis</strong>
        {!compact && <span>Digital Experience</span>}
      </span>
    </Link>
  );
}
