import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
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
      <Link className="back-link" href="/director/tour-inquiries">
        <ChevronLeft aria-hidden="true" />
        Back to inquiries
      </Link>
      <InquiryDetail inquiry={item} />
    </>
  );
}
