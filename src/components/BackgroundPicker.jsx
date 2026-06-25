import { BACKGROUNDS } from '../canvas.js'

export default function BackgroundPicker({ value, onChange }) {
  return (
    <div>
      <label style={styles.label}>BACKGROUND</label>
      <div style={styles.grid}>
        {BACKGROUNDS.map((bg) => (
          <button
            key={bg.id}
            onClick={() => onChange(bg.id)}
            style={{
              ...styles.btn,
              ...(value === bg.id ? styles.btnActive : styles.btnInactive),
            }}
          >
            {bg.label}
          </button>
        ))}
      </div>
    </div>
  )
}

const styles = {
  label: {
    display: 'block',
    fontSize: 11,
    color: '#FFCC00',
    letterSpacing: 2,
    marginBottom: 8,
    fontFamily: 'Arial Black, Arial, sans-serif',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 6,
  },
  btn: {
    padding: '9px 10px',
    fontSize: 12,
    fontWeight: 700,
    textAlign: 'left',
    borderRadius: 6,
    border: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.15s',
    fontFamily: 'Arial Black, Arial, sans-serif',
  },
  btnActive: {
    background: '#003087',
    color: '#FFCC00',
    border: '2px solid #FFCC00',
  },
  btnInactive: {
    background: 'rgba(255,255,255,0.06)',
    color: 'rgba(255,255,255,0.65)',
  },
}
