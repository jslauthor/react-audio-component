import * as types from '../constants/ActionTypes'
import data from '../store/songs.json';

export function retrieveSongs() {
  // This could be written as a thunk or saga
  return { type: types.INITIALIZE, songs: data.songs }
}

export function play(audio) {
  if (audio.paused)
      audio.play();
  else
      audio.pause();

  return { type: types.PLAY, isPlaying: !audio.paused }
}

export function pause(audio) {
  audio.pause();
  return { type: types.PAUSE, isPlaying: !audio.paused }
}

export function next(audio) {
  audio.currentTime = 0; // need to reset the song if it's the same
  return { type: types.NEXT, isPlaying: !audio.paused }
}

export function previous(audio) {
  audio.currentTime = 0; // need to reset the song if it's the same
  return { type: types.PREVIOUS, isPlaying: !audio.paused }
}

export function updateVolume(audio, volume) {
  audio.volume = volume/100;
  return { type: types.UPDATE_VOLUME, volume }
}

export function setTime(audio) {
  const percent = audio.currentTime / audio.duration;
  return { type: types.SET_TIME, percent }
}

export function setProgress(audio) {
  return { type: types.SET_PROGRESS, progress: audio.buffered, duration: audio.duration }
}

export function updatePosition(audio, percent) {
  audio.currentTime = percent * audio.duration;
  return { type: types.UPDATE_POSITION, percent: audio.currentTime / audio.duration }
}

export function toggleFavorite(id) {
  return { type: types.TOGGLE_FAVORITE, id }
}

export function toggleRepeat() {
  return { type: types.TOGGLE_REPEAT }
}
