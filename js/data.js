/* ============================================
   Quiz Data — Rounds, Tracks, Answers
   Easy to add/remove tracks later
   ============================================ */

const QUIZ_DATA = {
  rounds: [
    {
      id: 'round1',
      title: 'Name That Tune',
      description: 'Can you name the artist and song?',
      tracks: [
        { id: 'r1t1',  label: 'Track 1',  audio: 'audio/r1_01.mp3' },
        { id: 'r1t2',  label: 'Track 2',  audio: 'audio/r1_02.mp3' },
        { id: 'r1t3',  label: 'Track 3',  audio: 'audio/r1_03.mp3' },
        { id: 'r1t4',  label: 'Track 4',  audio: 'audio/r1_04.mp3' },
        { id: 'r1t5',  label: 'Track 5',  audio: 'audio/r1_05.mp3' },
        { id: 'r1t6',  label: 'Track 6',  audio: 'audio/r1_06.mp3' },
        { id: 'r1t7',  label: 'Track 7',  audio: 'audio/r1_07.mp3' },
        { id: 'r1t8',  label: 'Track 8',  audio: 'audio/r1_08.mp3' },
        { id: 'r1t9',  label: 'Track 9',  audio: 'audio/r1_09.mp3' },
        { id: 'r1t10', label: 'Track 10', audio: 'audio/r1_10.mp3' },
        { id: 'r1t11', label: 'Track 11', audio: 'audio/r1_11.mp3' },
        { id: 'r1t12', label: 'Track 12', audio: 'audio/r1_12.mp3' },
      ]
    },
    {
      id: 'round2',
      title: 'Reversed Tracks',
      description: 'These tracks are playing backwards!',
      tracks: [
        { id: 'r2t1', label: 'Track 1', audio: 'audio/r2_01.mp3' },
        { id: 'r2t2', label: 'Track 2', audio: 'audio/r2_02.mp3' },
        { id: 'r2t3', label: 'Track 3', audio: 'audio/r2_03.mp3' },
        { id: 'r2t4', label: 'Track 4', audio: 'audio/r2_04.mp3' },
        { id: 'r2t5', label: 'Track 5', audio: 'audio/r2_05.mp3' },
      ]
    },
    {
      id: 'round3',
      title: 'Minions Round',
      description: 'Sped-up singing — can you still tell?',
      tracks: [
        { id: 'r3t1', label: 'Track 1', audio: 'audio/r3_01.mp3' },
        { id: 'r3t2', label: 'Track 2', audio: 'audio/r3_02.mp3' },
        { id: 'r3t3', label: 'Track 3', audio: 'audio/r3_03.mp3' },
        { id: 'r3t4', label: 'Track 4', audio: 'audio/r3_04.mp3' },
        { id: 'r3t5', label: 'Track 5', audio: 'audio/r3_05.mp3' },
      ]
    }
  ],

  /* Teams — identity determined by entry URL */
  teams: {
    shannon: { name: 'Team Shannon', mascot: 'Monsieur Cheval', mascotEmoji: '🐴' },
    james:   { name: 'Team James',   mascot: 'Raclette Raccoon', mascotEmoji: '🦝' },
    medcalf: { name: 'Team Medcalf', mascot: 'Prof Singe',       mascotEmoji: '🐒' },
  },

  /* Unlock codes */
  unlockCodes: {
    quizStart: '241205',
    answersReveal: '251231',
  },

  /* Google Apps Script endpoint for results (set to null until configured) */
  submitEndpoint: null,
  // submitEndpoint: 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec',

  /* Pages to cache for offline (relative paths — SW resolves from its scope) */
  cachePages: [
    'index.html',
    'holding.html',
    'unlock.html',
    'instructions.html',
    'question.html',
    'css/style.css',
    'js/app.js',
    'js/data.js',
    'js/preload.js',
    'js/question.js',
  ]
};
