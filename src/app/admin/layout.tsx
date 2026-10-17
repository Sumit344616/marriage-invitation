import Link from "next/link";
import { verifyAdminSession } from "@/lib/auth";
import { logoutAdminAction } from "@/actions/admin-actions";
import { LayoutDashboard, Users, Building2, ExternalLink, LogOut } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifyAdminSession();

  // If on login, let it render without wrapper
  // We can check if session is unauthenticated
  if (!session.authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-walnut-950 text-ivory-100 flex flex-col">
      {/* Admin Top Navigation */}
      <header className="border-b border-champagne-400/25 bg-walnut-900/95 sticky top-0 z-40 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="font-display text-xl tracking-wider text-ivory-50 hover:text-champagne-300 transition-colors"
            >
              A <span className="font-serif italic text-champagne-400">&amp;</span> A{" "}
              <span className="font-sans text-xs uppercase tracking-widest text-champagne-400/90 ml-1">
                Admin
              </span>
            </Link>

            <nav className="hidden sm:flex items-center gap-4">
              <Link
                href="/admin"
                className="flex items-center gap-1.5 rounded-sm px-3 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-champagne-200 hover:bg-walnut-800 hover:text-champagne-400 transition-colors"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                Overview
              </Link>
              <Link
                href="/admin/rsvps"
                className="flex items-center gap-1.5 rounded-sm px-3 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-champagne-200 hover:bg-walnut-800 hover:text-champagne-400 transition-colors"
              >
                <Users className="h-3.5 w-3.5" />
                RSVPs
              </Link>
              <Link
                href="/admin/hotels"
                className="flex items-center gap-1.5 rounded-sm px-3 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-champagne-200 hover:bg-walnut-800 hover:text-champagne-400 transition-colors"
              >
                <Building2 className="h-3.5 w-3.5" />
                Hotels
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-champagne-400/30 bg-walnut-950 px-3.5 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 hover:bg-champagne-400 hover:text-walnut-950 transition-colors"
            >
              <span>View Invitation</span>
              <ExternalLink className="h-3 w-3" />
            </Link>

            <form action={logoutAdminAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-walnut-950 px-3.5 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-rose-300 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
              >
                <LogOut className="h-3 w-3" />
                <span>Logout</span>
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Submenu Bar */}
        <div className="flex sm:hidden border-t border-champagne-400/15 px-4 py-2 gap-4 overflow-x-auto">
          <Link
            href="/admin"
            className="font-sans text-[0.68rem] font-semibold uppercase tracking-wider text-champagne-300"
          >
            Overview
          </Link>
          <Link
            href="/admin/rsvps"
            className="font-sans text-[0.68rem] font-semibold uppercase tracking-wider text-champagne-300"
          >
            RSVPs
          </Link>
          <Link
            href="/admin/hotels"
            className="font-sans text-[0.68rem] font-semibold uppercase tracking-wider text-champagne-300"
          >
            Hotels
          </Link>
          <Link
            href="/"
            target="_blank"
            className="font-sans text-[0.68rem] font-semibold uppercase tracking-wider text-champagne-400 ml-auto"
          >
            View Site ↗
          </Link>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
