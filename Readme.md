# job-raderrrr

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

Working on: replacing the CDN setup with a proper build.

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

| Layer | Choice | Reasoning |
|---|---|---|
| UI | React 18 | Component model fits a list/detail app; large ecosystem for routing and server state |
| Build | — | See below |

Extended as each layer gets built.

---

## Decisions

**No build step yet.** v0.1 is two files loaded from a CDN. Adding a bundler before
there was more than one component would have been setup for its own sake. Now that
components need to be split across files, Vite goes in.

---

## Running locally

```bash
git clone git@github.com:fighttting/job-raderrrr.git
cd job-raderrrr
npx serve .
```

Open http://localhost:3000. No install step — React is loaded from a CDN.

---

## Structure

```
job-raderrrr/
├── index.html      # entry point
├── src/
│   └── App.js      # components
└── README.md
```

---

## Changelog

**v0.1** — Application list rendering from a static dataset.

---

## License

MIT
