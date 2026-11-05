import { skills } from './data'

// A colored tag. With href it is a link, without it is plain text.
export function Pill({ id, href }) {
  const skill = skills[id]
  if (!skill) return null
  const Tag = href ? 'a' : 'span'
  return (
    <Tag className="pill" href={href} style={{ '--c': skill.color }}>
      {skill.name}
    </Tag>
  )
}

// Picture or video if given, gray placeholder if not
export function Media({ p }) {
  if (p.video) return <video className="media" src={p.video} autoPlay muted loop playsInline />
  if (p.image) return <img className="media" src={p.image} alt={p.title} />
  return <div className="media placeholder">Screenshot or video</div>
}