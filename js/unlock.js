/* ============================================
   Unlock Page Logic
   Live timer + validates code + submits unlock time
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const input    = document.getElementById('input-code');
  const btn      = document.getElementById('btn-unlock');
  const feedback = document.getElementById('unlock-feedback');
  const timerEl  = document.getElementById('timer');

  /* --- Live timer --- */
  const clockStart = parseInt(localStorage.getItem('vcquiz_clock_start') || '0', 10);
  let timerInterval = null;

  function updateTimer() {
    if (!clockStart) return;
    const elapsed = Date.now() - clockStart;
    const totalSecs = Math.floor(elapsed / 1000);
    const mins = String(Math.floor(totalSecs / 60)).padStart(2, '0');
    const secs = String(totalSecs % 60).padStart(2, '0');
    timerEl.textContent = mins + ':' + secs;
  }

  if (clockStart) {
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
  }

  /* --- Unlock logic --- */
  btn.addEventListener('click', tryUnlock);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') tryUnlock();
  });

  async function tryUnlock() {
    const code = input.value.trim();

    if (code === QUIZ_DATA.unlockCodes.quizStart) {
      // Stop timer
      if (timerInterval) clearInterval(timerInterval);
      btn.disabled = true;
      input.disabled = true;

      // Calculate elapsed time and submit to Google Sheet
      const elapsedMs = clockStart ? Date.now() - clockStart : 0;
      await submitUnlockTime(elapsedMs);

      window.location.href = 'round-splash.html';
    } else if (code === '') {
      feedback.innerHTML = '<div class="status status-error">Please enter a code.</div>';
    } else {
      feedback.innerHTML = '<div class="status status-error">Hmm, that\'s not it. Try again!</div>';
      input.value = '';
      input.focus();
    }
  }

  /* Submit unlock time to Google Sheet */
  async function submitUnlockTime(elapsedMs) {
    const endpoint = QUIZ_DATA.submitEndpoint;
    if (!endpoint) return;

    const team = App.getTeam() || 'unknown';
    const secs = (elapsedMs / 1000).toFixed(1) + 's';

    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          teamId: team,
          trackId: 'unlock',
          artist: '',
          song: '',
          correctArtist: '',
          correctSong: '',
          firstPlayTime: '',
          firstSubmitTime: '',
          originalDuration: secs,
          actualElapsed: secs,
        }),
      });
    } catch (err) {
      console.warn('Failed to submit unlock time:', err);
    }
  }
});
