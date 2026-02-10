# Val Cenis Music Quiz — Design Brief

## Project Summary

A mobile-first music quiz website for 3 families on a road trip to Val Cenis. Each family uses one phone. The site must work offline in a moving car. Each family sees their own team identity (name + mascot) throughout.

**Target device:** Mobile phone, portrait orientation (375px baseline)
**Context:** Used in a moving car, one-handed, kids watching. Large touch targets essential.
**Tech:** Static HTML/CSS/JS hosted on GitHub Pages. All styling via a single `css/style.css`.

---

## The Three Teams

Each family has a unique team identity. Their mascot and name appear on **every page**. The design should make each team feel distinct — through colour, mascot illustration, or other visual treatment.

| Team | Mascot Name | Description |
|------|-------------|-------------|
| **Team Shannon** | Monsieur Cheval | A horse character |
| **Team James** | Raclette Raccoon | A raccoon character |
| **Team Medcalf** | Prof Singe | A monkey character |

The team identity is set automatically from the entry URL and persists across the session. There is no team selection UI.

---

## User Flow

```
Team Setup Page → Holding Page → Unlock Page → Instructions → 
  Round 1 (12 questions) → Round 2 Intro → Round 2 (5 questions) → 
    Round 3 Intro → Round 3 (5 questions) → Final Unlock → Answers Revealed
```

---

## Pages & HTML Structure

Each page below shows the exact HTML that the designer should style. The CSS classes used are listed — the designer should replace/restyle them freely. JavaScript populates dynamic content (marked with `id` attributes) at runtime.

---

### Page 1: Team Setup Page

**Purpose:** First page each family sees. Scanned via QR code at the hotel on Wi-Fi. Downloads all quiz assets. One version per team (identical HTML, different team shown via JS).

**Files:** `start-shannon.html`, `start-james.html`, `start-medcalf.html`

**Dynamic content (JS fills these):**
- `#mascot-emoji` — the team's mascot character
- `#team-name` — e.g. "Team Shannon"
- `#mascot-name` — e.g. "Assisted by Monsieur Cheval"
- `#progress-bar` — width animates from 0% to 100%
- `#progress-text` — e.g. "Loading: 5 / 22"
- `#preload-status` — success message injected on completion
- `#preload-done` — hidden until preload finishes, contains Continue link

```html
<body>
  <div class="header">
    <div class="brand">Val Cenis</div>
  </div>

  <div class="card text-center">
    <div id="mascot-emoji"></div>
    <h1 id="team-name"></h1>
    <p id="mascot-name"></p>
    <p>Connect to Wi-Fi and tap below to download everything for the quiz.</p>

    <button id="btn-start-preload" class="btn btn-primary">Download Quiz</button>

    <div class="progress-wrap">
      <div class="progress-bar" id="progress-bar"></div>
    </div>
    <p id="progress-text"></p>

    <div id="preload-status"></div>

    <div id="preload-done" class="hidden">
      <a href="holding.html" class="btn btn-success">Continue</a>
    </div>
  </div>
</body>
```

**States to design:**
1. Initial — Download button visible, progress empty
2. Loading — Button hidden, progress bar filling, count updating
3. Complete — Success message, Continue button visible

---

### Page 2: Holding Page

**Purpose:** Calm waiting screen after setup. No mention of quiz. Families sit here until given a code.

**File:** `holding.html`

**Dynamic content (JS fills these):**
- `#team-badge` — hidden if no team set, visible with mascot + name if set
- `#mascot-emoji` — team mascot
- `#team-name` — e.g. "Team Shannon — Monsieur Cheval"

```html
<body>
  <div class="holding-container">
    <h1 class="brand">Val Cenis</h1>
    <div id="team-badge" class="hidden">
      <span id="mascot-emoji"></span>
      <div id="team-name" class="team-name"></div>
    </div>
    <p>Please keep this page open.<br>Something wonderful is coming.</p>
    <a href="unlock.html" class="btn btn-primary">I have a code</a>
  </div>
</body>
```

**Design note:** This should feel mysterious, calm, and anticipatory. Centred vertically on screen.

---

### Page 3: Unlock Page

**Purpose:** 6-digit passcode entry to start the quiz.

**File:** `unlock.html`

**Dynamic content (JS manages these):**
- `#unlock-feedback` — error/success messages injected by JS

```html
<body>
  <div class="header">
    <div class="brand">Val Cenis</div>
  </div>

  <div class="card text-center">
    <h1>Something awaits...</h1>
    <p>Enter the secret code to begin.</p>

    <input type="tel" id="input-code" class="input-field"
           placeholder="● ● ● ● ● ●"
           maxlength="6" inputmode="numeric" pattern="[0-9]*"
           autocomplete="off">

    <div id="unlock-feedback"></div>

    <button id="btn-unlock" class="btn btn-primary">Unlock</button>
  </div>
</body>
```

**States to design:**
1. Default — empty input, button active
2. Error — "Hmm, that's not it. Try again!" message shown
3. Success — "Welcome to the Val Cenis Quiz!" then auto-redirects

---

### Page 4: Instructions Page

**Purpose:** Explains quiz rules. Fun and brief.

**File:** `instructions.html`

**Dynamic content (JS fills these):**
- `#team-name` — team name + mascot

```html
<body>
  <div class="header">
    <div class="brand">Val Cenis Quiz</div>
    <div id="team-name" class="team-name"></div>
  </div>

  <div class="card">
    <h1 class="text-center">How to Play</h1>

    <div class="instruction-item">
      <span class="instruction-icon">🎵</span>
      <p>One track per page. Tap the big <strong>Play</strong> button to hear it.</p>
    </div>

    <div class="instruction-item">
      <span class="instruction-icon">⏱️</span>
      <p>Your timer starts when you first press <strong>Play</strong> and stops when you first hit <strong>Submit</strong>.</p>
    </div>

    <div class="instruction-item">
      <span class="instruction-icon">✏️</span>
      <p>Write the <strong>Artist</strong> and <strong>Song Title</strong> on each page.</p>
    </div>

    <div class="instruction-item">
      <span class="instruction-icon">🔄</span>
      <p>You can replay, go back, and edit answers — but your original time always counts.</p>
    </div>

    <div class="instruction-item">
      <span class="instruction-icon">📶</span>
      <p>No internet needed — everything works offline!</p>
    </div>

    <a href="question.html?r=0&t=0" id="btn-go" class="btn btn-accent">Let's Go!</a>
  </div>
</body>
```

---

### Page 5: Question Page (CORE — most important)

**Purpose:** One page per track. Families spend 90% of their time here. This page is reused for all 22 questions across 3 rounds.

**File:** `question.html`

**CRITICAL DESIGN REQUIREMENT: The current round name and track position (e.g. "Round 1 — Name That Tune / Track 3 of 12") must be extremely prominent and unmissable. Families will get confused if they don't know where they are.**

**Dynamic content (JS fills these):**
- `#team-name` — e.g. "Team Shannon — assisted by Monsieur Cheval 🐴"
- `#round-info` — e.g. "Name That Tune"
- `#track-info` — e.g. "Track 3 of 12"
- `#btn-play` — toggles between ▶ and ⏸
- `#audio-player` — hidden `<audio>` element, JS controls playback
- `#input-artist`, `#input-song` — may be pre-filled if returning to a question
- `#submit-status` — brief "Saved!" confirmation
- `#btn-prev` — hidden on first track; links to previous track
- `#btn-next` — links to next track; text changes to "Next Round →" or "Finish →"

```html
<body>
  <div class="header">
    <div class="brand">Val Cenis</div>
    <div id="team-name" class="team-name"></div>
    <div class="round-indicator">
      <span id="round-info"></span> — <span id="track-info"></span>
    </div>
  </div>

  <div class="card text-center">
    <!-- Play Button -->
    <button id="btn-play" class="btn btn-play" aria-label="Play">▶</button>
    <audio id="audio-player" preload="auto"></audio>

    <!-- Answer Fields -->
    <div class="answer-fields">
      <label for="input-artist">Artist</label>
      <input type="text" id="input-artist" class="input-field"
             placeholder="Artist name..." autocomplete="off">

      <label for="input-song">Song Title</label>
      <input type="text" id="input-song" class="input-field"
             placeholder="Song title..." autocomplete="off">
    </div>

    <!-- Submit -->
    <button id="btn-submit" class="btn btn-primary">Submit Answer</button>
    <div id="submit-status"></div>

    <!-- Navigation -->
    <div class="nav-row">
      <a id="btn-prev" class="btn btn-nav" href="#">← Previous</a>
      <a id="btn-next" class="btn btn-nav" href="#">Next →</a>
    </div>
  </div>
</body>
```

**Design considerations:**
- Consider a progress bar, step dots, or fraction display to show position within the round
- The Play button is the first thing they interact with — it should be dominant
- Input fields need generous touch targets — typing in a moving car
- The round/track indicator is the most important navigational element
- Team identity (mascot + name) should be visible but not compete with round/track info

**Team variation:** Header shows team mascot + name. Consider team accent colour.

---

### Page 6: Round Transition Page

**Purpose:** Brief celebratory interstitial between rounds.

**File:** `round-intro.html`

**Dynamic content (JS fills these):**
- `#team-name` — team name + mascot
- `#round-label` — e.g. "Round 2"
- `#round-title` — e.g. "Reversed Tracks"
- `#round-desc` — e.g. "These tracks are playing backwards!"
- `#round-count` — e.g. "5 tracks"
- `#btn-go` — links to first track of the round

```html
<body>
  <div class="header">
    <div class="brand">Val Cenis Quiz</div>
    <div id="team-name" class="team-name"></div>
  </div>

  <div class="card text-center">
    <p id="round-label"></p>
    <h1 id="round-title"></h1>
    <p id="round-desc"></p>
    <p id="round-count"></p>

    <a id="btn-go" class="btn btn-accent" href="#">Let's Go!</a>
  </div>
</body>
```

**Design note:** Energising, celebratory. Should feel like a milestone.

---

### Page 7: Final Unlock Page

**Purpose:** After the last question. Second passcode entry to unlock answer reveal.

**File:** `final-unlock.html`

**Dynamic content (JS fills these):**
- `#team-name` — team name + mascot
- `#unlock-feedback` — error/success messages

```html
<body>
  <div class="header">
    <div class="brand">Val Cenis Quiz</div>
    <div id="team-name" class="team-name"></div>
  </div>

  <div class="card text-center">
    <div class="celebration-icon">🎉</div>
    <h1>Quiz Complete!</h1>
    <p>Well done! All your answers have been saved.</p>
    <p>When you're ready to reveal the answers, enter the code below.</p>

    <input type="tel" id="input-code" class="input-field"
           placeholder="● ● ● ● ● ●"
           maxlength="6" inputmode="numeric" pattern="[0-9]*"
           autocomplete="off">

    <div id="unlock-feedback"></div>

    <button id="btn-unlock" class="btn btn-accent">Reveal Answers</button>
  </div>
</body>
```

---

### Page 8: Answers Revealed — Playlist Mode

**Purpose:** Dramatic reveal. Tracks play in order, then the correct answer is shown alongside the team's answer. No skipping.

**File:** `answers.html`

**This page has 3 states, shown/hidden via JS:**

**State 1: Ready (before starting)**

```html
<div id="state-ready" class="reveal-card">
  <div class="celebration-icon">🎶</div>
  <h1>Answers Time!</h1>
  <p>Each track will play, then the correct answer is revealed.</p>
  <button id="btn-start" class="btn btn-accent">Reveal First Answer</button>
</div>
```

**State 2: Playing / Revealing (per track)**

Dynamic content:
- `#round-title` — e.g. "Name That Tune"
- `#track-counter` — e.g. "Track 3 of 22"
- `#btn-play-reveal` — play/pause toggle
- `#audio-progress` — width animates as track plays
- `#answer-area` — hidden while playing, shown after track ends
- `#correct-artist`, `#correct-song` — the real answer
- `#your-artist`, `#your-song` — what the team submitted
- `#waiting-msg` — "Listen to the track..." (hidden after reveal)
- `#btn-next-reveal` — hidden until answer revealed

```html
<div id="state-playing" class="reveal-card hidden">
  <div class="round-banner" id="round-title"></div>
  <div class="track-counter" id="track-counter"></div>

  <button id="btn-play-reveal" class="btn btn-play" aria-label="Play">▶</button>
  <audio id="audio-player" preload="auto"></audio>

  <div class="progress-track">
    <div class="progress-track-fill" id="audio-progress"></div>
  </div>

  <div id="answer-area" class="hidden">
    <div class="answer-correct">
      <div class="label">Correct Answer</div>
      <div class="value" id="correct-artist"></div>
      <div class="value" id="correct-song"></div>
    </div>
    <div class="answer-yours">
      <div class="label">Your Answer</div>
      <div class="value" id="your-artist"></div>
      <div class="value" id="your-song"></div>
    </div>
  </div>

  <p id="waiting-msg" class="waiting-msg">Listen to the track...</p>

  <button id="btn-next-reveal" class="btn btn-primary hidden">Next Track</button>
</div>
```

**State 3: Finished**

```html
<div id="state-done" class="reveal-card hidden">
  <div class="celebration-icon">🏆</div>
  <h1>That's a Wrap!</h1>
  <p>Hope you enjoyed the Val Cenis Music Quiz!</p>
</div>
```

**Design considerations:**
- The "Correct Answer" card should feel positive/celebratory
- The "Your Answer" card should be neutral — not judgemental
- Track must play fully before the answer area and Next button appear
- The audio progress bar shows how much of the track has played

---

## Current CSS

The existing `css/style.css` is a working placeholder. The designer should feel free to completely restyle or replace it. Here is the current file for reference — it shows the class names in use and the current custom properties:

```css
/* --- Custom Properties (current — feel free to change all) --- */
:root {
  --color-bg: #FDF6EC;
  --color-surface: #FFFFFF;
  --color-text: #2C2C2C;
  --color-text-muted: #6B6B6B;
  --color-primary: #4A6FA5;
  --color-primary-hover: #3B5D8C;
  --color-accent: #E8A44A;
  --color-success: #5AAE6D;
  --color-error: #D35D5D;
  --color-border: #E8E0D4;
  --radius: 16px;
  --radius-sm: 10px;
  --shadow: 0 2px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 4px 24px rgba(0,0,0,0.12);
  --touch-min: 48px;
  --font-main: 'Segoe UI', system-ui, -apple-system, sans-serif;
  --transition: 0.2s ease;
}
```

**CSS classes currently in use across all pages:**

| Class | Used on | Purpose |
|-------|---------|---------|
| `.header` | All pages | Top bar with branding + team info |
| `.brand` | All pages | "Val Cenis" / "Val Cenis Quiz" text |
| `.team-name` | All pages | Team name + mascot text |
| `.round-indicator` | Question page | Round name + track position |
| `.card` | Most pages | Main content panel |
| `.text-center` | Various | Centres text |
| `.btn` | All pages | Base button |
| `.btn-primary` | Various | Primary action |
| `.btn-accent` | Various | Secondary/highlight action |
| `.btn-success` | Setup page | Success/continue action |
| `.btn-play` | Question, Answers | Large circular play button |
| `.btn-nav` | Question page | Previous/Next navigation |
| `.input-field` | Unlock, Question | Text/number input |
| `.progress-wrap` / `.progress-bar` | Setup page | Download progress |
| `.nav-row` | Question page | Previous/Next button row |
| `.status` / `.status-success` / `.status-error` | Various | Feedback messages |
| `.instruction-item` / `.instruction-icon` | Instructions | Rule list items |
| `.hidden` | Various | JS toggle visibility |
| `.reveal-card` | Answers page | Main card for answer reveal |
| `.answer-correct` | Answers page | Correct answer display |
| `.answer-yours` | Answers page | Team's answer display |
| `.round-banner` | Answers page | Round title during reveal |
| `.track-counter` | Answers page | "Track X of Y" during reveal |
| `.progress-track` / `.progress-track-fill` | Answers page | Audio playback progress |
| `.waiting-msg` | Answers page | "Listen to the track..." text |

---

## Key Design Requirements

1. **Round + track position must be unmissable** on the question page — this is the #1 UX priority
2. **Team identity visible on every page** — mascot + name, with visual distinction between teams
3. **Play button should be dominant** on the question page — it's the first interaction
4. **Large touch targets everywhere** — minimum 48px, used in a moving car
5. **Mobile portrait only** — 375px baseline, max-width ~420px

---

## What the Designer Decides

The designer has full creative control over:
- Colour palette and theming
- Typography choices
- Visual style (minimal, decorative, playful — whatever works)
- How team identity is expressed (colour, illustration, layout variation)
- Mascot visual treatment (emoji, illustration, badge, card, etc.)
- How the round/track indicator is displayed (progress bar, dots, fraction, etc.)
- Animation and transitions
- Layout and spacing
- Whether to use gradients, shadows, textures, etc.

The only constraints are the HTML structure (element IDs must stay for JS), mobile-first portrait orientation, and large touch targets.
