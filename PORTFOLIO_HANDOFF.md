# Portfolio Handoff

Handoff notes for any AI agent picking up this project. Read this first, then read the code files. Where this file and the code disagree, the code is right, and please fix this file.

## 1. What this is

Brandon Cordero's personal portfolio website. Brandon is a sophomore at Denison University (computer science major, math minor, class of 2029) applying to many kinds of summer 2027 internships. Recruiters and hiring managers are the main audience, and many will give the site about 10 seconds.

The site is a static React single page app. There is no backend, no database, no login, and no secrets. Everything in the repo is public.

## 2. Stack and environment

| Item | Value |
| --- | --- |
| Framework | React with Vite |
| Routing | react-router-dom using BrowserRouter |
| Styling | One plain stylesheet, src/App.css (no CSS framework, no Tailwind) |
| Language | JavaScript (JSX), no TypeScript |
| Dev machine | NixOS, Node v24, VS Code and terminal |
| Repo | github.com/BrandonCordero4/portfolio, branch main |
| Local folder | ~/NodeJs/portfolio |
| Hosting | Cloudflare Workers with static assets |
| Live URL | https://portfolio.corder-b1.workers.dev (temporary, custom domain not bought yet) |

Commands

- npm run dev starts the dev server
- npm run build creates the dist folder
- npm run preview serves the built site at about localhost:4173 so the real build can be tested

## 3. Deployment flow

1. Brandon commits and pushes to main on GitHub.
2. Cloudflare rebuilds with npm run build and deploys with npx wrangler deploy. This takes about a minute.
3. The live site updates. No manual step is needed.

wrangler.jsonc in the project root tells Cloudflare to serve the dist folder and to answer unknown paths with index.html. That second setting (not_found_handling set to single-page-application) is what makes refreshing on /resume or /projects/anything work. Do not remove it. If routing ever changes away from BrowserRouter, revisit it.

```jsonc
{
  "name": "portfolio",
  "compatibility_date": "2026-11-05",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  }
}
```

History worth knowing. Cloudflare's create app wizard failed with an Internal server error, so the first deploy was done from the terminal with npx wrangler login and npx wrangler deploy. GitHub auto deploy was then connected from the Worker's Settings, Builds section. If a build ever fails on the Node version, set a build variable named NODE_VERSION to 24.

Domain plan. Buy a domain through Cloudflare, then add it as a custom domain on the Worker. Nothing in the code needs to change for this, since all links are relative. After the domain exists, add an og:image tag with the full URL to index.html.

## 4. File map

```
index.html            page title, description, theme color, link preview tags, favicon link
wrangler.jsonc        Cloudflare config (see above)
public/               files served from the site root, referenced like /resume.pdf
  favicon.svg         BC monogram
  resume.pdf          downloadable resume
  resume.png          image of the resume shown on the Resume page
  linkedin.jpg        profile photo and the stand in image used while building
  (logos and project images also live here)
  icons.svg           leftover from the Vite template, safe to delete
src/
  main.jsx            React entry, imports index.css and App
  App.jsx             header, nav, routes, footer, and the NotFound page
  Home.jsx            the front page, plus the experience array and skill categories
  data.js             skills, projects, competitions, hero facts
  components.jsx      shared Pill (skill tag) and Media (image, video, or placeholder)
  ProjectPage.jsx     one project at /projects/:slug
  Contact.jsx         email with copy button, GitHub, LinkedIn
  Resume.jsx          resume image with open and download buttons
  App.css             every style for the whole site
```

Routes

| Path | Component |
| --- | --- |
| / | Home |
| /contact | Contact |
| /projects/:slug | ProjectPage (shows Project not found for a bad slug) |
| /resume | Resume |
| anything else | NotFound, defined in App.jsx |

## 5. How content works

Content is kept separate from layout. Most updates only touch data, not components.

All public paths start with a slash, for example /bettr-logo.jpg, never ../public/. File names are case sensitive on Cloudflare, so match the real file name exactly.

Almost every field is optional. An empty string hides that piece of the page.

### Skills (data.js, the skills object)

Each skill has an id key, a display name, a category, and a color. The category must be one of the five names used in Home.jsx, which are Languages, Frontend, Backend, Databases, and DevOps and Tools. The color belongs to the skill and is reused everywhere that skill appears as a Pill. Skill ids are what projects, experience, and competitions reference.

### Projects (data.js, the projects array)

Fields are slug, title, tagline, skills (array of skill ids), image, video, dates, result, description, github, and live. The slug becomes the URL. If video is set it wins over image. If both are empty a gray placeholder shows. Empty result, github, or live hides that row or button.

### Competitions (data.js, the achievements array)

The array keeps its old name achievements, but the section on the page is titled Competitions. Fields are place (any text like 1st, 3rd, or Finalist), of (size of the field, shown as "of 9 bots"), host (who ran it), date, title, line, and skills. The of field is how scale is communicated, so fill it in whenever possible.

### Experience (Home.jsx, the experience array)

Fields are dates, role, org, logo, line (always visible), did, result, learned, skills (array of ids), and project (a project slug that adds a link). Rows with extra detail expand on click.

### Hero facts (data.js, the highlights array)

Short facts shown in one line under the hero sentence. Two works best.

### Other content that lives in Home.jsx

- photo is the path to the profile picture
- The hero sentence, status line, and Tagore quote are written directly in the JSX
- categories defines the five skill cards, their icons, and their accent colors

## 6. Front page layout and why

Order, top to bottom

1. Hero with status line, name, one sentence, two facts, and the circle photo
2. A centered quote by Rabindranath Tagore
3. Projects (section 01)
4. Competitions (section 02, element id is still achievements)
5. Experience (section 03)
6. Skills (section 04, styled like a terminal window)
7. GitHub contribution graph (section 05) is built but commented out in Home.jsx until Brandon has more activity

Reasons behind the choices

- The site is meant to be understood by looking, not reading. Cards and one line summaries are on the front, and depth lives behind a click.
- Projects come first because they are proof. Skills come last because a list of tags is only a claim.
- Competitions use a ledger grid showing placement and field size, because "1st" alone means nothing. It also still works when Brandon places 3rd.
- The status line stays general on purpose. Brandon is applying to many types of roles, so it does not name one.
- There is no contact row in the hero. Contact is one nav link on purpose, to avoid clutter.
- Skill pills do not link anywhere right now. A filter by skill is a possible future feature.
- Section divider lines were removed because they cut through the grid background.
- The nav links use router state with scrollTo to jump to sections, and html has scroll padding so the sticky header does not cover section titles.

## 7. Styling system (src/App.css)

Design words are simple, academic, warm, and uncluttered. Cream paper background with a visible square grid, serif headings, mono labels, and one accent color used sparingly.

Tokens sit at the top of the file under :root. Change the look from there.

| Token | Purpose |
| --- | --- |
| --bg, --card, --text, --muted | page, card, ink, and secondary text colors |
| --border, --rule, --grid | soft borders, stronger lines, background grid lines |
| --accent | the one accent color (about twenty places use it, change it once here) |
| --font-heading, --font-body, --font-mono | Newsreader, Inter, JetBrains Mono |
| --max-width, --grid-size | content width and grid square size |

Skill colors are separate. They live in data.js, and the five category card colors live in Home.jsx.

Notable rules

- Front page scale. The front page is 10 percent smaller than the original sizes through one rule, #top with zoom 0.9 and a max width, near the bottom of App.css. The id top is only on the Home page, so other pages are unaffected. Every size in the file is in px, which is why zoom was used instead of editing each value. To adjust the scale, change the 0.9.
- Image frames. Project card images (.card-media) and the project page image (.project-media) have an inset 1px dark border so pale screenshots do not blend into the white card.
- Experience logos have no box. Each logo keeps its own proportions inside a square area. The Experience logos block near the bottom of App.css controls the size, and the dropdown indent must equal the logo size plus the gap.
- Experience rows are fully clickable. The Job component toggles open on a click anywhere in the row. The small arrow button has no click handler of its own, so it does not double toggle, but it keeps its aria attributes for keyboard users.
- Competitions use the .ledger, .ledger-grid, and .cell classes.
- Page content sits in main elements and the header and footer are outside the zoomed area, so on the front page they are slightly wider than the content.

Editing style. Edit the existing rule in place wherever possible. Earlier changes were appended at the bottom of the file to override older rules, and a cleanup pass is still owed, so some dead rules likely remain (the old .medal styles and possibly old .result styles).

## 8. Known state and open to do list

Content that is still placeholder or draft

- GitHub and live links on all three projects are empty strings
- The Eugenics Ghost Project screenshot is the archive homepage, which shows bracketed placeholder text, so it should be replaced with a page that has real content
- Maze Navigation Competition has no field size and no skills filled in
- The Learned lines in experience, the project taglines, and the project descriptions were AI drafted from the resume and need Brandon's own voice and specifics
- Library scraper has only the Playwright tag because its language is unknown (Python or JavaScript)
- Dates on competitions are empty

Engineering and polish

- Phone layout has not been fixed. Everything looks oversized on a phone, and many recruiters open links on phones. This is the top priority.
- The old resume files in public should be replaced with a copy that has no phone number or street address
- Domain not purchased, and no og:image link preview image yet
- Contact page uses a Denison email, which may stop working after graduation. A personal email may be better long term.
- Confirm the profile photo path in Home.jsx is /linkedin.jpg and not ../public/linkedin.jpg, since the second only works in dev
- Delete public/icons.svg and the unused robot, gamepad, and snake entries in the icons object in Home.jsx
- Update README.md with one line about the project
- Optional, test an accent color change by editing --accent (a deep green like #2E5E4E was suggested)

Things not yet verified by the author of this file. The contents of src/index.css, exact package versions, existing media queries in App.css, and the exact file names of the project images in public.

## 9. Working with Brandon

- He works iteratively and visually. He shares screenshots to flag issues, so ask for one when layout is in question.
- Give copy and paste ready code blocks, and say exactly which file and which line to change. He is comfortable but not an expert, so give find and replace edits, not vague instructions.
- Be decisive. Recommend one option with a short reason and skip long menus.
- Keep answers short. He dislikes over explanation and excessive output.
- He likes step by step instructions.
- In prose, he does not want em dashes, colons, or semicolons.
- He wants to learn, so explain the why in a sentence when it helps.
- Before he deploys, he wants the site checked in the built version with npm run build and npm run preview.
- Never put passwords, API keys, or other secrets anywhere in the code, since the repo and the built site are public.
