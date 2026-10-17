import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/auth";
import { getAllHotelsForAdmin } from "@/lib/db-service";
import { HotelManager } from "./hotel-manager";

export default async function AdminHotelsPage() {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    redirect("/admin/login");
  }

  const hotels = await getAllHotelsForAdmin();

  return <HotelManager initialHotels={hotels} />;
}
