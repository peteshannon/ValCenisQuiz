/* ============================================
   Answers Revealed — Instant Playlist Mode
   Plays each track while showing answers immediately.
   User taps Next when ready to move on.
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
  const correctArtist = document.getElementById('correct-artist');
  const correctSong   = document.getElementById('correct-song');
  const yourArtist    = document.getElementById('your-artist');
  const yourSong      = document.getElementById('your-song');
  const nextBtn       = document.getElementById('btn-next-reveal');

  // --- Team Badge ---
  const team = App.getTeamInfo();
  if (team) {
    const badgeWrap = document.getElementById('team-badge-wrap');
    if (badgeWrap) {
      badgeWrap.classList.remove('hidden');
      const img = document.getElementById('mascot-img');
      if (img) img.src = team.mascotOnly;
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

    // Show answers immediately
    correctArtist.textContent = track.artist || '—';
    correctSong.textContent = track.song || '—';

    const teamAnswer = App.getAnswer(track.id);
    yourArtist.textContent = teamAnswer ? (teamAnswer.artist || '—') : 'No answer';
    yourSong.textContent = teamAnswer ? (teamAnswer.song || '—') : 'No answer';

    // Next button
    if (currentIdx < allTracks.length - 1) {
      nextBtn.textContent = 'Next Track';
    } else {
      nextBtn.textContent = 'Finish!';
    }

    // Reset play button
    playBtn.classList.remove('is-playing');
    playBtn.disabled = false;
    audioProgress.style.width = '0%';

    // Audio — use full track if available
    audioEl.src = track.audioFull || track.audio;
    audioEl.load();

    // Auto-play
    audioEl.play().then(() => {
      playBtn.classList.add('is-playing');
    }).catch(() => {
      // Autoplay blocked — user must tap play
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

  audioEl.addEventListener('play', () => { playBtn.classList.add('is-playing'); });
  audioEl.addEventListener('pause', () => { playBtn.classList.remove('is-playing'); });
  audioEl.addEventListener('ended', () => { playBtn.classList.remove('is-playing'); });

  // --- Audio progress bar ---
  audioEl.addEventListener('timeupdate', () => {
    if (audioEl.duration) {
      const pct = (audioEl.currentTime / audioEl.duration) * 100;
      audioProgress.style.width = pct + '%';
    }
  });

  // --- Next track ---
  nextBtn.addEventListener('click', () => {
    audioEl.pause();
    loadTrack(currentIdx + 1);
  });
});
