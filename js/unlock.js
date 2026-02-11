/* ============================================
   Unlock Page Logic
   Validates code and proceeds to instructions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const input    = document.getElementById('input-code');
  const btn      = document.getElementById('btn-unlock');
  const feedback = document.getElementById('unlock-feedback');

  btn.addEventListener('click', tryUnlock);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') tryUnlock();
  });

  function tryUnlock() {
    const code = input.value.trim();

    if (code === QUIZ_DATA.unlockCodes.quizStart) {
      // Success — redirect immediately
      btn.disabled = true;
      input.disabled = true;
      window.location.href = 'round-splash.html';
    } else if (code === '') {
      feedback.innerHTML = '<div class="status status-error">Please enter a code.</div>';
    } else {
      feedback.innerHTML = '<div class="status status-error">Hmm, that\'s not it. Try again!</div>';
      input.value = '';
      input.focus();
    }
  }
});
