"use client";

import Image from "next/image";
import { Pause, Play, Square, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type PreviewVideoProps = {
  src?: string;
  poster: string;
  title: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
};

export function PreviewVideo({ src, poster, title, width, height, sizes, className }: PreviewVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePreview();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function closePreview() {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setPlaying(false);
    setOpen(false);
  }

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      await video.play();
      setPlaying(true);
      return;
    }

    video.pause();
    setPlaying(false);
  };

  const stopPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    setPlaying(false);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full cursor-pointer overflow-hidden text-left"
        aria-label={`Open video preview: ${title}`}
      >
        <Image src={poster} alt={`${title} poster`} width={width} height={height} sizes={sizes} className={className} />
        <span className="absolute inset-0 grid place-items-center bg-black/12 opacity-95 transition group-hover:bg-black/24">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white text-black shadow-luxury transition group-hover:scale-105">
            <Play size={24} fill="currentColor" />
          </span>
        </span>
      </button>

      {open && mounted
        ? createPortal(
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black p-4 md:p-8"
              role="dialog"
              aria-modal="true"
              aria-label={title}
              onClick={closePreview}
            >
              <button
                type="button"
                onClick={closePreview}
                className="fixed right-4 top-4 z-[10000] inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white px-4 text-xs font-bold uppercase tracking-[0.14em] text-black shadow-luxury transition hover:bg-signal md:right-7 md:top-7"
                aria-label="Close video preview"
              >
                <X size={18} />
                <span>Close</span>
              </button>

              <div
                className="relative grid max-h-[90vh] w-full max-w-6xl place-items-center overflow-hidden rounded-[1.25rem] border border-white/12 bg-[#050505] p-2 shadow-luxury"
                onClick={(event) => event.stopPropagation()}
              >
                {src ? (
                  <video
                    ref={videoRef}
                    src={src}
                    poster={poster}
                    playsInline
                    preload="metadata"
                    className="block max-h-[78vh] w-full rounded-[0.9rem] object-contain"
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                  />
                ) : (
                  <div className="grid min-h-[48vh] w-full place-items-center rounded-[0.9rem] border border-white/10 bg-white/[0.04] p-8 text-center">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-signal">Video Slot Ready</p>
                      <h2 className="mt-4 font-display text-3xl text-white">Add a video file to enable playback.</h2>
                      <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-mercury">
                        This preview supports MP4 and WebM files with play, stop, and mute controls.
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={togglePlayback}
                    disabled={!src}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-black transition hover:bg-signal disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {playing ? <Pause size={16} /> : <Play size={16} />}
                    {playing ? "Pause" : "Play"}
                  </button>
                  <button
                    type="button"
                    onClick={stopPlayback}
                    disabled={!src}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    <Square size={15} />
                    Stop
                  </button>
                  <button
                    type="button"
                    onClick={toggleMute}
                    disabled={!src}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    {muted ? "Unmute" : "Mute"}
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
