import { useState } from 'react'

const email = 'corder_b1@denison.edu'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked, the address is still visible to copy by hand */
    }
  }

  return (
    <main className="contact">
      <p className="status"><span className="dot" />Seeking summer 2027 internships</p>
      <h1 className="contact-title">Get in touch</h1>
      <p className="hero-line">Email is the best way to reach me.</p>

      <div className="timeline contact-list">
        <div className="contact-row">
          <span className="contact-label">Email</span>
          <a className="contact-value" href={`mailto:${email}`}>{email}</a>
          <button className="copy" onClick={copyEmail}>{copied ? 'Copied' : 'Copy'}</button>
        </div>

        <a className="contact-row" href="https://github.com/BrandonCordero4" target="_blank" rel="noreferrer">
          <span className="contact-label">GitHub</span>
          <span className="contact-value">github.com/BrandonCordero4</span>
          <span className="contact-arrow">↗</span>
        </a>

        <a className="contact-row" href="https://www.linkedin.com/in/brandon-cordero4" target="_blank" rel="noreferrer">
          <span className="contact-label">LinkedIn</span>
          <span className="contact-value">linkedin.com/in/brandon-cordero4</span>
          <span className="contact-arrow">↗</span>
        </a>


      </div>
    </main>
  )
}