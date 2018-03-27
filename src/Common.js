let commands = {
  LOAD: 'LOAD',
  NEXT: 'NEXT',
  PREV: 'PREV',
  START: 'START',
  PLAY_SOUND: 'PLAY_SOUND',
  PAUSE_SOUND: 'PAUSE_SOUND',
  CHANGE_VOLUME: 'CHANGE_VOLUME',
  SHOW_ANSWER: 'SHOW_ANSWER',
  SHOW_PLAYERS_ANSWERS: 'SHOW_PLAYERS_ANSWERS',
  SHOW_PLAYERS_RESULTS: 'SHOW_PLAYERS_RESULTS',
  CALC_PLAYERS_RESULTS: 'CALC_PLAYERS_RESULTS'
};

let globalEvents = {
  activateTimer: 'activate-timer',
  timeIsOver: 'time-is-over',
  playSound: 'play-sound',
  pauseSound: 'pause-sound',
  changeVolume: 'change-volume',
  loadQuestions: 'load-questions',
  nextQuestion: 'next-question',
  prevQuestion: 'prev-question',
  showAnswer: 'show-answer',
  showPlayersAnswers: 'show-players-answers',
  showPlayersResults: 'show-players-results',
  calcPlayersScore: 'calc-players-score'
};

let soundTargetNames = {
  sound: 'sound',
  funnyStaff: 'funnyStuff'
};

let answerStatuses = {
  not_resolved: 'NOT_RESOLVED',
  right: 'RIGHT',
  wrong: 'WRONG'
};

let roundTypes = {
  questionAnswer: 'QUESTION_ANSWER',
  truthOrLie: 'TRUTH_OR_LIE'
};

let restApiURL = 'http://localhost:8080/api';

export {
  commands,
  globalEvents,
  soundTargetNames,
  restApiURL,
  answerStatuses,
  roundTypes
}
