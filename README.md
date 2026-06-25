<<<<<<< HEAD
# 🏉 Warriors Meme Generator v2 — AI-Powered Pump Station 💙🖤

**Live meme maker for Warrior Nation.**
Built to hype the **One New Zealand Warriors** all the way to the **NRL Grand Final on Sunday 4 October 2026** at Accor Stadium.

[![Deploy Status](https://github.com/Thedoctorjpg/warriors-meme-generator/actions/workflows/deploy.yml/badge.svg)](https://github.com/Thedoctorjpg/warriors-meme-generator/actions/workflows/deploy.yml)

🔗 **Live site:** https://thedoctorjpg.github.io/warriors-meme-generator/

*Once a Warrior, always a Warrior.*

---

## 🔥 What's New in v2

| Feature | v1 | v2 |
|---|---|---|
| Captions | Manual only | **Claude AI-powered** with 6 mood presets |
| Backgrounds | Static logo image | 5 procedurally rendered canvas scenes |
| Font | Hardcoded | 4 selectable styles |
| Download | html2canvas | Native Canvas PNG |
| Random captions | ❌ | ✅ |
| CI/CD | ❌ | ✅ GitHub Actions → GitHub Pages |

---

## 🚀 Quick Start (Local Dev)

```bash
git clone https://github.com/Thedoctorjpg/warriors-meme-generator.git
cd warriors-meme-generator
npm install
npm run dev
```

Open http://localhost:5173/warriors-meme-generator/

---

## 🔑 Setting Up the AI (Anthropic API Key)

The AI caption feature calls the Anthropic Claude API. You need an API key for it to work.

### For local dev:
Create a `.env.local` file in the project root (this file is gitignored — never commit it):
```
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### For GitHub Pages deployment:
1. Go to your repo → **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Name: `VITE_ANTHROPIC_API_KEY`
4. Value: your Anthropic API key from https://console.anthropic.com
5. Click **Add secret**

The GitHub Actions workflow automatically injects this at build time.

> ⚠️ **Security note:** Because this is a static site, the API key is embedded in the browser bundle. For a public site, consider routing AI calls through a server-side proxy (Cloudflare Worker, Vercel Edge Function, etc.) instead of exposing the key client-side. For a personal fan tool this is fine.

---

## 🏗️ Deploying to GitHub Pages

### Step 1 — Enable GitHub Pages
1. Go to repo **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Save

### Step 2 — Add your API secret (see above)

### Step 3 — Push to main
```bash
git add .
git commit -m "feat: v2 full-stack upgrade with Vite + CI/CD"
git push origin main
```

The Actions workflow will automatically:
- Install dependencies
- Build with Vite
- Deploy `dist/` to GitHub Pages

Your live URL: `https://thedoctorjpg.github.io/warriors-meme-generator/`

---

## 🗂️ Project Structure

```
warriors-meme-generator/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline
├── public/
│   └── favicon.svg             # Warriors W favicon
├── src/
│   ├── components/
│   │   ├── AIPanel.jsx         # Mood selector + AI generate UI
│   │   ├── BackgroundPicker.jsx
│   │   └── MemeCanvas.jsx      # Canvas renderer component
│   ├── App.jsx                 # Root component
│   ├── canvas.js               # Background renderers + text drawing
│   ├── index.css               # Global styles
│   ├── main.jsx                # React entry point
│   └── useAICaption.js         # Claude API hook
├── index.html                  # Vite entry HTML
├── vite.config.js
├── package.json
└── .gitignore
```

---

## 🧱 Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite 5 |
| AI Captions | Anthropic Claude (claude-sonnet-4-6) |
| Canvas | HTML5 Canvas API (no external deps) |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages |

---

## 🤝 Contributing

PRs welcome! Ideas:
- Upload your own background image
- Share directly to X/Twitter button
- Save caption history to localStorage
- PWA / offline support for game-day use

---

## 📄 License

MIT — Free for all Warrior Nation supporters. Spread the hype responsibly.

---

**Made with love (and Claude AI) for the greatest fans in the NRL.**
=======
# 🏉 Warriors Meme Generator — 2026 Grand Final Pump Station 💙🖤

**Live meme maker for Warrior Nation.**  
Built to hype the **One New Zealand Warriors** all the way to the **NRL Grand Final on Sunday 4 October 2026** at Accor Stadium.

Once a Warrior, always a Warrior.

![Warriors Logo](https://1000logos.net/wp-content/uploads/2021/03/New-Zealand-Warriors-logo.png)

## 🔥 What is this?

A super simple, mobile-friendly browser tool that lets you create hype memes in seconds — perfect for:
- Live X/Twitter posting during matches
- Watch parties & group chats
- nzwarriors.com forum threads
- Instagram/TikTok stories
- Keeping the faith strong through the finals run

## 🚀 Live Demo

**https://YOUR-USERNAME.github.io/warriors-meme-generator**

(Replace `YOUR-USERNAME` after you deploy via GitHub Pages)

## Features

- Clean Warriors branding (blue, black, green, gold)
- Bold impact-style text overlays
- One-click high-quality PNG download (ready for X)
- Fully offline capable
- No sign-up, no ads, no nonsense — pure fan energy
- Mobile optimised for game-day use

## How to Use

1. Open the live site (or `index.html`)
2. Type your hype:
   - **Top:** `THE BOYS ARE COOKING`
   - **Bottom:** `GRAND FINAL BOUND 2026 💙🖤`
3. Click **GENERATE MEME**
4. Click **SAVE FOR X** → post instantly

## Example Memes

- "WHEN THE BOYS HIT THE GF" / "WARRIOR NATION RISE!"
- "PENRITH WHO?" / "WE TICK EVERY BOX"
- "FROM GO MEDIA TO ACCOR" / "THE RIDE STARTS NOW"

## For Warrior Nation Fan Clubs & Supporters

Use this tool to:
- Keep morale high during tough patches
- Celebrate big wins and comeback tries
- Coordinate hype content for away trips
- Support the Warriors Community Foundation vibe

**Suggested posting cadence** during finals season — keep the noise loud!

## Tech

- Pure HTML + CSS + JavaScript
- html2canvas for high-res downloads
- No backend, no tracking — 100% fan made

## Contributing

Pull requests welcome! Add:
- More base images (player photos, stadiums, etc.)
- Preset meme templates
- Dark/light mode toggle
- Share directly to X button

## License

Free for all Warrior Nation supporters. Spread the hype responsibly.

---

**Made with love for the greatest fans in the NRL.**  
>>>>>>> ffcf4777986586aea9abc178034266cc5bc05e43
**Go the Warriors — 2026 is our year!** 🦅💙🖤

*Once a Warrior, always a Warrior.*
