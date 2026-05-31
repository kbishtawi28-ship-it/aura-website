"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import type { CSSProperties } from "react";

const LAUNCH_OFFER_LIMIT = 10;
const OFFER_PRICE = 15;
const REGULAR_PRICE = 20;

const PAGE_BG = "#0b0b0b";
const YELLOW = "#FFCC00";

// رابط الـ Web App السكربت الخاص بجوجل شيتس الجديد تبعك
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxd0g-xu6RWSTrspepetI4prLsIciSgAX0MK6aJUYlRamx7QVuHye97D3dM_Wg60CH5XQ/exec";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

function Bottle({
  variant,
  style,
}: {
  variant: "white" | "black";
  style?: CSSProperties;
}) {
  return (
    <div
      role="img"
      aria-label={
        variant === "white" ? "AURA Arctic White" : "AURA Premium Black"
      }
      style={{
        aspectRatio: "390/842",
        backgroundImage: "url('/bottles-nobg.png')",
        backgroundSize: "200% 100%",
        backgroundPosition: variant === "white" ? "left center" : "right center",
        backgroundRepeat: "no-repeat",
        ...style,
      }}
    />
  );
}

export default function CheckoutPage() {
  const [selectedColor, setSelectedColor] = useState<"white" | "black">("black");
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const spotsUsed = 0;
  const offerActive = spotsUsed < LAUNCH_OFFER_LIMIT;
  const unitPrice = offerActive ? OFFER_PRICE : REGULAR_PRICE;
  const totalPrice = unitPrice * quantity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // إرسال البيانات المباشرة للـ Google Sheet
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          phone: formData.phone,
          city: formData.city,
          address: formData.address,
          product: `مطرة AURA الذكية - 1.2 لتر (${selectedColor === "black" ? "Premium Black" : "Arctic White"})`,
          quantity: quantity,
          totalPrice: `${totalPrice} JOD`,
          notes: formData.notes
        }),
      });

      setIsSubmitted(true);
    } catch (error) {
      alert("حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div style={{ background: PAGE_BG, color: "#fff", minHeight: "100vh" }}>
        <div className="max-w-2xl mx-auto px-5 py-20 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
            style={{ background: YELLOW }}
          >
            <Check className="w-12 h-12 text-black" />
          </motion.div>
          <motion.h1
            {...fadeUp(0.1)}
            className="font-bebas text-5xl mb-4"
          >
            ORDER CONFIRMED!
          </motion.h1>
          <motion.p
            {...fadeUp(0.2)}
            className="font-sans text-lg mb-2"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Thank you for your order, {formData.fullName}!
          </motion.p>
          <motion.p
            {...fadeUp(0.3)}
            className="font-sans mb-10"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {"We'll"} contact you at <span style={{ color: YELLOW }}>{formData.phone}</span> to confirm delivery.
          </motion.p>
          <motion.div {...fadeUp(0.4)}>
            <Link
              href="/"
              className="inline-block font-sans font-bold text-sm tracking-[0.2em] uppercase py-4 px-10 transition-opacity hover:opacity-85"
              style={{ background: "#fff", color: "#000" }}
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: PAGE_BG, color: "#fff", minHeight: "100vh" }}>
      <header
        className="sticky top-0 z-50 px-5 py-4"
        style={{
          background: "rgba(11,11,11,0.95)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-sans text-sm transition-opacity hover:opacity-70"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <span className="font-bebas text-2xl" style={{ color: YELLOW }}>
            AURA
          </span>
          <div className="w-16" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div {...fadeUp(0)}>
            <h1 className="font-bebas text-4xl mb-8">Complete Your Order</h1>

            <div className="mb-8">
              <p
                className="font-sans text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Select Color
              </p>
              <div className="flex gap-4">
                {(["black", "white"] as const).map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className="flex-1 rounded-2xl p-4 transition-all duration-200"
                    style={{
                      background:
                        color === "black"
                          ? "rgba(8,8,12,0.9)"
                          : "rgba(200,200,215,0.08)",
                      border:
                        selectedColor === color
                          ? `2px solid ${YELLOW}`
                          : "1px solid rgba(255,255,255,0.1)",
                      boxShadow:
                        selectedColor === color ? `0 0 20px ${YELLOW}22` : "none",
                    }}
                  >
                    <Bottle variant={color} style={{ height: 180 }} />
                    <p
                      className="font-sans text-center mt-3"
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color:
                          selectedColor === color
                            ? YELLOW
                            : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {color === "black" ? "Premium Black" : "Arctic White"}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p
                className="font-sans text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Quantity
              </p>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-xl font-sans font-bold text-xl transition-opacity hover:opacity-70"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "#fff",
                  }}
                >
                  −
                </button>
                <span className="font-bebas text-3xl w-12 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-xl font-sans font-bold text-xl transition-opacity hover:opacity-70"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "#fff",
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(255,204,0,0.05)",
                border: "1px solid rgba(255,204,0,0.2)",
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-sans" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Unit Price
                </span>
                <div className="flex items-center gap-2">
                  {offerActive && (
                    <span
                      className="font-sans line-through"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {REGULAR_PRICE} JOD
                    </span>
                  )}
                  <span className="font-bebas text-xl" style={{ color: YELLOW }}>
                    {unitPrice} JOD
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-sans" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Quantity
                </span>
                <span className="font-sans">{quantity}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-sans" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Shipping
                </span>
                <span className="font-sans" style={{ color: YELLOW }}>
                  FREE
                </span>
              </div>
              <div
                className="border-t pt-4 mt-4 flex justify-between items-center"
                style={{ borderColor: "rgba(255,204,0,0.2)" }}
              >
                <span className="font-sans font-bold">Total</span>
                <span className="font-bebas text-3xl" style={{ color: YELLOW }}>
                  {totalPrice} JOD
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            <h2 className="font-bebas text-2xl mb-6">Delivery Information</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="block font-sans text-xs tracking-[0.15em] uppercase mb-2"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full h-14 px-5 rounded-xl font-sans outline-none transition-all focus:ring-2"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                  }}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block font-sans text-xs tracking-[0.15em] uppercase mb-2"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full h-14 px-5 rounded-xl font-sans outline-none transition-all focus:ring-2"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                  }}
                  placeholder="07XXXXXXXX"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block font-sans text-xs tracking-[0.15em] uppercase mb-2"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  required
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full h-14 px-5 rounded-xl font-sans outline-none transition-all focus:ring-2"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                  }}
                  placeholder="Enter your city"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block font-sans text-xs tracking-[0.15em] uppercase mb-2"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Delivery Address *
                </label>
                <textarea
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  rows={3}
                  className="w-full px-5 py-4 rounded-xl font-sans outline-none transition-all focus:ring-2 resize-none"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                  }}
                  placeholder="Street name, building, floor..."
                />
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="block font-sans text-xs tracking-[0.15em] uppercase mb-2"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={2}
                  className="w-full px-5 py-4 rounded-xl font-sans outline-none transition-all focus:ring-2 resize-none"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                  }}
                  placeholder="Any special instructions..."
                />
              </div>

              <div
                className="rounded-xl p-4 mt-6"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p className="font-sans text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                  💵 <strong style={{ color: "#fff" }}>Cash on Delivery</strong> — Pay
                  when you receive your AURA bottle.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-16 rounded-xl font-sans font-bold text-sm tracking-[0.2em] uppercase transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: YELLOW, color: "#000" }}
              >
                {isSubmitting ? "Processing..." : `Place Order — ${totalPrice} JOD`}
              </button>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
