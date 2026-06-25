import { useState, useRef, useCallback } from 'react'
import MemeCanvas    from './components/MemeCanvas.jsx'
import BackgroundPicker from './components/BackgroundPicker.jsx'
import AIPanel       from './components/AIPanel.jsx'
import { useAICaption } from './useAICaption.js'

const FONTS = [
  { value: 'Arial Black, Arial, sans-serif', label: '💪 Impact (Classic)' },
  { value: 'Georgia, serif',                 label: '📜 Serif (Powerful)' },
  { value: "'Courier New', monospace",       label: '💻 Mono (Raw)' },
  { value: 'Arial, sans-serif',              label: '🔵 Clean Sans' },
]

const RANDOM_TOPS = [
  'BORN TO BE WARRIORS', 'NEVER SAY DIE', 'AUCKLAND TO THE WORLD',
  'THE BOYS ARE COOKING', 'KIA KAHA WARRIOR NATION', 'LOCK IT IN',
  'FROM GO MEDIA TO GLORY', 'HAERE MAI WARRIOR NATION',
]
const RANDOM_BOTS = [
  'GRAND FINAL 2026', 'ONCE A WARRIOR ALWAYS', 'WE RISE TOGETHER',
  'WARRIOR NATION STANDS TALL', "PENRITH WHO", 'THE RIDE STARTS NOW',
  'ACCOR STADIUM CALLING', 'KIA MAIA',
]

export default function App() {
  const [bg,         setBg]         = useState('logo')
  const [topText,    setTopText]    = useState('BOYS ON A MISSION')
  const [bottomText, setBottomText] = useState('GRAND FINAL 2026 💙🖤')
  const [font,       setFont]       = useState(FONTS[0].value)
  const [tab,        setTab]        = useState('manual') // 'manual' | 'ai'
  const [saved,      setSaved]      = useState(false)

  const canvasRef = useRef(null)
  const { generate, loading: aiLoading, error: aiError } = useAICaption()

  const handleAIGenerate = useCallback(async (opts) => {
    const result = await generate(opts)
    if (result) {
      setTopText(result.top)
      setBottomText(result.bottom)
      setTab('manual') // flip to manual so user can see/tweak
    }
  }, [generate])

  const handleDownload = () => {
    canvasRef.current?.download()
    setSaved(true)
    setTimeout(() => setSaved(false), 2800)
  }

  const handleRandomise = () => {
    setTopText(RANDOM_TOPS[Math.floor(Math.random() * RANDOM_TOPS.length)])
    setBottomText(RANDOM_BOTS[Math.floor(Math.random() * RANDOM_BOTS.length)])
  }

  return (
    <div style={s.page}>
      {/* ── Header ── */}
      <header style={s.header}>
        <div style={s.headerTitle}>🏉 WARRIORS MEME GENERATOR</div>
        <div style={s.headerSub}>POWERED BY CLAUDE AI · WARRIOR NATION 2026</div>
      </header>

      {/* ── Main layout ── */}
      <main style={s.main}>

        {/* Left: Canvas + download */}
        <div style={s.canvasCol}>
          <MemeCanvas
            ref={canvasRef}
            bgId={bg}
            topText={topText}
            bottomText={bottomText}
            fontFamily={font}
            overlayVisible={aiLoading}
          />

          <button
            onClick={handleDownload}
            style={{ ...s.dlBtn, background: saved ? '#00a040' : 'linear-gradient(135deg,#FFCC00,#ffaa00)', color: saved ? '#fff' : '#003087' }}
          >
            {saved ? '✅ SAVED — POST IT NOW!' : '📥 SAVE FOR X / SOCIAL'}
          </button>

          <button onClick={handleRandomise} style={s.randBtn}>
            🎲 RANDOMISE CAPTIONS
          </button>
        </div>

        {/* Right: Controls */}
        <div style={s.controlCol}>

          <BackgroundPicker value={bg} onChange={setBg} />

          {/* Tab bar */}
          <div style={s.tabBar}>
            {[['manual', '✏️ MANUAL'], ['ai', '⚡ AI CAPTION']].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                style={{ ...s.tabBtn, ...(tab === id ? s.tabActive : s.tabInactive) }}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === 'manual' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={s.fieldLabel}>TOP TEXT</label>
                <input
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  placeholder="E.g. BOYS ON A MISSION"
                  style={s.textInput}
                />
              </div>
              <div>
                <label style={s.fieldLabel}>BOTTOM TEXT</label>
                <input
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  placeholder="E.g. GRAND FINAL 2026"
                  style={s.textInput}
                />
              </div>
            </div>
          ) : (
            <AIPanel
              onGenerate={handleAIGenerate}
              loading={aiLoading}
              error={aiError}
            />
          )}

          {/* Font picker */}
          <div>
            <label style={s.fieldLabel}>FONT STYLE</label>
            <select value={font} onChange={(e) => setFont(e.target.value)} style={s.select}>
              {FONTS.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </div>

          {/* Tips */}
          <div style={s.tips}>
            <div style={s.tipsTitle}>💡 PRO TIPS</div>
            Short & punchy wins on X · Save as PNG for best quality ·
            Tag <strong style={{ color: '#00AEEF' }}>#NZWarriors</strong> ·
            Use AI then tweak manually to perfection
          </div>
        </div>
      </main>

      <footer style={s.footer}>
        WARRIOR NATION · FREE FOR ALL FANS · ONCE A WARRIOR ALWAYS A WARRIOR
      </footer>
    </div>
  )
}

/* ── Styles ─────────────────────────────────────────────────── */
const s = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #001244 50%, #0a0a0a 100%)',
    fontFamily: 'Arial Black, Arial, sans-serif',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    background: 'linear-gradient(90deg,#003087,#001a6e,#003087)',
    borderBottom: '3px solid #FFCC00',
    padding: '18px 20px',
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 'clamp(18px,4vw,30px)',
    fontWeight: 900,
    letterSpacing: 2,
    color: '#FFCC00',
    textShadow: '0 0 22px #00AEEF',
  },
  headerSub: {
    fontSize: 11,
    color: '#00AEEF',
    marginTop: 4,
    letterSpacing: 3,
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'normal',
  },
  main: {
    flex: 1,
    maxWidth: 940,
    margin: '0 auto',
    padding: '22px 16px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 22,
    alignItems: 'flex-start',
  },
  canvasCol: {
    flex: '1 1 340px',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  controlCol: {
    flex: '1 1 320px',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  dlBtn: {
    width: '100%',
    padding: '14px',
    fontSize: 15,
    fontWeight: 900,
    border: 'none',
    borderRadius: 6,
    letterSpacing: 1,
    cursor: 'pointer',
    fontFamily: 'Arial Black, Arial, sans-serif',
    transition: 'all 0.2s',
    boxShadow: '0 0 16px rgba(255,204,0,0.3)',
  },
  randBtn: {
    width: '100%',
    padding: '10px',
    fontSize: 13,
    fontWeight: 700,
    background: 'transparent',
    color: '#00AEEF',
    border: '2px solid #00AEEF',
    borderRadius: 6,
    cursor: 'pointer',
    fontFamily: 'Arial Black, Arial, sans-serif',
  },
  tabBar: {
    display: 'flex',
    borderRadius: 6,
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  tabBtn: {
    flex: 1,
    padding: '10px',
    fontSize: 12,
    fontWeight: 700,
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Arial Black, Arial, sans-serif',
    letterSpacing: 0.5,
  },
  tabActive:   { background: '#003087', color: '#FFCC00' },
  tabInactive: { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)' },
  fieldLabel: {
    display: 'block',
    fontSize: 11,
    color: '#FFCC00',
    letterSpacing: 2,
    marginBottom: 6,
  },
  textInput: {
    width: '100%',
    padding: '11px 13px',
    fontSize: 15,
    fontWeight: 700,
    background: 'rgba(0,48,135,0.45)',
    color: '#FFCC00',
    border: '2px solid #003087',
    borderRadius: 6,
    outline: 'none',
    fontFamily: 'Arial Black, Arial, sans-serif',
  },
  select: {
    width: '100%',
    padding: '11px 13px',
    fontSize: 13,
    background: 'rgba(0,48,135,0.45)',
    color: 'white',
    border: '2px solid #003087',
    borderRadius: 6,
    outline: 'none',
  },
  tips: {
    background: 'rgba(0,48,135,0.28)',
    border: '1px solid rgba(0,174,239,0.18)',
    borderRadius: 6,
    padding: '12px 14px',
    fontSize: 12,
    color: 'rgba(255,255,255,0.58)',
    lineHeight: 1.85,
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'normal',
  },
  tipsTitle: {
    color: '#FFCC00',
    fontWeight: 700,
    marginBottom: 5,
    fontFamily: 'Arial Black, Arial, sans-serif',
  },
  footer: {
    textAlign: 'center',
    padding: '14px',
    fontSize: 10,
    color: 'rgba(255,255,255,0.18)',
    letterSpacing: 2,
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'normal',
  },
}
