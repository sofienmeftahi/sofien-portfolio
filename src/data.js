// ─────────────────────────────────────────────────────────────
//  All the text of the portfolio lives here.
//  To add a project: copy one object in `projects`, change it,
//  and put its screenshots in src/assets/projects/ (videos in public/media/).
// ─────────────────────────────────────────────────────────────
import aiiDashboardTall from './assets/projects/aii-dashboard-tall.webp'
import aiiApprove from './assets/projects/aii-credit-approve.webp'
import aiiReject from './assets/projects/aii-credit-reject.webp'
import tnMap from './assets/projects/tn-map.webp'
import tnDerja from './assets/projects/tn-ai-derja.webp'
import tnJendouba from './assets/projects/tn-ai-jendouba.webp'
import tnFrench from './assets/projects/tn-ai-french.webp'
import tnImadas from './assets/projects/tn-imadas.webp'
import studioSalesTall from './assets/projects/studio-sales-tall.webp'
import studioSalesDark from './assets/projects/studio-sales-dark.webp'
import studioCensus from './assets/projects/studio-census-dark.webp'
import studioLight from './assets/projects/studio-sales-light.webp'
import studioCopilot from './assets/projects/studio-copilot.webp'

import lgHome from './assets/projects/lg-home.webp'
import lgLesson from './assets/projects/lg-lesson.webp'
import lgExercises from './assets/projects/lg-exercises.webp'
import lgScam from './assets/projects/lg-scam.webp'
import lgGuide from './assets/projects/lg-guide.webp'
import lgExams from './assets/projects/lg-exams.webp'

const media = (f) => `./media/${f}`

export const profile = {
  name: 'Sofien Meftahi',
  role: 'BI Developer & Microsoft Fabric Analytics Engineer',
  location: 'Jendouba, Tunisia',
  email: 'sofien.meftahi02@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sofien-meftahi',
  linkedinLabel: 'linkedin.com/in/sofien-meftahi',
  github: 'https://github.com/sofienmeftahi',
  githubLabel: 'github.com/sofienmeftahi',
  cv: './Sofien_Meftahi_CV.pdf',
  dp600: 'https://learn.microsoft.com/en-us/users/sofienmeftahi-3482/credentials/c25aed162a575647',
  headline: 'I build the whole analytics chain, from raw files to the dashboard and the AI on top.',
  personal:
    'Based in Jendouba. I like building data products about places I know: two of my projects put the 2024 Tunisian census on a map.',
  intro:
    'Microsoft Certified Fabric Analytics Engineer with an M.Sc. in Data Mining, Analysis and Visualization. I design lakehouse pipelines, star-schema warehouses and Power BI models, and I ship full-stack analytics apps where an LLM writes the SQL but the data stays the source of truth.',
}

export const glance = [
  { label: 'Looking for', value: 'BI Developer · Analytics Engineer · Data Analyst' },
  { label: 'Work mode', value: 'On-site in Tunisia, hybrid or remote' },
  { label: 'Certified', value: 'Microsoft DP-600 · Fabric Analytics Engineer Associate' },
  { label: 'Languages', value: 'Arabic, French, English · German A2' },
]

// The scrolling bar under the hero (two rows, moving in opposite directions)
export const ticker = [
  ['Microsoft Fabric', 'Power BI', 'DAX', 'PySpark', 'Lakehouse', 'Medallion architecture', 'Star schema', 'T-SQL', 'Data Factory', 'Semantic models', 'Direct Lake'],
  ['DP-600 certified', 'NL-to-SQL', 'Claude & GPT-4o', 'Python', 'scikit-learn', 'FastAPI', 'React', 'Next.js', 'DuckDB', 'D3.js', 'Docker'],
]

export const steps = [
  { n: 'Ingest', t: 'Raw files and databases land in a Bronze layer, untouched and traceable.' },
  { n: 'Model', t: 'Silver cleans and conforms; Gold becomes a star schema the business can trust.' },
  { n: 'Visualize', t: 'Semantic models and dashboards people open every morning.' },
  { n: 'Explain', t: 'AI on top that answers with real queries, never invented numbers.' },
]

// Real GPT-4o output from the AI-Insight benchmark (backend/benchmark_nl2sql_results.json),
// re-run on the project database for the result.
export const replay = {
  question: 'Top 5 agencies by transaction volume.',
  sql: `SELECT dag.name,
       ROUND(SUM(ft.amount), 2) AS total_volume
FROM fact_transaction ft
JOIN dim_agency dag ON ft.source_agency_id = dag.id
GROUP BY dag.name
ORDER BY total_volume DESC
LIMIT 5`,
  rows: [
    ['AVENUE DE FRANCE', 11414881.2],
    ['KRAM OUEST', 11276906.09],
    ['LAC MALL', 11152109.72],
    ['Agence Kef', 10750921.08],
    ['Agence Hammamet', 10685551.87],
  ],
  meta: 'GPT-4o · benchmark run of 16 Nov 2026 · 1.48 s · matched the reference query',
}

export const projects = [
  {
    id: 'tunisia-insight',
    name: 'Tunisia Regional Insight',
    kicker: 'Personal project · open data + AI',
    theme: 'night',
    summary: 'The 2024 Tunisian census on one interactive map, down to every imada, and an AI you can ask in Derja.',
    cover: { video: media('ai-loop.mp4'), poster: tnDerja },
    pills: ['2,082 imadas', '25 indicators', 'AI in Derja · FR · AR'],
    code: 'https://github.com/sofienmeftahi/tunisia-regional-insight',
    demo: 'https://sofienmeftahi.github.io/tunisia-regional-insight/',
    problem:
      'The RGPH 2024 census is published as dozens of separate Excel files, so comparing one region with another takes hours of manual work.',
    built: [
      'Python pipeline that parses ~56 INS Excel files and checks totals against the official figures (11,972,169 inhabitants)',
      'Matching of ~60 renamed imada codes by code and by French and Arabic name',
      'D3.js map with 5 levels and 25 indicators, national ranks, search, shareable links and a phone layout',
      'Claude-powered chat in Derja, French or Arabic that lights up the places it mentions; the numbers on the cards are read from the data, never written by the model',
    ],
    results: [
      { k: '2,082', v: 'imadas, across 279 delegations and 24 governorates' },
      { k: '25', v: 'indicators: unemployment, schooling, water, gas, internet…' },
      { k: '3', v: 'languages understood by the AI' },
    ],
    stack: ['Python', 'Data pipeline', 'D3.js', 'Claude API', 'Open data'],
    story: [
      { kind: 'image', src: tnMap, url: 'tunisia-insight', title: 'The map', text: 'Tunisia by governorate, delegation or imada. Pick one of 25 INS indicators and the whole map recolors, with national ranks on the right.' },
      { kind: 'image', src: tnDerja, url: 'tunisia-insight · AI', title: 'Ask the AI in Derja', text: '“chniya a9al 5 wileyet fihom internet fil dyar?” The AI answers in Derja and lights the five governorates in red on the map.' },
      { kind: 'image', src: tnJendouba, url: 'tunisia-insight · AI · Jendouba', title: 'It zooms where it talks', text: 'Follow-up about Jendouba: the map zooms to its delegations and highlights Ghardimaou, Oued Meliz and Aïn Draham.' },
      { kind: 'image', src: tnFrench, url: 'tunisia-insight · AI', title: 'French and Arabic too', text: '“Compare Tunis et Kasserine”: a sourced comparison in French, every figure taken straight from the INS data.' },
      { kind: 'image', src: tnImadas, url: 'tunisia-insight · imadas', title: 'Down to every imada', text: 'The same indicators for all 2,082 imadas, the smallest unit of the census.' },
      { kind: 'video', src: media('demo-voice-720.mp4'), poster: media('poster.jpg'), url: 'tunisia-insight · demo', title: 'Watch the 70-second demo', text: 'The full tour with a Tunisian Arabic voice-over. Turn the sound on.' },
      { kind: 'live', src: 'https://sofienmeftahi.github.io/tunisia-regional-insight/', poster: tnMap, url: 'sofienmeftahi.github.io/tunisia-regional-insight', title: 'Explore the map live', text: 'The real app, live on GitHub Pages. The map is fully live; the AI chat needs its API key, so here it answers in simple local mode.' },
    ],
  },
  {
    id: 'ai-insight',
    name: 'AI-Insight',
    kicker: "Master's final project at San.sa",
    theme: 'forest',
    summary: 'Conversational analytics for a bank: ask a question in plain language, get the SQL, the chart and the insight. Plus an explainable credit-scoring engine.',
    cover: { image: aiiApprove },
    pills: ['20/20 NL-to-SQL', 'ROC-AUC 0.94', 'Microsoft Fabric'],
    problem:
      'Banking analysts depend on someone who writes SQL every time they have a new question about customers, credits or agencies.',
    built: [
      'Bronze–Silver–Gold PySpark pipeline in a Fabric Lakehouse, with a Power BI semantic model and an embedded dashboard',
      'GPT-4o NL-to-SQL engine: question → SQL → 4-layer safety filter → read-only run → chart, table and written insight',
      'Explainable credit scoring: policy rules, 3 models compared with 5-fold CV, per-factor explanation and counter-offer',
      'React 19 + FastAPI app with token auth, Docker Compose, 34 automated tests, delivered in 6 sprints',
    ],
    results: [
      { k: '20/20', v: 'benchmark questions answered correctly, 1.24 s on average' },
      { k: '0.94', v: 'ROC-AUC of the selected credit model' },
      { k: '10/10', v: 'dangerous test queries blocked by the safety filter' },
    ],
    stack: ['Microsoft Fabric', 'PySpark', 'Power BI', 'FastAPI', 'React 19', 'GPT-4o', 'scikit-learn', 'Docker'],
    note: 'Proof of concept on synthetic banking data.',
    story: [
      { kind: 'image', tall: true, src: aiiDashboardTall, url: 'ai-insight · dashboard', title: 'KPI dashboard', text: 'Transaction volume, approval rate, credit granted and deposits, computed live from the warehouse and filtered by year and zone.' },
      { kind: 'replay', url: 'ai-insight · ask the data', title: 'Ask the data', text: 'A real exchange from the benchmark: the question, the SQL GPT-4o wrote, and the result it returns on the project database.' },
      { kind: 'image', src: aiiApprove, url: 'ai-insight · credit scoring', title: 'Credit: approved', text: 'A 30,000 DT car loan on 3,000 DT income scores 92/100: debt ratio 21% against a 40% limit, every rule checked and every factor explained.' },
      { kind: 'image', src: aiiReject, url: 'ai-insight · credit scoring', title: 'Credit: rejected, with an offer', text: 'Same loan on 1,150 DT income: the debt ratio hits 56%, a policy rule overrides the model, and the app proposes 21,400 DT instead.' },
    ],
  },
  {
    id: 'insight-studio',
    name: 'Insight Studio',
    kicker: 'Personal project · product',
    theme: 'violet',
    summary: 'A self-hosted BI platform: Power BI-style dashboards, and an AI analyst that builds them for you.',
    cover: { image: studioSalesDark },
    pills: ['20+ visual types', 'DuckDB engine', 'AI Copilot'],
    problem:
      'Teams with Excel files and a database but no BI stack need dashboards without paying per-seat licences or setting up a server.',
    built: [
      'Import of CSV and Excel, live PostgreSQL and MySQL connections, column profiling',
      'Embedded DuckDB engine: up to 1M rows per table, aggregated in milliseconds',
      'Dashboard builder with field wells, 20+ visual types, cross-filtering, slicers, world and Tunisia maps',
      'AI Copilot that runs read-only SQL, draws charts in the chat and assembles complete dashboards',
    ],
    results: [
      { k: '20+', v: 'visual types, from KPI cards to treemaps and maps' },
      { k: '279', v: 'Tunisian delegations matched in French and Arabic' },
      { k: 'AES-256', v: 'encryption of stored database credentials' },
    ],
    stack: ['Next.js', 'TypeScript', 'DuckDB', 'ECharts', 'PostgreSQL', 'MySQL', 'Claude API'],
    story: [
      { kind: 'image', tall: true, src: studioSalesTall, url: 'insight-studio · sales dashboard', title: 'Sales dashboard', text: '11 visuals on 12,000 orders: KPI cards with trends, world and Tunisia maps, rankings and a table with data bars.' },
      { kind: 'image', src: studioCopilot, url: 'insight-studio · ask ai', title: 'AI Copilot', text: '“Which category sells the most?” The Copilot runs the query, draws the chart and lets you pin it to any dashboard.' },
      { kind: 'image', src: studioCensus, url: 'insight-studio · census 2024', title: 'Census 2024', text: 'The INS census as a dashboard: population by governorate and growth from 2014 to 2024.' },
      { kind: 'image', src: studioLight, url: 'insight-studio · sales dashboard', title: 'Light theme', text: 'Every dashboard works in light and dark, with cross-filtering, slicers and CSV or PNG export.' },
    ],
  },
  {
    id: 'learn-germany',
    name: 'Learn Germany',
    kicker: 'Personal project · EdTech + AI',
    theme: 'sky',
    summary: 'German for Tunisians heading to Germany: A1 to B2 lessons explained in Derja, an AI teacher, mock Goethe/telc exams and a guide to the Ausbildung path.',
    cover: { video: media('lg-loop.mp4'), poster: lgHome },
    pills: ['12 lessons · 126 exercises', 'AI teacher in Derja', 'Scam checker'],
    problem:
      'Thousands of Tunisians prepare for an Ausbildung or studies in Germany with scattered resources in other languages, and many fall for fake recruitment agencies.',
    built: [
      '12 A1 lessons written from the CEFR, with audio vocabulary, grammar tables, dialogues and tips for Tunisians',
      '126 exercises: multiple choice, fill-in, listening and writing, with progress saved in the browser',
      '“Ostedh Hans”, a Claude-powered teacher that speaks German, explains in Derja and corrects mistakes, with voice in and out',
      'Mock B1/B2 Schreiben and Sprechen exams graded on exam criteria, job vocabulary (care, hotel, mechanics) and interview simulation',
      'A rules-based scam checker that flags fake job and visa offers instantly, plus an AI second opinion',
    ],
    results: [
      { k: '126', v: 'exercises across 12 A1 lessons' },
      { k: '8', v: 'B1/B2 exam topics with AI correction' },
      { k: '10', v: 'anti-scam rules that work without AI' },
    ],
    stack: ['Next.js 15', 'TypeScript', 'Tailwind', 'Claude API', 'Web Speech API'],
    story: [
      { kind: 'image', src: lgHome, url: 'learn-germany', title: 'Home', text: 'German explained in Derja, from the first lesson to the visa: lessons, AI teacher, mock exams and the full guide in one place.' },
      { kind: 'image', src: lgLesson, url: 'learn-germany · A1 · lesson 1', title: 'A lesson', text: 'Each lesson has clear goals, a table of contents, vocabulary with audio, grammar, dialogues and tips written for Tunisians.' },
      { kind: 'image', src: lgExercises, url: 'learn-germany · exercises', title: 'Exercises', text: 'Instant feedback in Derja: the right answer in green, and a short explanation of why when you get it wrong.' },
      { kind: 'image', src: lgScam, url: 'learn-germany · scam checker', title: 'Scam checker', text: 'Paste a suspicious offer: “visa in 15 days, pay by Western Union” scores 100/100 risk, with each red flag explained.' },
      { kind: 'image', src: lgGuide, url: 'learn-germany · guide', title: 'The path to Germany', text: 'Step by step for Ausbildung, studies or nurse recognition, with a dossier checklist and links to official sites.' },
      { kind: 'image', src: lgExams, url: 'learn-germany · exams', title: 'Mock exams', text: 'B1 and B2 Schreiben and Sprechen topics with a timer and AI correction on the real exam criteria.' },
      { kind: 'video', src: media('lg-demo.mp4'), poster: media('lg-poster.jpg'), url: 'learn-germany · demo', title: 'Watch the 50-second demo', text: 'A quick walk through the lessons, exercises, scam checker, guide and exams.' },
    ],
  },
]

export const experience = [
  {
    role: 'Data Analyst & AI Intern',
    company: 'San.sa',
    period: 'Jan 2026 – Jun 2026',
    context: "Master's final internship",
    points: [
      'Designed and built AI-Insight, an LLM-powered analytics platform on Microsoft Fabric (React 19, FastAPI, Docker).',
      'Built a Bronze–Silver–Gold PySpark pipeline in a Fabric Lakehouse: star schema of 4 fact and 7 dimension Delta tables, ~100K transactions.',
      'Shipped a GPT-4o NL-to-SQL engine with a safety layer and voice input; 95% (38/40) on an automated business validation.',
    ],
  },
  {
    role: 'Data Analyst & BI Intern',
    company: 'MajestEYE',
    period: 'Jan 2024 – May 2024',
    context: "Bachelor's final project",
    points: [
      'Extracted official population and socio-economic data from INS Tunisia, then cleaned and structured it with Python.',
      "Forecast Tunisia's 2024 population from historical census data, months before the RGPH 2024 census.",
      'Built an interactive Power BI dashboard combining the historical series with the 2024 forecast.',
    ],
  },
]

export const skills = [
  { group: 'Microsoft Fabric', items: ['OneLake', 'Lakehouse', 'Data Warehouse', 'Data Factory', 'Semantic models', 'Direct Lake', 'Medallion architecture'] },
  { group: 'BI & reporting', items: ['Power BI', 'DAX', 'Data modeling', 'Star schema', 'KPI reporting', 'Tableau', 'Alteryx', 'SSIS'] },
  { group: 'Data & ETL', items: ['SQL', 'T-SQL', 'PostgreSQL', 'MySQL', 'Oracle DB', 'MongoDB', 'DuckDB', 'PySpark'] },
  { group: 'Python & AI', items: ['Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'TensorFlow', 'spaCy', 'BERT', 'LLM integration', 'NL-to-SQL'] },
  { group: 'Engineering', items: ['React', 'Next.js', 'FastAPI', 'Flask', 'D3.js', 'Docker', 'Git', 'Azure', 'Oracle Cloud'] },
]

export const certifications = [
  { name: 'Microsoft Certified: Fabric Analytics Engineer Associate', issuer: 'Microsoft · DP-600', detail: 'Score 800/1000 · valid until Mar 2028', main: true, url: 'https://learn.microsoft.com/en-us/users/sofienmeftahi-3482/credentials/c25aed162a575647' },
  { name: 'OCI AI Foundations Associate', issuer: 'Oracle', detail: 'Nov 2025' },
  { name: 'Alteryx Designer Core', issuer: 'Alteryx', detail: 'Valid until Dec 2027' },
  { name: 'GitHub Foundations', issuer: 'GitHub', detail: 'Valid until Mar 2027' },
  { name: 'Business Intelligence Specialization', issuer: 'University of Virginia', detail: '' },
]

export const education = [
  { degree: 'M.Sc. Data Mining, Analysis and Visualization', school: 'University of Jendouba', period: '2024 – 2026' },
  { degree: 'B.Sc. Business Intelligence', school: 'University of Jendouba', period: '2021 – 2024', detail: 'Mention Bien · GPA 15.32/20' },
]
