import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { BACKGROUNDS, drawMemeText } from '../canvas.js'

const CANVAS_W = 600
const CANVAS_H = 480

/**
 * MemeCanvas — renders the Warriors meme onto an HTML5 canvas.
 * Exposes a `download()` method via ref for the parent to call.
 */
const MemeCanvas = forwardRef(function MemeCanvas(
  { bgId, topText, bottomText, fontFamily, overlayVisible },
  ref,
) {
  const canvasRef = useRef(null)

  // expose download to parent
  useImperativeHandle(ref, () => ({
    download() {
      const canvas = canvasRef.current
      if (!canvas) return
      const link = document.createElement('a')
      link.download = `warriors-meme-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    },
  }))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const bg = BACKGROUNDS.find((b) => b.id === bgId) || BACKGROUNDS[0]

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
    bg.render(ctx, CANVAS_W, CANVAS_H)
    drawMemeText(ctx, CANVAS_W, CANVAS_H, topText, bottomText, fontFamily)
  }, [bgId, topText, bottomText, fontFamily])

  return (
    <div style={styles.wrapper}>
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        style={styles.canvas}
        aria-label="Warriors meme preview"
      />
      {overlayVisible && (
        <div style={styles.overlay}>
          <span style={styles.overlayText}>⚡ AI generating…</span>
        </div>
      )}
    </div>
  )
})

export default MemeCanvas

const styles = {
  wrapper: {
    position: 'relative',
    border: '3px solid #FFCC00',
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow: '0 0 32px rgba(0,174,239,0.45)',
  },
  canvas: {
    width: '100%',
    display: 'block',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0,0,0,0.72)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    color: '#FFCC00',
    fontFamily: 'Arial Black, Arial, sans-serif',
    fontSize: 18,
    fontWeight: 900,
    letterSpacing: 2,
  },
}
