import type { Metadata } from "next";

import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Shared Demo Access",
  description: "Choose a fictional role-scoped Garderie Oasis demonstration experience.",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const query = await searchParams;
  const candidate = typeof query.next === "string" ? query.next : "/director";
  const nextPath =
    candidate === "/director" || candidate.startsWith("/director/") ? candidate : "/director";

  return <SignInForm nextPath={nextPath} />;
}
