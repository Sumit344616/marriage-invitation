"use client";

import { useState, useTransition } from "react";
import {
  Plus,
  Trash2,
  Share2,
  Eye,
  EyeOff,
  Phone,
  X,
  Send,
} from "lucide-react";
import {
  createHotelAction,
  toggleHotelPublishAction,
  deleteHotelAction,
} from "@/actions/admin-actions";
import { generateHotelWhatsAppShare } from "@/lib/whatsapp-utils";
export interface AdminHotelItem {
  _id: string;
  name: string;
  address: string;
  city: string;
  phone?: string;
  websiteUrl?: string;
  mapUrl?: string;
  bookingCode?: string;
  discountNote?: string;
  distanceToVenue?: string;
  priceRange?: string;
  isPublished: boolean;
  order: number;
}

interface HotelManagerProps {
  initialHotels: AdminHotelItem[];
}

export function HotelManager({ initialHotels }: HotelManagerProps) {
  const [hotels, setHotels] = useState<AdminHotelItem[]>(initialHotels);
  const [showAddModal, setShowAddModal] = useState(false);
  const [previewHotel, setPreviewHotel] = useState<AdminHotelItem | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "Jaipur, Rajasthan",
    phone: "",
    websiteUrl: "",
    mapUrl: "",
    bookingCode: "",
    discountNote: "",
    priceRange: "5-Star Luxury",
    isPublished: true,
    order: 0,
  });

  const handleTogglePublish = (id: string) => {
    startTransition(async () => {
      await toggleHotelPublishAction(id);
      setHotels((prev) =>
        prev.map((h) => (String(h._id) === id ? { ...h, isPublished: !h.isPublished } : h))
      );
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this hotel accommodation?")) return;

    startTransition(async () => {
      await deleteHotelAction(id);
      setHotels((prev) => prev.filter((h) => String(h._id) !== id));
      if (previewHotel && String(previewHotel._id) === id) {
        setPreviewHotel(null);
      }
    });
  };

  const handleCreateHotel = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const res = await createHotelAction(formData);
      if (res?.success) {
        setShowAddModal(false);
        setFormData({
          name: "",
          address: "",
          city: "Jaipur, Rajasthan",
          phone: "",
          websiteUrl: "",
          mapUrl: "",
          bookingCode: "",
          discountNote: "",
          priceRange: "5-Star Luxury",
          isPublished: true,
          order: 0,
        });
        window.location.reload();
      } else {
        setError(res?.error || "Failed to create hotel");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-champagne-400/20 pb-5">
        <div>
          <h1 className="font-display text-3xl font-light text-ivory-50">
            Partner Hotel Accommodations
          </h1>
          <p className="font-body text-xs sm:text-sm text-champagne-200/70 mt-1">
            Manage recommended guest accommodations, wedding tariff codes, and WhatsApp sharing messages.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 rounded-sm border border-champagne-400 bg-gradient-to-r from-champagne-500 via-champagne-400 to-champagne-500 px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-walnut-950 shadow-md hover:brightness-105 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Hotel</span>
        </button>
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => {
          return (
            <div
              key={String(hotel._id)}
              className="flex flex-col justify-between rounded-lg border border-champagne-400/30 bg-walnut-900/80 p-6 shadow-md transition-all hover:border-champagne-400"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider ${
                      hotel.isPublished
                        ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                        : "bg-walnut-950 text-walnut-400 border border-walnut-700"
                    }`}
                  >
                    {hotel.isPublished ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    <span>{hotel.isPublished ? "Published (Live)" : "Draft (Hidden)"}</span>
                  </span>

                  <span className="font-mono text-xs text-champagne-400/80">
                    Order: {hotel.order}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-2xl font-light text-ivory-50">
                  {hotel.name}
                </h3>
                <p className="mt-1 font-sans text-xs text-champagne-300/80">{hotel.address}</p>

                {hotel.phone && (
                  <p className="mt-2 flex items-center gap-1.5 font-sans text-xs text-walnut-300">
                    <Phone className="h-3.5 w-3.5 text-champagne-400" />
                    <span>{hotel.phone}</span>
                  </p>
                )}

                {hotel.bookingCode && (
                  <div className="mt-4 rounded-sm border border-champagne-400/25 bg-walnut-950/80 p-3">
                    <span className="font-sans text-[0.6rem] font-semibold uppercase tracking-wider text-champagne-400">
                      Booking Tariff Code
                    </span>
                    <p className="font-mono text-sm font-bold text-ivory-50 mt-0.5">
                      {hotel.bookingCode}
                    </p>
                    {hotel.discountNote && (
                      <p className="font-body text-xs text-champagne-200/70 mt-1">
                        {hotel.discountNote}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="mt-6 border-t border-champagne-400/15 pt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleTogglePublish(String(hotel._id))}
                    disabled={isPending}
                    className="flex-1 rounded-sm border border-champagne-400/40 bg-walnut-950 py-1.5 font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-champagne-200 hover:bg-champagne-400 hover:text-walnut-950 transition-colors"
                  >
                    {hotel.isPublished ? "Unpublish" : "Publish to Site"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreviewHotel(hotel)}
                    className="rounded-sm border border-emerald-500/40 bg-emerald-950/40 p-1.5 text-emerald-300 hover:bg-emerald-500 hover:text-white transition-colors"
                    title="Preview WhatsApp Message"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(String(hotel._id))}
                    disabled={isPending}
                    className="rounded-sm border border-rose-500/40 bg-rose-950/40 p-1.5 text-rose-300 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                    title="Delete Hotel"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* WhatsApp Message Preview Modal */}
      {previewHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-walnut-950/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-lg border border-champagne-400/40 bg-walnut-900 p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setPreviewHotel(null)}
              className="absolute right-4 top-4 text-champagne-400 hover:text-champagne-200"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] text-champagne-400">
              WhatsApp Guest Message Preview
            </span>
            <h3 className="mt-1 font-display text-2xl font-light text-ivory-50">
              {previewHotel.name}
            </h3>

            <div className="mt-4 rounded-md border border-emerald-500/30 bg-walnut-950 p-4 font-mono text-xs text-emerald-200 whitespace-pre-wrap max-h-80 overflow-y-auto">
              {
                generateHotelWhatsAppShare({
                  name: previewHotel.name,
                  address: previewHotel.address,
                  phone: previewHotel.phone,
                  bookingCode: previewHotel.bookingCode,
                  discountNote: previewHotel.discountNote,
                  mapUrl: previewHotel.mapUrl,
                  weddingName: "Ananya & Arjun's Royal Wedding",
                }).message
              }
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <a
                href={
                  generateHotelWhatsAppShare({
                    name: previewHotel.name,
                    address: previewHotel.address,
                    phone: previewHotel.phone,
                    bookingCode: previewHotel.bookingCode,
                    discountNote: previewHotel.discountNote,
                    mapUrl: previewHotel.mapUrl,
                    weddingName: "Ananya & Arjun's Royal Wedding",
                  }).shareUrl
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500 bg-emerald-600 px-5 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-emerald-500"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Test WhatsApp Link</span>
              </a>

              <button
                type="button"
                onClick={() => setPreviewHotel(null)}
                className="rounded-full border border-champagne-400/40 bg-walnut-950 px-5 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 hover:bg-champagne-400 hover:text-walnut-950"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Hotel Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-walnut-950/80 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-lg border border-champagne-400/40 bg-walnut-900 p-6 sm:p-8 shadow-2xl my-8">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 text-champagne-400 hover:text-champagne-200"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] text-champagne-400">
              New Accommodation
            </span>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-light text-ivory-50">
              Add Partner Hotel
            </h2>

            {error && (
              <div className="mt-4 rounded-sm border border-rose-500/50 bg-rose-950/60 p-3 text-xs text-rose-200">
                {error}
              </div>
            )}

            <form onSubmit={handleCreateHotel} className="mt-6 space-y-4">
              <div>
                <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 mb-1">
                  Hotel Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rambagh Palace"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  className="w-full rounded-sm border border-champagne-400/30 bg-walnut-950/80 px-4 py-2.5 font-sans text-xs text-ivory-100 focus:border-champagne-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 mb-1">
                  Full Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bhawani Singh Road, Jaipur, Rajasthan 302005"
                  value={formData.address}
                  onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))}
                  className="w-full rounded-sm border border-champagne-400/30 bg-walnut-950/80 px-4 py-2.5 font-sans text-xs text-ivory-100 focus:border-champagne-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 mb-1">
                    Front Desk Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 141 238 5700"
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full rounded-sm border border-champagne-400/30 bg-walnut-950/80 px-4 py-2.5 font-sans text-xs text-ivory-100 focus:border-champagne-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 mb-1">
                    Booking Tariff Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. VIVAH2026"
                    value={formData.bookingCode}
                    onChange={(e) => setFormData((p) => ({ ...p, bookingCode: e.target.value.toUpperCase() }))}
                    className="w-full rounded-sm border border-champagne-400/30 bg-walnut-950/80 px-4 py-2.5 font-sans text-xs text-ivory-100 focus:border-champagne-400 focus:outline-none uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 mb-1">
                  Discount Offer / Hospitality Note
                </label>
                <input
                  type="text"
                  placeholder="e.g. 25% off wedding rate • Complimentary shuttle"
                  value={formData.discountNote}
                  onChange={(e) => setFormData((p) => ({ ...p, discountNote: e.target.value }))}
                  className="w-full rounded-sm border border-champagne-400/30 bg-walnut-950/80 px-4 py-2.5 font-sans text-xs text-ivory-100 focus:border-champagne-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 mb-1">
                    Google Maps URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://maps.google.com/?q=..."
                    value={formData.mapUrl}
                    onChange={(e) => setFormData((p) => ({ ...p, mapUrl: e.target.value }))}
                    className="w-full rounded-sm border border-champagne-400/30 bg-walnut-950/80 px-4 py-2.5 font-sans text-xs text-ivory-100 focus:border-champagne-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.order}
                    onChange={(e) => setFormData((p) => ({ ...p, order: Number(e.target.value) }))}
                    className="w-full rounded-sm border border-champagne-400/30 bg-walnut-950/80 px-4 py-2.5 font-sans text-xs text-ivory-100 focus:border-champagne-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData((p) => ({ ...p, isPublished: e.target.checked }))}
                  className="h-4 w-4 rounded-xs border-champagne-400 text-champagne-500"
                />
                <label htmlFor="isPublished" className="font-sans text-xs text-champagne-300 cursor-pointer">
                  Publish immediately to public invitation
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-champagne-400/15">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-full border border-champagne-400/30 px-5 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-champagne-300 hover:bg-walnut-950"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-full border border-champagne-400 bg-gradient-to-r from-champagne-500 via-champagne-400 to-champagne-500 px-6 py-2 font-sans text-xs font-bold uppercase tracking-wider text-walnut-950 hover:brightness-105 disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save Hotel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
