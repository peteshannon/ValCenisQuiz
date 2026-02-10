/* ============================================
   Preload Page Logic
   Caches all audio assets via Service Worker
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const statusEl = document.getElementById('preload-status');
  const startBtn = document.getElementById('btn-start-preload');
  const doneSection = document.getElementById('preload-done');

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
    // Collect all audio URLs
    const audioUrls = [];
    QUIZ_DATA.rounds.forEach(round => {
      round.tracks.forEach(track => {
        audioUrls.push(new URL(track.audio, document.baseURI).href);
      });
    });

    const total = audioUrls.length;
    let loaded = 0;

    progressText.textContent = `Loading: 0 / ${total}`;

    // Load audio files one by one so we can track progress
    for (const url of audioUrls) {
      try {
        const resp = await fetch(url);
        if (resp.ok) {
          // Put into cache via Cache API directly
          const cache = await caches.open('vcquiz-v5');
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

    // Mark complete
    App.setPreloadComplete();
    showComplete();
  }

  function showComplete() {
    statusEl.innerHTML = `
      <div class="status status-success">
        All set. This phone is ready for the quiz!
      </div>`;
    progressBar.style.width = '100%';
    progressText.textContent = 'Complete';
    doneSection.classList.remove('hidden');
    startBtn.classList.add('hidden');
  }
});
