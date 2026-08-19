import Link from "next/link";
import { notFound } from "next/navigation";

import { ChevronRight } from "lucide-react";

import styles from "@/components/director/director-board.module.css";
import { InquiryDetail } from "@/components/director/inquiry-detail";
import { demoInquiries } from "@/lib/demo/director-data";

export async function generateMetadata({ params }: { params: Promise<{ inquiryId: string }> }) {
  const { inquiryId } = await params;
  const item = demoInquiries.find((row) => row.id === inquiryId);
  return {
    title: item ? `${item.reference} Inquiry Detail` : "Inquiry Not Found",
    description: item ? "Synthetic director inquiry detail." : "No synthetic record.",
  };
}

export default async function InquiryDetailPage({
  params,
}: {
  params: Promise<{ inquiryId: string }>;
}) {
  const { inquiryId } = await params;
  const item = demoInquiries.find((row) => row.id === inquiryId);
  if (!item) notFound();

  return (
    <>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/director/tour-inquiries">Tour Inquiries</Link>
        <ChevronRight aria-hidden="true" />
        <span aria-current="page">Inquiry Detail</span>
      </nav>
      <InquiryDetail inquiry={item} />
    </>
  );
}
