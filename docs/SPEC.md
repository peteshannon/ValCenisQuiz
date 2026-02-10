# Val Cenis Music Quiz — Full Specification

## Overview

A static, mobile-first website for a family road-trip music quiz.
The site will be hosted on GitHub Pages and must work offline after preload.

This is not an app and not a backend service.
Use plain HTML, CSS, and JavaScript only (no frameworks unless strictly necessary).

---

## Core Goals

- Mobile portrait only
- One device per family
- Designed for use in a moving car
- Large buttons, minimal typing
- Calm, playful, game-like
- Offline playback after setup
- Client-side timing and answer tracking
- Server submission when connectivity returns

---

## Teams & Entry Model (IMPORTANT)

There are three families, each with their own QR code that links to a unique URL:

- **TEAM SHANNON** — assisted by MONSIEUR CHEVAL
- **TEAM JAMES** — assisted by RACLETTE RACCOON
- **TEAM MEDCALF** — assisted by PROF SINGE

Each QR code points to a different entry URL, e.g.:

- `/start-shannon`
- `/start-james`
- `/start-medcalf`

The URL itself determines the team identity.
There is no team selection UI.

Team identity must be persisted throughout the session.

---

## Site Structure (Pages)

### 1. Setup / Preload Page (Hotel Setup)

**Purpose:** Preload all assets while on Wi-Fi.

- Accessible via a separate QR code
- Shows:
  - "Setup in progress"
  - A progress indicator
- Preloads:
  - All audio tracks
  - All HTML pages
- On completion:
  - Clear confirmation: "All set. This phone is ready."
- After this, the site must work offline

### 2. Holding Page (Post-Setup)

- Neutral, calm screen
- No mention of quiz or music
- Example text:
  - "Val Cenis"
  - "Please keep this page open"
- This is what families see until unlock codes are given

### 3. Unlock Page (Code Entry)

- Simple input for an unlock code
- Friendly, mysterious tone
- Incorrect code: Gentle feedback
- Correct code:
  - Reveal the Val Cenis Quiz logo
  - Proceed to Instructions page

### 4. Instructions Page

- Fun, friendly explanation of the quiz
- Explains:
  - One track per page
  - Answers written on same page
  - Timing starts on first play
  - Timing stops on first submit
  - Answers can be changed later
  - Original timing is always used
- Uses icons and short text
- "Let's go" button

### 5. Quiz Structure — Rounds

- **Round 1:** Name That Tune (12 tracks)
- **Round 2:** Reversed Tracks (5 tracks)
- **Optional Round 3:** Minions / Sped-Up Singing (up to 5 tracks)

Each track is one page.

### 6. Question Page (Core Page Template)

Each question page must include:

**Header:**
- Val Cenis branding
- Team name + mascot ("assisted by ...")
- Round + track indicator (e.g. "Round 1 — Track 3 of 12")

**Large PLAY button**

**Audio playback (no scrubbing)**

**Two answer fields:**
- Artist
- Song title

**Submit button**

**Navigation:**
- Previous
- Next

### 7. Round Transition Pages

- Short celebratory screen between rounds
- Example: "Round 2 — Reversed Tracks"

### 8. Final Unlock — Answers Revealed

- After last question, show another code entry
- Prevents early access
- On correct code: Enter Answers / Playlist mode

### 9. Answers-Revealed Playlist Mode (Controlled)

**Purpose:** Build anticipation and drama.

- No song selection
- No skipping
- One large button: "Reveal Answers"
- Tracks play in fixed order
- For each track:
  - Show correct artist + song
  - Show the team's submitted answer
  - Track must play fully before moving on
- Automatic progression
- Celebratory tone

---

## Timing & Answer Logic (CRITICAL)

- Timer starts when Play is clicked for the first time
- Timer stops when Submit is clicked for the first time
- Store:
  - First play timestamp
  - First submit timestamp
  - Duration (ms)
- If user:
  - Replays audio
  - Navigates back
  - Edits answers
  - **Timing does not reset**
- If the answer is corrected later:
  - Correctness updates
  - Timing bonus is not awarded
- All timing should be client-side

---

## Answer Storage & Submission

- Store answers locally (localStorage)
- Payload must include:
  - Team ID
  - Question ID
  - Artist answer
  - Song title answer
  - First play time
  - First submit time
  - Duration
- Attempt submission when online
- Queue submissions if offline
- No real-time multiplayer

---

## Offline Requirements

- Audio must play offline after setup
- Pages must be cached
- Use:
  - Service Worker
  - Cache API
- Graceful handling of no connectivity

---

## Tech Stack

- Plain HTML
- CSS (mobile-first)
- Vanilla JavaScript
- No frameworks unless essential
- GitHub Pages compatible

---

## Visual Style (Implementation Guidance)

- Inspired by collectible mascot cards
- Rounded panels
- Soft shadows
- Cream background
- Large buttons
- Minimalist, calm UI
- Avoid gradients and heavy decoration

---

## Output Expectation

- Clean project structure
- Well-commented code
- Clear separation of:
  - Data
  - UI
  - Logic
- Easy to add or remove tracks later

---

## Important Constraints

- Do not invent features
- Do not add logins or accounts
- Do not require network access during the quiz
- Assume one device per family

---

## First Task

Start by:

1. Creating the project structure
2. Implementing the Setup / Preload page
3. Implementing Service Worker caching
4. Creating a reusable Question Page template
