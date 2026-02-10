/* ============================================
   Results Submission
   Posts answers to Google Sheet via Apps Script
   Queues offline, retries when online
   ============================================ */

const Submit = (() => {
  const ENDPOINT = QUIZ_DATA.submitEndpoint || null;
  const STORAGE_KEY = 'vcquiz';

  /* Format a timestamp (ms) to readable string */
  function formatTime(ms) {
    if (!ms) return '';
    const d = new Date(ms);
    return d.toLocaleString('en-GB', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
  }

  /* Format duration (ms) to seconds with 1 decimal */
  function formatDuration(ms) {
    if (!ms) return '';
    return (ms / 1000).toFixed(1) + 's';
  }

  /* Remove a track from the submission queue */
  function removeFromQueue(trackId) {
    const queue = JSON.parse(localStorage.getItem(STORAGE_KEY + '_queue') || '[]');
    const updated = queue.filter(id => id !== trackId);
    localStorage.setItem(STORAGE_KEY + '_queue', JSON.stringify(updated));
  }

  /* Send a single answer to the Google Sheet */
  async function sendAnswer(trackId) {
    if (!ENDPOINT) return false;

    const answer = App.getAnswer(trackId);
    if (!answer) return false;

    try {
      const resp = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          teamId: answer.teamId || App.getTeam(),
          trackId: trackId,
          artist: answer.artist,
          song: answer.song,
          firstPlayTime: formatTime(answer.firstPlayTime),
          firstSubmitTime: formatTime(answer.firstSubmitTime),
          duration: formatDuration(answer.duration),
        }),
      });

      const ok = resp.ok || resp.redirected;
      if (ok) {
        removeFromQueue(trackId);
      }
      return ok;
    } catch {
      return false;
    }
  }

  /* Flush the submission queue — send all pending answers */
  async function flushQueue() {
    if (!ENDPOINT) return;

    const queue = JSON.parse(localStorage.getItem(STORAGE_KEY + '_queue') || '[]');
    if (queue.length === 0) return;

    // Copy queue since sendAnswer modifies it
    const toSend = [...queue];
    for (const trackId of toSend) {
      await sendAnswer(trackId);
    }
  }

  /* Try to flush queue now, and whenever we come back online */
  function init() {
    if (!ENDPOINT) return;

    if (navigator.onLine) {
      setTimeout(flushQueue, 2000);
    }

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
