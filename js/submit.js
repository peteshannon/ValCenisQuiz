/* ============================================
   Results Submission
   Posts answers to Google Sheet via Apps Script
   Queues offline, retries when online
   ============================================ */

const Submit = (() => {
  const ENDPOINT = QUIZ_DATA.submitEndpoint || null;
  const STORAGE_KEY = 'vcquiz';

  /* Send a single answer to the Google Sheet */
  async function sendAnswer(trackId) {
    if (!ENDPOINT) return false;

    const answer = App.getAnswer(trackId);
    if (!answer) return false;

    try {
      const resp = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' }, // Apps Script needs this for CORS
        body: JSON.stringify({
          teamId: answer.teamId || App.getTeam(),
          trackId: trackId,
          artist: answer.artist,
          song: answer.song,
          firstPlayTime: answer.firstPlayTime,
          firstSubmitTime: answer.firstSubmitTime,
          duration: answer.duration,
        }),
      });
      return resp.ok || resp.redirected; // Apps Script redirects on success
    } catch {
      return false;
    }
  }

  /* Flush the submission queue — send all pending answers */
  async function flushQueue() {
    if (!ENDPOINT) return;

    const queue = JSON.parse(localStorage.getItem(STORAGE_KEY + '_queue') || '[]');
    if (queue.length === 0) return;

    const remaining = [];

    for (const trackId of queue) {
      const ok = await sendAnswer(trackId);
      if (!ok) remaining.push(trackId);
    }

    localStorage.setItem(STORAGE_KEY + '_queue', JSON.stringify(remaining));
  }

  /* Try to flush queue now, and whenever we come back online */
  function init() {
    if (!ENDPOINT) return;

    // Flush on load if online
    if (navigator.onLine) {
      setTimeout(flushQueue, 2000);
    }

    // Flush when connectivity returns
    window.addEventListener('online', () => {
      setTimeout(flushQueue, 1000);
    });

    // Periodic retry every 60 seconds
    setInterval(() => {
      if (navigator.onLine) flushQueue();
    }, 60000);
  }

  return { sendAnswer, flushQueue, init };
})();
