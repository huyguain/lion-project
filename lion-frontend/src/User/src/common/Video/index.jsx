import React, { Component } from 'react';
import YouTube from 'react-youtube';
import './index.css';


class Video extends Component {
    render() {
        const { video, autoplay, rel } = this.props;
        return (
            <div className={'ContentVideo'}>
                <YouTube
                    videoId={video}
                    className={'ContentVideoYoutube'}
                    opts={
                        {
                            height: '100%',
                            width: '100%',
                            playerVars: {
                                autoplay: autoplay,
                                allowFullScreen: 0,
                                frameBorder: 0,
                                rel: rel,
                            }
                        }
                    }
                    onEnd={_ => console.log('end game')}
                />
            </div>
        )
    }
}

export default Video;