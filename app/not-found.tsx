import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#02040A] px-6 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-cyan-400">Error 404</p>
      <h1 className="text-balance text-4xl font-bold text-white md:text-6xl">This page drifted off the map.</h1>
      <p className="max-w-md text-pretty leading-relaxed text-slate-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back to solid
        ground.
      </p>
      <Link
        href="/"
        className="rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-6 py-3 font-medium text-cyan-300 transition-colors hover:bg-cyan-400/20"
      >
        Back to home
      </Link>
    </main>
  )
}
