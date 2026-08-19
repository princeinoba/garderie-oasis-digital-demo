import type { Metadata } from "next";

import { InvitationForm } from "@/components/auth/invitation-form";

export const metadata: Metadata = { title: "Accept Demo Invitation" };

export default async function AcceptInvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <InvitationForm token={token} verified={token === "synthetic-invite"} />;
}
