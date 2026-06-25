import { useState, useRef, useEffect } from "react";

const WARRIORS_BLUE = "#003087";
const WARRIORS_LIGHT_BLUE = "#00AEEF";
const WARRIORS_GOLD = "#FFCC00";
const WARRIORS_BLACK = "#0a0a0a";

// SVG Warriors-themed background scenes rendered on canvas
const BACKGROUNDS = [
  {
    id: "logo",
    label: "💙 Classic Logo",
    render: (ctx, w, h) => {
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "#001a5c");
      g.addColorStop(0.5, "#003087");
      g.addColorStop(1, "#000000");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      // grid lines
      ctx.strokeStyle = "rgba(0,174,239,0.08)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke(); }
      for (let y = 0; y < h; y += 40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }
      // big W watermark
      ctx.save();
      ctx.globalAlpha = 0.06;
      ctx.fillStyle = WARRIORS_LIGHT_BLUE;
      ctx.font = `bold ${w*0.75}px Arial Black`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("W", w/2, h/2);
      ctx.restore();
    }
  },
  {
    id: "stadium",
    label: "🏟️ Stadium Lights",
    render: (ctx, w, h) => {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);
      // crowd rows
      const colors = ["#1a1a2e","#16213e","#0f3460","#533483"];
      for(let i=0;i<8;i++){
        ctx.fillStyle = colors[i%4];
        ctx.fillRect(0, h*0.55 + i*h*0.06, w, h*0.06+2);
        // crowd dots
        for(let j=0;j<40;j++){
          ctx.beginPath();
          ctx.arc(j*(w/38)+Math.random()*8, h*0.57+i*h*0.06+Math.random()*10, 3, 0, Math.PI*2);
          ctx.fillStyle = j%3===0?"#003087":j%3===1?"#00AEEF":"#FFCC00";
          ctx.fill();
        }
      }
      // pitch
      const pitch = ctx.createLinearGradient(0, h*0.3, 0, h*0.55);
      pitch.addColorStop(0, "#1a6b1a");
      pitch.addColorStop(1, "#0d4a0d");
      ctx.fillStyle = pitch;
      ctx.fillRect(0, h*0.3, w, h*0.25);
      // pitch lines
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(w/2,h*0.3); ctx.lineTo(w/2,h*0.55); ctx.stroke();
      ctx.beginPath(); ctx.arc(w/2,h*0.425,40,0,Math.PI*2); ctx.stroke();
      // spotlights
      const spots = [[0,0],[w,0],[0,h*0.3],[w,h*0.3]];
      spots.forEach(([sx,sy])=>{
        const sg = ctx.createRadialGradient(sx,sy,0,sx,sy,h*0.5);
        sg.addColorStop(0,"rgba(255,240,180,0.15)");
        sg.addColorStop(1,"rgba(0,0,0,0)");
        ctx.fillStyle=sg; ctx.fillRect(0,0,w,h);
      });
    }
  },
  {
    id: "fire",
    label: "🔥 Warrior Fire",
    render: (ctx, w, h) => {
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#0a0020");
      g.addColorStop(0.6, "#1a0010");
      g.addColorStop(1, "#330000");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      // fire flames (simplified)
      for(let i=0;i<12;i++){
        const fx = (i/12)*w + w/24;
        const fw = w/10;
        const fh = h*0.25 + Math.random()*h*0.2;
        const fg = ctx.createLinearGradient(fx, h, fx, h-fh);
        fg.addColorStop(0,"rgba(255,60,0,0.9)");
        fg.addColorStop(0.4,"rgba(255,150,0,0.7)");
        fg.addColorStop(0.7,"rgba(255,220,0,0.4)");
        fg.addColorStop(1,"rgba(255,255,200,0)");
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.moveTo(fx-fw/2, h);
        ctx.bezierCurveTo(fx-fw/3, h-fh*0.5, fx+fw/3, h-fh*0.7, fx, h-fh);
        ctx.bezierCurveTo(fx-fw/4, h-fh*0.6, fx+fw/2, h-fh*0.3, fx+fw/2, h);
        ctx.fill();
      }
      // W emblem glow
      ctx.save();
      ctx.globalAlpha=0.15;
      ctx.fillStyle="#FF6600";
      ctx.font=`bold ${w*0.7}px Arial Black`;
      ctx.textAlign="center"; ctx.textBaseline="middle";
      ctx.fillText("W",w/2,h/2);
      ctx.restore();
    }
  },
  {
    id: "aotearoa",
    label: "🌿 Aotearoa Nights",
    render: (ctx, w, h) => {
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0,"#000510");
      g.addColorStop(0.5,"#001a2e");
      g.addColorStop(1,"#002a1a");
      ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
      // stars
      for(let i=0;i<120;i++){
        ctx.beginPath();
        ctx.arc(Math.random()*w, Math.random()*h*0.7, Math.random()*1.5+0.3, 0, Math.PI*2);
        ctx.fillStyle=`rgba(255,255,255,${Math.random()*0.8+0.2})`;
        ctx.fill();
      }
      // southern cross
      const sc = [[w*0.7,h*0.1],[w*0.75,h*0.22],[w*0.65,h*0.2],[w*0.72,h*0.28],[w*0.68,h*0.14]];
      sc.forEach(([sx,sy])=>{
        ctx.beginPath(); ctx.arc(sx,sy,3,0,Math.PI*2);
        ctx.fillStyle="#FFFDE0"; ctx.fill();
        const sg=ctx.createRadialGradient(sx,sy,0,sx,sy,12);
        sg.addColorStop(0,"rgba(255,253,220,0.4)"); sg.addColorStop(1,"transparent");
        ctx.fillStyle=sg; ctx.fillRect(sx-15,sy-15,30,30);
      });
      // fern silhouette
      ctx.save(); ctx.globalAlpha=0.12;
      ctx.fillStyle="#00aa44";
      ctx.font=`${h*0.8}px serif`;
      ctx.textAlign="center"; ctx.textBaseline="bottom";
      ctx.fillText("🌿",w/2,h); 
      ctx.restore();
      // horizon glow
      const hg=ctx.createLinearGradient(0,h*0.65,0,h);
      hg.addColorStop(0,"rgba(0,48,135,0)");
      hg.addColorStop(1,"rgba(0,48,135,0.4)");
      ctx.fillStyle=hg; ctx.fillRect(0,h*0.65,w,h*0.35);
    }
  }
];

function drawMeme(canvas, bgId, topText, bottomText, font) {
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0,0,w,h);
  const bg = BACKGROUNDS.find(b=>b.id===bgId) || BACKGROUNDS[0];
  bg.render(ctx, w, h);

  const drawText = (text, yPos, align="center") => {
    if(!text) return;
    const fSize = Math.max(24, Math.min(60, w / Math.max(text.length * 0.6, 6)));
    ctx.font = `900 ${fSize}px ${font}`;
    ctx.textAlign = "center";
    ctx.lineWidth = fSize * 0.18;
    ctx.strokeStyle = "#000";
    ctx.lineJoin = "round";
    ctx.strokeText(text, w/2, yPos);
    ctx.fillStyle = WARRIORS_GOLD;
    ctx.fillText(text, w/2, yPos);
    // subtle glow
    ctx.save(); ctx.globalAlpha=0.3;
    ctx.shadowColor=WARRIORS_LIGHT_BLUE; ctx.shadowBlur=20;
    ctx.fillText(text, w/2, yPos);
    ctx.restore();
  };

  drawText(topText.toUpperCase(), h * 0.12 + 40);
  drawText(bottomText.toUpperCase(), h * 0.92);

  // Warriors branding strip
  ctx.fillStyle = "rgba(0,48,135,0.85)";
  ctx.fillRect(0, h-28, w, 28);
  ctx.font = "bold 13px Arial";
  ctx.fillStyle = WARRIORS_LIGHT_BLUE;
  ctx.textAlign = "center";
  ctx.fillText("💙 ONE NEW ZEALAND WARRIORS — WARRIOR NATION 🖤", w/2, h-10);
}

export default function App() {
  const canvasRef = useRef(null);
  const [bg, setBg] = useState("logo");
  const [topText, setTopText] = useState("BOYS ON A MISSION");
  const [bottomText, setBottomText] = useState("GRAND FINAL 2026 💙🖤");
  const [font, setFont] = useState("Arial Black, Arial, sans-serif");
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [tab, setTab] = useState("manual");
  const [mood, setMood] = useState("hype");
  const [downloaded, setDownloaded] = useState(false);
  const [generating, setGenerating] = useState(false);

  const MOODS = [
    { id: "hype", label: "🔥 HYPE", desc: "Pure electric energy" },
    { id: "win", label: "🏆 WIN", desc: "Celebrate a victory" },
    { id: "loss", label: "💔 LOSS", desc: "Tough love solidarity" },
    { id: "finals", label: "🏟️ FINALS", desc: "Grand Final energy" },
    { id: "banter", label: "😂 BANTER", desc: "Cheeky rival banter" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawMeme(canvas, bg, topText, bottomText, font);
  }, [bg, topText, bottomText, font]);

  const generateAI = async () => {
    setAiLoading(true);
    setAiError("");
    setGenerating(true);
    try {
      const moodMap = {
        hype: "pure electric hype and excitement",
        win: "celebrating a big Warriors victory",
        loss: "solidarity and resilience after a tough loss — keep the faith",
        finals: "Grand Final 2026 energy, Accor Stadium, destiny calling",
        banter: "cheeky Warrior Nation banter aimed at rival NRL fans",
      };
      const sysPrompt = `You are a passionate New Zealand Warriors NRL fan creating viral meme captions for Warrior Nation. Generate two short, punchy meme text lines for a Warriors meme. Tone: ${moodMap[mood]}. Keep each line under 8 words. UPPERCASE is fine. Use NZ/NRL slang if natural. No emojis in the lines themselves. The user's idea: "${aiPrompt || "surprise me"}". Respond ONLY with valid JSON: {"top":"TOP LINE HERE","bottom":"BOTTOM LINE HERE"}`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role: "user", content: sysPrompt }]
        })
      });
      const data = await res.json();
      const raw = data.content?.[0]?.text || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setTopText(parsed.top || "WARRIOR NATION RISE");
      setBottomText(parsed.bottom || "WE NEVER GIVE UP");
      setTab("manual");
    } catch(e) {
      setAiError("AI stumbled — try again! " + e.message);
    } finally {
      setAiLoading(false);
      setGenerating(false);
    }
  };

  const downloadMeme = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = `warriors-meme-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const randomize = () => {
    const tops = ["BORN TO BE WARRIORS","NEVER SAY DIE","AUCKLAND TO THE WORLD","FROM MOUNT SMART TO DESTINY","THE BOYS ARE COOKING"];
    const bots = ["WARRIOR NATION STANDS TALL","GRAND FINAL 2026","ONCE A WARRIOR ALWAYS","BLUES AREN'T THE ONLY ONES","WE RISE TOGETHER"];
    setTopText(tops[Math.floor(Math.random()*tops.length)]);
    setBottomText(bots[Math.floor(Math.random()*bots.length)]);
  };

  return (
    <div style={{
      minHeight:"100vh", background:`linear-gradient(135deg, ${WARRIORS_BLACK} 0%, #001244 50%, ${WARRIORS_BLACK} 100%)`,
      fontFamily:"Arial Black, Arial, sans-serif", color:"white", padding:"0 0 40px"
    }}>
      {/* Header */}
      <div style={{background:`linear-gradient(90deg, ${WARRIORS_BLUE}, #001a6e, ${WARRIORS_BLUE})`, borderBottom:`3px solid ${WARRIORS_GOLD}`, padding:"18px 20px", textAlign:"center"}}>
        <div style={{fontSize:"clamp(20px,4vw,32px)", fontWeight:900, letterSpacing:2, color:WARRIORS_GOLD, textShadow:`0 0 20px ${WARRIORS_LIGHT_BLUE}`}}>
          🏉 WARRIORS MEME GENERATOR
        </div>
        <div style={{fontSize:12, color:WARRIORS_LIGHT_BLUE, marginTop:4, letterSpacing:3}}>
          POWERED BY CLAUDE AI · WARRIOR NATION 2026
        </div>
      </div>

      <div style={{maxWidth:900, margin:"0 auto", padding:"20px 16px", display:"flex", flexWrap:"wrap", gap:20}}>

        {/* Canvas preview */}
        <div style={{flex:"1 1 340px", minWidth:0}}>
          <div style={{border:`3px solid ${WARRIORS_GOLD}`, borderRadius:8, overflow:"hidden", boxShadow:`0 0 30px rgba(0,174,239,0.4)`, position:"relative"}}>
            <canvas ref={canvasRef} width={500} height={400} style={{width:"100%", display:"block"}} />
            {generating && (
              <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:WARRIORS_GOLD}}>
                ⚡ AI is generating your caption...
              </div>
            )}
          </div>

          {/* Download */}
          <button onClick={downloadMeme} style={{
            width:"100%", marginTop:12, padding:"14px", fontSize:16, fontWeight:900,
            background: downloaded ? "#00a040" : `linear-gradient(135deg, ${WARRIORS_GOLD}, #ffaa00)`,
            color: downloaded ? "white" : WARRIORS_BLUE, border:"none", borderRadius:6,
            cursor:"pointer", letterSpacing:1, transition:"all 0.2s",
            boxShadow: downloaded ? "0 0 20px rgba(0,200,80,0.5)" : `0 0 15px rgba(255,204,0,0.4)`
          }}>
            {downloaded ? "✅ SAVED — POST IT NOW!" : "📥 SAVE FOR X / SOCIAL"}
          </button>

          <button onClick={randomize} style={{
            width:"100%", marginTop:8, padding:"10px", fontSize:13, fontWeight:700,
            background:"transparent", color:WARRIORS_LIGHT_BLUE, border:`2px solid ${WARRIORS_LIGHT_BLUE}`,
            borderRadius:6, cursor:"pointer"
          }}>
            🎲 RANDOMISE CAPTIONS
          </button>
        </div>

        {/* Controls */}
        <div style={{flex:"1 1 320px", minWidth:0, display:"flex", flexDirection:"column", gap:14}}>

          {/* Background selector */}
          <div>
            <div style={{fontSize:11, color:WARRIORS_GOLD, letterSpacing:2, marginBottom:8}}>BACKGROUND</div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:6}}>
              {BACKGROUNDS.map(b => (
                <button key={b.id} onClick={() => setBg(b.id)} style={{
                  padding:"8px 10px", fontSize:12, fontWeight:700, textAlign:"left",
                  background: bg===b.id ? WARRIORS_BLUE : "rgba(255,255,255,0.06)",
                  color: bg===b.id ? WARRIORS_GOLD : "rgba(255,255,255,0.7)",
                  border: bg===b.id ? `2px solid ${WARRIORS_GOLD}` : "2px solid transparent",
                  borderRadius:6, cursor:"pointer"
                }}>{b.label}</button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div style={{display:"flex", gap:0, borderRadius:6, overflow:"hidden", border:`1px solid rgba(255,255,255,0.1)`}}>
            {[["manual","✏️ MANUAL"],["ai","⚡ AI CAPTION"]].map(([id,label])=>(
              <button key={id} onClick={()=>setTab(id)} style={{
                flex:1, padding:"10px", fontSize:12, fontWeight:700,
                background: tab===id ? WARRIORS_BLUE : "rgba(255,255,255,0.04)",
                color: tab===id ? WARRIORS_GOLD : "rgba(255,255,255,0.5)",
                border:"none", cursor:"pointer"
              }}>{label}</button>
            ))}
          </div>

          {tab === "manual" ? (
            <>
              <div>
                <div style={{fontSize:11, color:WARRIORS_GOLD, letterSpacing:2, marginBottom:6}}>TOP TEXT</div>
                <input value={topText} onChange={e=>setTopText(e.target.value)}
                  placeholder="E.g. BOYS ON A MISSION"
                  style={{width:"100%", padding:"11px 12px", fontSize:15, fontWeight:700, background:"rgba(0,48,135,0.5)", color:WARRIORS_GOLD, border:`2px solid ${WARRIORS_BLUE}`, borderRadius:6, outline:"none", boxSizing:"border-box"}} />
              </div>
              <div>
                <div style={{fontSize:11, color:WARRIORS_GOLD, letterSpacing:2, marginBottom:6}}>BOTTOM TEXT</div>
                <input value={bottomText} onChange={e=>setBottomText(e.target.value)}
                  placeholder="E.g. GRAND FINAL 2026"
                  style={{width:"100%", padding:"11px 12px", fontSize:15, fontWeight:700, background:"rgba(0,48,135,0.5)", color:WARRIORS_GOLD, border:`2px solid ${WARRIORS_BLUE}`, borderRadius:6, outline:"none", boxSizing:"border-box"}} />
              </div>
            </>
          ) : (
            <>
              <div>
                <div style={{fontSize:11, color:WARRIORS_GOLD, letterSpacing:2, marginBottom:8}}>MOOD</div>
                <div style={{display:"flex", flexWrap:"wrap", gap:6}}>
                  {MOODS.map(m=>(
                    <button key={m.id} onClick={()=>setMood(m.id)} title={m.desc} style={{
                      padding:"7px 12px", fontSize:12, fontWeight:700,
                      background: mood===m.id ? WARRIORS_BLUE : "rgba(255,255,255,0.06)",
                      color: mood===m.id ? WARRIORS_GOLD : "rgba(255,255,255,0.6)",
                      border: mood===m.id ? `2px solid ${WARRIORS_GOLD}` : "2px solid transparent",
                      borderRadius:20, cursor:"pointer"
                    }}>{m.label}</button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{fontSize:11, color:WARRIORS_GOLD, letterSpacing:2, marginBottom:6}}>YOUR IDEA (OPTIONAL)</div>
                <input value={aiPrompt} onChange={e=>setAiPrompt(e.target.value)}
                  placeholder="e.g. beating Penrith, Shaun Johnson, Mount Smart"
                  style={{width:"100%", padding:"11px 12px", fontSize:14, background:"rgba(0,48,135,0.5)", color:"white", border:`2px solid ${WARRIORS_BLUE}`, borderRadius:6, outline:"none", boxSizing:"border-box"}}
                  onKeyDown={e=>e.key==="Enter" && generateAI()} />
              </div>
              <button onClick={generateAI} disabled={aiLoading} style={{
                padding:"13px", fontSize:15, fontWeight:900,
                background: aiLoading ? "rgba(0,174,239,0.3)" : `linear-gradient(135deg, ${WARRIORS_LIGHT_BLUE}, #0077bb)`,
                color:"white", border:"none", borderRadius:6, cursor: aiLoading?"not-allowed":"pointer",
                letterSpacing:1
              }}>
                {aiLoading ? "⚡ GENERATING..." : "⚡ GENERATE WITH AI"}
              </button>
              {aiError && <div style={{fontSize:12, color:"#ff6666", padding:"8px 12px", background:"rgba(255,0,0,0.1)", borderRadius:6}}>{aiError}</div>}
            </>
          )}

          {/* Font picker */}
          <div>
            <div style={{fontSize:11, color:WARRIORS_GOLD, letterSpacing:2, marginBottom:6}}>FONT STYLE</div>
            <select value={font} onChange={e=>setFont(e.target.value)} style={{
              width:"100%", padding:"10px", fontSize:13, background:"rgba(0,48,135,0.5)",
              color:"white", border:`2px solid ${WARRIORS_BLUE}`, borderRadius:6, outline:"none"
            }}>
              <option value="Arial Black, Arial, sans-serif">Impact Style (Classic)</option>
              <option value="Georgia, serif">Serif (Powerful)</option>
              <option value="'Courier New', monospace">Monospace (Raw)</option>
              <option value="Arial, sans-serif">Clean Sans</option>
            </select>
          </div>

          {/* Tips */}
          <div style={{background:"rgba(0,48,135,0.3)", border:`1px solid rgba(0,174,239,0.2)`, borderRadius:6, padding:"12px 14px", fontSize:12, color:"rgba(255,255,255,0.6)", lineHeight:1.8}}>
            <div style={{color:WARRIORS_GOLD, fontWeight:700, marginBottom:4}}>💡 PRO TIPS</div>
            Short & punchy wins on X · Save as PNG for best quality · Tag #NZWarriors · Use AI + manual to fine-tune
          </div>
        </div>
      </div>

      <div style={{textAlign:"center", marginTop:8, fontSize:11, color:"rgba(255,255,255,0.2)", letterSpacing:2}}>
        WARRIOR NATION · FREE FOR ALL FANS · ONCE A WARRIOR ALWAYS A WARRIOR
      </div>
    </div>
  );
}
