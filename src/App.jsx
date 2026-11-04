import { GitHubCalendar } from 'react-github-calendar'
import './App.css'

/* ============================================================
   DATA. Edit here. Same shapes as DESIGN.md, so splitting
   these into src/data/ files later is a copy and paste.
   ============================================================ */

// Your circle photo. Put the file in /public and set this to '/me.jpg'.
// Leave it empty to show the BC placeholder.
const photo = ''

// Your resume. Put the PDF in /public and name it resume.pdf
const resume = '/resume.pdf'

// Color belongs to the skill. Every pill and tag reads from here.
const skills = {
  python: { name: 'Python', category: 'Languages', color: '#3776AB' },
  javascript: { name: 'JavaScript', category: 'Languages', color: '#D9A400' },
  react: { name: 'React', category: 'Frontend', color: '#0E8FB5' },
  nodejs: { name: 'Node.js', category: 'Backend', color: '#3C873A' },
  postgresql: { name: 'PostgreSQL', category: 'Databases', color: '#6B4FA0' },
  sqlite: { name: 'SQLite', category: 'Databases', color: '#5A7A8C' },
  git: { name: 'Git', category: 'DevOps and Tools', color: '#E4572E' },
  docker: { name: 'Docker', category: 'DevOps and Tools', color: '#2496ED' },
}

// The five skill categories. Each card gets its own accent color and icon.
const categories = [
  { name: 'Languages', icon: 'code', color: '#3776AB' },
  { name: 'Frontend', icon: 'monitor', color: '#0E8FB5' },
  { name: 'Backend', icon: 'server', color: '#3C873A' },
  { name: 'Databases', icon: 'database', color: '#6B4FA0' },
  { name: 'DevOps and Tools', icon: 'branch', color: '#E4572E' },
]

// Each project can have an image OR a video. Leave both empty for a gray placeholder.
// Put files in /public and point to them like image: '/thumbs/one.png'
// Three columns, so keep the count at 3 or 6 to avoid a half empty row.
const projects = [
  { slug: 'project-one', title: 'Project One', tagline: 'One sentence about what this project does.', skills: ['python', 'postgresql'], image: '', video: '' },
  { slug: 'project-two', title: 'Project Two', tagline: 'One sentence about what this project does.', skills: ['react', 'javascript'], image: '', video: '' },
  { slug: 'project-three', title: 'Project Three', tagline: 'One sentence about what this project does.', skills: ['nodejs', 'sqlite', 'docker'], image: '', video: '' },
]

// One line each, no paragraphs.
const experience = [
  { dates: '2026 to Present', role: 'Role Title', org: 'Organization', line: 'One sentence on what you did.' },
  { dates: '2025', role: 'Role Title', org: 'Organization', line: 'One sentence on what you did.' },
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
}

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  )
}

// A colored tag. With href it is a link, without it is plain text.
// The color goes to CSS as --c and CSS builds the tint, border, and dark text.
function Pill({ id, href }) {
  const skill = skills[id]
  if (!skill) return null
  const Tag = href ? 'a' : 'span'
  return (
    <Tag className="pill" href={href} style={{ '--c': skill.color }}>
      {skill.name}
    </Tag>
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

// Picture or video if given, gray placeholder if not
function Media({ p }) {
  if (p.video) return <video className="media" src={p.video} autoPlay muted loop playsInline />
  if (p.image) return <img className="media" src={p.image} alt={p.title} />
  return <div className="media placeholder">Screenshot or video</div>
}

function ProjectCard({ p }) {
  return (
    <a className="card" href={`#/projects/${p.slug}`}>
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
    </a>
  )
}

/* ============================================================
   PAGE. Order is Skills, Experience, Projects, then GitHub.
   ============================================================ */

export default function App() {
  return (
    <>
      {/* Header sticks to the top so the Resume button is always in reach */}
      <header className="header">
        <div className="header-inner">
          <a className="header-name" href="#top">Brandon Cordero</a>
          <nav className="nav">
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
            <a className="btn" href={resume} target="_blank" rel="noreferrer">Resume ↗</a>
          </nav>
        </div>
      </header>

      <div className="page">
        <main id="top">
          <section className="hero">
            <div className="hero-text">
              <p className="status"><span className="dot" />Seeking summer 2027 internships</p>
              <h1 className="hero-name">Brandon Cordero</h1>
              <p className="hero-line">Computer science student at Denison building websites and digital archives.</p>
            </div>
            <div className="photo">
              {photo ? <img src={photo} alt="Brandon Cordero" /> : <span>BC</span>}
            </div>
          </section>

          <Section id="skills" num="01" title="Skills">
            {/* A light terminal window. Each category is a blocky card with a faded icon behind it. */}
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
              {experience.map((e) => (
                <div className="job" key={e.role + e.dates}>
                  <span className="job-dates">{e.dates}</span>
                  <div>
                    <h3 className="job-role">{e.role} <span className="job-org">at {e.org}</span></h3>
                    <p className="job-line">{e.line}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="projects" num="03" title="Projects">
            <div className="grid">
              {projects.map((p) => <ProjectCard key={p.slug} p={p} />)}
            </div>
          </Section>

          <Section id="github" num="04" title="GitHub">
            <div className="graph">
              <GitHubCalendar
                username="octocat"
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

        <footer className="footer">
          <span>Brandon Cordero · {new Date().getFullYear()}</span>
          <span>Made with React and deployed on Cloudflare</span>
        </footer>
      </div>
    </>
  )
}