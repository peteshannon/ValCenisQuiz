/* ============================================
   Answers Revealed — Playlist Mode
   Plays each track, reveals correct answer,
   shows team's answer, auto-progresses
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Build flat list of all tracks across rounds ---
  const allTracks = [];
  QUIZ_DATA.rounds.forEach((round, ri) => {
    round.tracks.forEach((track, ti) => {
      allTracks.push({ ...track, roundIdx: ri, trackIdx: ti, roundTitle: round.title });
    });
  });

  let currentIdx = 0;

  // --- UI Elements ---
  const stateReady    = document.getElementById('state-ready');
  const statePlaying  = document.getElementById('state-playing');
  const stateDone     = document.getElementById('state-done');
  const startBtn      = document.getElementById('btn-start');
  const playBtn       = document.getElementById('btn-play-reveal');
  const audioEl       = document.getElementById('audio-player');
  const audioProgress = document.getElementById('audio-progress');
  const roundRibbonEl = document.getElementById('round-ribbon');
  const roundTitleEl  = document.getElementById('round-title');
  const trackCounterEl = document.getElementById('track-counter');
  const answerArea    = document.getElementById('answer-area');
  const correctArtist = document.getElementById('correct-artist');
  const correctSong   = document.getElementById('correct-song');
  const yourArtist    = document.getElementById('your-artist');
  const yourSong      = document.getElementById('your-song');
  const waitingMsg    = document.getElementById('waiting-msg');
  const nextBtn       = document.getElementById('btn-next-reveal');

  // --- Team Badge ---
  const team = App.getTeamInfo();
  if (team) {
    const badgeWrap = document.getElementById('team-badge-wrap');
    if (badgeWrap) {
      badgeWrap.classList.remove('hidden');
      const img = document.getElementById('mascot-img');
      if (img) img.src = team.mascotImg;
      const nameEl = document.getElementById('team-name-badge');
      if (nameEl) nameEl.textContent = team.name;
    }
  }

  // --- Start ---
  startBtn.addEventListener('click', () => {
    stateReady.classList.add('hidden');
    statePlaying.classList.remove('hidden');
    loadTrack(0);
  });

  // --- Load a track ---
  function loadTrack(idx) {
    if (idx >= allTracks.length) {
      statePlaying.classList.add('hidden');
      stateDone.classList.remove('hidden');
      return;
    }

    currentIdx = idx;
    const track = allTracks[idx];

    // Header
    roundRibbonEl.textContent = 'Round ' + (track.roundIdx + 1);
    roundTitleEl.textContent = track.roundTitle;
    trackCounterEl.textContent = 'Track ' + (idx + 1) + ' of ' + allTracks.length;

    // Reset UI
    answerArea.classList.add('hidden');
    nextBtn.classList.add('hidden');
    waitingMsg.classList.remove('hidden');
    waitingMsg.textContent = 'Listen to the track...';
    playBtn.textContent = '▶';
    playBtn.disabled = false;
    audioProgress.style.width = '0%';

    // Audio — use full track if available, fall back to quiz clip
    audioEl.src = track.audioFull || track.audio;
    audioEl.load();

    // Auto-play
    audioEl.play().then(() => {
      playBtn.textContent = '⏸';
    }).catch(() => {
      waitingMsg.textContent = 'Tap play to hear the track';
    });
  }

  // --- Play/Pause toggle ---
  playBtn.addEventListener('click', () => {
    if (audioEl.paused) {
      audioEl.play();
    } else {
      audioEl.pause();
    }
  });

  audioEl.addEventListener('play', () => { playBtn.textContent = '⏸'; });
  audioEl.addEventListener('pause', () => { playBtn.textContent = '▶'; });

  // --- Audio progress bar ---
  audioEl.addEventListener('timeupdate', () => {
    if (audioEl.duration) {
      const pct = (audioEl.currentTime / audioEl.duration) * 100;
      audioProgress.style.width = pct + '%';
    }
  });

  // --- Track ended — reveal answer ---
  audioEl.addEventListener('ended', () => {
    revealAnswer();
  });

  function revealAnswer() {
    const track = allTracks[currentIdx];

    // Correct answer from data
    correctArtist.textContent = track.artist || '—';
    correctSong.textContent = track.song || '—';

    // Team's submitted answer
    const teamAnswer = App.getAnswer(track.id);
    yourArtist.textContent = teamAnswer ? (teamAnswer.artist || '—') : 'No answer';
    yourSong.textContent = teamAnswer ? (teamAnswer.song || '—') : 'No answer';

    // Show
    answerArea.classList.remove('hidden');
    waitingMsg.classList.add('hidden');
    playBtn.textContent = '▶';
    playBtn.disabled = true;

    // Show next button
    if (currentIdx < allTracks.length - 1) {
      nextBtn.textContent = 'Next Track';
    } else {
      nextBtn.textContent = 'Finish!';
    }
    nextBtn.classList.remove('hidden');
  }

  // --- Next track ---
  nextBtn.addEventListener('click', () => {
    loadTrack(currentIdx + 1);
  });
});
