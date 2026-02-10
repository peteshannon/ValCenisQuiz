# NOW — Current Work Context

**Last Updated:** February 2026
**Session:** 2 (Core Infrastructure)
**Branch:** `main`

---

## Active Work

**Status:** Core infrastructure built — project structure, SW, preload, question template all in place
**Priority:** Build remaining pages (unlock, instructions, round transitions, answers-revealed)
**Spec:** `docs/SPEC.md`

---

## Project Summary

Val Cenis Music Quiz — a static, mobile-first website for a family road-trip music quiz.
Three teams, offline-capable, GitHub Pages hosted. Plain HTML/CSS/JS only.

**Tech:** HTML, CSS, vanilla JavaScript, Service Worker, localStorage
**Hosting:** GitHub Pages
**Constraint:** Must work fully offline after initial preload

---

## What's Built

- `css/style.css` — Mobile-first base styles, mascot-card aesthetic
- `js/data.js` — Quiz data (3 rounds, teams, unlock codes)
- `js/app.js` — Team identity, answer storage, timing helpers
- `sw.js` — Cache-first Service Worker with audio preload
- `index.html` + `js/preload.js` — Setup/preload page with progress
- `question.html` + `js/question.js` — Question template (audio, timing, nav)
- `holding.html` — Calm post-setup waiting page

## What's Next

- Unlock page (code entry)
- Instructions page
- Team entry pages (`start-shannon.html`, etc.)
- Round transition pages
- Final unlock + answers-revealed mode
- Actual audio files

---

**Update this file at end of every task.**
