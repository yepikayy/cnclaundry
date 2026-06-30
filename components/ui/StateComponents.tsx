"use client";

import { motion } from "framer-motion";
import { AlertCircle, Inbox, Loader2 } from "lucide-react";

export function LoadingSpinner({ text = "Memuat..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
      <p className="text-slate-400 text-sm">{text}</p>
    </div>
  );
}

export function EmptyState({ title, desc }: { title: string; desc?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 gap-3 text-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center mb-2">
        <Inbox className="w-7 h-7 text-sky-300" />
      </div>
      <p className="font-semibold text-slate-700">{title}</p>
      {desc && <p className="text-slate-400 text-sm max-w-xs">{desc}</p>}
    </motion.div>
  );
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm">
      <AlertCircle className="w-5 h-5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
