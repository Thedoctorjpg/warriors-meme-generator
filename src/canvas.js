/**
 * Warriors Meme Generator — Canvas Background Renderers
 * Each function receives (ctx, width, height) and paints a full background
 */

const W_BLUE      = '#003087'
const W_LIGHT     = '#00AEEF'
const W_GOLD      = '#FFCC00'
const W_BLACK     = '#0a0a0a'

export const BACKGROUNDS = [
  {
    id: 'logo',
    label: '💙 Classic Blue',
    render(ctx, w, h) {
      // deep gradient
      const g = ctx.createLinearGradient(0, 0, w, h)
      g.addColorStop(0, '#001a5c')
      g.addColorStop(0.5, W_BLUE)
      g.addColorStop(1, W_BLACK)
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      // grid lines
      ctx.strokeStyle = 'rgba(0,174,239,0.07)'
      ctx.lineWidth = 1
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
      }

      // ghosted W
      ctx.save()
      ctx.globalAlpha = 0.055
      ctx.fillStyle = W_LIGHT
      ctx.font = `900 ${w * 0.78}px Arial Black, Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('W', w / 2, h / 2 + 20)
      ctx.restore()
    },
  },

  {
    id: 'stadium',
    label: '🏟️ Stadium Night',
    render(ctx, w, h) {
      ctx.fillStyle = W_BLACK
      ctx.fillRect(0, 0, w, h)

      // pitch
      const pitch = ctx.createLinearGradient(0, h * 0.3, 0, h * 0.56)
      pitch.addColorStop(0, '#1a6b1a')
      pitch.addColorStop(1, '#0d4a0d')
      ctx.fillStyle = pitch
      ctx.fillRect(0, h * 0.3, w, h * 0.26)

      // pitch markings
      ctx.strokeStyle = 'rgba(255,255,255,0.35)'
      ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(w / 2, h * 0.3); ctx.lineTo(w / 2, h * 0.56); ctx.stroke()
      ctx.beginPath(); ctx.arc(w / 2, h * 0.43, 38, 0, Math.PI * 2); ctx.stroke()
      ctx.strokeRect(w * 0.2, h * 0.3, w * 0.6, h * 0.26)

      // crowd rows
      const rowColors = ['#1a1a2e', '#16213e', '#0f3460', '#1a1030']
      for (let i = 0; i < 6; i++) {
        ctx.fillStyle = rowColors[i % rowColors.length]
        ctx.fillRect(0, h * 0.56 + i * h * 0.075, w, h * 0.076)
        // crowd dots
        for (let j = 0; j < 50; j++) {
          const dotX = (j / 49) * w + (Math.random() - 0.5) * 8
          const dotY = h * 0.57 + i * h * 0.075 + Math.random() * h * 0.05
          ctx.beginPath()
          ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = j % 3 === 0 ? W_BLUE : j % 3 === 1 ? W_LIGHT : W_GOLD
          ctx.fill()
        }
      }

      // spotlights from corners
      ;[[0, 0], [w, 0], [0, h * 0.28], [w, h * 0.28]].forEach(([sx, sy]) => {
        const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, h * 0.55)
        sg.addColorStop(0, 'rgba(255,240,180,0.18)')
        sg.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = sg
        ctx.fillRect(0, 0, w, h)
      })
    },
  },

  {
    id: 'fire',
    label: '🔥 Warrior Fire',
    render(ctx, w, h) {
      const g = ctx.createLinearGradient(0, 0, 0, h)
      g.addColorStop(0, '#080015')
      g.addColorStop(0.55, '#18000e')
      g.addColorStop(1, '#2a0000')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      // flames
      const flameCount = 14
      for (let i = 0; i < flameCount; i++) {
        const fx = ((i + 0.5) / flameCount) * w
        const fh = h * 0.28 + (i % 3) * h * 0.08
        const fw = w / 9
        const fg = ctx.createLinearGradient(fx, h, fx, h - fh)
        fg.addColorStop(0, 'rgba(255,60,0,0.95)')
        fg.addColorStop(0.35, 'rgba(255,140,0,0.75)')
        fg.addColorStop(0.65, 'rgba(255,220,0,0.45)')
        fg.addColorStop(1, 'rgba(255,255,200,0)')
        ctx.fillStyle = fg
        ctx.beginPath()
        ctx.moveTo(fx - fw / 2, h)
        ctx.bezierCurveTo(fx - fw / 3, h - fh * 0.5, fx + fw / 3, h - fh * 0.75, fx, h - fh)
        ctx.bezierCurveTo(fx - fw / 4, h - fh * 0.55, fx + fw / 2, h - fh * 0.3, fx + fw / 2, h)
        ctx.fill()
      }

      // ghosted W glow
      ctx.save()
      ctx.globalAlpha = 0.1
      ctx.fillStyle = '#FF7700'
      ctx.font = `900 ${w * 0.72}px Arial Black, Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('W', w / 2, h / 2 - 10)
      ctx.restore()
    },
  },

  {
    id: 'aotearoa',
    label: '🌿 Aotearoa Night',
    render(ctx, w, h) {
      const g = ctx.createLinearGradient(0, 0, 0, h)
      g.addColorStop(0, '#000510')
      g.addColorStop(0.55, '#001a2e')
      g.addColorStop(1, '#001a10')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      // stars
      for (let i = 0; i < 130; i++) {
        const sx = Math.random() * w
        const sy = Math.random() * h * 0.72
        const sr = Math.random() * 1.4 + 0.2
        ctx.beginPath()
        ctx.arc(sx, sy, sr, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${(Math.random() * 0.7 + 0.25).toFixed(2)})`
        ctx.fill()
      }

      // Southern Cross (rough positions)
      const cross = [
        [w * 0.72, h * 0.10],
        [w * 0.76, h * 0.21],
        [w * 0.67, h * 0.195],
        [w * 0.735, h * 0.285],
        [w * 0.695, h * 0.14],
      ]
      cross.forEach(([cx, cy]) => {
        // glow halo
        const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 14)
        cg.addColorStop(0, 'rgba(255,253,220,0.45)')
        cg.addColorStop(1, 'transparent')
        ctx.fillStyle = cg
        ctx.fillRect(cx - 16, cy - 16, 32, 32)
        // star dot
        ctx.beginPath()
        ctx.arc(cx, cy, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = '#FFFDE8'
        ctx.fill()
      })

      // horizon glow
      const hg = ctx.createLinearGradient(0, h * 0.62, 0, h)
      hg.addColorStop(0, 'rgba(0,48,135,0)')
      hg.addColorStop(1, 'rgba(0,48,135,0.45)')
      ctx.fillStyle = hg
      ctx.fillRect(0, h * 0.62, w, h * 0.38)

      // fern silhouette strip
      const fg2 = ctx.createLinearGradient(0, h * 0.78, 0, h)
      fg2.addColorStop(0, 'rgba(0,80,30,0)')
      fg2.addColorStop(1, 'rgba(0,60,20,0.55)')
      ctx.fillStyle = fg2
      ctx.fillRect(0, h * 0.78, w, h * 0.22)
    },
  },

  {
    id: 'goldblack',
    label: '🏆 Gold & Black',
    render(ctx, w, h) {
      const g = ctx.createLinearGradient(0, 0, w, h)
      g.addColorStop(0, '#1a1200')
      g.addColorStop(0.5, '#2a1e00')
      g.addColorStop(1, W_BLACK)
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      // diagonal gold streaks
      ctx.strokeStyle = 'rgba(255,204,0,0.08)'
      ctx.lineWidth = 18
      for (let i = -5; i < 12; i++) {
        ctx.beginPath()
        ctx.moveTo(i * (w / 7), 0)
        ctx.lineTo(i * (w / 7) + h, h)
        ctx.stroke()
      }

      // ghosted W
      ctx.save()
      ctx.globalAlpha = 0.07
      ctx.fillStyle = W_GOLD
      ctx.font = `900 ${w * 0.78}px Arial Black, Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('W', w / 2, h / 2 + 20)
      ctx.restore()

      // subtle vignette
      const vg = ctx.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, h * 0.75)
      vg.addColorStop(0, 'rgba(0,0,0,0)')
      vg.addColorStop(1, 'rgba(0,0,0,0.55)')
      ctx.fillStyle = vg
      ctx.fillRect(0, 0, w, h)
    },
  },
]

/**
 * Render top/bottom meme text onto an existing canvas context
 */
export function drawMemeText(ctx, w, h, topText, bottomText, fontFamily) {
  const renderLine = (text, yCenter) => {
    if (!text) return
    const len = Math.max(text.length, 5)
    const fSize = Math.min(64, Math.max(22, Math.floor(w / (len * 0.52))))
    ctx.font = `900 ${fSize}px ${fontFamily}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // thick black stroke
    ctx.lineWidth = Math.ceil(fSize * 0.2)
    ctx.lineJoin = 'round'
    ctx.strokeStyle = '#000000'
    ctx.strokeText(text, w / 2, yCenter)

    // gold fill
    ctx.fillStyle = W_GOLD
    ctx.fillText(text, w / 2, yCenter)

    // blue glow pass
    ctx.save()
    ctx.globalAlpha = 0.28
    ctx.shadowColor = W_LIGHT
    ctx.shadowBlur = 22
    ctx.fillText(text, w / 2, yCenter)
    ctx.restore()
  }

  renderLine(topText.toUpperCase(), h * 0.095)
  renderLine(bottomText.toUpperCase(), h * 0.915)

  // branding footer bar
  ctx.fillStyle = 'rgba(0,30,90,0.88)'
  ctx.fillRect(0, h - 26, w, 26)
  ctx.font = 'bold 11px Arial'
  ctx.fillStyle = W_LIGHT
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('💙 ONE NEW ZEALAND WARRIORS — WARRIOR NATION 🖤', w / 2, h - 13)
}
