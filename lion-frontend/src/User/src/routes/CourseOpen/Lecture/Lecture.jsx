import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addQuiz } from '../../../../../actions';
import Video from './Video'
import Video1 from '../../ViewVideo';
import './Lecture.css';
import NavigationMenuVideo from '../../../common/NavigationMenuVideo';
import moment from 'moment'
import className from 'classnames';

class Lecture extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showVideo: false,
            inforYoutube: {}
        }
        this.Quiz = this.Quiz.bind(this);
    }
    Quiz = () => {
        const { obj, history, idCourse, idSection } = this.props;
        const idLecture = obj._id
        history.push(`/quiz/${idCourse}/${idSection}/${idLecture}`);
    }
    componentDidMount() {
        // console.log('youtube', this.props.obj.urlVideo)
    }
    render() {
        const { obj, index, result, history } = this.props;
        const {idCourse} = this.props.currentCourse
        console.log('idCourse', idCourse)
        let idVideo
        if (obj.urlVideo) {
            idVideo = obj.urlVideo.split('?v=')[1]
            let end = idVideo.indexOf('&') + 1 ? idVideo.indexOf('&') : idVideo.length
            idVideo = idVideo.substring(0, end)
        }
        let check;
        result.map((value, key) => {
            value.lectureIds.map((v, k) => {
                if (v._id == obj._id) {
                    check = v.result
                }
            })
        })
        return (
            <div>
                <ul
                    className="lecture-item"
                    style={{ borderTop: `${index === 0 ? `none` : `solid 1px #e1e1e1 `}` }}
                    key={index}
                >
                    <div className="item-left">
                        <i class={className(
                            check ? "fa fa-check-circle" : "fa fa-play-circle",
                            check ? 'NavItemLectureIconFinished' : 'NavItemLectureIconNotFinished')}></i>
                        {
                            obj.title ?
                                (<div className="il-right" onClick={_ => history.push(`/video/${idVideo}/${idCourse}/${obj._id}`)}>
                                    {obj.title}</div>
                                ) :
                                (<div className="il-right" onClick={this.Quiz}>Quiz</div>)
                        }
                    </div>
                    <div className="item-time"> {moment.duration(obj.duration * 1000).minutes() + moment.duration(obj.duration * 1000).hours() * 60} : {moment.duration(obj.duration * 1000).seconds()}</div>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({ currentCourse }) => ({currentCourse}) 

export default connect(mapStateToProps, { addQuiz })(Lecture);