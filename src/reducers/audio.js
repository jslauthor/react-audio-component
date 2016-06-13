import { UPDATE_VOLUME, PLAY, SET_TIME, SET_PROGRESS } from '../constants/ActionTypes'

const initialState = {
  isPlaying: false,
  isFavorite: false,
  percent: 0,
  volume: 65,
  progress: {},
  duration: 0,
  repeat: false,
  songs: {},
  currentSong: null
};

export default function audio(state = initialState, action) {
  switch (action.type) {
    case PLAY:
      return {...state, isPlaying: action.isPlaying };
    case UPDATE_VOLUME:
      return {...state, volume: action.volume };
    case SET_TIME:
      return {...state, percent: action.time };
    case SET_PROGRESS:
      return {...state, progress: action.progress, duration: action.duration };
    default:
      return state
  }
}
