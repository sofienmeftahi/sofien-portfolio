import { useEffect, useState } from 'react'
import { replay } from '../data'

// Replay of a real AI-Insight exchange: the question and the SQL come from the
// GPT-4o benchmark run, the rows from running that SQL on the project database.
const MAX = Math.max(...replay.rows.map((r) => r[1]))
const fmt = (v) => `${(v / 1e6).toFixed(2)} M DT`

export default function AIInsightMock() {
  const [step, setStep] = useState(0)
  const [typed, setTyped] = useState('')

  useEffect(() => {
    const timers = []
    const run = () => {
      setStep(0)
      setTyped('')
      let i = 0
      const type = setInterval(() => {
        i++
        setTyped(replay.question.slice(0, i))
        if (i >= replay.question.length) {
          clearInterval(type)
          timers.push(setTimeout(() => setStep(1), 400))
          timers.push(setTimeout(() => setStep(2), 1800))
          timers.push(setTimeout(run, 9000))
        }
      }, 38)
      timers.push(type)
    }
    run()
    return () => timers.forEach((t) => { clearInterval(t); clearTimeout(t) })
  }, [])

  return (
    <div className="mock">
      <div className="mock-body">
        <div className="bubble user">
          {typed}
          {step === 0 && <span className="caret" />}
        </div>
        <div className={`mock-block ${step >= 1 ? 'in' : ''}`}>
          <div className="mock-label"><span>SQL written by GPT-4o</span></div>
          <pre className="sql">{replay.sql}</pre>
        </div>
        <div className={`mock-block ${step >= 2 ? 'in' : ''}`}>
          <div className="mock-label"><span>Result on the project database</span><span className="badge ok">✓ matched the reference query</span></div>
          <div className="bars">
            {replay.rows.map(([l, v], i) => (
              <div className="bar-row" key={l}>
                <span className="bar-l">{l}</span>
                <span className="bar-track">
                  <span className="bar-fill" style={{ width: step >= 2 ? `${(v / MAX) * 100}%` : 0, transitionDelay: `${i * 90}ms` }} />
                </span>
                <span className="bar-v">{fmt(v)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mock-foot">{replay.meta} · synthetic banking data</div>
    </div>
  )
}
