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

So I'm building the tool I wanted instead. The first goal is a small version I
actually use every day; self-hosting comes after that.

---

## Status

**v0.1** — renders a list of applications. Not deployed yet.
**v0.2** — Vite build, ESLint + Prettier, application list rendering from a static dataset.
Not deployed yet.
**v0.3** — usable MVP: data saved in the browser, status history, export/import.
Not deployed yet.

Working on: deploying to a static host.

---

## Roadmap

**MVP**

- [x] Application list
- [x] Add (with applied date, for backfilling), change status, delete
- [x] Filter by status — applied · interviewing · rejected · offer
- [x] Stats: applications this week, response rate, average days since last update
- [x] Export / import JSON, load sample data
- [ ] Deploy to a static host

**Later**

- [ ] Which companies have gone quiet
- [ ] Response rate trend over time
- [ ] Edit company and role
- [ ] Detail view with interview notes
- [ ] Filter in the URL
- [ ] Sync across devices — needs a real API, database and authentication

**Self-hosting**

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
| Routes | TanStack Router                     | File-based routes, lazy-loaded pages                   |
| Data   | TanStack Query + `localStorage`     | Caches applications; every write is a mutation         |
| Build  | Vite                                | Runs the dev server and handles ES modules and builds  |
| Lint   | ESLint (flat config)                | Checks code for errors and problematic patterns        |
| Format | Prettier + `eslint-config-prettier` | Formats code consistently and avoids conflicting rules |

---

## Decisions

**No build step yet.** v0.1 is two files loaded from a CDN. Adding a bundler before
there was more than one component would have been setup for its own sake. Now that
components need to be split across files, Vite goes in.

**No backend yet.** It's just me, on one laptop. Data lives in `localStorage` as
versioned JSON, and only `storage.js` touches it — so swapping in a real API later
means changing one file. Export/import is the backup.

**Status changes are events.** Each application keeps a list of
`{ status, date }`. Current status, applied date and "days since last update" are
derived from it, so the history needed for trends later is already being recorded.

---

## Known limitations

- **Data lives in one browser.** Clearing site data, switching browser or device
  starts from empty. Export regularly.
- **Data is tied to the URL.** `localStorage` belongs to one address, so always use
  the same one. **Export before changing the URL**, then import at the new one.
- **Company and role can't be edited.** Delete and re-add instead.

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
job-radarrrr/
├── index.html                    # Vite entry
├── public/
│   ├── applications.json         # sample data, same format as an export
│   └── _redirects                # SPA fallback for static hosting
└── src/
    ├── App.jsx                   # router + query client
    ├── routes/                   # __root, index (board), stats
    ├── dates.js                  # YYYY-MM-DD helpers
    ├── application.js            # statuses, values derived from events
    ├── storage.js                # localStorage load/save/validate
    ├── useApplications.js        # read
    ├── useApplicationMutations.js # writes
    ├── useStats.js
    └── *.jsx                     # components
```

---

## Changelog

**v0.1** — Application list rendering from a static dataset.
**v0.2** — Migrated from CDN scripts to a Vite build. Added ESLint and Prettier.
**v0.3** — Saved to `localStorage`. Status history as events. Add, change status,
delete, filter, stats, export/import, sample data.

---

## License

MIT
