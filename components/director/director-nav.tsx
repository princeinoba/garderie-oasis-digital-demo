import Link from "next/link";

import {
  Bot,
  CalendarDays,
  CircleHelp,
  LayoutDashboard,
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
  return (
    <aside className="director-sidebar">
      <BrandMark compact />
      <span className="director-demo-badge">Synthetic demo</span>
      <nav aria-label="Director navigation">
        {links.map(([href, label, Icon]) => (
          <Link href={href} key={href}>
            <Icon aria-hidden="true" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="director-sidebar-foot">
        <span className="status-dot" />
        Remote services disabled
      </div>
    </aside>
  );
}
