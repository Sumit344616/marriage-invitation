import { redirect } from "next/navigation";
import Link from "next/link";
import { verifyAdminSession } from "@/lib/auth";
import { getAllRSVPsForAdmin, getAllHotelsForAdmin } from "@/lib/db-service";
import {
  Users,
  CheckCircle,
  XCircle,
  Building2,
  Calendar,
  Download,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import type { IRSVP } from "@/models/RSVP";

export default async function AdminDashboardPage() {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    redirect("/admin/login");
  }

  const rsvps: IRSVP[] = await getAllRSVPsForAdmin();
  const hotels = await getAllHotelsForAdmin();

  const totalRsvps = rsvps.length;
  const attendingRsvps = rsvps.filter((r) => r.attending);
  const declinedRsvps = rsvps.filter((r) => !r.attending);

  const totalGuests = attendingRsvps.reduce(
    (sum, r) => sum + (Number(r.guestCount) || 1),
    0
  );

  // Calculate ceremony attendance counts
  const ceremonyCounts: Record<string, number> = {
    haldi: 0,
    mehendi: 0,
    sangeet: 0,
    wedding: 0,
    reception: 0,
  };

  attendingRsvps.forEach((r) => {
    const count = Number(r.guestCount) || 1;
    (r.eventsAttending || []).forEach((evt) => {
      if (ceremonyCounts[evt] !== undefined) {
        ceremonyCounts[evt] += count;
      }
    });
  });

  const publishedHotelsCount = hotels.filter((h: { isPublished: boolean }) => h.isPublished).length;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-champagne-400/20 pb-6">
        <div>
          <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.25em] text-champagne-400">
            Real-time Metrics
          </span>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl font-light text-ivory-50">
            Wedding Operations Dashboard
          </h1>
          <p className="mt-1 font-body text-xs sm:text-sm text-champagne-200/70">
            Overview of guest RSVP responses, ceremony headcount, and partner accommodations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/api/admin/export-rsvps"
            download="wedding_rsvps.csv"
            className="inline-flex items-center gap-2 rounded-sm border border-champagne-400/80 bg-walnut-900 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 shadow-sm hover:bg-champagne-400 hover:text-walnut-950 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Guests Card */}
        <div className="rounded-lg border border-champagne-400/30 bg-walnut-900/80 p-5 shadow-sm">
          <div className="flex items-center justify-between text-champagne-400">
            <span className="font-sans text-xs font-semibold uppercase tracking-wider">
              Total Attending Guests
            </span>
            <Users className="h-5 w-5" />
          </div>
          <p className="mt-4 font-display text-4xl sm:text-5xl font-light text-ivory-50">
            {totalGuests}
          </p>
          <p className="mt-1 font-sans text-xs text-champagne-300/70">
            Across {attendingRsvps.length} confirmed RSVP submissions
          </p>
        </div>

        {/* Confirmed Parties */}
        <div className="rounded-lg border border-emerald-500/30 bg-walnut-900/80 p-5 shadow-sm">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="font-sans text-xs font-semibold uppercase tracking-wider">
              Confirmed RSVPs
            </span>
            <CheckCircle className="h-5 w-5" />
          </div>
          <p className="mt-4 font-display text-4xl sm:text-5xl font-light text-ivory-50">
            {attendingRsvps.length}
          </p>
          <p className="mt-1 font-sans text-xs text-emerald-300/70">
            {totalRsvps > 0
              ? `${Math.round((attendingRsvps.length / totalRsvps) * 100)}% attendance rate`
              : "Awaiting submissions"}
          </p>
        </div>

        {/* Declined Parties */}
        <div className="rounded-lg border border-rose-500/30 bg-walnut-900/80 p-5 shadow-sm">
          <div className="flex items-center justify-between text-rose-400">
            <span className="font-sans text-xs font-semibold uppercase tracking-wider">
              Declined with Regrets
            </span>
            <XCircle className="h-5 w-5" />
          </div>
          <p className="mt-4 font-display text-4xl sm:text-5xl font-light text-ivory-50">
            {declinedRsvps.length}
          </p>
          <p className="mt-1 font-sans text-xs text-rose-300/70">
            Parties unable to attend
          </p>
        </div>

        {/* Partner Hotels */}
        <div className="rounded-lg border border-champagne-400/30 bg-walnut-900/80 p-5 shadow-sm">
          <div className="flex items-center justify-between text-champagne-400">
            <span className="font-sans text-xs font-semibold uppercase tracking-wider">
              Partner Accommodations
            </span>
            <Building2 className="h-5 w-5" />
          </div>
          <p className="mt-4 font-display text-4xl sm:text-5xl font-light text-ivory-50">
            {publishedHotelsCount}{" "}
            <span className="text-xl text-walnut-400 font-sans">/ {hotels.length}</span>
          </p>
          <p className="mt-1 font-sans text-xs text-champagne-300/70">
            Published on public invitation
          </p>
        </div>
      </div>

      {/* Ceremony Headcount Section */}
      <div className="rounded-lg border border-champagne-400/25 bg-walnut-900/60 p-6">
        <div className="flex items-center justify-between border-b border-champagne-400/15 pb-4">
          <div>
            <h2 className="font-display text-2xl font-light text-ivory-50">
              Ceremony Expected Headcount
            </h2>
            <p className="font-sans text-xs text-champagne-200/70 mt-0.5">
              Live estimated catering and seating counts based on confirmed guest party selections.
            </p>
          </div>
          <Calendar className="h-5 w-5 text-champagne-400" />
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { key: "haldi", name: "Haldi Utsav", count: ceremonyCounts.haldi, color: "border-amber-400/50 text-amber-300" },
            { key: "mehendi", name: "Mehendi", count: ceremonyCounts.mehendi, color: "border-emerald-400/50 text-emerald-300" },
            { key: "sangeet", name: "Sangeet Soirée", count: ceremonyCounts.sangeet, color: "border-purple-400/50 text-purple-300" },
            { key: "wedding", name: "Vedic Vivah", count: ceremonyCounts.wedding, color: "border-champagne-400 text-champagne-300" },
            { key: "reception", name: "Grand Reception", count: ceremonyCounts.reception, color: "border-rose-400/50 text-rose-300" },
          ].map((item) => (
            <div
              key={item.key}
              className={`rounded-sm border ${item.color} bg-walnut-950/70 p-4 text-center`}
            >
              <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-wider text-champagne-200/80">
                {item.name}
              </p>
              <p className="mt-2 font-display text-3xl font-medium text-ivory-50">
                {item.count}
              </p>
              <span className="font-sans text-[0.65rem] text-walnut-400">Guests</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent RSVPs Table Preview */}
      <div className="rounded-lg border border-champagne-400/25 bg-walnut-900/60 p-6">
        <div className="flex items-center justify-between border-b border-champagne-400/15 pb-4">
          <div>
            <h2 className="font-display text-2xl font-light text-ivory-50">
              Recent RSVP Submissions
            </h2>
            <p className="font-sans text-xs text-champagne-200/70 mt-0.5">
              Latest guest responses submitted from the public invitation.
            </p>
          </div>
          <Link
            href="/admin/rsvps"
            className="inline-flex items-center gap-1 font-sans text-xs font-semibold uppercase tracking-wider text-champagne-400 hover:text-champagne-200 transition-colors"
          >
            <span>View All ({totalRsvps})</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {rsvps.length === 0 ? (
          <div className="py-12 text-center text-walnut-400 font-body text-sm">
            No RSVPs received yet. Share the invitation link to begin collecting responses.
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left font-sans text-xs">
              <thead className="border-b border-champagne-400/15 text-champagne-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-3">Guest Name</th>
                  <th className="py-3 px-3">Contact</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Party Size</th>
                  <th className="py-3 px-3">Dietary</th>
                  <th className="py-3 px-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-champagne-400/10 text-ivory-100">
                {rsvps.slice(0, 5).map((r) => (
                  <tr key={String(r._id)} className="hover:bg-walnut-800/40">
                    <td className="py-3 px-3 font-medium text-ivory-50">{r.fullName}</td>
                    <td className="py-3 px-3 text-walnut-300">
                      <div>{r.email}</div>
                      <div className="text-[0.68rem] text-walnut-400">{r.phone}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider ${
                          r.attending
                            ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/30"
                            : "bg-rose-950/80 text-rose-300 border border-rose-500/30"
                        }`}
                      >
                        {r.attending ? "Attending" : "Declined"}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono">{r.attending ? r.guestCount : 0}</td>
                    <td className="py-3 px-3 text-walnut-300">{r.dietaryPreferences || "—"}</td>
                    <td className="py-3 px-3 text-walnut-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
