import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProgramDetail } from "@/components/public/programs-pages";
import { programContent, programSlugs, type ProgramSlug } from "@/lib/programs";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return programSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!programSlugs.includes(slug as ProgramSlug)) return {};
  const program = programContent[slug as ProgramSlug];
  return {
    title: program.name.en,
    description: program.intro.en,
    alternates: { canonical: `/programs/${slug}` },
  };
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  if (!programSlugs.includes(slug as ProgramSlug)) notFound();
  return <ProgramDetail slug={slug as ProgramSlug} />;
}
