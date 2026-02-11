/* ============================================
   Question Page Logic
   Audio playback, timing, answer save, navigation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Parse URL params: ?r=0&t=0
  const params = new URLSearchParams(window.location.search);
  const roundIdx = parseInt(params.get('r'), 10) || 0;
  const trackIdx = parseInt(params.get('t'), 10) || 0;

  const round = QUIZ_DATA.rounds[roundIdx];
  if (!round) { window.location.href = 'holding.html'; return; }
  const track = round.tracks[trackIdx];
  if (!track) { window.location.href = 'holding.html'; return; }

  // --- UI Elements ---
  const roundRibbonEl = document.getElementById('round-ribbon');
  const roundInfoEl   = document.getElementById('round-info');
  const trackNumEl    = document.getElementById('track-number');
  const trackOfEl     = document.getElementById('track-of');
  const playBtn       = document.getElementById('btn-play');
  const audioEl       = document.getElementById('audio-player');
  const artistInput   = document.getElementById('input-artist');
  const songInput     = document.getElementById('input-song');
  const submitBtn     = document.getElementById('btn-submit');
  const prevBtn       = document.getElementById('btn-prev');
  const nextBtn       = document.getElementById('btn-next');
  const submitStatus  = document.getElementById('submit-status');

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

  // --- Round/Track Header ---
  roundRibbonEl.textContent = 'Round ' + (roundIdx + 1);
  roundInfoEl.textContent = round.title;
  trackNumEl.textContent = trackIdx + 1;
  trackOfEl.textContent = 'of ' + round.tracks.length;

  // --- Load existing answer ---
  const existing = App.getAnswer(track.id);
  if (existing) {
    artistInput.value = existing.artist || '';
    songInput.value = existing.song || '';
  }

  // --- Audio Source ---
  audioEl.src = track.audio;

  let firstPlayTime = existing?.firstPlayTime || null;
  let firstSubmitTime = existing?.firstSubmitTime || null;

  // --- Disable Submit until Play has been pressed (unless returning to answered question) ---
  if (!firstPlayTime) {
    submitBtn.disabled = true;
  }

  // --- Play Button (toggle play/pause) ---
  playBtn.addEventListener('click', () => {
    if (!firstPlayTime) {
      firstPlayTime = Date.now();
      submitBtn.disabled = false;
    }
    if (audioEl.paused) {
      audioEl.play();
    } else {
      audioEl.pause();
    }
  });

  audioEl.addEventListener('pause', () => { playBtn.textContent = '▶'; });
  audioEl.addEventListener('play', () => { playBtn.textContent = '⏸'; });
  audioEl.addEventListener('ended', () => { playBtn.textContent = '▶'; });

  // --- Submit ---
  submitBtn.addEventListener('click', () => {
    if (!firstSubmitTime) {
      firstSubmitTime = Date.now();
    }

    const duration = (firstPlayTime && firstSubmitTime)
      ? firstSubmitTime - firstPlayTime
      : null;

    App.saveAnswer(track.id, {
      artist: artistInput.value.trim(),
      song: songInput.value.trim(),
      firstPlayTime,
      firstSubmitTime,
      duration,
    });

    App.queueSubmission(track.id);

    // Try to submit immediately, include actual elapsed for this submission
    const thisSubmitElapsed = firstPlayTime ? Date.now() - firstPlayTime : null;
    if (typeof Submit !== 'undefined') {
      Submit.sendAnswer(track.id, thisSubmitElapsed);
    }

    submitStatus.textContent = 'Saved!';
    submitStatus.className = 'status status-success';
    setTimeout(() => { submitStatus.textContent = ''; submitStatus.className = ''; }, 2000);
  });

  // --- Navigation ---
  // Previous
  if (trackIdx > 0) {
    prevBtn.href = App.getTrackLocation(roundIdx, trackIdx - 1);
  } else if (roundIdx > 0) {
    const prevRound = QUIZ_DATA.rounds[roundIdx - 1];
    prevBtn.href = App.getTrackLocation(roundIdx - 1, prevRound.tracks.length - 1);
  } else {
    prevBtn.classList.add('hidden');
  }

  // Next
  if (trackIdx < round.tracks.length - 1) {
    nextBtn.href = App.getTrackLocation(roundIdx, trackIdx + 1);
  } else if (roundIdx < QUIZ_DATA.rounds.length - 1) {
    nextBtn.href = 'round-intro.html?r=' + (roundIdx + 1);
    nextBtn.textContent = 'Next Round →';
  } else {
    nextBtn.textContent = 'Finish →';
    nextBtn.href = 'final-unlock.html';
  }
});
