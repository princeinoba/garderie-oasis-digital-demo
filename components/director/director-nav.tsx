"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Bot,
  CalendarDays,
  CircleHelp,
  LayoutDashboard,
  PanelLeftClose,
  Settings,
  UsersRound,
  UserRoundSearch,
} from "lucide-react";

import { BrandMark } from "@/components/brand/brand-mark";

const links = [
  ["/director", "Overview", LayoutDashboard],
  ["/director/tour-inquiries", "Tour Inquiries", UserRoundSearch],
  ["/director/tour-calendar", "Tour Calendar", CalendarDays],
  ["/director/faq-content", "FAQ Content", CircleHelp],
  ["/director/ai-proposals", "AI Proposals", Bot],
  ["/director/staff", "Staff", UsersRound],
  ["/director/settings", "Settings", Settings],
] as const;

export function DirectorNav() {
  const pathname = usePathname();

  return (
    <aside className="director-sidebar">
      <BrandMark compact />
      <span className="director-demo-badge">Synthetic Demo</span>
      <nav aria-label="Director navigation">
        {links.map(([href, label, Icon]) => {
          const active = href === "/director" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              aria-label={label}
              className={active ? "is-active" : undefined}
              href={href}
              key={href}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
      <button className="director-collapse" type="button" aria-label="Collapse navigation">
        <PanelLeftClose aria-hidden="true" />
        <span>Collapse</span>
      </button>
    </aside>
  );
}
