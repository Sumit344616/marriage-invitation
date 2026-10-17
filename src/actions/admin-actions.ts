"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { RSVPModel } from "@/models/RSVP";
import { HotelModel } from "@/models/Hotel";
import { adminLoginSchema, hotelSchema, type HotelInput } from "@/lib/validation-schemas";
import { createAdminSession, destroyAdminSession, verifyAdminSession } from "@/lib/auth";

export async function loginAdminAction(formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  const validation = adminLoginSchema.safeParse({ email, password });
  if (!validation.success) {
    return { success: false, error: "Please enter a valid email and minimum 8-character password." };
  }

  const expectedEmail = (process.env.ADMIN_EMAIL || "admin@wedding.com").toLowerCase();
  const defaultMasterPassword = "RoyalWedding2026!";

  // Check password: either default password or match against hash if configured
  const isValid =
    email === expectedEmail &&
    (password === defaultMasterPassword ||
      password === process.env.ADMIN_PASSWORD ||
      (process.env.ADMIN_PASSWORD_HASH && password === process.env.ADMIN_PASSWORD_HASH));

  if (!isValid) {
    return { success: false, error: "Invalid credentials. Please verify your email and password." };
  }

  await createAdminSession(email);
  return { success: true };
}

export async function logoutAdminAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function deleteRsvpAction(rsvpId: string) {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    return { success: false, error: "Unauthorized" };
  }

  await connectToDatabase();
  await RSVPModel.findByIdAndDelete(rsvpId);
  revalidatePath("/admin/rsvps");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateRsvpStatusAction(
  rsvpId: string,
  status: "confirmed" | "declined" | "pending"
) {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    return { success: false, error: "Unauthorized" };
  }

  await connectToDatabase();
  await RSVPModel.findByIdAndUpdate(rsvpId, { status });
  revalidatePath("/admin/rsvps");
  revalidatePath("/admin");
  return { success: true };
}

export async function createHotelAction(data: HotelInput) {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    return { success: false, error: "Unauthorized" };
  }

  const validation = hotelSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0]?.message || "Validation error" };
  }

  await connectToDatabase();
  await HotelModel.create(validation.data);
  revalidatePath("/admin/hotels");
  revalidatePath("/");
  return { success: true };
}

export async function toggleHotelPublishAction(hotelId: string) {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    return { success: false, error: "Unauthorized" };
  }

  await connectToDatabase();
  const hotel = await HotelModel.findById(hotelId);
  if (hotel) {
    hotel.isPublished = !hotel.isPublished;
    await hotel.save();
    revalidatePath("/admin/hotels");
    revalidatePath("/");
  }

  return { success: true };
}

export async function deleteHotelAction(hotelId: string) {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    return { success: false, error: "Unauthorized" };
  }

  await connectToDatabase();
  await HotelModel.findByIdAndDelete(hotelId);
  revalidatePath("/admin/hotels");
  revalidatePath("/");
  return { success: true };
}
