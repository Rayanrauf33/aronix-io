"use client"

import { motion, useReducedMotion } from "framer-motion"
import { CalendarCheck, MessageCircle } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Chat message data                                                   */
/* ------------------------------------------------------------------ */

const messages = [
  { from: "visitor", text: "Hi, do you do dental implants?" },
  { from: "agent", text: "Yes we do. Are you looking for a consultation or do you have a specific question about the procedure?" },
  { from: "visitor", text: "Just a consultation." },
]

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function ChatHeroBrowser() {
  const reduce = useReducedMotion()

  const instant = reduce ? true : false
  const d = (s: number) => (instant ? 0 : s)
  const dur = (s: number) => (instant ? 0 : s)

  // Timing
  const bubbleDelay = 0.3
  const windowDelay = bubbleDelay + d(0.5)
  const msgBase = windowDelay + d(0.5)
  const msgGap = 0.6
  const bookingDelay = msgBase + messages.length * msgGap + d(0.3)

  return (
    <div className="hidden lg:block w-full">
      {/* Browser chrome */}
      <div
        className="rounded-[var(--ax-radius-xl)] overflow-hidden border border-white/10"
        style={{
          background: "var(--ax-surface-dark-alt)",
          boxShadow: "0 24px 64px rgba(0, 0, 0, 0.4)",
        }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
          <span className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
          <span className="w-[10px] h-[10px] rounded-full bg-[#FEBC2E]" />
          <span className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
          <div
            className="ml-3 flex-1 h-6 rounded-[var(--ax-radius-xs)] flex items-center px-3"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <span
              className="text-[11px] text-[var(--ax-fg-on-dark-2)]"
              style={{ fontFamily: "var(--ax-font-mono)" }}
            >
              yourwebsite.com
            </span>
          </div>
        </div>

        {/* Browser body */}
        <div className="relative p-5 min-h-[380px]" style={{ background: "#1a1a1a" }}>
          {/* Faint website content placeholder */}
          <div className="opacity-20 space-y-3">
            <div className="h-3 w-3/4 rounded bg-white/20" />
            <div className="h-2 w-full rounded bg-white/10" />
            <div className="h-2 w-5/6 rounded bg-white/10" />
            <div className="h-24 w-full rounded-[var(--ax-radius-sm)] bg-white/5 mt-4" />
            <div className="h-2 w-2/3 rounded bg-white/10" />
            <div className="h-2 w-3/4 rounded bg-white/10" />
          </div>

          {/* Chat widget - bottom right */}
          <div className="absolute bottom-4 right-4 flex flex-col items-end gap-3">
            {/* Chat window */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ delay: d(windowDelay), duration: dur(0.4), ease: "easeOut" }}
              className="w-[280px] rounded-[var(--ax-radius-lg)] overflow-hidden border border-white/10"
              style={{
                background: "var(--ax-surface-dark-alt)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
            >
              {/* Chat header */}
              <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "var(--ax-primary)" }}
                >
                  <MessageCircle size={14} className="text-white" />
                </div>
                <div>
                  <div
                    className="text-[12px] font-semibold text-white"
                    style={{ fontFamily: "var(--ax-font-display)" }}
                  >
                    AI Assistant
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--ax-success)]" />
                    <span className="text-[10px] text-[var(--ax-fg-on-dark-2)]">Online</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="px-3 py-3 flex flex-col gap-2.5 min-h-[160px]">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: d(msgBase + i * msgGap),
                      duration: dur(0.35),
                      ease: "easeOut",
                    }}
                    className={`max-w-[85%] ${msg.from === "visitor" ? "self-end" : "self-start"}`}
                  >
                    <div
                      className="px-3 py-2 rounded-[var(--ax-radius-md)] text-[12px] leading-[1.5]"
                      style={{
                        background:
                          msg.from === "visitor"
                            ? "var(--ax-primary)"
                            : "rgba(255,255,255,0.08)",
                        color: msg.from === "visitor" ? "white" : "var(--ax-fg-on-dark-2)",
                      }}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Booking confirmation card */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: d(bookingDelay),
                    duration: dur(0.4),
                    ease: "easeOut",
                  }}
                  className="self-start w-full"
                >
                  <div
                    className="px-3 py-2.5 rounded-[var(--ax-radius-md)] border border-white/10 flex items-center gap-2.5"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-[var(--ax-radius-sm)] flex items-center justify-center shrink-0"
                      style={{ background: "rgba(100,117,189,0.15)" }}
                    >
                      <CalendarCheck size={16} className="text-[var(--ax-accent)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-[12px] font-medium text-white"
                        style={{ fontFamily: "var(--ax-font-display)" }}
                      >
                        Tuesday July 15 &ndash; 10:00am
                      </div>
                    </div>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-[var(--ax-radius-pill)]"
                      style={{
                        background: "rgba(34,197,94,0.15)",
                        color: "var(--ax-success)",
                      }}
                    >
                      Confirmed
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Chat bubble trigger */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: d(bubbleDelay),
                duration: dur(0.3),
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
              style={{
                background: "var(--ax-primary)",
                boxShadow: "0 4px 20px rgba(234,75,113,0.4)",
              }}
            >
              <MessageCircle size={20} className="text-white" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
