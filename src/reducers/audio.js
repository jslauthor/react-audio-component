import {
  INITIALIZE,
  UPDATE_VOLUME, NEXT, PREVIOUS,
  PLAY, SET_TIME, SET_PROGRESS,
  TOGGLE_FAVORITE, TOGGLE_REPEAT
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
  percent: 0,
  volume: 65,
  progress: {},
  duration: 0,
  repeat: false,
  songs: [],
  currentID: null,
  defaultSong: {
    "id": -1,
    "coverURL": "/public/miro_cover.jpg",
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

export default function audio(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE:
      const songsArray = sortBy(action.songs, ['id']);
      return {...state, songs: songsArray, currentID: songsArray[0].id };
    case PLAY:
      return {...state, isPlaying: action.isPlaying };
    case NEXT:
      return {...state, currentID: getAdjacentSong(state.songs, getSongIndex(state.songs, state.currentID), 1) };
    case PREVIOUS:
      return {...state, currentID: getAdjacentSong(state.songs, getSongIndex(state.songs, state.currentID), -1) };
    case UPDATE_VOLUME:
      return {...state, volume: action.volume };
    case SET_TIME:
      return {...state, percent: action.time };
    case SET_PROGRESS:
      return {...state, progress: action.progress, duration: action.duration };
    case TOGGLE_FAVORITE:
      const songs = state.songs.map(clone);
      const song = find(songs, {id: state.currentID});
      song.favorite = !song.favorite;
      return {...state, songs };
    case TOGGLE_REPEAT:
      return {...state, isRepeating: !state.isRepeating };
    default:
      return state
  }
}
