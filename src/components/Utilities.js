import React from 'react';
import AudioControl from './AudioControlButton.js';
import HeartIcon from './svg/HeartIcon.js';
import ShareIcon from './svg/ShareIcon.js';
import RepeatIcon from './svg/RepeatIcon.js';
import cx from 'classnames';
import './Utilities.css';

export default class Utilities extends React.Component {

  static propTypes = {
    isPlaying: React.PropTypes.bool,
    percent: React.PropTypes.number,
    isFavorite: React.PropTypes.bool,
    onPlay: React.PropTypes.func,
    onNext: React.PropTypes.func,
    onPrevious: React.PropTypes.func,
    progress: React.PropTypes.object,
    onToggleFavorite: React.PropTypes.func,
    onToggleRepeat: React.PropTypes.func
  };

  static defaultProps = {
    isPlaying: false,
    percent: 0,
    isFavorite: false,
    progress: {},
    percent: 0
  }

  render() {

    const playMode = this.props.isPlaying ? "pause" : "play";
    const heartClasses = cx({
      'utilities_btn-pink': !this.props.isFavorite,
      'utilities_favorite': this.props.isFavorite
    });
    const repeatClasses = cx({
      'utilities_btn-green': !this.props.isRepeating,
      'utilities_repeating': this.props.isRepeating
    });

    return (
      <div className="utilities">
        <AudioControl
          className="utilities_play"
          mode={playMode} showProgress={true}
          percent={this.props.percent}
          duration={this.props.duration}
          progress={this.props.progress}
          onClick={this.props.onPlay} />
        <AudioControl mode="next" className="utilities_control" onClick={this.props.onNext} />
        <AudioControl mode="previous" className="utilities_control" onClick={this.props.onPrevious} />
        <div className="utilities__social">
          <RepeatIcon className={repeatClasses} onClick={this.props.onToggleRepeat} />
          <ShareIcon className="utilities_btn-green" />
          <HeartIcon className={heartClasses} onClick={this.props.onToggleFavorite} />
        </div>
      </div>
    );
  }
}
