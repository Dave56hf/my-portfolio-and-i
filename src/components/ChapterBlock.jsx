import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ChapterBlock({ kicker, title, body, note, active }) {
  return (
    <motion.div
      className="rounded-3xl border border-white/10 bg-white/5 px-7 py-8 backdrop-blur-sm relative overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-400/5 pointer-events-none" />
      <div className="relative space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">
          {kicker}
        </p>
        <div className="flex items-start gap-3">
          <ArrowRight
            className={`mt-1 h-5 w-5 transition ${
              active ? "text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]" : "text-slate-500"
            }`}
          />
          <div className="space-y-3">
            <h3
              className={`text-2xl md:text-3xl font-semibold leading-snug ${
                active ? "text-slate-50" : "text-slate-200/90"
              }`}
            >
              {title}
            </h3>
            <p className="text-base text-slate-300/90 leading-relaxed">{body}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-100/70">
              {note}
            </p>
          </div>
        </div>
      </div>
      {active && (
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-400/15 blur-3xl" />
      )}
    </motion.div>
  );
}
