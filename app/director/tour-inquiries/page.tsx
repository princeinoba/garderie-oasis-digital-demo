import { Plus } from "lucide-react";
import { TourInquiryList } from "@/components/director/tour-inquiry-list";
export const metadata = { title: "Tour Inquiries" };
export default function TourInquiriesPage() {
  return (
    <>
      <header className="director-page-heading">
        <div>
          <p className="eyebrow">Inquiry management</p>
          <h1>Tour Inquiries</h1>
          <p>Search and filter fictional tour requests.</p>
        </div>
        <button className="button button-primary" type="button">
          <Plus aria-hidden="true" />
          New synthetic inquiry
        </button>
      </header>
      <TourInquiryList />
    </>
  );
}
