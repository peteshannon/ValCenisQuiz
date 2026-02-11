/* ============================================
   App Core — Team identity, storage, navigation
   ============================================ */

const App = (() => {
  const STORAGE_KEY = 'vcquiz';

  /* --- Team Identity --- */
  function detectTeamFromURL() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('shannon')) return 'shannon';
    if (path.includes('james'))   return 'james';
    if (path.includes('medcalf')) return 'medcalf';
    return null;
  }

  function setTeam(teamId) {
    if (teamId && QUIZ_DATA.teams[teamId]) {
      localStorage.setItem(STORAGE_KEY + '_team', teamId);
    }
  }

  function getTeam() {
    return localStorage.getItem(STORAGE_KEY + '_team');
  }

  function getTeamInfo() {
    const id = getTeam();
    return id ? { id, ...QUIZ_DATA.teams[id] } : null;
  }

  /* --- Answer Storage (localStorage) --- */
  function getAnswers() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY + '_answers')) || {};
    } catch { return {}; }
  }

  function saveAnswer(trackId, data) {
    const answers = getAnswers();
    const existing = answers[trackId] || {};

    // Preserve original timing — never overwrite
    answers[trackId] = {
      artist: data.artist ?? existing.artist ?? '',
      song: data.song ?? existing.song ?? '',
      firstPlayTime: existing.firstPlayTime || data.firstPlayTime || null,
      firstSubmitTime: existing.firstSubmitTime || data.firstSubmitTime || null,
      duration: existing.duration || data.duration || null,
      teamId: getTeam(),
    };

    localStorage.setItem(STORAGE_KEY + '_answers', JSON.stringify(answers));
    return answers[trackId];
  }

  function getAnswer(trackId) {
    return getAnswers()[trackId] || null;
  }

  /* --- Submission Queue --- */
  function queueSubmission(trackId) {
    const queue = JSON.parse(localStorage.getItem(STORAGE_KEY + '_queue') || '[]');
    if (!queue.includes(trackId)) queue.push(trackId);
    localStorage.setItem(STORAGE_KEY + '_queue', JSON.stringify(queue));
  }

  /* --- Preload Status --- */
  function setPreloadComplete() {
    localStorage.setItem(STORAGE_KEY + '_preloaded', 'true');
  }

  function isPreloaded() {
    return localStorage.getItem(STORAGE_KEY + '_preloaded') === 'true';
  }

  /* --- Navigation helpers --- */
  function getTrackLocation(roundIdx, trackIdx) {
    return `question.html?r=${roundIdx}&t=${trackIdx}`;
  }

  /* --- Apply team theme to page --- */
  function applyTeamTheme() {
    const team = getTeam();
    if (team) {
      document.body.setAttribute('data-team', team);
    }
  }

  /* --- Service Worker Registration --- */
  function registerSW() {
    if ('serviceWorker' in navigator) {
      const swPath = new URL('sw.js', document.baseURI).href;
      navigator.serviceWorker.register(swPath).catch(err => {
        console.warn('SW registration failed:', err);
      });
    }
  }

  return {
    detectTeamFromURL, setTeam, getTeam, getTeamInfo,
    getAnswers, saveAnswer, getAnswer,
    queueSubmission,
    setPreloadComplete, isPreloaded,
    getTrackLocation, registerSW, applyTeamTheme,
  };
})();
