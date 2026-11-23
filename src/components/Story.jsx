import { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import AIInsightMock from './AIInsightMock'

// A project told as a short story: numbered steps on the left, the real screen on the right.
// It advances by itself while visible, until the visitor picks a step.

function useAvailable(url) {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    if (!url) return
    fetch(url, { method: 'HEAD' })
      .then((r) => setOk(r.ok))
      .catch(() => setOk(false))
  }, [url])
  return ok
}

function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [ref])
  return inView
}

function LiveDemo({ src, poster }) {
  return (
    <a className="poster-btn" href={src} target="_blank" rel="noreferrer">
      <img src={poster} alt="" />
      <span className="play-pill"><Play size={18} fill="currentColor" /> Open the live map</span>
    </a>
  )
}

function Screen({ s, app }) {
  if (s.kind === 'replay') return <AIInsightMock />
  if (s.kind === 'video') return <video key={s.src} src={s.src} poster={s.poster} controls playsInline preload="none" />
  if (s.kind === 'live') return <LiveDemo key={s.src} src={s.src} poster={s.poster} />
  return <img key={s.src} src={s.src} alt={`${app}: ${s.title}`} />
}

export default function Story({ story, app }) {
  const liveUrl = story.find((x) => x.kind === 'live')?.src
  const mediaUrl = story.find((x) => x.kind === 'video')?.src
  const liveLocal = useAvailable(liveUrl && !/^https?:/.test(liveUrl) ? liveUrl : null)
  const liveOk = !!liveUrl && (/^https?:/.test(liveUrl) || liveLocal)
  const mediaOk = useAvailable(mediaUrl)
  const steps = story.filter((x) => (x.kind !== 'live' || liveOk) && (x.kind !== 'video' || mediaOk))

  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(true)
  const box = useRef()
  const inView = useInView(box)
  const s = steps[Math.min(i, steps.length - 1)]

  useEffect(() => {
    if (!auto || !inView) return
    const t = setTimeout(() => {
      const next = (i + 1) % steps.length
      // stop the tour before media that the visitor should start themselves
      if (steps[next].kind === 'video' || steps[next].kind === 'live') setI(0)
      else setI(next)
    }, s.kind === 'replay' ? 9000 : s.tall ? 12000 : 6500)
    return () => clearTimeout(t)
  }, [auto, inView, i, s, steps])

  const pick = (k) => { setAuto(false); setI(k) }

  return (
    <div className="story" ref={box}>
      <ol className="story-steps" role="tablist" aria-label={`${app} tour`}>
        {steps.map((st, k) => (
          <li key={st.title}>
            <button
              role="tab"
              aria-selected={st === s}
              className={`story-step ${st === s ? 'on' : ''}`}
              onClick={() => pick(k)}
            >
              <span className="st-n">{k + 1}</span>
              <span className="st-body">
                <b>{st.title}</b>
                <span className="st-text">{st.text}</span>
              </span>
              {st === s && auto && inView && st.kind !== 'video' && st.kind !== 'live' && (
                <span key={k} className="st-timer" style={{ animationDuration: `${st.kind === 'replay' ? 9 : st.tall ? 12 : 6.5}s` }} />
              )}
            </button>
          </li>
        ))}
      </ol>
      <figure className="browser">
        <div className="browser-bar">
          <span className="dots"><i /><i /><i /></span>
          <span className="url">{s.url}</span>
          {s.kind === 'live' && <span className="badge-live">Live</span>}
        </div>
        <div className={`screen is-${s.kind} ${s.tall ? 'tall' : ''}`}>
          <Screen s={s} app={app} />
        </div>
      </figure>
      <p className="story-mobile-text">{s.text}</p>
    </div>
  )
}
