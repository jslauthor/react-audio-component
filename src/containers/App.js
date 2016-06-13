import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AudioActions from '../actions'
import Utilities from '../components/Utilities';
import ArtistInfo from '../components/ArtistInfo';
import ReactAudio from '../audio/ReactAudio';
import './App.css';

@connect(
  state => ({audio: state.audio}),
  dispatch => bindActionCreators(AudioActions, dispatch)
)

export default class App extends React.Component {

  componentDidMount() {
    // Initialize DOM Audio
    this.props.updateVolume(ReactDOM.findDOMNode(this.refs.audio), this.props.audio.volume);
    this.props.setProgress(ReactDOM.findDOMNode(this.refs.audio));
    this.props.setTime(ReactDOM.findDOMNode(this.refs.audio));
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

  }

  handlePrevious = () => {

  }

  handleVolumeChange = (volume) => {
    this.props.updateVolume(ReactDOM.findDOMNode(this.refs.audio), volume);
  }

  render() {

    const { volume, isPlaying, percent, isFavorite, progress, duration } = this.props.audio;

    return (
      <div className="app">
        <ReactAudio
            ref="audio"
            autoplay={false}
            source="/public/Consolation.mp3"
            onProgress={this.handleProgress}
            onTimeupdate={this.handleTimeupdate}
            onError={this.handleError} />
        <Utilities
          isPlaying={isPlaying}
          percent={percent*100}
          progress={progress}
          duration={duration}
          onPlay={this.handlePlay}
          onNext={this.handleNext}
          onPrevious={this.handlePrevious} />
        <ArtistInfo
          coverURL="https://i1.sndcdn.com/artworks-000166937249-gcv1rk-t500x500.jpg"
          title="Consolation"
          artist="Miro"
          volume={volume}
          isFavorite={isFavorite}
          onVolumeChange={this.handleVolumeChange} />
      </div>
    );
  }

}
