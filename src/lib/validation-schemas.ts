import { z } from "zod";

/**
 * RSVP Submission Validation Schema
 * Enforces server-side validation against spam, malformed emails, and invalid guest counts.
 */
export const rsvpSubmissionSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Full name must be at least 2 characters." })
    .max(100, { message: "Full name cannot exceed 100 characters." }),
  
  email: z
    .string()
    .trim()
    .email({ message: "Please provide a valid email address." })
    .toLowerCase(),

  phone: z
    .string()
    .trim()
    .min(7, { message: "Phone number must have at least 7 digits." })
    .max(20, { message: "Phone number is too long." })
    .regex(/^[+0-9\s\-()]+$/, { message: "Phone number contains invalid characters." }),

  attending: z.boolean({
    message: "Please confirm your attendance status.",
  }),

  guestCount: z.coerce
    .number()
    .int()
    .min(1, { message: "Guest count must be at least 1." })
    .max(10, { message: "For parties larger than 10, please contact the couple directly." })
    .default(1),

  eventsAttending: z
    .array(z.string().trim().min(1))
    .min(1, { message: "Please select at least one ceremony to attend." }),

  dietaryPreferences: z
    .string()
    .trim()
    .max(200, { message: "Dietary preferences cannot exceed 200 characters." })
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .trim()
    .max(500, { message: "Personal message cannot exceed 500 characters." })
    .optional()
    .or(z.literal("")),
});

export type RsvpSubmissionInput = z.infer<typeof rsvpSubmissionSchema>;

/**
 * Hotel Validation Schema for Admin CRUD
 */
export const hotelSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Hotel name must be at least 2 characters." })
    .max(120, { message: "Hotel name cannot exceed 120 characters." }),

  address: z
    .string()
    .trim()
    .min(5, { message: "Address must be at least 5 characters." })
    .max(300, { message: "Address cannot exceed 300 characters." }),

  city: z
    .string()
    .trim()
    .min(2, { message: "City must be at least 2 characters." })
    .max(100, { message: "City cannot exceed 100 characters." }),

  phone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .or(z.literal("")),

  websiteUrl: z
    .string()
    .trim()
    .url({ message: "Website must be a valid URL." })
    .optional()
    .or(z.literal("")),

  mapUrl: z
    .string()
    .trim()
    .url({ message: "Google Maps link must be a valid URL." })
    .optional()
    .or(z.literal("")),

  bookingCode: z
    .string()
    .trim()
    .max(50)
    .optional()
    .or(z.literal("")),

  discountNote: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal("")),

  isPublished: z.boolean().default(false),
  order: z.coerce.number().int().default(0),
});

export type HotelInput = z.infer<typeof hotelSchema>;

/**
 * Admin Login Validation Schema
 */
export const adminLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please provide a valid email address." })
    .toLowerCase(),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
