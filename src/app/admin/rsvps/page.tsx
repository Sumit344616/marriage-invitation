import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/auth";
import { getAllRSVPsForAdmin } from "@/lib/db-service";
import { RsvpManager } from "./rsvp-manager";

export default async function AdminRsvpsPage() {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    redirect("/admin/login");
  }

  const rsvps = await getAllRSVPsForAdmin();

  return <RsvpManager initialRsvps={rsvps} />;
}
