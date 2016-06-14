import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactSlider from 'rc-slider';
import './ArtistInfo.css';
import '../css/ReactSlider.css';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import SpeakerIcon from './svg/SpeakerIcon.js';
import Marquee from 'react-marquee';
import cx from 'classnames';

const SpeakerHandle = props =>
  <div className="rc-slider-handle" style={{left: Math.max((props.offset*.96), 4) + '%'}}>
    <SpeakerIcon className="rc-slider-handle-icon"/>
  </div>

export default class ArtistInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showMarquee: false
    }
  }

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

  // This is dangerous. Never set state on update without a clear condition
  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this.refs.marquee);
    const shouldShow = (node.scrollWidth - node.clientWidth) > 0;
    if (this.state.showMarquee != shouldShow) {
      this.setState({
        showMarquee: shouldShow
      });
    }
  }

  onVolumeChange = (value) => {
    if (isFunction(this.props.onVolumeChange)) {
      this.props.onVolumeChange(value);
    }
  }

  render() {

    const { title, artist, volume, songID } = this.props;
    console.log(this.state.showMarquee)
    const titleClasses = cx({
      'marquee_content': true,
      'marquee_animate': this.state.showMarquee
    })

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
            <div ref="marquee" className="marquee">
              <div className={titleClasses}>
                <h2>{title}</h2>
              </div>
            </div>
          </div>
          <h6 className="truncate">{artist}</h6>
        </div>
      </div>
    );
  }

}
