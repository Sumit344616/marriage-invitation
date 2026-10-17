"use server";

import { headers } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import { RSVPModel } from "@/models/RSVP";
import { rsvpSubmissionSchema, type RsvpSubmissionInput } from "@/lib/validation-schemas";
import { checkRateLimit } from "@/lib/rate-limiter";

export interface RsvpResponse {
  success: boolean;
  message: string;
  error?: string;
  fieldErrors?: Record<string, string>;
  isUpdated?: boolean;
}

export async function submitRsvpAction(data: RsvpSubmissionInput): Promise<RsvpResponse> {
  try {
    // 1. Validate submission input with Zod
    const validation = rsvpSubmissionSchema.safeParse(data);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        if (fieldName && !fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });
      return {
        success: false,
        message: "Please correct the highlighted errors.",
        fieldErrors,
      };
    }

    const validData = validation.data;

    // 2. Enforce IP Rate Limiting
    const reqHeaders = await headers();
    const forwarded = reqHeaders.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : reqHeaders.get("x-real-ip") || "127.0.0.1";

    const rateLimit = checkRateLimit(ip, 6, 60 * 60 * 1000);
    if (!rateLimit.allowed) {
      return {
        success: false,
        message: `Too many submissions from this connection. Please try again in ${rateLimit.resetInMinutes} minutes.`,
      };
    }

    // 3. Connect to MongoDB Atlas
    await connectToDatabase();

    // 4. Duplicate Check by Email
    const existing = await RSVPModel.findOne({ email: validData.email }).exec();

    if (existing) {
      existing.fullName = validData.fullName;
      existing.phone = validData.phone;
      existing.attending = validData.attending;
      existing.guestCount = validData.guestCount;
      existing.eventsAttending = validData.eventsAttending;
      existing.dietaryPreferences = validData.dietaryPreferences || "";
      existing.message = validData.message || "";
      existing.status = validData.attending ? "confirmed" : "declined";
      existing.ipAddress = ip;
      await existing.save();

      return {
        success: true,
        isUpdated: true,
        message: validData.attending
          ? `Thank you, ${validData.fullName}! Your RSVP attendance has been updated. We can't wait to celebrate together!`
          : `Thank you, ${validData.fullName}! We have recorded that you won't be able to make it. You will be missed!`,
      };
    }

    // 5. Create new RSVP record
    await RSVPModel.create({
      fullName: validData.fullName,
      email: validData.email,
      phone: validData.phone,
      attending: validData.attending,
      guestCount: validData.guestCount,
      eventsAttending: validData.eventsAttending,
      dietaryPreferences: validData.dietaryPreferences || "",
      message: validData.message || "",
      status: validData.attending ? "confirmed" : "declined",
      ipAddress: ip,
    });

    return {
      success: true,
      isUpdated: false,
      message: validData.attending
        ? `Namaste ${validData.fullName}! Your RSVP has been confirmed for the wedding celebrations.`
        : `Thank you, ${validData.fullName}. We have received your response.`,
    };
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    return {
      success: false,
      message: "An unexpected error occurred while processing your RSVP. Please try again.",
    };
  }
}
