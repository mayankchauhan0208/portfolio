import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-obsidian px-5 text-center text-white">
      <div className="max-w-xl">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-signal">404</p>
        <h1 className="mt-5 font-display text-5xl leading-tight md:text-7xl">This page is not in the portfolio.</h1>
        <p className="mt-5 leading-7 text-mercury">Return to Mayank Chauhan&apos;s selected visual design, campaign and presentation work.</p>
        <Link href="/" className="mt-8 inline-flex min-h-11 items-center rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-black transition hover:bg-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal">Return Home</Link>
      </div>
    </main>
  );
}
