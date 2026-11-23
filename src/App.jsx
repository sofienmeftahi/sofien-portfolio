import { lazy, Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDown, Download, MapPin, Copy, Check, BadgeCheck, GraduationCap } from 'lucide-react'
import { profile, glance, ticker, steps, projects, experience, skills, certifications, education } from './data'
import Story from './components/Story'
import photo from './assets/sofien.webp'
import dp600Badge from './assets/dp600.webp'

const HeroMap = lazy(() => import('./components/HeroMap'))

const GitHubIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
)
const LinkedInIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
)

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

// The CV button only shows when the PDF is actually served next to the page.
function useCvAvailable() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    fetch(profile.cv, { method: 'HEAD' })
      .then((r) => setOk(r.ok && (r.headers.get('content-type') || '').includes('pdf')))
      .catch(() => setOk(false))
  }, [])
  return ok
}

function CvButton({ className = 'btn' }) {
  const ok = useCvAvailable()
  if (!ok) {
    return (
      <a className={className} href={profile.linkedin} target="_blank" rel="noreferrer">
        <LinkedInIcon /> LinkedIn profile
      </a>
    )
  }
  return (
    <a className={className} href={profile.cv} download>
      <Download size={17} /> Download CV
    </a>
  )
}

function Station({ color = 'blue', label, title }) {
  return (
    <div className="station" data-c={color}>
      <span className="stop" aria-hidden="true" />
      <div>
        <p className="station-label">{label}</p>
        <h2>{title}</h2>
      </div>
    </div>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#top" className="brand">
        <span className="mono-mark" aria-hidden="true">SM</span>
        Sofien Meftahi
      </a>
      <nav className="links">
        <a href="#work">Work</a>
        <a href="#experience">Experience</a>
        <a href="#skills">Skills</a>
      </nav>
      <a href="#contact" className="btn small primary">Contact</a>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-text">
        <motion.div className="id-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <img className="avatar" src={photo} alt={profile.name} width="88" height="88" />
          <p className="status"><span className="live-dot" /> Open to work · {profile.location}</p>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}>
          {profile.name}
        </motion.h1>
        <motion.p className="role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
          {profile.role}
        </motion.p>
        <motion.a className="cert-badge" href={profile.dp600} target="_blank" rel="noreferrer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <img src={dp600Badge} alt="" width="40" height="41" />
          <span className="cb-text"><b>Microsoft Certified</b><small>Fabric Analytics Engineer Associate · DP-600</small></span>
          <span className="cb-verify">Verify <ArrowUpRight size={14} /></span>
        </motion.a>
        <motion.p className="headline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          {profile.headline}
        </motion.p>
        <motion.p className="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
          {profile.intro}
        </motion.p>
        <motion.div className="cta" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
          <a href="#work" className="btn primary">See the projects</a>
          <CvButton />
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn icon" aria-label="LinkedIn"><LinkedInIcon /></a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn icon" aria-label="GitHub"><GitHubIcon /></a>
        </motion.div>
      </div>
      <div className="hero-visual">
        <Suspense fallback={<div className="map3d" />}>
          <HeroMap />
        </Suspense>
      </div>
    </section>
  )
}

function Ticker() {
  return (
    <section className="ticker" aria-label="Skills and tools">
      <div className="ticker-label"><span className="live-dot" /> Skills</div>
      <div className="ticker-rows">
        {ticker.map((row, r) => (
          <div className={`ticker-row ${r % 2 ? 'rev' : ''}`} key={r}>
            <div className="ticker-track">
              {[0, 1].map((copy) => (
                <ul key={copy} aria-hidden={copy === 1}>
                  {row.map((t) => <li key={t}>{t}</li>)}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="wrap about">
      <motion.div {...reveal} className="glance-card">
        <div className="glance-left">
          <h3>At a glance</h3>
          <p className="personal">{profile.personal}</p>
        </div>
        <dl>
          {glance.map((g) => (
            <div key={g.label}>
              <dt>{g.label}</dt>
              <dd>{g.value}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
      <motion.ol {...reveal} className="steps" aria-label="How I work">
        {steps.map((s, i) => (
          <li key={s.n} style={{ '--i': i }}>
            <span className="step-dot" aria-hidden="true" />
            <b>{s.n}</b>
            <span>{s.t}</span>
          </li>
        ))}
      </motion.ol>
    </section>
  )
}

function Overview() {
  return (
    <div className="overview">
      {projects.map((p, i) => (
        <motion.a {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }} href={`#${p.id}`} className={`ov-card t-${p.theme}`} key={p.id}>
          <div className="ov-media">
            {p.cover.video ? (
              <video src={p.cover.video} poster={p.cover.poster} autoPlay muted loop playsInline />
            ) : (
              <img src={p.cover.image} alt="" />
            )}
          </div>
          <div className="ov-body">
            <span className="ov-kicker">{p.kicker}</span>
            <h3>{p.name}</h3>
            <p>{p.summary}</p>
            <div className="ov-pills">{p.pills.map((x) => <span key={x}>{x}</span>)}</div>
            {p.demo && <span className="ov-live"><span className="live-dot" /> Live demo available</span>}
            <span className="ov-go">See the project <ArrowDown size={16} /></span>
          </div>
        </motion.a>
      ))}
    </div>
  )
}

function CaseStudy({ p, n }) {
  return (
    <section className={`band t-${p.theme}`} id={p.id}>
      <div className="wrap">
        <motion.header {...reveal} className="case-head">
          <span className="case-n">{String(n).padStart(2, '0')}</span>
          <div>
            <span className="ov-kicker">{p.kicker}</span>
            <h3>{p.name}</h3>
            <p className="case-summary">{p.summary}</p>
          </div>
          {(p.demo || p.code) && (
            <div className="case-links">
              {p.demo && <a className="btn live" href={p.demo} target="_blank" rel="noreferrer"><span className="live-dot" /> Live demo <ArrowUpRight size={16} /></a>}
              {p.code && <a className="btn ghost" href={p.code} target="_blank" rel="noreferrer"><GitHubIcon /> View the code</a>}
            </div>
          )}
        </motion.header>
        <Story story={p.story} app={p.name} />
        <div className="case-grid">
          <div className="block">
            <h4>The problem</h4>
            <p>{p.problem}</p>
            <div className="tags">{p.stack.map((x) => <span key={x}>{x}</span>)}</div>
            {p.note && <p className="note">{p.note}</p>}
          </div>
          <div className="block">
            <h4>What I built</h4>
            <ul className="built">{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
          </div>
          <div className="block">
            <h4>Results</h4>
            <div className="results">
              {p.results.map((r) => (
                <div key={r.v}><strong>{r.k}</strong><span>{r.v}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Work() {
  return (
    <>
      <section className="wrap section" id="work">
        <Station color="blue" label="Selected work" title="Four products, built end to end" />
        <p className="section-lead">I ran every app and captured its real screens. Each project below is a short tour: let it play, or pick a step.</p>
        <Overview />
      </section>
      {projects.map((p, i) => <CaseStudy key={p.id} p={p} n={i + 1} />)}
    </>
  )
}

function Experience() {
  return (
    <section className="wrap section" id="experience">
      <Station color="red" label="Experience" title="Where I've worked" />
      <ol className="metro">
        {experience.map((e) => (
          <motion.li {...reveal} key={e.company} className="job">
            <div className="job-when">
              <span className="period">{e.period}</span>
              <span className="ctx">{e.context}</span>
            </div>
            <div>
              <h3>{e.role} <span className="at">· {e.company}</span></h3>
              <ul>{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}

function Skills() {
  return (
    <section className="wrap section" id="skills">
      <Station color="green" label="Skills" title="Tools I use every day" />
      <div className="skill-table">
        {skills.map((g) => (
          <motion.div {...reveal} className="skill-row" key={g.group}>
            <h4>{g.group}</h4>
            <p>{g.items.join(' · ')}</p>
          </motion.div>
        ))}
      </div>
      <div className="creds">
        <motion.div {...reveal} className="cred">
          <h4><BadgeCheck size={20} /> Certifications</h4>
          <ul>
            {certifications.map((c) => (
              <li key={c.name} className={c.main ? 'main' : ''}>
                {c.main && <img className="cert-img" src={dp600Badge} alt="Microsoft Certified: Fabric Analytics Engineer Associate badge" width="84" height="87" />}
                <p>{c.name}</p>
                <small>{c.issuer}{c.detail ? ` · ${c.detail}` : ''}</small>
                {c.url && (
                  <a className="verify" href={c.url} target="_blank" rel="noreferrer">
                    <BadgeCheck size={16} /> Verify on Microsoft Learn <ArrowUpRight size={14} />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div {...reveal} className="cred">
          <h4><GraduationCap size={20} /> Education</h4>
          <ul>
            {education.map((e) => (
              <li key={e.degree}>
                <p>{e.degree}</p>
                <small>{e.school} · {e.period}{e.detail ? ` · ${e.detail}` : ''}</small>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }
  return (
    <section className="contact" id="contact">
      <motion.div {...reveal} className="wrap contact-inner">
        <div>
          <h2>Hiring for BI or data?<br />Let&apos;s talk.</h2>
          <p>Happy to walk you through any of these projects in a call or a live demo.</p>
        </div>
        <div className="contact-card">
          <div className="contact-who">
            <img src={photo} alt="" width="56" height="56" />
            <div><b>{profile.name}</b><span>{profile.role}</span></div>
          </div>
          <div className="email-row">
            <a href={`mailto:${profile.email}`} className="email">{profile.email}</a>
            <button className="copy" onClick={copy} aria-label="Copy email address">
              {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy</>}
            </button>
          </div>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-link"><LinkedInIcon /> {profile.linkedinLabel} <ArrowUpRight size={16} /></a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="contact-link"><GitHubIcon /> {profile.githubLabel} <ArrowUpRight size={16} /></a>
          <span className="contact-link"><MapPin size={18} /> {profile.location}</span>
          <CvButton className="btn light" />
        </div>
      </motion.div>
      <footer className="wrap footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built with React and Three.js · map data: INS Tunisia, RGPH 2024</span>
      </footer>
    </section>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Work />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </>
  )
}
