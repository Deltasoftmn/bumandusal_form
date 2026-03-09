"use client";

import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 animate-overlay-in bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col animate-modal-in overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div
          className="flex shrink-0 items-center justify-between gap-4 border-b px-6 py-5"
          style={{ borderColor: "rgba(0, 99, 97, 0.12)", backgroundColor: "rgba(0, 99, 97, 0.03)" }}
        >
          <h2 id="modal-title" className="text-lg font-bold leading-tight" style={{ color: "#006361" }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:bg-black/5"
            style={{ color: "#006361" }}
            aria-label="Хаах"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6"
          style={{ WebkitOverflowScrolling: "touch", overflowAnchor: "none" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
