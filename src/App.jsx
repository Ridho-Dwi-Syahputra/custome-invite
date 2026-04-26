import { useState, useEffect, useRef } from 'react'

import logoMetro from './assets/logo-metro.png'
import lenteraKarir from './assets/lentera-karir.png'
import fotoRidho from './assets/foto-ridho.png'

const FIREBASE_DB_BASE_URL = import.meta.env.VITE_FIREBASE_DB_URL || ''
const COMMENTS_DB_URL = FIREBASE_DB_BASE_URL ? `${FIREBASE_DB_BASE_URL.replace(/\/$/, '')}/comments.json` : ''

/* ── Particles ── */
function Particles() {
  const ps = Array.from({ length: 18 }, (_, i) => ({
    id: i, left: Math.random() * 100, delay: Math.random() * 12,
    dur: 14 + Math.random() * 16, size: 2 + Math.random() * 3,
    op: 0.12 + Math.random() * 0.25,
  }))
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0" aria-hidden="true">
      {ps.map(p => (
        <div key={p.id} className="absolute rounded-full"
          style={{
            left: `${p.left}%`, width: p.size, height: p.size,
            background: `radial-gradient(circle, rgba(168,85,247,${p.op}), transparent)`,
            animation: `particle ${p.dur}s ${p.delay}s linear infinite`
          }} />
      ))}
    </div>
  )
}

/* ── Ornament ── */
function Ornament({ flip, className = '' }) {
  return (
    <div className={`flex justify-center pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg width="70" height="22" viewBox="0 0 60 20" fill="none" className="text-purple-400/40"
        style={flip ? { transform: 'rotate(180deg)' } : {}}>
        <path d="M30 0C30 11 20 20 0 20C20 20 30 11 30 0ZM30 0C30 11 40 20 60 20C40 20 30 11 30 0Z" fill="currentColor" />
      </svg>
    </div>
  )
}

/* ── Scroll Reveal ── */
function R({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el) } },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>{children}</div>
  )
}

/* ── Cover Page ── */
function CoverPage({ onOpen }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #1a0530 0%, #0F0520 50%, #0a0318 100%)' }}>
      <Particles />
      <div className="absolute rounded-full pointer-events-none select-none"
        style={{
          width: 500, height: 500, top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(102,31,255,0.1) 0%, transparent 70%)'
        }} aria-hidden="true" />
      <div style={{ width: '88%', maxWidth: 380, margin: '0 auto', position: 'relative', zIndex: 10, animation: 'scaleIn 0.6s ease-out forwards' }}>
        <div className="glass-strong rounded-3xl text-center shadow-2xl"
          style={{ padding: '40px 32px' }}>
          <Ornament className="mb-7" />
          {/* Logo - NO card, transparent */}
          <div className="flex justify-center mb-5 pointer-events-none select-none">
            <img src={logoMetro} alt="Logo" style={{ width: 64, height: 64, objectFit: 'contain' }} draggable="false" />
          </div>
          <h1 className="font-serif text-white select-none" style={{ fontSize: 30, fontWeight: 700, marginBottom: 2 }}>Seminar</h1>
          <h2 className="font-serif text-purple-300 select-none" style={{ fontSize: 20, fontWeight: 600, marginBottom: 28 }}>Kerja Praktek</h2>
          <div style={{ width: 80, height: 1.5, margin: '0 auto 28px', background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.5), transparent)' }} aria-hidden="true" />
          <p className="text-purple-200/70 select-none" style={{ fontSize: 14, marginBottom: 4 }}>Kepada Yth.</p>
          <p className="text-white select-none" style={{ fontSize: 16, fontWeight: 500, marginBottom: 36 }}>Abang, Kakak, dan orang yang saya Anggap Teman</p>
          <button onClick={onOpen}
            className="cursor-pointer select-none"
            style={{
              width: '100%', padding: '15px 0', borderRadius: 16, border: 'none',
              background: 'linear-gradient(135deg, #661FFF, #A855F7)', color: '#fff',
              fontSize: 16, fontWeight: 600, boxShadow: '0 8px 24px rgba(102,31,255,0.3)',
              transition: 'all 0.3s', position: 'relative', overflow: 'hidden'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(102,31,255,0.45)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(102,31,255,0.3)' }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Buka Undangan
            </span>
          </button>
          <Ornament flip className="mt-7" />
        </div>
      </div>
    </div>
  )
}

/* ── Countdown ── */
function Countdown() {
  const target = new Date('April 28, 2026 08:30:00').getTime()
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
  const [exp, setExp] = useState(false)
  useEffect(() => {
    const tick = () => {
      const diff = target - Date.now()
      if (diff < 0) { setExp(true); return }
      setT({ d: Math.floor(diff / 864e5), h: Math.floor(diff % 864e5 / 36e5), m: Math.floor(diff % 36e5 / 6e4), s: Math.floor(diff % 6e4 / 1e3) })
    }
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id)
  }, [target])

  if (exp) return <p className="font-serif text-purple-300 select-none" style={{ fontSize: 17, fontWeight: 600, textAlign: 'center' }}>🎉 Acara Sedang/Telah Berlangsung 🎉</p>

  const items = [{ v: t.d, l: 'Hari' }, { v: t.h, l: 'Jam' }, { v: t.m, l: 'Menit' }, { v: t.s, l: 'Detik' }]
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
      {items.map((b, i) => (
        <div key={b.l} className="glass select-none"
          style={{
            width: 68, padding: '12px 0', borderRadius: 16, textAlign: 'center',
            animation: `countdownPulse 2s ease-in-out infinite`, animationDelay: `${i * 200}ms`
          }}>
          <span className="font-mono" style={{ display: 'block', fontSize: 24, fontWeight: 700, color: '#fff', lineHeight: 1 }}>
            {String(b.v).padStart(2, '0')}
          </span>
          <span style={{ display: 'block', fontSize: 10, color: 'rgba(196,181,253,0.7)', marginTop: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {b.l}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ── Comments ── */
function Comments() {
  const [list, setList] = useState([])
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const loadComments = async () => {
      try {
        const res = await fetch(COMMENTS_DB_URL)
        if (!res.ok) return
        const data = await res.json()
        const parsed = data
          ? Object.values(data)
            .filter(comment => comment?.name?.trim() && comment?.message?.trim())
            .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
          : []

        if (mounted) setList(parsed)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadComments()
    const intervalId = setInterval(loadComments, 5000)

    return () => {
      mounted = false
      clearInterval(intervalId)
    }
  }, [])

  const submit = async e => {
    e.preventDefault()
    const n = name.trim(), m = msg.trim()
    if (!n || !m) return
    setBusy(true)
    try {
      const createdAt = Date.now()
      const res = await fetch(COMMENTS_DB_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: n,
          message: m,
          timestamp: createdAt,
        }),
      })

      if (!res.ok) return

      setList(p => [{ id: createdAt, name: n, message: m, timestamp: createdAt }, ...p])
      setName('')
      setMsg('')
    } finally {
      setBusy(false)
    }
  }

  const fmt = timestamp => { try { return new Date(timestamp).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) } catch { return '' } }

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: 12,
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff', fontSize: 14, outline: 'none', transition: 'border-color 0.3s',
  }

  return (
    <>
      <form onSubmit={submit}>
        <div style={{ marginBottom: 16 }}>
          <label className="select-none" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(196,181,253,0.7)', marginBottom: 8 }}>Pengirim</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Masukkan nama Kamu..." required
            style={inputStyle} onFocus={e => e.target.style.borderColor = '#7C3AED'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label className="select-none" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(196,181,253,0.7)', marginBottom: 8 }}>Pesan Ucapan</label>
          <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="Tuliskan ucapan & doa terbaik Kamu..." required rows="3"
            style={{ ...inputStyle, resize: 'none' }} onFocus={e => e.target.style.borderColor = '#7C3AED'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
        </div>
        <button type="submit" disabled={busy} className="cursor-pointer select-none"
          style={{
            width: '100%', padding: '14px 0', borderRadius: 12, border: 'none',
            background: 'linear-gradient(135deg, #661FFF, #A855F7)', color: '#fff',
            fontSize: 15, fontWeight: 600, opacity: busy ? 0.5 : 1,
            boxShadow: '0 6px 20px rgba(102,31,255,0.25)', transition: 'all 0.3s'
          }}>
          {busy ? 'Mengirim...' : 'Kirim Ucapan'}
        </button>
      </form>
      <div style={{ marginTop: 24, maxHeight: 340, overflowY: 'auto' }}>
        {loading ? (
          <p className="select-none" style={{ textAlign: 'center', color: 'rgba(196,181,253,0.3)', padding: '24px 0', fontSize: 13 }}>Memuat ucapan...</p>
        ) : list.length === 0 ? (
          <p className="select-none" style={{ textAlign: 'center', color: 'rgba(196,181,253,0.3)', padding: '24px 0', fontSize: 13 }}>Belum ada ucapan. Jadilah yang pertama! 💜</p>
        ) : list.map(c => (
          <div key={c.id || c.timestamp} className="glass animate-fade-in" style={{ borderRadius: 12, padding: 16, marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span className="select-none" style={{ fontSize: 13, fontWeight: 600, color: 'rgba(233,213,255,0.9)' }}>{c.name}</span>
              <span className="select-none" style={{ fontSize: 10, color: 'rgba(168,85,247,0.4)' }}>{fmt(c.timestamp)}</span>
            </div>
            <p className="select-none" style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{c.message}</p>
          </div>
        ))}
      </div>
    </>
  )
}

/* ================================================================
   MAIN APP
   ================================================================ */
export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [show, setShow] = useState(false)

  const open = () => { setIsOpen(true); setTimeout(() => setShow(true), 500) }

  // Shared style for the centered frame
  const frameStyle = {
    width: '90%',
    maxWidth: 440,
    margin: '0 auto',
    padding: '48px 28px',
    position: 'relative',
    zIndex: 10,
  }

  return (
    <>
      {!isOpen && <CoverPage onOpen={open} />}

      {isOpen && !show && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 50, background: '#0F0520',
          animation: 'fadeIn 0.4s ease-out reverse forwards'
        }} />
      )}

      {show && (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a0530 0%, #0F0520 50%, #0a0318 100%)', position: 'relative' }}>
          <Particles />

          {/* Background glow */}
          <div className="pointer-events-none select-none" style={{
            position: 'fixed', top: '-10%', left: '50%', transform: 'translateX(-50%)',
            width: 500, height: 500, borderRadius: '50%', opacity: 0.25,
            background: 'radial-gradient(circle, rgba(102,31,255,0.15), transparent 70%)'
          }} aria-hidden="true" />

          {/* ══════════ SINGLE INVITATION FRAME ══════════ */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={frameStyle}>

              {/* Vertical accent lines */}
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 2, background: 'linear-gradient(to bottom, transparent, rgba(168,85,247,0.1), transparent)' }} aria-hidden="true" />
              <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 2, background: 'linear-gradient(to bottom, transparent, rgba(168,85,247,0.1), transparent)' }} aria-hidden="true" />

              {/* ── Top Ornament ── */}
              <R><Ornament className="mb-10" /></R>

              {/* ── Logo - transparent, no card ── */}
              <R delay={50}>
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                  <img src={logoMetro} alt="Logo" className="pointer-events-none select-none"
                    style={{ width: 60, height: 60, objectFit: 'contain', display: 'inline-block' }} draggable="false" />
                </div>
              </R>

              {/* ── Title ── */}
              <R delay={100}>
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                  <h1 className="font-serif text-white select-none" style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2 }}>
                    Seminar Kerja Praktek
                  </h1>
                  <div style={{ width: 72, height: 1.5, margin: '20px auto 0', background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.5), transparent)' }} aria-hidden="true" />
                </div>
              </R>

              {/* ── Profile Photo - CENTERED ── */}
              <R delay={150}>
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                  <div className="pointer-events-none select-none" style={{
                    width: 140, height: 140, margin: '0 auto 20px', position: 'relative',
                  }}>
                    <div className="animate-pulse-glow" style={{ position: 'absolute', inset: 0, borderRadius: '50%' }} aria-hidden="true" />
                    <div style={{ position: 'absolute', inset: 3, borderRadius: '50%', background: 'linear-gradient(135deg, #8B5CF6, #5A2FD5)' }} aria-hidden="true" />
                    <div style={{ position: 'absolute', inset: 6, borderRadius: '50%', overflow: 'hidden' }}>
                      <img src={fotoRidho} alt="Foto Ridho" style={{ width: '100%', height: '100%', objectFit: 'cover' }} draggable="false" />
                    </div>
                  </div>
                  <h2 className="font-serif text-white select-none" style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Ridho Dwi Syahputra</h2>
                  <p className="select-none" style={{ fontSize: 13, color: 'rgba(196,181,253,0.5)' }}>Mahasiswa Sistem Informasi Unand</p>
                </div>
              </R>

              {/* ── Seminar Title ── */}
              <R delay={100}>
                <div className="glass-strong" style={{ borderRadius: 20, padding: '28px 24px', textAlign: 'center', marginBottom: 48 }}>
                  <span className="select-none pointer-events-none" style={{
                    display: 'inline-block', padding: '4px 14px', borderRadius: 20,
                    background: 'rgba(102,31,255,0.15)', color: 'rgba(196,181,253,0.8)',
                    fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16
                  }}>Judul Seminar</span>
                  <h3 className="font-serif text-white select-none" style={{ fontSize: 14, lineHeight: 1.8, fontWeight: 600 }}>
                    PERANCANGAN DAN IMPLEMENTASI ANTARMUKA PENGGUNA SERTA INTEGRASI BACKEND PADA APLIKASI MOBILE LENTERA KARIR MENGGUNAKAN FRAMEWORK FLUTTER
                  </h3>
                </div>
              </R>

              {/* ── Greeting ── */}
              <R delay={100}>
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                  <p className="font-serif select-none" style={{ fontSize: 18, fontWeight: 600, color: 'rgba(233,213,255,0.85)', fontStyle: 'italic', marginBottom: 20 }}>
                    Assalamu'alaikum Warahmatullahi Wabarakatuh,
                  </p>
                  <p className="select-none" style={{ fontSize: 14, lineHeight: 1.85, color: 'rgba(255,255,255,0.7)' }}>
                    Melalui undangan ini, aku mengundang dan meminta dukungan Abang/Kakak dan teman-teman sekalian pada Seminar Kerja Praktik (KP) aku, yang insyaallah akan diselenggarakan pada:
                  </p>
                </div>
              </R>

              {/* ── Event Details (ONE card) ── */}
              <R delay={100}>
                <div className="glass" style={{ borderRadius: 20, padding: '24px 24px', marginBottom: 48 }}>
                  {[
                    { icon: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>, label: 'Hari & Tanggal', value: 'Selasa, 28 April 2026' },
                    { icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>, label: 'Waktu', value: '08:00 WIB - 11:00 WIB' },
                    { icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>, label: 'Tempat', value: 'Seminar SI' },
                  ].map((item, i) => (
                    <div key={i}>
                      {i > 0 && <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.05)', margin: '16px 0' }} />}
                      <div className="select-none cursor-default" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div className="pointer-events-none" style={{
                          width: 40, height: 40, borderRadius: '50%', background: 'rgba(102,31,255,0.15)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                        }}>
                          <svg width="18" height="18" fill="none" stroke="rgba(196,181,253,0.8)" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            {item.icon}
                          </svg>
                        </div>
                        <div>
                          <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(196,181,253,0.6)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 2 }}>{item.label}</p>
                          <p style={{ fontSize: 14, fontWeight: 500, color: '#fff' }}>{item.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </R>

              {/* ── Countdown ── */}
              <R delay={100}>
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                  <h3 className="font-serif select-none" style={{ fontSize: 17, fontWeight: 600, color: 'rgba(196,181,253,0.7)', marginBottom: 20 }}>
                    Menuju Hari H
                  </h3>
                  <Countdown />
                </div>
              </R>

              {/* ── Divider ── */}
              <div className="pointer-events-none select-none" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '0 0 48px' }} aria-hidden="true">
                <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.25))' }} />
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(168,85,247,0.3)' }} />
                <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, rgba(168,85,247,0.25), transparent)' }} />
              </div>

              {/* ── Lentera Karir - transparent logo ── */}
              <R delay={100}>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <span className="select-none pointer-events-none" style={{
                    display: 'inline-block', padding: '4px 14px', borderRadius: 20,
                    background: 'rgba(102,31,255,0.1)', color: 'rgba(196,181,253,0.6)',
                    fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16
                  }}>Aplikasi yang Dibangun</span>
                  <div className="pointer-events-none select-none" style={{ marginBottom: 12 }}>
                    <img src={lenteraKarir} alt="Lentera Karir"
                      style={{ width: 56, height: 56, objectFit: 'contain', display: 'inline-block' }} draggable="false" />
                  </div>
                  <h4 className="text-white select-none" style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>Lentera Karir</h4>
                  <p className="select-none" style={{ fontSize: 11, color: 'rgba(196,181,253,0.4)' }}>Mobile App </p>
                </div>
              </R>

              {/* ── Tempat Magang - transparent logo ── */}
              <R delay={100}>
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                  <span className="select-none pointer-events-none" style={{
                    display: 'inline-block', padding: '4px 14px', borderRadius: 20,
                    background: 'rgba(102,31,255,0.1)', color: 'rgba(196,181,253,0.6)',
                    fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16
                  }}>Tempat Magang</span>
                  <div className="pointer-events-none select-none">
                    <img src={logoMetro} alt="Logo Tempat Magang"
                      style={{ width: 48, height: 48, objectFit: 'contain', display: 'inline-block' }} draggable="false" />
                  </div>
                </div>
              </R>

              {/* ── Divider ── */}
              <div className="pointer-events-none select-none" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '0 0 48px' }} aria-hidden="true">
                <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.25))' }} />
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(168,85,247,0.3)' }} />
                <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, rgba(168,85,247,0.25), transparent)' }} />
              </div>

              {/* ── Closing ── */}
              <R delay={100}>
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                  <p className="select-none" style={{ fontSize: 14, lineHeight: 1.85, color: 'rgba(255,255,255,0.7)', marginBottom: 24 }}>
                    Kehadiran dan support dari Abang/Kakak serta teman-teman semua bakal berarti banget buat aku. Ditunggu ya kedatangannya!

                    BTW FREE ROTI O buat 5 orang pertama :b
                  </p>
                  <p className="font-serif select-none" style={{ fontSize: 18, fontWeight: 600, color: 'rgba(233,213,255,0.85)', fontStyle: 'italic', marginBottom: 32 }}>
                    Wassalamu'alaikum Warahmatullahi Wabarakatuh.
                  </p>
                  <p className="select-none" style={{ fontSize: 12, color: 'rgba(196,181,253,0.4)', marginBottom: 6 }}>Hormat Saya,</p>
                  <p className="font-serif text-white select-none" style={{ fontSize: 20, fontWeight: 700 }}>Ridho Dwi Syahputra</p>
                </div>
              </R>

              {/* ── Ucapan & Doa ── */}
              <R delay={100}>
                <div className="glass-strong" style={{ borderRadius: 20, padding: '32px 24px', marginBottom: 48 }}>
                  <h2 className="font-serif text-white select-none" style={{ fontSize: 22, fontWeight: 700, textAlign: 'center', marginBottom: 28 }}>
                    Ucapan & Doa
                  </h2>
                  <Comments />
                </div>
              </R>

              {/* ── Bottom ── */}
              <R>
                <div style={{ textAlign: 'center', paddingBottom: 16 }}>
                  <Ornament flip />
                  <p className="select-none" style={{ fontSize: 10, color: 'rgba(168,85,247,0.2)', marginTop: 20 }}></p>
                </div>
              </R>

            </div>
          </div>
        </div>
      )}
    </>
  )
}
