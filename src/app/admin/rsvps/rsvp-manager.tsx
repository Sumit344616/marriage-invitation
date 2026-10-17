"use client";

import { useState, useTransition } from "react";
import {
  Search,
  Download,
  Trash2,
  CheckCircle2,
  XCircle,
  Filter,
  MessageSquare,
  Eye,
  X,
} from "lucide-react";
import { deleteRsvpAction, updateRsvpStatusAction } from "@/actions/admin-actions";

export interface AdminRsvpItem {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  attending: boolean;
  guestCount: number;
  eventsAttending: string[];
  dietaryPreferences?: string;
  message?: string;
  status: "confirmed" | "declined" | "pending";
  createdAt: string | Date;
}

interface RsvpManagerProps {
  initialRsvps: AdminRsvpItem[];
}

export function RsvpManager({ initialRsvps }: RsvpManagerProps) {
  const [rsvps, setRsvps] = useState<AdminRsvpItem[]>(initialRsvps);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "confirmed" | "declined">("all");
  const [selectedRsvp, setSelectedRsvp] = useState<AdminRsvpItem | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = rsvps.filter((r) => {
    const matchesSearch =
      r.fullName.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "confirmed" && r.attending) ||
      (statusFilter === "declined" && !r.attending);

    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this RSVP record?")) return;

    startTransition(async () => {
      const res = await deleteRsvpAction(id);
      if (res?.success) {
        setRsvps((prev) => prev.filter((r) => String(r._id) !== id));
        if (selectedRsvp && String(selectedRsvp._id) === id) {
          setSelectedRsvp(null);
        }
      }
    });
  };

  const handleToggleStatus = (rsvp: AdminRsvpItem) => {
    const newStatus = rsvp.attending ? "declined" : "confirmed";
    startTransition(async () => {
      const res = await updateRsvpStatusAction(String(rsvp._id), newStatus);
      if (res?.success) {
        setRsvps((prev) =>
          prev.map((r) =>
            String(r._id) === String(rsvp._id)
              ? ({ ...r, attending: !r.attending, status: newStatus } as AdminRsvpItem)
              : r
          )
        );
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-champagne-400/20 pb-5">
        <div>
          <h1 className="font-display text-3xl font-light text-ivory-50">
            Guest RSVP Directory
          </h1>
          <p className="font-body text-xs sm:text-sm text-champagne-200/70 mt-1">
            Manage attendance confirmations, party counts, and special hospitality requests.
          </p>
        </div>

        <a
          href="/api/admin/export-rsvps"
          download="wedding_rsvps.csv"
          className="inline-flex items-center gap-2 rounded-sm border border-champagne-400 bg-gradient-to-r from-champagne-500 via-champagne-400 to-champagne-500 px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-walnut-950 shadow-md hover:brightness-105 transition-all"
        >
          <Download className="h-4 w-4" />
          <span>Export CSV Spreadsheet</span>
        </a>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-walnut-900/60 p-4 rounded-lg border border-champagne-400/20">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-champagne-400/60 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by guest name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-sm border border-champagne-400/30 bg-walnut-950/80 pl-10 pr-4 py-2.5 font-sans text-xs text-ivory-100 placeholder:text-walnut-500 focus:border-champagne-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <Filter className="h-3.5 w-3.5 text-champagne-400 shrink-0" />
          <span className="font-sans text-[0.68rem] uppercase tracking-wider text-walnut-400 shrink-0">
            Status:
          </span>
          {(["all", "confirmed", "declined"] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setStatusFilter(filter)}
              className={`rounded-full px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                statusFilter === filter
                  ? "bg-champagne-400 text-walnut-950 font-bold"
                  : "bg-walnut-950 text-champagne-300/70 border border-champagne-400/20 hover:border-champagne-400"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-lg border border-champagne-400/25 bg-walnut-900/80 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead className="border-b border-champagne-400/20 bg-walnut-950/80 text-champagne-400 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Guest</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Guests</th>
                <th className="py-3.5 px-4">Ceremonies</th>
                <th className="py-3.5 px-4">Dietary</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-champagne-400/10 text-ivory-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-walnut-400 font-body">
                    No matching RSVP records found.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={String(r._id)} className="hover:bg-walnut-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-ivory-50">
                      <div>{r.fullName}</div>
                      {r.message && (
                        <div className="flex items-center gap-1 text-[0.68rem] text-champagne-300/80 italic mt-0.5 line-clamp-1">
                          <MessageSquare className="h-3 w-3 shrink-0" />
                          &ldquo;{r.message}&rdquo;
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-walnut-300">
                      <div>{r.email}</div>
                      <div className="text-[0.68rem] text-walnut-400 font-mono">{r.phone}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(r)}
                        title="Click to toggle status"
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider cursor-pointer ${
                          r.attending
                            ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900"
                            : "bg-rose-950/80 text-rose-300 border border-rose-500/40 hover:bg-rose-900"
                        }`}
                      >
                        {r.attending ? (
                          <>
                            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                            <span>Attending</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3 w-3 text-rose-400" />
                            <span>Declined</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-ivory-50">
                      {r.attending ? r.guestCount : 0}
                    </td>
                    <td className="py-3.5 px-4 text-walnut-300">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {(r.eventsAttending || []).map((evt) => (
                          <span
                            key={evt}
                            className="rounded-xs bg-walnut-950 px-1.5 py-0.5 text-[0.62rem] text-champagne-300 uppercase tracking-wider"
                          >
                            {evt}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-walnut-300">
                      {r.dietaryPreferences || "—"}
                    </td>
                    <td className="py-3.5 px-4 text-walnut-400 text-[0.68rem]">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedRsvp(r)}
                          className="p-1 text-champagne-400 hover:text-champagne-200 transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => handleDelete(String(r._id))}
                          className="p-1 text-rose-400/80 hover:text-rose-300 transition-colors cursor-pointer"
                          title="Delete RSVP"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Inspector for Details */}
      {selectedRsvp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-walnut-950/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-lg border border-champagne-400/40 bg-walnut-900 p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedRsvp(null)}
              className="absolute right-4 top-4 text-champagne-400 hover:text-champagne-200"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] text-champagne-400">
              RSVP Details
            </span>
            <h3 className="mt-1 font-display text-2xl font-light text-ivory-50">
              {selectedRsvp.fullName}
            </h3>

            <div className="mt-4 space-y-3 font-sans text-xs border-t border-champagne-400/15 pt-4 text-walnut-300">
              <div>
                <span className="font-semibold text-champagne-300 uppercase tracking-wider text-[0.65rem] block">
                  Email &amp; Phone:
                </span>
                <p className="text-ivory-100 mt-0.5">{selectedRsvp.email} • {selectedRsvp.phone}</p>
              </div>

              <div>
                <span className="font-semibold text-champagne-300 uppercase tracking-wider text-[0.65rem] block">
                  Attendance Status:
                </span>
                <p className="text-ivory-100 mt-0.5">
                  {selectedRsvp.attending
                    ? `Attending with ${selectedRsvp.guestCount} Guest(s)`
                    : "Declined"}
                </p>
              </div>

              <div>
                <span className="font-semibold text-champagne-300 uppercase tracking-wider text-[0.65rem] block">
                  Ceremonies Selected:
                </span>
                <p className="text-ivory-100 mt-0.5">
                  {(selectedRsvp.eventsAttending || []).join(", ") || "None"}
                </p>
              </div>

              <div>
                <span className="font-semibold text-champagne-300 uppercase tracking-wider text-[0.65rem] block">
                  Dietary Preferences:
                </span>
                <p className="text-ivory-100 mt-0.5">{selectedRsvp.dietaryPreferences || "None"}</p>
              </div>

              {selectedRsvp.message && (
                <div>
                  <span className="font-semibold text-champagne-300 uppercase tracking-wider text-[0.65rem] block">
                    Personal Blessing:
                  </span>
                  <p className="text-ivory-100 mt-0.5 italic font-body">
                    &ldquo;{selectedRsvp.message}&rdquo;
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedRsvp(null)}
                className="rounded-full border border-champagne-400/40 bg-walnut-950 px-5 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 hover:bg-champagne-400 hover:text-walnut-950"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
