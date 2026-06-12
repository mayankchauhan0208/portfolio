"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

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
  const fullQualitySrc = previewSrc ?? src;

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

      {open ? (
        <div
          className="fixed inset-0 z-[140] flex items-center justify-center bg-black/88 p-3 backdrop-blur-2xl md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white text-black shadow-luxury transition hover:bg-signal"
            aria-label="Close preview"
          >
            <X size={20} />
          </button>
          <div className="relative max-h-[92vh] max-w-[96vw] overflow-auto rounded-[1.35rem] border border-white/12 bg-black/70 p-2 shadow-luxury">
            <Image
              src={fullQualitySrc}
              alt={alt}
              width={width}
              height={height}
              sizes="96vw"
              unoptimized
              className="h-auto max-h-[88vh] w-auto max-w-[92vw] rounded-[1rem] object-contain"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
