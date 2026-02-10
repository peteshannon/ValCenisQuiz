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
  const teamNameEl   = document.getElementById('team-name');
  const roundInfoEl  = document.getElementById('round-info');
  const trackInfoEl  = document.getElementById('track-info');
  const playBtn      = document.getElementById('btn-play');
  const audioEl      = document.getElementById('audio-player');
  const artistInput  = document.getElementById('input-artist');
  const songInput    = document.getElementById('input-song');
  const submitBtn    = document.getElementById('btn-submit');
  const prevBtn      = document.getElementById('btn-prev');
  const nextBtn      = document.getElementById('btn-next');
  const submitStatus = document.getElementById('submit-status');

  // --- Team Info ---
  const team = App.getTeamInfo();
  if (team) {
    teamNameEl.textContent = `${team.name} — assisted by ${team.mascot} ${team.mascotEmoji}`;
  }

  // --- Round/Track Header ---
  roundInfoEl.textContent = `${round.title}`;
  trackInfoEl.textContent = `${track.label} of ${round.tracks.length}`;

  // --- Load existing answer ---
  const existing = App.getAnswer(track.id);
  if (existing) {
    artistInput.value = existing.artist || '';
    songInput.value = existing.song || '';
  }

  // --- Audio Source ---
  audioEl.src = track.audio;
  // Prevent scrubbing: no controls exposed, just our play button

  let firstPlayTime = existing?.firstPlayTime || null;
  let firstSubmitTime = existing?.firstSubmitTime || null;

  // --- Play Button (toggle play/pause) ---
  playBtn.addEventListener('click', () => {
    if (!firstPlayTime) {
      firstPlayTime = Date.now();
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

    // Try to submit immediately, flush queue for any pending
    if (typeof Submit !== 'undefined') {
      Submit.sendAnswer(track.id).then(() => Submit.flushQueue());
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
    // Go to last track of previous round
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
