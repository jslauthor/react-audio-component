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

export function next() {
  return { type: types.NEXT }
}

export function previous() {
  return { type: types.PREVIOUS }
}

export function updateVolume(audio, volume) {
  audio.volume = volume/100;
  return { type: types.UPDATE_VOLUME, volume }
}

export function setTime(audio) {
  const time = audio.currentTime / audio.duration;
  return { type: types.SET_TIME, time }
}

export function setProgress(audio) {
  return { type: types.SET_PROGRESS, progress: audio.buffered, duration: audio.duration }
}

export function updatePosition(position) {
  return { type: types.UPDATE_POSITION, position }
}

export function toggleFavorite(id) {
  return { type: types.TOGGLE_FAVORITE, id }
}

export function toggleRepeat() {
  return { type: types.TOGGLE_REPEAT }
}
