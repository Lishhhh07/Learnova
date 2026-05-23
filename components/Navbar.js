"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/activity", label: "Activities" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [ripples, setRipples] = useState({});

  const handleClick = (href, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipples(prev => ({ ...prev, [href]: { x, y, id: Date.now() } }));
    setTimeout(() => {
      setRipples(prev => {
        const next = { ...prev };
        delete next[href];
        return next;
      });
    }, 600);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 32px",
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Logo */}
      <Link href="/">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            style={{
              width: 34,
              height: 34,
              background: "linear-gradient(135deg, #7c3aed, #db2777)",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.747 0-3.332.477-4.5 1.253"
              />
            </svg>
          </motion.div>
          <span
            style={{
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: 2,
            }}
          >
            PREMIUM
          </span>
        </motion.div>
      </Link>

      {/* Nav Links */}
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const isHovered = hoveredLink === link.href;

          return (
            <Link key={link.href} href={link.href}>
              <motion.div
                onHoverStart={() => setHoveredLink(link.href)}
                onHoverEnd={() => setHoveredLink(null)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.93, y: 0 }}
                onClick={(e) => handleClick(link.href, e)}
                style={{
                  position: "relative",
                  padding: "8px 18px",
                  borderRadius: 10,
                  cursor: "pointer",
                  overflow: "hidden",
                }}
              >
                {/* Active background */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="active-bg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 10,
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.25)",
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Hover background */}
                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 10,
                        background: "rgba(255,255,255,0.08)",
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Running lines on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <>
                      {/* Top line */}
                      <motion.div
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0, originX: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 1.5,
                          background:
                            "linear-gradient(90deg, #7c3aed, #db2877)",
                          borderRadius: 2,
                        }}
                      />
                      {/* Bottom line */}
                      <motion.div
                        initial={{ scaleX: 0, originX: 1 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0, originX: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: 1.5,
                          background:
                            "linear-gradient(90deg, #db2877, #7c3aed)",
                          borderRadius: 2,
                        }}
                      />
                      {/* Left line */}
                      <motion.div
                        initial={{ scaleY: 0, originY: 0 }}
                        animate={{ scaleY: 1 }}
                        exit={{ scaleY: 0, originY: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: 1.5,
                          background:
                            "linear-gradient(180deg, #7c3aed, #db2877)",
                          borderRadius: 2,
                        }}
                      />
                      {/* Right line */}
                      <motion.div
                        initial={{ scaleY: 0, originY: 1 }}
                        animate={{ scaleY: 1 }}
                        exit={{ scaleY: 0, originY: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        style={{
                          position: "absolute",
                          right: 0,
                          top: 0,
                          bottom: 0,
                          width: 1.5,
                          background:
                            "linear-gradient(180deg, #db2877, #7c3aed)",
                          borderRadius: 2,
                        }}
                      />
                    </>
                  )}
                </AnimatePresence>

                {/* Ripple effect on click */}
                <AnimatePresence>
                  {ripples[link.href] && (
                    <motion.div
                      key={ripples[link.href].id}
                      initial={{ scale: 0, opacity: 0.5 }}
                      animate={{ scale: 4, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      style={{
                        position: "absolute",
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: "rgba(139,92,246,0.4)",
                        left: ripples[link.href].x - 10,
                        top: ripples[link.href].y - 10,
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Text */}
                <motion.span
                  animate={{
                    color: isActive
                      ? "#fff"
                      : isHovered
                      ? "#fff"
                      : "#9ca3af",
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: "relative",
                    zIndex: 10,
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  {link.label}
                </motion.span>

                {/* Active dot */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      style={{
                        position: "absolute",
                        bottom: 3,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg, #7c3aed, #db2877)",
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Login Button */}
      <Link href="/auth">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 20px",
            borderRadius: 12,
            border: "none",
            background: "linear-gradient(135deg, #7c3aed, #db2877)",
            color: "#fff",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            overflow: "hidden",
          }}
        >
          {/* Shimmer */}
          <motion.div
            initial={{ x: "-100%" }}
            whileHover={{ x: "200%" }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
              skewX: "-12deg",
            }}
          />

          {/* Sparkle icon */}
          <motion.svg
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.4 }}
            style={{ position: "relative", zIndex: 10 }}
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </motion.svg>

          <span style={{ position: "relative", zIndex: 10 }}>
            Login / Signup
          </span>
        </motion.button>
      </Link>
    </nav>
  );
}