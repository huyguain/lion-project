import React, { Component } from 'react';
import './CourseOpen.css';
import CourseItem from './CourseItem/CourseItem.jsx';
import Banner from '../../common/Banner';
import config from '../../../../config';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux'
import { changeCurrentCourse } from '../../../../actions'

class CourseOpen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complete: 50,
            data: [],
            courseName: '',
            sections: [],
            start_at: '',
            deadline: '',
            id: '',
            result: []
        }
    }
    componentDidMount() {
        // const { id, learningPath } = this.props.match.params
        const { idCourse, learningPath } = this.props.currentCourse
        console.log('id-didMount', idCourse)
        axios.get(`${config.host}/course/${idCourse}`).
            then(
            res => {
                let dataCourse = res.data.data;
                if (dataCourse.courseId) {
                    this.setState({
                        courseName: dataCourse.courseId._id.courseName,
                        sections: dataCourse.courseId._id.sections,
                        title: dataCourse.courseId._id.title,
                        content: dataCourse.courseId._id.content,
                        start_at: dataCourse.courseId._id.start_at,
                        deadline: dataCourse.courseId._id.deadline,
                        result: dataCourse.courseId.sectionIds,
                    })
                } else {
                    this.setState({
                        courseName: dataCourse.courseName,
                        sections: dataCourse.sections,
                        title: dataCourse.title,
                        content: dataCourse.content,
                        start_at: dataCourse.start_at,
                        deadline: dataCourse.deadline,
                    })
                }
            }).catch(
            err => console.log(err)
            )
    }
    componentWillReceiveProps(newProps) {
        console.log('newProps', newProps)
        // const { id, learningPath } = newProps.match.params
        const { idCourse, learningPath } = this.props.currentCourse
        console.log('id-props', idCourse)
        console.log('hoa')
        axios.get(`${config.host}/course/${idCourse}`).
            then(
            res => {
                console.log('huy')
                let dataCourse = res.data.data
                if (dataCourse.courseId) {
                    this.setState({
                        courseName: dataCourse.courseId._id.courseName,
                        sections: dataCourse.courseId._id.sections,
                        title: dataCourse.courseId._id.title,
                        content: dataCourse.courseId._id.content,
                        start_at: dataCourse.courseId._id.start_at,
                        deadline: dataCourse.courseId._id.deadline,
                        result: dataCourse.courseId.sectionIds,
                    })
                } else {
                    this.setState({
                        courseName: dataCourse.courseName,
                        sections: dataCourse.sections,
                        title: dataCourse.title,
                        content: dataCourse.content,
                        start_at: dataCourse.start_at,
                        deadline: dataCourse.deadline,
                    })
                }
            }).catch(
            err => console.log(err)
            )
    }
    render() {
        // const { courseName, sections, learningPath } = this.state
        const { learningPath } = this.props.currentCourse
        // const { history } = this.props
        const { courseName, sections, title, content, start_at, deadline, result, language } = this.state;
        const arrMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        let totalTime = 0
        let arr = []
        let count = 0
        sections.map((value, key) => {
            value.lectures.map((v, k) => {
                totalTime += v.duration;
                if (v.type === 'quiz') {
                    let obj = {
                        sectionId: value._id,
                        lectureId: v._id,
                    }
                    arr.push(obj)
                }
            })
        })
        result.map((v, k) => {
            for (let i of arr) {
                if (i.sectionId === v._id) {
                    v.lectureIds.map((value, key) => {
                        if (i.lectureId === value._id) (value.result) ? count++ : count
                    })
                }
            }
        })
        return (
            <div>
                <Banner />
                <div className="courseOpen">
                    <div className="co-body container">
                        <div className="co-b-up col-md-12">
                            <h1 className="cobu-tittle">{learningPath}</h1>
                            <div className="cobu-rectangle"></div>
                            <div className="cobu-content">
                                <div className="img"></div>
                                <div className="u-content-center">
                                    <h1 className="ucc-title">{courseName}</h1>
                                    <div className="ucc-time">
                                        <div className="t-hours">{moment.duration(totalTime * 1000).hours()} : {moment.duration(totalTime * 1000).minutes()} hours</div>
                                        <div className="t-days">{(new Date(start_at)).getDate()} {arrMonth[(new Date(start_at)).getMonth()]} - {(new Date(deadline)).getDate()} {arrMonth[(new Date(deadline)).getMonth()]}</div>
                                    </div>
                                    <div className="ucc-descreption">{content}</div>
                                </div>
                                <div className="u-content-right">
                                    <div className="ucr-up">
                                        <h1 className="urc-up-pt">{Math.ceil(count * 100 / sections.length)}%</h1>
                                        <h1 className="urc-up-complete">Complete</h1>
                                    </div>
                                    <div className="ucr-down">
                                        <div className="urc-down-progress" style={{ width: `${Math.ceil(count * 100 / sections.length)}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="co-b-down">
                            <div className="tittle">Sections</div>
                            <div className="sections">
                                <CourseItem
                                    // idCourse={this.props.match.params.id}
                                    history={this.props.history}
                                    sections={sections}
                                    result={result}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = ({ currentCourse }) => {
    return { currentCourse }
}

export default connect(mapStateToProps, { changeCurrentCourse })(CourseOpen);