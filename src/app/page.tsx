"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
  Dumbbell,
  Baby,
  PersonStanding,
  Briefcase,
  GraduationCap,
  Gift,
  Droplets,
  ThermometerSun,
  ShieldCheck,
  Magnet,
} from "lucide-react";
import type { CSSProperties } from "react";

const LAUNCH_OFFER_LIMIT = 10;
const OFFER_PRICE = 15;
const REGULAR_PRICE = 20;

/* ─── Shared animation variant ───────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

/* For hero — uses animate instead of whileInView (above fold) */
const heroFade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" as const, delay },
});

const PAGE_BG = "#0b0b0b";
const YELLOW = "#FFCC00";

/* ─── Bottle image helper ─────────────────────────────── */
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

const personas = [
  {
    icon: Dumbbell,
    title: "Athletes",
    desc: "Stay hydrated through every set and sprint. Cold water that lasts your entire workout.",
  },
  {
    icon: Baby,
    title: "Mothers",
    desc: "Keep milk warm for hours — no microwave needed. Warmth ready when your baby is.",
  },
  {
    icon: PersonStanding,
    title: "Runners",
    desc: "Lightweight, leak-proof on the move. Magnetic ring holds your phone while you push limits.",
  },
  {
    icon: Briefcase,
    title: "Daily Life",
    desc: "From morning coffee to late-night tea — one bottle, all day, zero compromise.",
  },
  {
    icon: GraduationCap,
    title: "Students",
    desc: "Long lectures, study marathons, campus commutes. AURA keeps up with your schedule.",
  },
  {
    icon: Gift,
    title: "Perfect Gift",
    desc: "Elegant packaging, premium feel. A gift they will actually use every single day.",
  },
];

/* ─── Smooth scroll handler ───────────────────────── */
function scrollToStory(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const el = document.getElementById("story");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Home() {
  const [mobileVariant, setMobileVariant] = useState<"white" | "black">("black");

  // Static values for now - can be connected to a backend later
  const spotsUsed = 0;
  const offerActive = spotsUsed < LAUNCH_OFFER_LIMIT;
  const displayPrice = offerActive ? OFFER_PRICE : REGULAR_PRICE;

  return (
    <div style={{ background: PAGE_BG, color: "#fff", minHeight: "100vh" }}>
      {/* ── Navbar ──────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-5 md:px-10 py-4"
        style={{
          background: "rgba(11,11,11,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span
          className="font-bebas text-2xl tracking-wide"
          style={{ color: "#fff" }}
        >
          AURA
        </span>
        <a
          href="#story"
          onClick={scrollToStory}
          className="font-sans text-sm tracking-wide transition-colors hover:text-yellow-400"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          Our Story
        </a>
      </nav>

      {/* ── Launch banner ───────────────────────────────── */}
      <div
        style={{
          background: "#111",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
        className="text-center py-2.5 px-4 font-sans text-sm tracking-wide"
      >
        {offerActive ? (
          <>
            <span style={{ color: YELLOW, fontWeight: 700 }}>Launch Offer:</span>{" "}
            First 10 orders at{" "}
            <span
              className="line-through"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {REGULAR_PRICE} JOD
            </span>{" "}
            <span style={{ color: YELLOW, fontWeight: 700 }}>
              {OFFER_PRICE} JOD
            </span>{" "}
            — Free Shipping
          </>
        ) : (
          <>
            <span style={{ color: "rgba(255,255,255,0.5)" }}>
              Launch offer ended.
            </span>{" "}
            Order now at{" "}
            <span style={{ color: YELLOW, fontWeight: 700 }}>
              {REGULAR_PRICE} JOD
            </span>{" "}
            — Free Shipping
          </>
        )}
      </div>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 py-16 md:py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left column */}
          <div className="flex-1 w-full text-center lg:text-left">
            <motion.p
              {...heroFade(0)}
              className="font-sans text-xs tracking-[0.35em] uppercase mb-5"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              The Future of Hydration
            </motion.p>

            <motion.h1
              {...heroFade(0.1)}
              className="leading-none mb-6 font-bebas"
              style={{
                fontSize: "clamp(3.2rem, 7vw, 6.5rem)",
                letterSpacing: "0.02em",
              }}
            >
              POWERFUL HOLD.
              <br />
              <span style={{ color: YELLOW }}>PURE</span> HYDRATION.
            </motion.h1>

            {/* Pricing card */}
            <motion.div
              {...heroFade(0.3)}
              className="inline-block w-full lg:w-auto rounded-2xl p-6 lg:p-8 text-center lg:text-left"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,204,0,0.08) 0%, rgba(255,204,0,0.03) 100%)",
                border: "1px solid rgba(255,204,0,0.25)",
              }}
            >
              <div className="flex items-end justify-center lg:justify-start gap-3 mb-2">
                <span
                  className="font-bebas"
                  style={{ fontSize: "3.5rem", color: YELLOW, lineHeight: 1 }}
                >
                  {displayPrice} JOD
                </span>
                {offerActive && (
                  <span
                    className="font-sans line-through pb-2"
                    style={{ color: "rgba(255,255,255,0.3)", fontSize: "1rem" }}
                  >
                    {REGULAR_PRICE} JOD
                  </span>
                )}
              </div>
              <p
                className="font-sans text-xs tracking-[0.22em] uppercase mb-5"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {offerActive
                  ? "First 10 orders only"
                  : "Free shipping · Pay on delivery"}
              </p>
              <Link
                href="/checkout"
                className="inline-block w-full lg:w-auto text-center font-sans font-bold text-sm tracking-[0.2em] uppercase py-4 px-10 transition-opacity hover:opacity-85"
                style={{ background: "#fff", color: "#000" }}
              >
                Order Now
              </Link>
            </motion.div>
          </div>

          {/* Right column: bottle cards */}
          <div className="flex-1 w-full">
            {/* Featured bottle — mobile only, switches on thumb click */}
            <motion.div
              {...heroFade(0.25)}
              className="lg:hidden flex justify-center mb-5"
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  width: "55%",
                  padding: "16px 10px 12px",
                  background:
                    mobileVariant === "black"
                      ? "rgba(8,8,12,0.9)"
                      : "rgba(200,200,215,0.08)",
                  border:
                    mobileVariant === "black"
                      ? `1.5px solid ${YELLOW}55`
                      : "1px solid rgba(255,255,255,0.15)",
                  transition: "background 0.3s, border 0.3s",
                }}
              >
                <Bottle variant={mobileVariant} />
                <p
                  className="font-sans text-center mt-3"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {mobileVariant === "black" ? "Premium Black" : "Arctic White"}
                </p>
              </div>
            </motion.div>

            {/* Mobile color thumbnails — clickable */}
            <motion.div
              {...heroFade(0.35)}
              className="lg:hidden flex justify-center gap-4 mb-8"
            >
              {(["white", "black"] as const).map((v) => {
                const active = mobileVariant === v;
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setMobileVariant(v)}
                    className="rounded-xl overflow-hidden flex flex-col items-center transition-all duration-200"
                    style={{
                      width: "22%",
                      padding: "8px 5px 6px",
                      background:
                        v === "black"
                          ? "rgba(8,8,12,0.9)"
                          : "rgba(200,200,210,0.08)",
                      border: active
                        ? `2px solid ${YELLOW}`
                        : v === "black"
                          ? "1px solid rgba(255,255,255,0.12)"
                          : "1px solid rgba(255,255,255,0.1)",
                      boxShadow: active ? `0 0 14px ${YELLOW}33` : "none",
                    }}
                  >
                    <Bottle variant={v} />
                    <span
                      className="font-sans mt-2"
                      style={{
                        fontSize: "8px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: active ? YELLOW : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {v === "black" ? "Black" : "White"}
                    </span>
                  </button>
                );
              })}
            </motion.div>

            {/* Desktop 2-up cards */}
            <div className="hidden lg:grid grid-cols-2 gap-4 max-w-md mx-auto lg:max-w-none">
              <motion.div
                {...heroFade(0.2)}
                className="flex flex-col items-center overflow-hidden"
                style={{
                  padding: "20px 12px 16px",
                  background: "rgba(200,200,215,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "81px",
                }}
              >
                <Bottle variant="white" style={{ width: "100%" }} />
                <span
                  className="font-sans mt-3"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  Arctic White
                </span>
              </motion.div>

              <motion.div
                {...heroFade(0.32)}
                className="flex flex-col items-center rounded-2xl overflow-hidden"
                style={{
                  padding: "20px 12px 16px",
                  background: "rgba(8,8,12,0.85)",
                  border: `1.5px solid ${YELLOW}50`,
                  boxShadow: `0 0 30px ${YELLOW}12`,
                }}
              >
                <Bottle variant="black" style={{ width: "100%" }} />
                <span
                  className="font-sans mt-3"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: `${YELLOW}aa`,
                  }}
                >
                  Premium Black
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile sticky price bar ──────────────────────── */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between gap-4 px-5 py-4"
        style={{
          background: "rgba(11,11,11,0.97)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-baseline gap-2 flex-shrink-0">
          <span
            className="font-bebas"
            style={{ fontSize: "1.8rem", color: YELLOW, lineHeight: 1 }}
          >
            {displayPrice} JOD
          </span>
          {offerActive && (
            <span
              className="font-sans line-through text-sm"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {REGULAR_PRICE} JOD
            </span>
          )}
        </div>
        <Link
          href="/checkout"
          className="flex-1 text-center font-sans font-bold text-sm tracking-[0.18em] uppercase py-3.5 transition-opacity hover:opacity-85"
          style={{ background: "#fff", color: "#000" }}
        >
          Order Now
        </Link>
      </div>

      {/* ── MagSafe Ring ─────────────────────────────────── */}
      <section style={{ background: "#000" }}>
        <div className="grid lg:grid-cols-2 min-h-[480px]">
          {/* Ring visual */}
          <motion.div
            {...fadeUp()}
            className="flex items-center justify-center py-20 px-10 relative overflow-hidden"
            style={{ background: "#000" }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10 text-center">
              <div className="relative w-44 h-44 mx-auto mb-8">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: "7px solid rgba(255,255,255,0.75)",
                    boxShadow: "0 0 50px rgba(255,255,255,0.2)",
                  }}
                />
                <div
                  className="absolute inset-6 rounded-full"
                  style={{ border: "2px solid rgba(255,255,255,0.15)" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Magnet
                    className="w-12 h-12"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  />
                </div>
              </div>
              <p
                className="font-sans text-xs tracking-[0.3em] uppercase"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                360° Magnetic Grip
              </p>
            </div>
          </motion.div>

          {/* Ring text */}
          <motion.div
            {...fadeUp(0.1)}
            className="flex items-center py-20 px-10 lg:px-16"
            style={{ background: "#fff" }}
          >
            <div>
              <p
                className="font-sans text-xs tracking-[0.3em] uppercase mb-4"
                style={{ color: "rgba(0,0,0,0.3)" }}
              >
                Signature Feature
              </p>
              <h2
                className="leading-none mb-6 font-bebas"
                style={{
                  fontSize: "clamp(3rem, 6vw, 5rem)",
                  color: "#000",
                }}
              >
                POWERFUL
                <br />
                HOLD.
              </h2>
              <p
                className="font-sans text-lg leading-relaxed mb-8"
                style={{ color: "#666" }}
              >
                The integrated{" "}
                <strong style={{ color: "#000" }}>magnetic ring holder</strong>{" "}
                is built directly into the bottle. Snap your phone on securely
                while you train, commute, or study.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "Secures any MagSafe-compatible phone",
                  "360° rotation — any angle, any grip",
                  "Holds up to 500g — no slip, no drop",
                  "Doubles as a kickstand for your phone",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    {...fadeUp(i * 0.07)}
                    className="flex items-center gap-3 font-sans"
                    style={{ color: "#555" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "#000" }}
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>
              <Link
                href="/checkout"
                className="inline-block font-sans font-bold text-sm tracking-[0.2em] uppercase h-12 px-8 leading-[3rem] transition-opacity hover:opacity-85"
                style={{ background: "#000", color: "#fff" }}
              >
                Get Yours Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────── */}
      <section className="py-24" style={{ background: "#111" }}>
        <div className="max-w-7xl mx-auto px-5">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <h2
              className="mb-3 font-bebas"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Crafted for Excellence
            </h2>
            <p className="font-sans" style={{ color: "rgba(255,255,255,0.4)" }}>
              Every detail considered. Every feature intentional.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: ShieldCheck,
                title: "Premium Build",
                desc: "304 Stainless Steel, BPA-free, rust-resistant, anti-slip coating",
              },
              {
                icon: ThermometerSun,
                title: "Thermal Control",
                desc: "Hot 70°C/6h · 50°C/12h · Cold 5°C/6h · 9°C/12h",
              },
              {
                icon: Magnet,
                title: "Magnetic Ring",
                desc: "Integrated ring holder — grip your phone at any angle",
              },
              {
                icon: Droplets,
                title: "40oz Capacity",
                desc: "≈1.2L · dual-function leak-proof lid for ice & cleaning",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.08)}
                className="p-8 text-center rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: "#fff", color: "#000" }}
                >
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="mb-2 font-bebas" style={{ fontSize: "1.4rem" }}>
                  {f.title}
                </h3>
                <p
                  className="font-sans text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────── */}
      <section
        id="story"
        className="py-24 md:py-32 scroll-mt-20"
        style={{ background: "#000" }}
      >
        <div className="max-w-4xl mx-auto px-5">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <p
              className="font-sans text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: YELLOW }}
            >
              The Beginning
            </p>
            <h2
              className="font-bebas leading-none"
              style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
            >
              OUR <span style={{ color: YELLOW }}>STORY</span>
            </h2>
          </motion.div>

          <motion.div
            {...fadeUp(0.15)}
            className="rounded-2xl p-8 md:p-12"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p
              className="font-sans text-lg md:text-xl leading-relaxed mb-6 text-right"
              style={{ color: "rgba(255,255,255,0.85)", direction: "rtl" }}
            >
              بدأت رحلة AURA بفكرة بسيطة من شاب عمره 16 سنة ، كان عنده
              طموح يبني براند بيمثّل جيله وبقدم منتج حقيقي يغير روتين يومهم. بفضل
              ثقة ودعم العائلة ، بدأت الرحلة الفردية!
            </p>
            <p
              className="font-sans text-lg md:text-xl leading-relaxed mb-6 text-right"
              style={{ color: "rgba(255,255,255,0.85)", direction: "rtl" }}
            >
              من الصفر، ومن غرفتي الصغيرة؛ استلمت كل خطوة بنفسي: تواصلت مع
              المصانع في الصين لضمان أعلى جودة ستانلس ستيل، صممت اللوجو، برمجت
              الموقع اللي بتشوفوه هسا، وأدرت صفحات السوشيال ميديا والتسويق، وحتى
              التغليف والبيع والتوصل مع زباينا.
            </p>
            <p
              className="font-sans text-lg md:text-xl leading-relaxed text-right"
              style={{ color: "rgba(255,255,255,0.85)", direction: "rtl" }}
            >
              AURA مش مجرد مطرة مياه؛ هي نتاج تعب، وشغف، وإصرار على تقديم منتج
              فخم، عملي، ومواكب للتكنولوجيا (زي ميزة الماغ سيف والمسكة
              المغناطيسية). لما تشتري من براندنا، أنت مش بس بتدعم براند محلي، أنت
              بتشارك في قصة طموح لسه في أولها!
            </p>
            <motion.div
              {...fadeUp(0.25)}
              className="mt-10 pt-8 flex flex-col items-center"
              style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span
                className="font-bebas text-2xl"
                style={{ color: YELLOW }}
              >
                Karam bashtawi
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Who is it for ────────────────────────────────── */}
      <section className="py-28" style={{ background: PAGE_BG }}>
        <div className="max-w-7xl mx-auto px-5">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <p
              className="font-sans text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Built for Everyone
            </p>
            <h2
              className="font-bebas"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
            >
              Who is it for?
            </h2>
            <p
              className="font-sans mt-2"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              One bottle. Endless lifestyles.
            </p>
          </motion.div>
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            {personas.map((p, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.07)}
                className="p-10"
                style={{ background: PAGE_BG }}
              >
                <div
                  className="w-14 h-14 flex items-center justify-center mb-6"
                  style={{
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#fff",
                  }}
                >
                  <p.icon className="w-6 h-6" />
                </div>
                <h3 className="mb-3 font-bebas" style={{ fontSize: "1.75rem" }}>
                  {p.title}
                </h3>
                <p
                  className="font-sans text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-32 text-center" style={{ background: "#111" }}>
        <div className="max-w-3xl mx-auto px-5">
          <motion.h2
            {...fadeUp()}
            className="leading-none mb-6 font-bebas"
            style={{
              fontSize: "clamp(4rem, 10vw, 9rem)",
              color: "#fff",
            }}
          >
            READY TO
            <br />
            <span style={{ color: "transparent", WebkitTextStroke: "2px #fff" }}>
              UPGRADE?
            </span>
          </motion.h2>
          <motion.p
            {...fadeUp(0.1)}
            className="font-sans mb-2"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {offerActive
              ? `Launch offer: ${OFFER_PRICE} JOD — Save ${REGULAR_PRICE - OFFER_PRICE} JOD`
              : `Regular price: ${REGULAR_PRICE} JOD — Free Shipping`}
          </motion.p>
          {offerActive && (
            <motion.p
              {...fadeUp(0.15)}
              className="font-sans font-bold mb-10"
              style={{ color: YELLOW }}
            >
              First 10 orders: {OFFER_PRICE} JOD — Free Shipping
            </motion.p>
          )}
          <motion.div {...fadeUp(0.2)}>
            <Link
              href="/checkout"
              className="inline-block font-sans font-bold text-sm tracking-[0.2em] uppercase py-4 px-14 transition-opacity hover:opacity-85"
              style={{ background: "#fff", color: "#000" }}
            >
              Get Your AURA Today
            </Link>
          </motion.div>
        </div>
      </section>

      {/* bottom padding on mobile to clear sticky bar */}
      <div className="lg:hidden h-20" />
    </div>
  );
}
