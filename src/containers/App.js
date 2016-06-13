import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AudioActions from '../actions'
import Utilities from '../components/Utilities';
import ArtistInfo from '../components/ArtistInfo';
import ReactAudio from '../audio/ReactAudio';
import find from 'lodash/find';
import './App.css';

@connect(
  state => ({audio: state.audio}),
  dispatch => bindActionCreators(AudioActions, dispatch)
)

export default class App extends React.Component {

  componentDidMount() {
    // Initialize DOM Audio and retrieve
    this.props.updateVolume(ReactDOM.findDOMNode(this.refs.audio), this.props.audio.volume);
    this.props.setProgress(ReactDOM.findDOMNode(this.refs.audio));
    this.props.setTime(ReactDOM.findDOMNode(this.refs.audio));
    this.props.retrieveSongs();
  }

  handleProgress = () => {
    this.props.setProgress(ReactDOM.findDOMNode(this.refs.audio));
  }

  handleTimeupdate = () => {
    this.props.setTime(ReactDOM.findDOMNode(this.refs.audio));
  }

  handleError = (e) => {

  }

  handlePlay = () => {
    this.props.play(ReactDOM.findDOMNode(this.refs.audio));
  }

  handleNext = () => {
    this.props.next(ReactDOM.findDOMNode(this.refs.audio));
  }

  handlePrevious = () => {
    this.props.previous(ReactDOM.findDOMNode(this.refs.audio));
  }

  handleVolumeChange = (volume) => {
    this.props.updateVolume(ReactDOM.findDOMNode(this.refs.audio), volume);
  }

  handleToggleFavorite = () => {
    this.props.toggleFavorite();
  }

  handleToggleRepeat = () => {
    this.props.toggleRepeat();
  }

  render() {

    const {
      volume, isPlaying, percent, isFavorite, progress,
      duration, isRepeating, songs, currentID, autoplay
    } = this.props.audio;

    let song = find(songs, (o) => o.id === currentID);

    if (song === undefined) song = this.props.audio.defaultSong;

    return (
      <div className="app">
        <ReactAudio
            ref="audio"
            autoplay={autoplay}
            source={song.audioFile}
            onProgress={this.handleProgress}
            onTimeupdate={this.handleTimeupdate}
            onError={this.handleError} />
        <Utilities
          isPlaying={isPlaying}
          percent={percent*100}
          progress={progress}
          duration={duration}
          disableChange={songs.length <= 1}
          onPlay={this.handlePlay}
          onNext={this.handleNext}
          onPrevious={this.handlePrevious}
          isFavorite={song.favorite}
          isRepeating={isRepeating}
          onToggleRepeat={this.handleToggleRepeat}
          onToggleFavorite={this.handleToggleFavorite} />
        <ArtistInfo
          coverURL={song.coverURL}
          songID={song.id}
          title={song.title}
          artist={song.artist}
          volume={volume}
          onVolumeChange={this.handleVolumeChange} />
      </div>
    );
  }

}
