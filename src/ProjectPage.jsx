import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { projects } from './data'
import { Pill, Media } from './components'

export default function ProjectPage() {
  const { slug } = useParams()
  const p = projects.find((x) => x.slug === slug)

  // Always start at the top when a project opens.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const back = (
    <Link className="back" to="/" state={{ scrollTo: 'projects' }}>← Projects</Link>
  )

  if (!p) {
    return (
      <main className="project">
        {back}
        <h1 className="project-title">Project not found</h1>
      </main>
    )
  }

  return (
    <main className="project">
      {back}

      <article className="project-card">
        <div className="project-top">
          <div className="project-left">
            <div className="project-media"><Media p={p} /></div>
            <span className="project-dates">{p.dates}</span>
          </div>

          <div className="project-right">
            <h1 className="project-title">{p.title}</h1>

            {p.result && (
              <div className="project-row">
                <span className="project-label">Result</span>
                <p className="project-result">{p.result}</p>
              </div>
            )}

            <div className="project-row">
              <span className="project-label">Built with</span>
              <div className="tags">
                {p.skills.map((id) => <Pill key={id} id={id} />)}
              </div>
            </div>

            {(p.github || p.live) && (
              <div className="project-links">
                {p.github && <a className="btn" href={p.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
                {p.live && <a className="btn btn-ghost" href={p.live} target="_blank" rel="noreferrer">Live site ↗</a>}
              </div>
            )}
          </div>
        </div>

        <p className="project-desc">{p.description}</p>
      </article>
    </main>
  )
}