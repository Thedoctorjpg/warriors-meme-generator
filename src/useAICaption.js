import { useState, useCallback } from 'react'

const MOOD_PROMPTS = {
  hype:   'pure electric pre-match hype — the boys are ready, Warrior Nation is bouncing',
  win:    'celebrating a massive Warriors victory — pumped, grateful, a bit cocky',
  loss:   'solidarity after a tough loss — hurts but we never quit, Once a Warrior',
  finals: '2026 NRL Grand Final energy — destiny, Accor Stadium, legacy on the line',
  banter: 'cheeky Warrior Nation banter aimed at rival NRL clubs — funny, not nasty',
  nz:     'Aotearoa pride mixed with Warriors love — te reo welcome, Māori/Pasifika vibes',
}

export function useAICaption() {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const generate = useCallback(async ({ mood, userIdea }) => {
    setLoading(true)
    setError('')

    const moodDesc = MOOD_PROMPTS[mood] || MOOD_PROMPTS.hype
    const ideaClause = userIdea?.trim()
      ? `The fan's idea/theme: "${userIdea}".`
      : 'Surprise the fan with something fresh.'

    const prompt = `You are a passionate New Zealand Warriors NRL fan creating viral social-media meme captions for Warrior Nation.

Generate exactly two short punchy meme text lines:
- TOP LINE: 3–7 words, UPPERCASE is fine
- BOTTOM LINE: 3–7 words, UPPERCASE is fine
- Tone: ${moodDesc}
- ${ideaClause}
- NRL/NZ slang is welcome (e.g. "the boys", "lock it in", "haere mai", "kia kaha")
- No emojis inside the text lines themselves
- Vary structure — don't always do "X / Y" patterns

Respond ONLY with valid JSON — no markdown, no explanation:
{"top":"TOP LINE HERE","bottom":"BOTTOM LINE HERE"}`

    try {
      // VITE_ANTHROPIC_API_KEY is injected at build time from GitHub Actions secret
      // In Claude.ai artifacts the key is handled by the platform automatically
      const apiKey = import.meta.env?.VITE_ANTHROPIC_API_KEY || ''
      const headers = { 'Content-Type': 'application/json' }
      if (apiKey) headers['x-api-key'] = apiKey

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }],
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error?.message || `HTTP ${res.status}`)
      }

      const data = await res.json()
      const raw  = data.content?.[0]?.text || ''
      const clean = raw.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(clean)

      if (!parsed.top || !parsed.bottom) throw new Error('Unexpected response shape')

      setLoading(false)
      return { top: parsed.top, bottom: parsed.bottom }
    } catch (e) {
      setError(`AI stumbled — ${e.message}. Try again!`)
      setLoading(false)
      return null
    }
  }, [])

  return { generate, loading, error, clearError: () => setError('') }
}
