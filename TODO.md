# TODO — Val Cenis Music Quiz

## Immediate (First Task)

- [x] Create project file structure (HTML pages, CSS, JS directories)
- [x] Implement Service Worker + caching strategy
- [x] Implement Setup / Preload page (asset preloading with progress)
- [x] Create reusable Question Page template

## Core Pages

- [ ] Holding page (post-setup, neutral) — basic version done, needs unlock link
- [ ] Unlock page (code entry)
- [ ] Instructions page
- [ ] Question page (per-track, with timing logic) — template done, needs polish
- [ ] Round transition pages
- [ ] Final unlock page
- [ ] Answers-revealed playlist mode

## Logic

- [ ] Team identity from URL, persisted in session — core logic done, needs entry pages
- [ ] Client-side timing (first play → first submit) — implemented
- [ ] Answer storage in localStorage — implemented
- [ ] Submission queue (send when online) — queue logic done, sender not yet

## Audio

- [ ] Audio playback (no scrubbing) — implemented
- [ ] Preload all tracks during setup — implemented
- [ ] Offline audio playback — SW caching implemented
- [ ] Add actual audio files to audio/ directory

## Polish

- [ ] Mobile-first responsive CSS — base styles done
- [ ] Mascot card visual style — base aesthetic done, needs mascot images
- [ ] Large touch targets — implemented (48px min)
- [ ] QR codes for team entry URLs
