import React, { Component } from 'react';
const Video = ({ obj }) => {
    return (
        <div className="youtube">
            <iframe
                allowfullscreen="allowfullscreen"
                mozallowfullscreen="mozallowfullscreen"
                msallowfullscreen="msallowfullscreen"
                oallowfullscreen="oallowfullscreen"
                webkitallowfullscreen="webkitallowfullscreen"
                src={obj.urlVideo.replace(/\.com/g, '.com/embed')}>
            </iframe>
        </div>
    )
}

export default Video