import { useState } from 'react'

const MOODS = [
  { id: 'hype',   label: '🔥 HYPE',    desc: 'Pre-match electric energy' },
  { id: 'win',    label: '🏆 WIN',     desc: 'Celebrate a victory' },
  { id: 'loss',   label: '💔 LOSS',    desc: 'Solidarity after a tough one' },
  { id: 'finals', label: '🏟️ FINALS', desc: '2026 Grand Final energy' },
  { id: 'banter', label: '😂 BANTER',  desc: 'Cheeky rival banter' },
  { id: 'nz',     label: '🌿 AOTEAROA', desc: 'NZ/Māori/Pasifika pride' },
]

export default function AIPanel({ onGenerate, loading, error }) {
  const [mood, setMood]       = useState('hype')
  const [userIdea, setIdea]   = useState('')

  const handleGenerate = () => onGenerate({ mood, userIdea })

  return (
    <div style={styles.root}>
      {/* Mood selector */}
      <div>
        <label style={styles.label}>MOOD</label>
        <div style={styles.moodGrid}>
          {MOODS.map((m) => (
            <button
              key={m.id}
              onClick={() => setMood(m.id)}
              title={m.desc}
              style={{
                ...styles.moodBtn,
                ...(mood === m.id ? styles.moodActive : styles.moodInactive),
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Optional idea */}
      <div>
        <label style={styles.label}>YOUR IDEA (OPTIONAL)</label>
        <input
          value={userIdea}
          onChange={(e) => setIdea(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !loading && handleGenerate()}
          placeholder="e.g. beating Penrith, Shaun Johnson, Mount Smart…"
          style={styles.input}
        />
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{ ...styles.genBtn, opacity: loading ? 0.6 : 1 }}
      >
        {loading ? '⚡ GENERATING…' : '⚡ GENERATE WITH AI'}
      </button>

      {/* Error */}
      {error && <div style={styles.error}>{error}</div>}
    </div>
  )
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  label: {
    display: 'block',
    fontSize: 11,
    color: '#FFCC00',
    letterSpacing: 2,
    marginBottom: 7,
    fontFamily: 'Arial Black, Arial, sans-serif',
  },
  moodGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
  },
  moodBtn: {
    padding: '7px 11px',
    fontSize: 11,
    fontWeight: 700,
    borderRadius: 20,
    border: '2px solid transparent',
    cursor: 'pointer',
    fontFamily: 'Arial Black, Arial, sans-serif',
    transition: 'all 0.15s',
  },
  moodActive: {
    background: '#003087',
    color: '#FFCC00',
    border: '2px solid #FFCC00',
  },
  moodInactive: {
    background: 'rgba(255,255,255,0.07)',
    color: 'rgba(255,255,255,0.6)',
  },
  input: {
    width: '100%',
    padding: '11px 13px',
    fontSize: 14,
    background: 'rgba(0,48,135,0.45)',
    color: 'white',
    border: '2px solid #003087',
    borderRadius: 6,
    outline: 'none',
    fontFamily: 'Arial, sans-serif',
  },
  genBtn: {
    width: '100%',
    padding: '14px',
    fontSize: 15,
    fontWeight: 900,
    background: 'linear-gradient(135deg, #00AEEF, #0077bb)',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    letterSpacing: 1,
    cursor: 'pointer',
    fontFamily: 'Arial Black, Arial, sans-serif',
    transition: 'opacity 0.2s',
  },
  error: {
    fontSize: 12,
    color: '#ff8080',
    padding: '9px 12px',
    background: 'rgba(255,0,0,0.1)',
    borderRadius: 6,
    border: '1px solid rgba(255,80,80,0.3)',
  },
}
