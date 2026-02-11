# NOW — Current Work Context

**Last Updated:** February 2026
**Session:** 3 (Alpine Card Theme)
**Branch:** `main`

---

## Active Work

**Status:** Full visual redesign complete — alpine card theme with team colours and mascot images
**Priority:** Test on mobile, refine styling, Round 3 content
**Spec:** `docs/SPEC.md`

---

## Project Summary

Val Cenis Music Quiz — a static, mobile-first website for a family road-trip music quiz.
Three teams, offline-capable, GitHub Pages hosted. Plain HTML/CSS/JS only.

---

## What's Built

- **Full quiz flow:** start → preload → holding → unlock → instructions → questions → round intros → final unlock → answers
- **Team entry pages:** `start-shannon.html`, `start-james.html`, `start-medcalf.html`
- **Results submission:** `js/submit.js` posts to Google Sheet with correct answers, timing, dedup
- **Service Worker:** network-first for HTML/CSS/JS, cache-first for audio/images (v6)
- **Audio:** R1 (12 tracks) + R2 (5 tracks) clips and full-length tracks
- **Answers:** all R1 + R2 answers populated in `js/data.js`
- **Visual theme (NEW):**
  - Alpine card aesthetic inspired by mascot card designs
  - Team-specific colour palettes via `data-team` attribute
  - Mascot images displayed on start, holding, and other pages
  - Nunito + Fredoka One typography
  - Parchment tones, card borders, banner badges

## What's Next

- Test visual design on mobile (375px)
- Round 3 audio + answers if applicable
- QR code generation for team URLs
- Any design polish after mobile testing

---

**Update this file at end of every task.**
