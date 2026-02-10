# NOW — Current Work Context

**Last Updated:** February 2026
**Session:** 2 (continued — Team URLs + Results)
**Branch:** `main`

---

## Active Work

**Status:** Team entry pages, localStorage persistence, and results submission built
**Priority:** Pete to set up Google Sheet + Apps Script, add audio files, test full flow
**Spec:** `docs/SPEC.md`

---

## Project Summary

Val Cenis Music Quiz — a static, mobile-first website for a family road-trip music quiz.
Three teams, offline-capable, GitHub Pages hosted. Plain HTML/CSS/JS only.

---

## What's Built

- **Team entry pages:** `start-shannon.html`, `start-james.html`, `start-medcalf.html`
- **Preload + team identity** in one step (localStorage, survives tab close)
- **Full quiz flow:** start → preload → holding → unlock → instructions → questions → round intros
- **Results submission:** `js/submit.js` posts to Google Sheet, queues offline, retries
- **Service Worker:** network-first for HTML/CSS/JS, cache-first for audio

## What's Next

- Pete: create Google Sheet + deploy Apps Script, paste URL into `js/data.js` `submitEndpoint`
- Add actual audio files to `audio/` directory
- Final unlock page + answers-revealed playlist mode
- QR code generation for team URLs

---

**Update this file at end of every task.**
