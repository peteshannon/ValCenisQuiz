/* ============================================
   Team Start Page Logic
   Sets team identity, runs preload, redirects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const statusEl = document.getElementById('preload-status');
  const startBtn = document.getElementById('btn-start-preload');
  const doneSection = document.getElementById('preload-done');

  // Detect and persist team from URL
  const teamId = App.detectTeamFromURL();
  if (teamId) {
    App.setTeam(teamId);
  }
  App.applyTeamTheme();

  // Check if already preloaded
  if (App.isPreloaded()) {
    showComplete();
    return;
  }

  startBtn.addEventListener('click', () => {
    startBtn.classList.add('hidden');
    preloadAssets();
  });

  async function preloadAssets() {
    const audioUrls = [];
    QUIZ_DATA.rounds.forEach(round => {
      round.tracks.forEach(track => {
        audioUrls.push(new URL(track.audio, document.baseURI).href);
      });
    });

    const total = audioUrls.length;
    let loaded = 0;

    progressText.textContent = `Loading: 0 / ${total}`;

    for (const url of audioUrls) {
      try {
        const resp = await fetch(url);
        if (resp.ok) {
          const cache = await caches.open('vcquiz-v8');
          await cache.put(url, resp);
        }
      } catch (err) {
        console.warn('Failed to preload:', url, err);
      }

      loaded++;
      const pct = Math.round((loaded / total) * 100);
      progressBar.style.width = pct + '%';
      progressText.textContent = `Loading: ${loaded} / ${total}`;
    }

    App.setPreloadComplete();
    showComplete();
  }

  function showComplete() {
    statusEl.innerHTML = '<div class="status status-success">All set. Ready to go!</div>';
    progressBar.style.width = '100%';
    progressText.textContent = 'Complete';
    doneSection.classList.remove('hidden');
    startBtn.classList.add('hidden');
  }
});
