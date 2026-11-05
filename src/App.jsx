import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Resume from './Resume'
import Home from './Home'
import Contact from './Contact'
import ProjectPage from './ProjectPage'
import './App.css'

function NotFound() {
  return (
    <main className="contact">
      <h1 className="contact-title">Page not found</h1>
      <p className="hero-line">That page does not exist.</p>
      <Link className="btn" to="/">Back home</Link>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <div className="header-inner">
          <Link className="header-name" to="/" state={{ scrollTo: 'top' }}>Brandon Cordero</Link>
          <nav className="nav">
            <Link to="/" state={{ scrollTo: 'projects' }}>Projects</Link>
            <Link to="/" state={{ scrollTo: 'experience' }}>Experience</Link>
            <Link to="/" state={{ scrollTo: 'skills' }}>Skills</Link>
            <Link to="/contact">Contact</Link>
            <Link className="btn" to="/resume">Resume</Link>
          </nav>
        </div>
      </header>

      <div className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer className="footer">
          <span>Brandon Cordero · {new Date().getFullYear()}</span>
          <span>Made with React and deployed on Cloudflare</span>
        </footer>
      </div>
    </BrowserRouter>
  )
}