import Link from "next/link";
import { Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <main className="interior-main">
      <section className="interior-hero page-width">
        <Leaf aria-hidden="true" />
        <p className="eyebrow">A gentle redirect</p>
        <h1>That page is not in this demonstration.</h1>
        <p>The experience may have moved, or the address may be incomplete.</p>
        <Link className="button button-primary" href="/">
          Return home
        </Link>
      </section>
    </main>
  );
}
