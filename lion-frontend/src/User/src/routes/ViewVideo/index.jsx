import React, { Component } from 'react';
import Navigation from '../../common/NavigationMenuVideo';
import Video from '../../common/Video';
import jwt from 'jsonwebtoken';
import config from '../../../../config';
import axios from 'axios';
import './index.css';

// import yvi from 'youtube-video-info'

class ViewVideo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idVideo: '',
            userId: '',
            idLecture: '',
            changedata: true
        }
    }
    componentDidMount() {
        let userToken = localStorage.getItem('userToken');
        jwt.verify(userToken, config.secret, (err, decoded) => {
            if (err) alert('Error!');
            const { userId } = decoded;
            this.setState({
                idVideo: this.props.match.params.idVideo,
                userId,
                idLecture: this.props.match.params.idLecture
            })
        })

    }
    naviLecture(newIdVideo, idLecture) {
        this.setState({
            idVideo: newIdVideo,
            idLecture,
            changedata: true
        })
    }
    componentDidUpdate() {
        if (this.state.changedata) {
            const { idCourse } = this.props.match.params;
            const { idLecture, userId } = this.state;
            let data = {
                idLecture,
                userId,
                idCourse
            }
            axios.post(`${config.host}/updateResultVideo`, { data })
                .then(res => {
                    this.setState({ changedata: false })
                }).catch(err => {
                    alert('Error')
                })
        }
    }

    render() {
        const { idCourse } = this.props.match.params
        const { idVideo, changedata } = this.state;
        // if (idVideo) {
        //     console.log('huy')
        //     fetchVideoInfo('JWe6AKRmuPI').then(function (videoInfo) {
        //         console.log(videoInfo);
        //     });
        //     // yvi('ZGGWy8G-GA').then(function (data) { //video id 'ZGGWy8G-GA' 
        //     //     console.log(data); //spits out JSO meta data about the video 
        //     // });
        // }
        const { history } = this.props;
        return (
            <div className='bodyVideo'>
                <Video video={idVideo}
                    autoplay="1" rel="0" modest="1" />
                <Navigation
                    idCourse={idCourse}
                    changedata={changedata}
                    history={history}
                    naviLecture={this.naviLecture.bind(this)} />
                <button
                    className='BackCourseVideo'
                    onClick={_ => history.push('/course-open')}
                >Go to Course</button>
            </div>
        )
    }
}

export default ViewVideo;