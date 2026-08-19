import { Plus } from "lucide-react";

import { TourInquiryList } from "@/components/director/tour-inquiry-list";

export const metadata = { title: "Tour Inquiries" };

export default function TourInquiriesPage() {
  return (
    <>
      <header className="director-page-heading">
        <div>
          <h1>Tour Inquiries</h1>
          <p>Manage and respond to synthetic tour requests.</p>
        </div>
        <button className="button button-primary" type="button">
          <Plus aria-hidden="true" />
          New Inquiry
        </button>
      </header>
      <TourInquiryList />
    </>
  );
}
