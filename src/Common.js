let commands = {
  LOAD: 'LOAD',
  NEXT: 'NEXT',
  PREV: 'PREV',
  START: 'START',
  PLAY_SOUND: 'PLAY_SOUND',
  PAUSE_SOUND: 'PAUSE_SOUND',
  CHANGE_VOLUME: 'CHANGE_VOLUME'
};

let globalEvents = {
  activateTimer: 'activate-timer',
  timeIsOver: 'time-is-over',
  playSound: 'play-sound',
  pauseSound: 'pause-sound',
  changeVolume: 'change-volume',
  loadQuestions: 'load-questions',
  nextQuestion: 'next-question',
  prevQuestion: 'prev-question'
};

let soundTargetNames = {
  sound: 'sound',
  funnyStaff: 'funnyStuff'
};

let restApiURL = 'http://localhost:8080/api';

export {commands, globalEvents, soundTargetNames, restApiURL}
