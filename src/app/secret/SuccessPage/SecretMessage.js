"use client";

import { useEffect, useState } from "react";

const SECRET_MESSAGE =
  "Selamat ulang tahun sayangkuuu cintakuuu yang ke 22, semoga selalu sehat, diberi umur yang barokah, makin rajin dan makin pinter, moga ketagihan jadi morning person (hehe), selalu jadi orang yang ceria, moga apapun yang dicita-citakan terkabul..., Aamiinnn";

export default function SecretMessage() {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setVisibleText("");
      return;
    }

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setVisibleText(SECRET_MESSAGE.slice(0, index));

      if (index >= SECRET_MESSAGE.length) {
        window.clearInterval(interval);
      }
    }, 34);

    return () => window.clearInterval(interval);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full rounded-full border border-cyan-200/40 bg-blue-600/80 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(56,189,248,0.32)] transition hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-cyan-300/30 sm:w-auto"
      >
        Pesan Rahasia
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 grid min-h-dvh place-items-center px-4 py-5 sm:px-5 sm:py-8">
          <div className="relative box-border max-h-[calc(100dvh-2.5rem)] w-full max-w-lg overflow-y-auto rounded-2xl border border-cyan-200/30 bg-blue-950/90 p-5 shadow-[0_0_36px_rgba(56,189,248,0.32)] sm:rounded-3xl sm:p-6 sm:shadow-[0_0_48px_rgba(56,189,248,0.35)] md:p-8">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Tutup pesan rahasia"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-100/20 bg-white/10 text-lg leading-none text-cyan-50 transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-cyan-300/30 sm:right-4 sm:top-4"
            >
              x
            </button>

            <p className="mb-3 pr-10 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200/80 sm:text-xs sm:tracking-[0.28em]">
              Untuk Kamu
            </p>
            <h2 className="mb-4 pr-10 text-xl font-bold text-sky-50 sm:text-2xl md:text-3xl">
              Pesan Rahasia
            </h2>
            <p className="min-h-[150px] whitespace-pre-wrap text-sm leading-7 text-sky-50/90 sm:text-base sm:leading-8 md:text-lg">
              {visibleText}
              <span className="ml-1 inline-block h-5 w-0.5 animate-pulse bg-cyan-200 align-middle" />
            </p>
          </div>
        </div>
      )}
    </>
  );
}
