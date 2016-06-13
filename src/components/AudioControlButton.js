import React from 'react';
import { Circle } from 'rc-progress';
import './AudioControlButton.css';
import get from 'lodash/get';
import PauseIcon from './svg/PauseIcon.js';
import PlayIcon from './svg/PlayIcon.js';
import NextIcon from './svg/NextIcon.js';
import PreviousIcon from './svg/PreviousIcon.js';
import range from 'lodash/range';

export default class AudioControlButton extends React.Component {

  static propTypes = {
    mode: React.PropTypes.oneOf(['play', 'pause', 'next', 'previous']),
    showProgress: React.PropTypes.bool,
    percent: React.PropTypes.number,
    duration: React.PropTypes.number,
    progress: React.PropTypes.object
  };

  static defaultProps = {
    mode: 'play',
    showProgress: false,
    percent: 0,
    duration: 0,
    progress: {}
  };

  render() {

    let icon = <PauseIcon />;
    switch (this.props.mode) {
      case 'play':
        icon = <PlayIcon className="audio-control_play" />;
        break;
      case 'next':
        icon = <NextIcon />;
        break;
      case 'previous':
        icon = <PreviousIcon />;
        break;
    }

    return (
      <div className={`audio-control ${get(this.props, 'className', '')}`} onClick={this.props.onClick}>
        <button className="audio-control_btn" disabled={this.props.disabled}>
          {
            this.props.showProgress && range(0, this.props.progress.length).map((i) => {
              const d = this.props.duration;
              const start = this.props.progress.start(i);
              const end = this.props.progress.end(i);
              const buffer = (end - start) / d;

              return <div key={i} style={{transform: `rotate(${360*(start/d)} deg)`}}
                          className="audio-control_progress-container">
                        <Circle percent={buffer*100}
                          strokeColor="#D9D9D9" strokeWidth={8} trailColor="#FFFFFFFF" />
                     </div>
            })

          }
          { this.props.showProgress && <Circle percent={this.props.percent} strokeColor="#E76161" strokeWidth={8} trailColor="#FFFFFFFF" /> }
          {icon}
        </button>
      </div>

    );
  }
}
