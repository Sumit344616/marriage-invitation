"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  Heart,
  Send,
  Sparkles,
  Users,
  Mail,
  Phone,
  User,
  Check,
  ChevronDown,
  Utensils,
} from "lucide-react";
import { AnimatedSection } from "@/components/wedding/animated-section";
import { OrnamentalDivider } from "@/components/wedding/ornamental-divider";
import { submitRsvpAction, type RsvpResponse } from "@/actions/rsvp-actions";
import { cn } from "cn";
import type { WeddingEvent } from "@/types/wedding";

interface LuxurySelectOption {
  value: string | number;
  label: string;
}

interface LuxurySelectProps {
  id?: string;
  value: string | number;
  onChange: (value: string | number) => void;
  options: LuxurySelectOption[];
  icon?: React.ComponentType<{ className?: string }>;
  placeholder?: string;
}

function LuxurySelect({
  id,
  value,
  onChange,
  options,
  icon: Icon,
  placeholder = "Select an option",
}: LuxurySelectProps) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div ref={selectRef} className="relative w-full">
      <button
        type="button"
        id={id}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center justify-between rounded-sm border bg-walnut-900/80 px-3.5 py-3 text-left font-sans text-sm text-ivory-100 transition-all cursor-pointer",
          open
            ? "border-champagne-400 ring-1 ring-champagne-400 shadow-sm"
            : "border-champagne-400/30 hover:border-champagne-400/60"
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {Icon && <Icon className="h-4 w-4 shrink-0 text-champagne-400/70" />}
          <span className="truncate font-medium">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-champagne-400/70 transition-transform duration-200",
            open && "rotate-180 text-champagne-300"
          )}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-40 mt-1 max-h-60 overflow-y-auto rounded-sm border border-champagne-400/50 bg-walnut-950/98 p-1.5 shadow-[0_14px_40px_rgba(0,0,0,0.95)] backdrop-blur-xl"
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li
                key={String(opt.value)}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between rounded-xs px-3.5 py-2.5 font-sans text-xs sm:text-sm cursor-pointer transition-colors",
                  isSelected
                    ? "bg-champagne-400/25 text-champagne-200 font-semibold"
                    : "text-ivory-200/90 hover:bg-champagne-400/15 hover:text-champagne-100"
                )}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="h-4 w-4 text-champagne-400 shrink-0 ml-2" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const guestCountOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => ({
  value: num,
  label: `${num} ${num === 1 ? "Guest" : "Guests"}`,
}));

const dietaryOptions = [
  { value: "Vegetarian", label: "Traditional Vegetarian" },
  { value: "Jain Vegetarian", label: "Jain Pure Vegetarian (No root vegetables)" },
  { value: "Vegan", label: "Vegan" },
  { value: "No Restrictions", label: "No Restrictions" },
];

interface RsvpSectionProps {
  events: WeddingEvent[];
}

export function RsvpSection({ events }: RsvpSectionProps) {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState<RsvpResponse | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    attending: true,
    guestCount: 1,
    eventsAttending: events.map((e) => e.id),
    dietaryPreferences: "Vegetarian",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const toggleEvent = (eventId: string) => {
    setFormData((prev) => {
      const exists = prev.eventsAttending.includes(eventId);
      return {
        ...prev,
        eventsAttending: exists
          ? prev.eventsAttending.filter((id) => id !== eventId)
          : [...prev.eventsAttending, eventId],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    startTransition(async () => {
      const res = await submitRsvpAction({
        ...formData,
        guestCount: Number(formData.guestCount),
      });

      if (res.success) {
        setSubmitted(res);
      } else {
        if (res.fieldErrors) {
          setFieldErrors(res.fieldErrors);
        } else {
          setFieldErrors({ form: res.message });
        }
      }
    });
  };

  return (
    <section
      id="rsvp"
      className="wedding-section relative overflow-hidden bg-walnut-950 py-20 sm:py-28"
      aria-labelledby="rsvp-heading"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,110,0.12)_0%,rgba(38,31,26,0.98)_70%)]"
        aria-hidden="true"
      />

      <div className="wedding-container relative z-10 max-w-3xl">
        <AnimatedSection>
          <div className="text-center">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-champagne-400">
              Your Gracious Presence
            </span>
            <h2
              id="rsvp-heading"
              className="mt-2 font-display text-3xl font-light tracking-tight text-ivory-50 sm:text-4xl lg:text-5xl"
            >
              Confirm Your Attendance
            </h2>
            <OrnamentalDivider className="mx-auto mt-4 max-w-[200px]" variant="champagne" symbol="✦" />
            <p className="mx-auto mt-3 max-w-lg font-body text-xs text-champagne-200/80 sm:text-sm">
              Please let us know if you will be celebrating with us by 20th November 2026.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-12 rounded-lg border border-champagne-400/35 bg-gradient-to-b from-walnut-900/90 to-walnut-950 p-5 sm:p-10 shadow-2xl backdrop-blur-md">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-champagne-400 bg-champagne-400/20 text-champagne-300">
                  <CheckCircle2 className="h-8 w-8 stroke-[2.2]" />
                </div>
                <h3 className="mt-6 font-display text-2xl sm:text-3xl font-medium text-ivory-50">
                  RSVP Received
                </h3>
                <p className="mt-3 font-body text-sm text-champagne-200 leading-relaxed max-w-md mx-auto">
                  {submitted.message}
                </p>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => setSubmitted(null)}
                    className="rounded-full border border-champagne-400/40 bg-walnut-900 px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-champagne-200 transition-colors hover:bg-champagne-400 hover:text-walnut-950"
                  >
                    Edit Response
                  </button>
                </div>
              </motion.div>
            ) : (
              <form key="form" onSubmit={handleSubmit} className="space-y-6">
                {fieldErrors.form && (
                  <div className="rounded-md border border-rose-500/50 bg-rose-950/60 p-4 text-xs font-medium text-rose-200">
                    {fieldErrors.form}
                  </div>
                )}

                {/* Attendance Radio Selection */}
                <div>
                  <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 mb-3">
                    Will you be able to attend?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, attending: true }))}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-sm border p-3.5 text-center transition-all cursor-pointer",
                        formData.attending
                          ? "border-champagne-400 bg-champagne-400/20 text-ivory-50 ring-1 ring-champagne-400 shadow-sm"
                          : "border-champagne-400/20 bg-walnut-900/50 text-ivory-300/60 hover:bg-walnut-900"
                      )}
                    >
                      <Sparkles className="h-4 w-4 text-champagne-400" />
                      <span className="font-sans text-xs font-bold uppercase tracking-wider">
                        Joyfully Accept
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, attending: false }))}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-sm border p-3.5 text-center transition-all cursor-pointer",
                        !formData.attending
                          ? "border-rose-400 bg-rose-900/20 text-ivory-50 ring-1 ring-rose-400"
                          : "border-champagne-400/20 bg-walnut-900/50 text-ivory-300/60 hover:bg-walnut-900"
                      )}
                    >
                      <Heart className="h-4 w-4 text-rose-400" />
                      <span className="font-sans text-xs font-bold uppercase tracking-wider">
                        Regretfully Decline
                      </span>
                    </button>
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 mb-1.5">
                    Full Name <span className="text-champagne-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 h-4 w-4 text-champagne-400/60 pointer-events-none" />
                    <input
                      id="fullName"
                      type="text"
                      required
                      placeholder="e.g. Dr. Rajesh Kumar & Family"
                      value={formData.fullName}
                      onChange={(e) => setFormData((p) => ({ ...p, fullName: e.target.value }))}
                      className="w-full rounded-sm border border-champagne-400/30 bg-walnut-900/80 pl-10 pr-4 py-3 font-sans text-sm text-ivory-100 placeholder:text-walnut-400 focus:border-champagne-400 focus:outline-none focus:ring-1 focus:ring-champagne-400"
                    />
                  </div>
                  {fieldErrors.fullName && (
                    <p className="mt-1 font-sans text-xs text-rose-300">{fieldErrors.fullName}</p>
                  )}
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 mb-1.5">
                      Email Address <span className="text-champagne-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-champagne-400/60 pointer-events-none" />
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        className="w-full rounded-sm border border-champagne-400/30 bg-walnut-900/80 pl-10 pr-4 py-3 font-sans text-sm text-ivory-100 placeholder:text-walnut-400 focus:border-champagne-400 focus:outline-none focus:ring-1 focus:ring-champagne-400"
                      />
                    </div>
                    {fieldErrors.email && (
                      <p className="mt-1 font-sans text-xs text-rose-300">{fieldErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 mb-1.5">
                      WhatsApp / Mobile <span className="text-champagne-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-champagne-400/60 pointer-events-none" />
                      <input
                        id="phone"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                        className="w-full rounded-sm border border-champagne-400/30 bg-walnut-900/80 pl-10 pr-4 py-3 font-sans text-sm text-ivory-100 placeholder:text-walnut-400 focus:border-champagne-400 focus:outline-none focus:ring-1 focus:ring-champagne-400"
                      />
                    </div>
                    {fieldErrors.phone && (
                      <p className="mt-1 font-sans text-xs text-rose-300">{fieldErrors.phone}</p>
                    )}
                  </div>
                </div>

                {formData.attending && (
                  <>
                    {/* Guest Count */}
                    <div>
                      <label htmlFor="guestCount" className="block font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 mb-1.5">
                        Number of Attendees
                      </label>
                      <LuxurySelect
                        id="guestCount"
                        value={formData.guestCount}
                        onChange={(val) => setFormData((p) => ({ ...p, guestCount: Number(val) }))}
                        options={guestCountOptions}
                        icon={Users}
                      />
                    </div>

                    {/* Ceremonies Attending */}
                    <div>
                      <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 mb-2">
                        Which celebrations will you attend?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {events.map((evt) => {
                          const isChecked = formData.eventsAttending.includes(evt.id);
                          return (
                            <label
                              key={evt.id}
                              className={cn(
                                "group flex items-center gap-3.5 rounded-sm border p-3.5 cursor-pointer transition-all duration-200 select-none",
                                isChecked
                                  ? "border-champagne-400 bg-champagne-400/20 text-ivory-50 shadow-[0_0_12px_rgba(212,175,110,0.15)] ring-1 ring-champagne-400/40"
                                  : "border-champagne-400/20 bg-walnut-900/50 text-ivory-300/70 hover:border-champagne-400/50 hover:bg-walnut-900/80"
                              )}
                            >
                              <div
                                className={cn(
                                  "flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-xs border transition-all duration-200",
                                  isChecked
                                    ? "border-champagne-400 bg-gradient-to-br from-champagne-400 to-champagne-600 text-walnut-950 shadow-[0_0_8px_rgba(212,175,110,0.4)]"
                                    : "border-champagne-400/40 bg-walnut-950/90 group-hover:border-champagne-400"
                                )}
                              >
                                {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                              </div>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleEvent(evt.id)}
                                className="sr-only"
                              />
                              <span className="font-sans text-xs font-medium tracking-wide leading-snug">{evt.name}</span>
                            </label>
                          );
                        })}
                      </div>
                      {fieldErrors.eventsAttending && (
                        <p className="mt-1 font-sans text-xs text-rose-300">{fieldErrors.eventsAttending}</p>
                      )}
                    </div>

                    {/* Dietary Preference */}
                    <div>
                      <label htmlFor="dietary" className="block font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 mb-1.5">
                        Dietary Preference
                      </label>
                      <LuxurySelect
                        id="dietary"
                        value={formData.dietaryPreferences}
                        onChange={(val) => setFormData((p) => ({ ...p, dietaryPreferences: String(val) }))}
                        options={dietaryOptions}
                        icon={Utensils}
                      />
                    </div>
                  </>
                )}

                {/* Personal Message / Blessing */}
                <div>
                  <label htmlFor="message" className="block font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 mb-1.5">
                    Warm Wishes &amp; Blessings to the Couple
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Share your heartfelt blessings or special notes..."
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    className="w-full rounded-sm border border-champagne-400/30 bg-walnut-900/80 px-4 py-3 font-sans text-sm text-ivory-100 placeholder:text-walnut-400 focus:border-champagne-400 focus:outline-none focus:ring-1 focus:ring-champagne-400"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full border-2 border-champagne-300 bg-gradient-to-r from-champagne-500 via-champagne-400 to-champagne-500 px-10 py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-walnut-950 shadow-xl transition-all duration-300 hover:brightness-105 disabled:opacity-50 cursor-pointer"
                  >
                    {isPending ? (
                      <>
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-walnut-950 border-t-transparent" />
                        <span>Sending RSVP...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Confirm RSVP · सादर आमंत्रण</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
