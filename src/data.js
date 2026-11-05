// Color belongs to the skill. Every pill and tag reads from here.
export const skills = {
  python: { name: 'Python', category: 'Languages', color: '#3776AB' },
  javascript: { name: 'JavaScript', category: 'Languages', color: '#D9A400' },
  react: { name: 'React', category: 'Frontend', color: '#0E8FB5' },
  nodejs: { name: 'Node.js', category: 'Backend', color: '#3C873A' },
  postgresql: { name: 'PostgreSQL', category: 'Databases', color: '#6B4FA0' },
  sqlite: { name: 'SQLite', category: 'Databases', color: '#5A7A8C' },
  git: { name: 'Git', category: 'DevOps and Tools', color: '#E4572E' },
  docker: { name: 'Docker', category: 'DevOps and Tools', color: '#2496ED' },
}

// image and video can both stay empty (gray placeholder).
// result, github, and live are optional: leave them '' and that part simply does not show.
export const projects = [
  {
    slug: 'project-one',
    title: 'Project One',
    tagline: 'One sentence about what this project does.',
    skills: ['python', 'postgresql'],
    image: '',
    video: '',
    dates: '2026 to Present',
    result: 'One plain sentence about the outcome.',
    description: 'Three or four sentences go here. Say what the project is, what problem it solves, and what you personally built. Keep it short enough that nobody has to scroll to finish it.',
    github: 'https://github.com/BrandonCordero4',
    live: 'https://example.com',
  },
  {
    slug: 'project-two',
    title: 'Project Two',
    tagline: 'One sentence about what this project does.',
    skills: ['react', 'javascript'],
    image: '',
    video: '',
    dates: '2025',
    result: 'Another plain sentence about the outcome.',
    description: 'Three or four sentences go here. This one only has a GitHub link, so the Live site button should not appear.',
    github: 'https://github.com/BrandonCordero4',
    live: '',
  },
  {
    slug: 'project-three',
    title: 'Project Three',
    tagline: 'One sentence about what this project does.',
    skills: ['nodejs', 'sqlite', 'docker'],
    image: '',
    video: '',
    dates: '2025',
    result: '',
    description: 'Three or four sentences go here. This one has no result and no links, so both rows should be missing.',
    github: '',
    live: '',
  },
]