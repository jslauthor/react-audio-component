import {
  INITIALIZE, ERROR,
  UPDATE_VOLUME, NEXT, PREVIOUS,
  PLAY, SET_TIME, SET_PROGRESS,
  TOGGLE_FAVORITE, TOGGLE_REPEAT,
  UPDATE_POSITION, PAUSE, TOGGLE_LOOP
} from '../constants/ActionTypes'

import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import sortBy from 'lodash/sortBy';
import indexOf from 'lodash/indexOf';
import clone from 'lodash/clone';

const initialState = {
  isPlaying: false,
  isFavorite: false,
  isRepeating: false,
  isLooping: false,
  percent: 0,
  volume: 65,
  progress: {},
  duration: 0,
  repeat: false,
  songs: [],
  currentID: null,
  defaultSong: {
    "id": -1,
    "coverURL": require("raw!../assets/default_cover.txt"),
    "audioFile": null,
    "title": "Waiting...",
    "artist": "No song loaded",
    "favorite": false
  }
};

function getSongIndex(songs, id) {
  return findIndex(songs, (o) => o.id === id);
}

function getAdjacentSong(songs, startIndex, direction) {
  let nextIndex = startIndex + direction;
  nextIndex = nextIndex < 0 ? songs.length-1 : nextIndex > songs.length-1 ? 0 : nextIndex;
  return songs[nextIndex].id;
}

function getAudioState(audio) {
  var test = {
    isPlaying: !audio.paused,
    percent: audio.currentTime / audio.duration,
    progress: audio.buffered,
    duration: audio.duration,
    isLooping: audio.loop,
    error: audio.error
  }

  return test;
}

export default function audio(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE:
      const songsArray = sortBy(action.songs, ['id']);
      return {...state, songs: songsArray, currentID: songsArray[0].id };
    case PLAY:
    case PAUSE:
    case ERROR:
      return {...state, ...getAudioState(action.audio) };
    case NEXT:
      return {
        ...state,
        currentID: getAdjacentSong(state.songs, getSongIndex(state.songs, state.currentID), 1),
        ...getAudioState(action.audio)
      };
    case PREVIOUS:
      return {
        ...state,
        currentID: getAdjacentSong(state.songs, getSongIndex(state.songs, state.currentID), -1),
        ...getAudioState(action.audio)
      };
    case UPDATE_VOLUME:
      return {...state, volume: action.volume };
    case SET_TIME:
      return {...state, ...getAudioState(action.audio) };
    case UPDATE_POSITION:
      return {...state, ...getAudioState(action.audio) };
    case SET_PROGRESS:
      return {...state, ...getAudioState(action.audio) };
    case TOGGLE_FAVORITE:
      const songs = state.songs.map(clone);
      const song = find(songs, {id: state.currentID});
      song.favorite = !song.favorite;
      return {...state, songs };
    case TOGGLE_REPEAT:
      return {...state, isRepeating: !state.isRepeating };
    case TOGGLE_LOOP:
      return {...state, ...getAudioState(action.audio) };
    default:
      return state
  }
}
