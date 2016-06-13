import React from 'react';
import ReactSlider from 'rc-slider';
import './ArtistInfo.css';
import '../css/ReactSlider.css';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import SpeakerIcon from './svg/SpeakerIcon.js';
import TextFit from 'react-textfit';
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

    const { title, artist, volume } = this.props;

    const cover = !isEmpty(this.props.coverURL) ?
      <img className="artist-info__cover" src={this.props.coverURL} /> :
      <div className="artist-info__cover">Loading</div>

    return (
      <div className="artist-info">
        {cover}
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
