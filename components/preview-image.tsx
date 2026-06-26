"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type PreviewImageProps = {
  src: string;
  previewSrc?: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export function PreviewImage({ src, previewSrc, alt, width, height, sizes, className, priority }: PreviewImageProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const fullQualitySrc = previewSrc ?? src;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full cursor-zoom-in text-left"
        aria-label={`Open preview: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className={className}
          priority={priority}
        />
      </button>

      {open && mounted
        ? createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black p-3 pt-20 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="fixed right-4 top-4 z-[10000] inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white px-4 text-xs font-bold uppercase tracking-[0.14em] text-black shadow-luxury transition hover:bg-signal md:right-7 md:top-7"
            aria-label="Close preview"
          >
            <X size={18} />
            <span>Close</span>
          </button>
          <div className="relative grid max-h-[82dvh] max-w-[94vw] place-items-center overflow-hidden rounded-[1.25rem] border border-white/12 bg-[#050505] p-2 shadow-luxury md:max-h-[90vh]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fullQualitySrc}
              alt={alt}
              width={width}
              height={height}
              loading="eager"
              decoding="sync"
              className="block h-auto max-h-[78dvh] w-auto max-w-[90vw] rounded-[0.9rem] object-contain md:max-h-[86vh] md:max-w-[91vw]"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        </div>,
        document.body
          )
        : null}
    </>
  );
}
