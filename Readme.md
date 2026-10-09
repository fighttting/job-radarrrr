# job-radarrrr

A job application tracker I built because my spreadsheet stopped working.

<!-- Add once the UI is worth showing
![screenshot](./docs/screenshot.png)
-->

---

## Why

I'm applying for full stack and cloud internships. I tracked applications in a
spreadsheet until it hit about 30 rows, at which point I could no longer answer
basic questions: which companies had gone quiet, how long I'd been waiting on any
given one, whether my response rate was going up or down.

So I'm building the tool I wanted instead — and self-hosting it, because the
deployment is half the point.

---

## Status

**v0.1** — renders a list of applications. Not deployed yet.
**v0.2** — Vite build, ESLint + Prettier, application list rendering from a static dataset.
Not deployed yet.

Working on: add, edit, delete.

---

## Roadmap

**Core app**

- [x] Application list
- [ ] Add, edit, delete
- [ ] Filter by status — applied · interviewing · rejected · offer
- [ ] Stats: applications per week, response rate, average days waiting
- [ ] Detail view with interview notes

**Data**

- [ ] Replace mock data with a real API
- [ ] Persist to a database
- [ ] Authentication

**Deployment**

- [ ] Custom domain and DNS
- [ ] nginx reverse proxy
- [ ] HTTPS via Let's Encrypt, auto-renewing
- [ ] Process supervision, firewall locked down to what's needed

**Operations**

- [ ] Containerised
- [ ] Tests and deploys on push
- [ ] Managed database and object storage

---

## Stack

| Layer  | Tool                                | What it does                                           |
| ------ | ----------------------------------- | ------------------------------------------------------ |
| UI     | React 18                            | Builds the interface from reusable components          |
| Build  | Vite                                | Runs the dev server and handles ES modules and builds  |
| Lint   | ESLint (flat config)                | Checks code for errors and problematic patterns        |
| Format | Prettier + `eslint-config-prettier` | Formats code consistently and avoids conflicting rules |

---

## Decisions

**No build step yet.** v0.1 is two files loaded from a CDN. Adding a bundler before
there was more than one component would have been setup for its own sake. Now that
components need to be split across files, Vite goes in.

---

## Running locally

```bash
git clone https://github.com/fighttting/job-radarrrr.git
cd job-radarrrr
npm install
npm run dev
```

Open http://localhost:5173

| Script            | Does                               |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Vite dev server with HMR           |
| `npm run build`   | Production build to `dist/`        |
| `npm run preview` | Serve the production build locally |
| `npm run lint`    | ESLint                             |
| `npm run format`  | Prettier, writes in place          |

---

## Structure

```
job-Radarrrr/
├── index.html          # Vite entry
├── vite.config.js
├── eslint.config.mjs
├── package.json
├── src/
│   └── App.js          # components
└── Readme.md
```

---

## Changelog

**v0.1** — Application list rendering from a static dataset.
**v0.2** — Migrated from CDN scripts to a Vite build. Added ESLint and Prettier.

---

## License

MIT
