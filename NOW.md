# NOW — Current Work Context

**Last Updated:** February 2026
**Session:** 3 (Visual Design v2 — Collectible Card)
**Branch:** `main`

---

## Active Work

**Status:** Complete visual redesign v2 shipped — genuine collectible card aesthetic
**Priority:** Pete to review on mobile, provide feedback
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
- **Visual Design v2 (CURRENT):**
  - Collectible card aesthetic directly inspired by mascot card artwork
  - Double-border card frames (outer + inner) like physical cards
  - Ribbon banners with triangular fold details on every page
  - Lora serif + Nunito sans typography (card-style display feel)
  - Parchment paper texture via SVG noise
  - CSS mountain silhouette behind every page
  - Character stat dividers and stat rows (mimicking card traits)
  - Wax-seal play button with radial gradient + emboss
  - Giant 4rem track numbers for unmissable page identity
  - Handwritten-line answer inputs (bottom border only)
  - Card-back logo (crossed skis) used as decorative element
  - Snowflake separators throughout
  - Team-specific palettes: Shannon (sage), James (russet), Medcalf (forest/gold)
  - Team badge (mini mascot + name pill) on every quiz page
  - Mascot catchphrases from the original cards
  - 3D press-down buttons with bottom shadow

## What's Next

- Pete to review v2 design on mobile
- Round 3 audio + answers if applicable
- QR code generation for team URLs
- Any design polish after review

---

**Update this file at end of every task.**
