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
