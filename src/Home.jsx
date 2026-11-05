import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GitHubCalendar } from 'react-github-calendar'
import { skills, projects, achievements, highlights } from './data'
import { Pill, Media } from './components'

/* ============================================================
   DATA. Skills, projects, and achievements now live in data.js.
   ============================================================ */

// Your circle photo. Put the file in /public and set this to '/me.jpg'.
// Leave it empty to show the BC placeholder.
const photo = ''

// The five skill categories. Each card gets its own accent color and icon.
const categories = [
  { name: 'Languages', icon: 'code', color: '#3776AB' },
  { name: 'Frontend', icon: 'monitor', color: '#0E8FB5' },
  { name: 'Backend', icon: 'server', color: '#3C873A' },
  { name: 'Databases', icon: 'database', color: '#6B4FA0' },
  { name: 'DevOps and Tools', icon: 'branch', color: '#E4572E' },
]

// One line each, no paragraphs.
// The first line is always visible. The rest only shows when the row is expanded.
// Every extra field is optional: leave it out and that slot simply does not show.
const experience = [
  {
    dates: '2026 to Present', role: 'Role Title', org: 'Organization', logo: '',
    line: 'One sentence on what you did.',
    did: 'One or two sentences on what you built or were responsible for.',
    result: 'One plain sentence about the outcome.',
    learned: 'One specific sentence about what you learned.',
    skills: ['nodejs', 'docker'],
    project: 'project-one',
  },
  {
    dates: '2025', role: 'Role Title', org: 'Organization', logo: '',
    line: 'One sentence on what you did.',
    did: 'One or two sentences on what you built or were responsible for.',
    learned: 'One specific sentence about what you learned.',
  },
]

/* ============================================================
   SMALL PIECES
   ============================================================ */

// Simple line icons, drawn inline so we need no icon library.
const icons = {
  code: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
  monitor: <><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></>,
  server: <><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></>,
  database: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" /></>,
  branch: <><line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></>,
  robot: <><rect x="4" y="8" width="16" height="12" rx="2" /><line x1="12" y1="8" x2="12" y2="4" /><circle cx="12" cy="3" r="1" /><circle cx="9" cy="13" r="1" /><circle cx="15" cy="13" r="1" /><line x1="9" y1="17" x2="15" y2="17" /><line x1="2" y1="12" x2="2" y2="16" /><line x1="22" y1="12" x2="22" y2="16" /></>,
  gamepad: <><rect x="2" y="7" width="20" height="11" rx="5" /><line x1="7" y1="10.5" x2="7" y2="14.5" /><line x1="5" y1="12.5" x2="9" y2="12.5" /><circle cx="15.5" cy="11.5" r="0.6" /><circle cx="18" cy="13.5" r="0.6" /></>,
  snake: <><path d="M18 4H9a4 4 0 0 0 0 8h6a4 4 0 0 1 0 8H6" /><circle cx="18" cy="4" r="1.2" /></>,

}

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  )
}

// Every section gets a numbered label like "01  Skills"
function Section({ id, num, title, children }) {
  return (
    <section className="section" id={id}>
      <h2 className="label">
        <span className="num">{num}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function Job({ e }) {
  const [open, setOpen] = useState(false)
  const related = projects.find((p) => p.slug === e.project)
  const hasMore = e.did || e.result || e.learned || e.skills?.length || related

  return (
    <div className={`job${open ? ' open' : ''}`}>
      <div className="job-head">
        <div className="job-logo">
          {e.logo ? <img src={e.logo} alt={e.org} /> : <span>{e.org[0]}</span>}
        </div>
        <div>
          <h3 className="job-role">{e.role} <span className="job-org">at {e.org}</span></h3>
          <p className="job-line">
            {e.line}
            {hasMore && (
              <button
                className="job-toggle"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-label={open ? 'Show less' : 'Show more'}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            )}
          </p>
        </div>
        <span className="job-dates">{e.dates}</span>
      </div>

      {hasMore && (
        <div className="job-more">
          <div className="job-more-inner">
            {e.did && (
              <div className="job-detail">
                <span className="job-detail-label">Did</span>
                <p>{e.did}</p>
              </div>
            )}
            {e.result && (
              <div className="job-detail">
                <span className="job-detail-label">Result</span>
                <p>{e.result}</p>
              </div>
            )}
            {e.learned && (
              <div className="job-detail">
                <span className="job-detail-label">Learned</span>
                <p>{e.learned}</p>
              </div>
            )}
            {e.skills?.length > 0 && (
              <div className="job-detail">
                <span className="job-detail-label">Built with</span>
                <div className="tags">
                  {e.skills.map((id) => <Pill key={id} id={id} />)}
                </div>
              </div>
            )}
            {related && (
              <div className="job-detail">
                <span className="job-detail-label">Project</span>
                <Link className="job-link" to={`/projects/${related.slug}`}>{related.title} →</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}



function ProjectCard({ p }) {
  return (
    <Link className="card" to={`/projects/${p.slug}`}>
      <div className="card-media">
        <Media p={p} />
      </div>
      <div className="card-body">
        <h3 className="card-title">{p.title}</h3>
        <p className="card-line">{p.tagline}</p>
        <div className="tags">
          {p.skills.map((id) => <Pill key={id} id={id} />)}
        </div>
      </div>
      <div className="card-foot"><span>View project</span><span className="arrow">→</span></div>
    </Link>
  )
}

/* ============================================================
   PAGE. Order is Skills, Experience, Projects, Achievements, then GitHub.
   The header and footer live in App.jsx.
   ============================================================ */

export default function Home() {
  // When a nav link sends us here with { scrollTo: 'skills' }, scroll to that section.
  // With no target (like a normal visit), start at the top.
  const { state, key } = useLocation()
  useEffect(() => {
    const el = state?.scrollTo && document.getElementById(state.scrollTo)
    if (el) el.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [key])

  return (
    <main id="top">
      <section className="hero">
        <div className="hero-text">
          <p className="status"><span className="dot" />Seeking summer 2027 internships</p>
          <h1 className="hero-name">Brandon Cordero</h1>
          <p className="hero-line">Computer science student at Denison building websites and digital archives.</p>
          <ul className="hero-facts">
            {highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </div>
        <div className="photo">
          {photo ? <img src={photo} alt="Brandon Cordero" /> : <span>BC</span>}
        </div>
      </section>

      <Section id="skills" num="01" title="Skills">
        <div className="terminal">
          <div className="terminal-bar">
            <span className="prompt">$</span>
            <span className="terminal-path">ls ~/skills</span>
          </div>
          <div className="cats">
            {categories.map((cat) => (
              <div className="cat" key={cat.name} style={{ '--cc': cat.color }}>
                <h3 className="cat-name"><Icon name={cat.icon} />{cat.name}</h3>
                <div className="tags">
                  {Object.entries(skills)
                    .filter(([, s]) => s.category === cat.name)
                    .map(([id]) => <Pill key={id} id={id} href={`#/skills/${id}`} />)}
                </div>
                <div className="cat-bg"><Icon name={cat.icon} /></div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="experience" num="02" title="Experience">
        <div className="timeline">
          {experience.map((e) => <Job key={e.role + e.dates} e={e} />)}
        </div>
      </Section>

      <Section id="projects" num="03" title="Projects">
        <div className="grid">
          {projects.map((p) => <ProjectCard key={p.slug} p={p} />)}
        </div>
      </Section>

      <Section id="achievements" num="04" title="Achievements">
        {/*
        <div className="achievements">
          {achievements.map((a) => (
            <div className="ach" key={a.title}>
              <span className="ach-place">{a.place}</span>
              <div>
                <h3 className="ach-title">{a.title}</h3>
                <p className="ach-line">{a.line}</p>
              </div>
              {a.date && <span className="ach-date">{a.date}</span>}
            </div>
          ))}
        </div>
        */}


        <div className="medals">
          {achievements.map((a) => (
            <div className="medal" key={a.title}>
              <div className="medal-bg"><Icon name={a.icon} /></div>
              <div className="medal-badge">{a.place}</div>
              <h3 className="medal-title">{a.title}</h3>
              <p className="medal-line">{a.line}</p>
              {a.date && <span className="medal-date">{a.date}</span>}
            </div>
          ))}
        </div>
      </Section>

      <Section id="github" num="05" title="GitHub">
        <div className="graph">
          <GitHubCalendar
            username="BrandonCordero4"
            colorScheme="light"
            theme={{ light: ['#EDEBE6', '#D9D7D1', '#C2C0BA', '#A9A7A1', '#8F8D87'] }}
            blockSize={16}
            blockMargin={3}
            fontSize={14}
            showColorLegend={false}
            showTotalCount={false}
          />
        </div>
      </Section>
    </main>
  )
}
