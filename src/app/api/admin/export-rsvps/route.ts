import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { getAllRSVPsForAdmin } from "@/lib/db-service";

function escapeCsvField(field: unknown): string {
  if (field === null || field === undefined) return '""';
  const str = String(field).replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET() {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const rsvps = await getAllRSVPsForAdmin();

  const headers = [
    "Full Name",
    "Email",
    "Phone",
    "Status",
    "Party Size",
    "Ceremonies Attending",
    "Dietary Preferences",
    "Personal Blessing",
    "Submission Date",
  ];

  const rows = rsvps.map((r: {
    fullName: string;
    email: string;
    phone: string;
    attending: boolean;
    guestCount: number;
    eventsAttending?: string[];
    dietaryPreferences?: string;
    message?: string;
    createdAt: string | Date;
  }) => [
    escapeCsvField(r.fullName),
    escapeCsvField(r.email),
    escapeCsvField(r.phone),
    escapeCsvField(r.attending ? "Confirmed" : "Declined"),
    escapeCsvField(r.attending ? r.guestCount : 0),
    escapeCsvField((r.eventsAttending || []).join("; ")),
    escapeCsvField(r.dietaryPreferences || ""),
    escapeCsvField(r.message || ""),
    escapeCsvField(new Date(r.createdAt).toISOString()),
  ]);

  const csvContent = [headers.join(","), ...rows.map((row: string[]) => row.join(","))].join("\r\n");

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="ananya_arjun_wedding_rsvps.csv"',
      "Cache-Control": "no-store",
    },
  });
}
