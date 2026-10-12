"use client"

import { useCallback, useEffect, useState } from "react"

const STATUSES = ["new", "contacted", "qualified", "proposal", "won", "lost"] as const
type Status = (typeof STATUSES)[number]

interface Lead {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  message: string | null
  status: Status
  deal_value_cents: number
  ai_score: number | null
  ai_summary: string | null
  created_at: string
}

interface Stats {
  pipeline: Record<string, number>
  won_cents: number
  open_cents: number
  total: number
}

const TOKEN_KEY = "zavro_admin_token"
const money = (cents: number) => `$${(cents / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })}`

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    try {
      setToken(sessionStorage.getItem(TOKEN_KEY))
    } catch {}
    setReady(true)
  }, [])

  const signOut = useCallback(() => {
    try {
      sessionStorage.removeItem(TOKEN_KEY)
    } catch {}
    setToken(null)
    setLeads([])
    setStats(null)
  }, [])

  const load = useCallback(
    async (t: string) => {
      setError("")
      const headers = { Authorization: `Bearer ${t}` }
      const [l, s] = await Promise.all([fetch("/api/crm/leads", { headers }), fetch("/api/crm/stats", { headers })])
      if (l.status === 401 || s.status === 401) return signOut()
      if (l.status === 403) {
        setError("This account does not have team access.")
        return
      }
      if (!l.ok || !s.ok) {
        setError("Could not load data. Try again.")
        return
      }
      setLeads((await l.json()).leads)
      setStats(await s.json())
    },
    [signOut]
  )

  useEffect(() => {
    if (token) load(token)
  }, [token, load])

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError("")
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (!r.ok) {
        setError("Wrong email or password.")
        return
      }
      const { access_token } = await r.json()
      try {
        sessionStorage.setItem(TOKEN_KEY, access_token)
      } catch {}
      setPassword("")
      setToken(access_token)
    } catch {
      setError("Network error. Try again.")
    } finally {
      setBusy(false)
    }
  }

  async function move(lead: Lead, status: Status) {
    if (!token) return
    const prev = leads
    setLeads((ls) => ls.map((x) => (x.id === lead.id ? { ...x, status } : x)))
    const r = await fetch("/api/crm/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: lead.id, status }),
    })
    if (!r.ok) {
      setLeads(prev)
      setError("Could not update that lead (you may only edit leads assigned to you).")
    } else {
      load(token)
    }
  }

  if (!ready) return null

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <form onSubmit={login} className="glass-strong border-glow w-full max-w-sm space-y-4 rounded-2xl p-8">
          <h1 className="font-display text-xl text-white">Zavro admin</h1>
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white outline-none focus:border-cyan-300/50"
          />
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white outline-none focus:border-cyan-300/50"
          />
          {error && <p className="text-xs text-rose-400">{error}</p>}
          <button
            disabled={busy}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-300 to-amber-300 px-4 py-2.5 text-sm font-medium text-[#02040A] disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-[1400px] px-6 py-10">
      <header className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-white">Sales pipeline</h1>
        <button onClick={signOut} className="text-xs text-slate-400 underline-offset-4 hover:text-white hover:underline">
          Sign out
        </button>
      </header>

      {error && <p className="mt-4 text-sm text-rose-400">{error}</p>}

      <section className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          ["Leads", stats ? String(stats.total) : "–"],
          ["Won revenue", stats ? money(stats.won_cents) : "–"],
          ["Open pipeline", stats ? money(stats.open_cents) : "–"],
          ["New", stats ? String(stats.pipeline.new ?? 0) : "–"],
        ].map(([label, value]) => (
          <div key={label} className="glass rounded-xl p-4">
            <div className="text-xs text-slate-400">{label}</div>
            <div className="mt-1 font-display text-xl text-white">{value}</div>
          </div>
        ))}
      </section>

      <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {STATUSES.map((status) => {
          const col = leads.filter((l) => l.status === status)
          return (
            <div key={status} className="glass rounded-xl p-3">
              <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
                <span>{status}</span>
                <span>{col.length}</span>
              </div>
              <div className="space-y-3">
                {col.map((l) => (
                  <article key={l.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm">
                    <div className="font-medium text-white">{l.name}</div>
                    <div className="text-xs text-slate-400">{l.company || l.email}</div>
                    {l.ai_score !== null && (
                      <div className="mt-2 text-xs text-cyan-300" title={l.ai_summary ?? undefined}>
                        AI score {l.ai_score}
                      </div>
                    )}
                    {l.message && <p className="mt-2 line-clamp-3 text-xs text-slate-300">{l.message}</p>}
                    <a href={`mailto:${l.email}`} className="mt-2 block text-xs text-slate-400 hover:text-cyan-300">
                      {l.email}
                    </a>
                    <select
                      value={l.status}
                      onChange={(e) => move(l, e.target.value as Status)}
                      className="mt-3 w-full rounded-md border border-white/10 bg-[#0D1322] px-2 py-1 text-xs text-white"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </article>
                ))}
              </div>
            </div>
          )
        })}
      </section>
    </main>
  )
}
