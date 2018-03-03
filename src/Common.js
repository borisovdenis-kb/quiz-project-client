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
  changeVolume: 'change-volume'
};

let soundTargetNames = {
  sound: 'sound',
  funnyStaff: 'funnyStuff'
};

export {commands, globalEvents, soundTargetNames}
