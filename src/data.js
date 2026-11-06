// Color belongs to the skill. Every pill and tag reads from here.
export const skills = {
  python: { name: 'Python', category: 'Languages', color: '#3776AB' },
  javascript: { name: 'JavaScript', category: 'Languages', color: '#D9A400' },
  cpp: { name: 'C++', category: 'Languages', color: '#00599C' },
  csharp: { name: 'C#', category: 'Languages', color: '#68217A' },
  php: { name: 'PHP', category: 'Languages', color: '#777BB4' },
  react: { name: 'React', category: 'Frontend', color: '#0E8FB5' },
  html: { name: 'HTML', category: 'Frontend', color: '#E34F26' },
  css: { name: 'CSS', category: 'Frontend', color: '#1572B6' },
  nodejs: { name: 'Node.js', category: 'Backend', color: '#3C873A' },
  claudeapi: { name: 'Claude API', category: 'Backend', color: '#D97757' },
  omekas: { name: 'Omeka S', category: 'Backend', color: '#8A5A2B' },
  mysql: { name: 'MySQL', category: 'Databases', color: '#00758F' },
  mariadb: { name: 'MariaDB', category: 'Databases', color: '#4B5F6B' },
  firestore: { name: 'Firestore', category: 'Databases', color: '#E08A00' },
  git: { name: 'Git', category: 'DevOps and Tools', color: '#E4572E' },
  github: { name: 'GitHub', category: 'DevOps and Tools', color: '#3D434B' },
  docker: { name: 'Docker', category: 'DevOps and Tools', color: '#2496ED' },
  cloudflare: { name: 'Cloudflare', category: 'DevOps and Tools', color: '#F38020' },
  raspberrypi: { name: 'Raspberry Pi', category: 'DevOps and Tools', color: '#C51A4A' },
  arduino: { name: 'Arduino', category: 'DevOps and Tools', color: '#00979D' },
  godot: { name: 'Godot', category: 'DevOps and Tools', color: '#478CBF' },
  playwright: { name: 'Playwright', category: 'DevOps and Tools', color: '#2EAD33' },
  cli: { name: 'CLI', category: 'DevOps and Tools', color: '#6B675F' },
}

// image and video can both stay empty (gray placeholder).
// To add a picture later, drop the file in the public folder and set image to '/yourfile.png'.
// result, github, and live are optional. Leave them '' and that part simply does not show.
export const projects = [
  {
    slug: 'eugenics-ghost-project',
    title: 'Eugenics Ghost Project',
    tagline: 'A custom built digital archive, served from a Raspberry Pi.',
    skills: ['omekas', 'php', 'docker', 'cloudflare', 'raspberrypi'],
    image: '/eugenicghosts.png',
    video: '',
    dates: 'May to Jul 2026',
    result: 'Published at a custom domain with no port forwarding or static IP.',
    description: 'A digital archive built on Omeka S. I wrote the custom theme and the HTML content blocks from scratch. I containerized the stack with Docker Compose (PHP, Apache, and MariaDB) and deployed it to a Raspberry Pi 5. A Cloudflare Tunnel and a DNS migration serve it at its own domain.',
    github: '',
    live: '',
  },
  {
    slug: 'chess-robot',
    title: 'Chess Playing Robot',
    tagline: 'A robot that plays chess against you on a real board.',
    skills: ['cpp', 'raspberrypi', 'arduino'],
    image: '/chess-robot.jpg',
    video: '',
    dates: 'In progress',
    result: '',
    description: 'A robot with a gantry that moves pieces on a physical board. It carries out the player\'s move, then plays its own reply, which is chosen by the Stockfish chess engine. The control code is written in C++ and runs across a Raspberry Pi 4 and an Arduino. Built with the Robotics Club.',
    github: '',
    live: '',
  },
  {
    slug: 'library-scraper',
    title: 'Library Catalog Scraper',
    tagline: 'Automates catalog lookups for librarians working through collections.',
    skills: ['playwright'],
    image: '/linkedin.jpg',
    video: '',
    dates: 'Aug 2026 to Present',
    result: 'Saves over 100 hours of work every year.',
    description: 'A Playwright scraper that reads a librarian\'s Excel inventory, looks up each title in the catalog, counts holdings, and writes the results back into the spreadsheet. I deployed it as a web app where librarians upload a collection and get the results back. It speeds up the weeding process at the Denison University Library.',
    github: '',
    live: '',
  },
]


// One row per achievement. "place" is the big orange label on the left.
// Leave date as '' to hide it.
export const achievements = [
  {
    place: '1st',
    title: 'Maze Navigation Competition',
    line: 'Led design, build, and code of an autonomous robot with a manual override. Robotics Club.',
    date: '',
    icon: 'robot',
  },
  {
    place: '1st',
    title: 'Club Game Jam',
    line: 'Built a Godot game in C# in 3 weeks and placed first of 5 teams. Coding Club.',
    date: '',
    icon: 'gamepad',
  },
  {
    place: '1st',
    title: 'DU Slither Competition',
    line: 'Python snake bot built over 8 weeks beat 8 other bots and won a $100 Raspberry Pi.',
    date: '',
    icon: 'snake',
  },
]

// Short facts shown in one line under the hero tagline. Two is the sweet spot.
export const highlights = [
  'President, Robotics Club',
  'Amateur MMA and BJJ fighter',
]