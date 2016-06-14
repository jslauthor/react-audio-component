import React from 'react';
import ReactDOM from 'react-dom';
import isFunction from 'lodash/isFunction';
import partialRight from 'lodash/partialRight';
import forEach from 'lodash/forEach';

class ReactAudio extends React.Component {

    static propTypes = {
        autoplay: React.PropTypes.bool,
        preload: React.PropTypes.bool,
        source: React.PropTypes.string,
        loop: React.PropTypes.bool,
        volume: React.PropTypes.number,
        onTimeupdate: React.PropTypes.func,
        onError: React.PropTypes.func,
        onProgress: React.PropTypes.func,
        onEnded: React.PropTypes.func
    };

    static defaultProps = {
        autoplay: false,
        preload: true,
        source: "",
        loop: false,
        volume: .8,
        onTimeupdate: null,
        onError: null,
        onProgress: null,
        onEnded: null
    };

    constructor(props) {
        super(props)

        this.state = {
            listeners: []
        };
    }

    get audio() {
        if (!this.refs)
            return {};

        return ReactDOM.findDOMNode(this.refs.audio);
    }

    set audio(a) {}

    handler(e, func) {
        if (isFunction(func)) {
            func(e);
        }
    }

    addListener = (event, func) => {
        var audio = ReactDOM.findDOMNode(this.refs.audio);
        audio.addEventListener(event, partialRight(this.handler, func));
        this.state.listeners.push({event: event, func: func});
    }

    removeAllListeners = () => {
        var audio = ReactDOM.findDOMNode(this.refs.audio);
        forEach(this.state.listeners, (obj) => {
            audio.removeEventListener(obj.event, obj.func);
        })
        this.state.listeners = [];
    }

    componentDidMount() {
        this.addListener('timeupdate', this.props.onTimeupdate);
        this.addListener('progress', this.props.onProgress);
        this.addListener('error', this.props.onError);
        this.addListener('ended', this.props.onEnded);
        this.addListener('loadeddata', this.props.onLoadedData);
    }

    componentWillUnmount() {
        this.removeAllListeners();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.autoplay === true && this.props.autoplay === false) {
            this.audio.play();
        }
    }

    togglePlay = () => {
        if (this.audio.paused)
            this.audio.play();
        else
            this.audio.pause();
    }

    setPlaybackPercent(percent) {
        this.audio.currentTime = percent * this.audio.duration;
    }

    changeCurrentTimeBy = (amount) => {
        this.audio.currentTime += amount;
    }

    setVolume = (percent) => {
        this.audio.volume = percent;
    }

    render() {
        return(
            <audio
                ref="audio"
                preload={this.props.preload}
                volume={this.props.volume}
                controls={false}
                crossOrigin="anonymous"
                autoPlay={this.props.autoplay}
                loop={this.props.loop}
                src={this.props.source} />
        )
    }

}

export default ReactAudio;
