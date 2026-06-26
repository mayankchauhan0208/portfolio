"use client";

import Image from "next/image";
import { Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import type { CSSProperties } from "react";
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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
    setCurrentTime(0);
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

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const handleSeek = (value: string) => {
    const video = videoRef.current;
    if (!video) return;

    const nextTime = Number(value);
    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
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
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black p-3 pt-20 md:p-8"
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
                className="relative grid max-h-[82dvh] w-full max-w-6xl place-items-center overflow-hidden rounded-[1.25rem] border border-white/12 bg-[#050505] p-2 shadow-luxury md:max-h-[90vh]"
                onClick={(event) => event.stopPropagation()}
              >
                {src ? (
                  <video
                    ref={videoRef}
                    src={src}
                    poster={poster}
                    playsInline
                    preload="metadata"
                    className="block max-h-[56dvh] w-full rounded-[0.9rem] object-contain md:max-h-[78vh]"
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
                    onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                    onEnded={() => setPlaying(false)}
                  />
                ) : (
                  <div className="grid min-h-[48vh] w-full place-items-center rounded-[0.9rem] border border-white/10 bg-white/[0.04] p-8 text-center">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-signal">Video Slot Ready</p>
                      <h2 className="mt-4 font-display text-3xl text-white">Add a video file to enable playback.</h2>
                      <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-mercury">
                        This preview supports MP4 and WebM files with play, pause, mute, and timeline controls.
                      </p>
                    </div>
                  </div>
                )}

                {src && (
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white shadow-luxury backdrop-blur-xl transition hover:bg-white hover:text-black"
                    aria-label={muted ? "Unmute video" : "Mute video"}
                  >
                    {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                )}

                <div className="mt-4 w-full max-w-3xl">
                  <div className="mb-3 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/65">
                    <span>{formatTime(currentTime)}</span>
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      step="0.1"
                      value={Math.min(currentTime, duration || currentTime)}
                      onChange={(event) => handleSeek(event.target.value)}
                      disabled={!src || !duration}
                      className="video-timeline h-2 flex-1 cursor-pointer appearance-none rounded-full disabled:cursor-not-allowed disabled:opacity-45"
                      aria-label="Video timeline"
                      style={{
                        "--timeline-progress": duration ? `${(currentTime / duration) * 100}%` : "0%"
                      } as CSSProperties}
                    />
                    <span>{formatTime(duration)}</span>
                  </div>

                  <button
                    type="button"
                    onClick={togglePlayback}
                    disabled={!src}
                    className="mx-auto inline-flex min-h-11 min-w-40 items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-xs font-bold uppercase tracking-[0.14em] text-black transition hover:bg-signal disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {playing ? <Pause size={16} /> : <Play size={16} />}
                    {playing ? "Pause" : "Play"}
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
