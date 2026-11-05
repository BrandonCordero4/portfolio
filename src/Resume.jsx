import { useEffect } from 'react'

const file = '/resume.pdf'
const image = '/resume.png'
const downloadName = 'Brandon-Cordero-Resume.pdf'

export default function Resume() {
  // Always start at the top when this page opens.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="resume">
      <div className="resume-top">
        <h1 className="contact-title">Resume</h1>
        <div className="resume-actions">
          <a className="btn btn-ghost" href={file} target="_blank" rel="noreferrer">Open in new tab ↗</a>
          <a className="btn" href={file} download={downloadName}>Download</a>
        </div>
      </div>

      <a className="resume-sheet" href={file} target="_blank" rel="noreferrer">
        <img src={image} alt="Brandon Cordero's resume" />
      </a>
    </main>
  )
}