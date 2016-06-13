import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactSlider from 'rc-slider';
import './ArtistInfo.css';
import '../css/ReactSlider.css';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import SpeakerIcon from './svg/SpeakerIcon.js';
import Marquee from 'react-marquee';

const SpeakerHandle = props =>
  <div className="rc-slider-handle" style={{left: Math.max((props.offset*.96), 4) + '%'}}>
    <SpeakerIcon className="rc-slider-handle-icon"/>
  </div>

export default class ArtistInfo extends React.Component {

  static propTypes = {
    coverURL: React.PropTypes.string,
    title: React.PropTypes.string,
    artist: React.PropTypes.string,
    onVolumeChange: React.PropTypes.func,
    volume: React.PropTypes.number
  };

  static defaultProps = {
    volume: 75
  };

  onVolumeChange = (value) => {
    if (isFunction(this.props.onVolumeChange)) {
      this.props.onVolumeChange(value);
    }
  }

  render() {

    const { title, artist, volume, songID } = this.props;

    return (
      <div className="artist-info">

        <div className="artist-info__cover-container">
          <ReactCSSTransitionGroup
            transitionName="cover"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}>
            <img key={songID} className="artist-info__cover" src={this.props.coverURL} />
          </ReactCSSTransitionGroup>
        </div>

        <ReactSlider
          onChange={this.onVolumeChange}
          value={volume}
          handle={<SpeakerHandle />} />
        <div className="artist-info__song">
          <div className="artist-info_title">
              <Marquee text={title} hoverToStop={true} loop={true} />
          </div>
          <h6 className="truncate">{artist}</h6>
        </div>
      </div>
    );
  }

}
