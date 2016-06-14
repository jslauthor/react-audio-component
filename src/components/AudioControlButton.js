import React from 'react';
import { Circle } from 'rc-progress';
import './AudioControlButton.css';
import get from 'lodash/get';
import PauseIcon from './svg/PauseIcon.js';
import PlayIcon from './svg/PlayIcon.js';
import NextIcon from './svg/NextIcon.js';
import PreviousIcon from './svg/PreviousIcon.js';
import range from 'lodash/range';
import isFunction from 'lodash/isFunction';

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

  handleTrackClick = (e) => {
    const mouseX = e.pageX - e.currentTarget.getBoundingClientRect().left;
    const mouseY = e.pageY - e.currentTarget.getBoundingClientRect().top;
    const circleCenterX = e.currentTarget.offsetWidth/2;
    const circleCenterY = e.currentTarget.offsetHeight/2;
    const angle = Math.atan2(mouseY - circleCenterY, mouseX - circleCenterX);
    const degree = (angle * 180/Math.PI + 360) % 360;
    const percent = ((degree/360) * 100) - 75;

    if (isFunction(this.props.onTrackClick)) {
      this.props.onTrackClick(percent >= 0 ? percent : 100 + percent);
    }
  }

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
      <div className={`audio-control ${get(this.props, 'className', '')}`}>
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
        { this.props.showProgress &&
            <div onClick={this.handleTrackClick} className="rc-progress-circle">
              <Circle percent={100} strokeColor="#00000000" strokeWidth={12} trailColor="#00000000" />
            </div>
        }

        <button className="audio-control_btn" disabled={this.props.disabled} onClick={this.props.onClick}>
          {icon}
        </button>

      </div>

    );
  }
}
