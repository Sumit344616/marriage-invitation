import { NextResponse, type NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { RSVPModel } from "@/models/RSVP";
import { rsvpSubmissionSchema } from "@/lib/validation-schemas";
import { checkRateLimit } from "@/lib/rate-limiter";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const limit = checkRateLimit(ip, 6, 60 * 60 * 1000);

    if (!limit.allowed) {
      return NextResponse.json(
        { success: false, error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validation = rsvpSubmissionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          issues: validation.error.issues,
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const data = validation.data;
    const existing = await RSVPModel.findOne({ email: data.email }).exec();

    if (existing) {
      Object.assign(existing, data, {
        status: data.attending ? "confirmed" : "declined",
        ipAddress: ip,
      });
      await existing.save();
      return NextResponse.json({
        success: true,
        message: "RSVP updated successfully",
        data: existing,
      });
    }

    const created = await RSVPModel.create({
      ...data,
      status: data.attending ? "confirmed" : "declined",
      ipAddress: ip,
    });

    return NextResponse.json(
      { success: true, message: "RSVP submitted successfully", data: created },
      { status: 201 }
    );
  } catch (error) {
    console.error("API RSVP error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
