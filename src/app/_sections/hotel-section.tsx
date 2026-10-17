"use client";

import { useState } from "react";
import { Building2, MapPin, Phone, Navigation, Share2, Copy, Check } from "lucide-react";
import { AnimatedSection } from "@/components/wedding/animated-section";
import { SectionHeading } from "@/components/wedding/section-heading";
import { getPublishedHotels, shouldDisplayHotelSection, type HotelRecord } from "@/lib/hotel-utils";
import { generateHotelWhatsAppShare } from "@/lib/whatsapp-utils";

interface HotelSectionProps {
  hotels?: HotelRecord[];
}

export function HotelSection({ hotels }: HotelSectionProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!shouldDisplayHotelSection(hotels)) {
    return null;
  }

  const publishedHotels = getPublishedHotels(hotels);

  const copyBookingCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section
      id="accommodations"
      className="wedding-section relative overflow-hidden bg-ivory-100/70"
      aria-labelledby="hotel-heading"
    >
      <div className="wedding-container relative z-10">
        <AnimatedSection>
          <SectionHeading
            label="Guest Accommodations"
            title="Hospitality & Recommended Stays"
            subtitle="Curated partner hotels with exclusive wedding tariffs and complimentary logistics for our cherished guests."
          />
        </AnimatedSection>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {publishedHotels.map((hotel, index) => {
            const share = generateHotelWhatsAppShare({
              name: hotel.name,
              address: hotel.address,
              phone: hotel.phone,
              bookingCode: hotel.bookingCode,
              discountNote: hotel.discountNote,
              mapUrl: hotel.mapUrl,
              weddingName: "Ananya & Arjun's Royal Wedding",
            });

            return (
              <AnimatedSection key={hotel.id || index} delay={index * 0.1}>
                <div className="flex h-full flex-col justify-between rounded-sm border-2 border-champagne-300/40 bg-ivory-50 p-6 sm:p-7 shadow-sm transition-all duration-300 hover:border-champagne-400 hover:shadow-xl">
                  <div>
                    {/* Badge */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-champagne-400/40 bg-champagne-100/60 px-3 py-0.5 font-sans text-[0.62rem] font-semibold uppercase tracking-wider text-champagne-800">
                        <Building2 className="h-3 w-3 text-champagne-700" />
                        {hotel.priceRange || "Partner Hotel"}
                      </span>
                      {hotel.distanceToVenue && (
                        <span className="font-sans text-[0.65rem] text-walnut-400 font-medium">
                          {hotel.distanceToVenue}
                        </span>
                      )}
                    </div>

                    {/* Hotel Name */}
                    <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-walnut-900">
                      {hotel.name}
                    </h3>

                    {/* Address */}
                    <div className="mt-3 flex items-start gap-2 text-xs text-walnut-600">
                      <MapPin className="h-4 w-4 shrink-0 text-champagne-600 mt-0.5" />
                      <span>{hotel.address}</span>
                    </div>

                    {/* Contact Phone */}
                    {hotel.phone && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-walnut-600">
                        <Phone className="h-3.5 w-3.5 text-champagne-600" />
                        <span>{hotel.phone}</span>
                      </div>
                    )}

                    {/* Booking Code with Copy Button */}
                    {hotel.bookingCode && (
                      <div className="mt-4 rounded-sm border border-champagne-300/60 bg-champagne-50/80 p-3">
                        <div className="flex items-center justify-between">
                          <span className="font-sans text-[0.6rem] font-semibold uppercase tracking-wider text-champagne-800">
                            Wedding Tariff Code
                          </span>
                          <button
                            type="button"
                            onClick={() => copyBookingCode(hotel.bookingCode!)}
                            className="inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-wider text-champagne-700 hover:text-champagne-900 cursor-pointer"
                          >
                            {copiedCode === hotel.bookingCode ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-600" />
                                <span className="text-emerald-700">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="mt-1 font-mono text-xs font-bold tracking-wider text-walnut-900">
                          {hotel.bookingCode}
                        </p>
                        {hotel.discountNote && (
                          <p className="mt-1 font-body text-xs text-walnut-500 italic">
                            {hotel.discountNote}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action Links: Google Maps & WhatsApp Share */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-2.5 border-t border-champagne/20 pt-4">
                    {hotel.mapUrl && (
                      <a
                        href={hotel.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-sm border border-champagne-400/80 bg-ivory-50 px-3.5 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-champagne-800 transition-colors hover:bg-champagne-400 hover:text-walnut-950"
                      >
                        <Navigation className="h-3 w-3" />
                        Directions
                      </a>
                    )}
                    <a
                      href={share.shareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-sm border border-emerald-600/40 bg-emerald-50 px-3.5 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-emerald-800 transition-colors hover:bg-emerald-600 hover:text-white"
                      title="Share hotel booking details on WhatsApp"
                    >
                      <Share2 className="h-3 w-3" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
