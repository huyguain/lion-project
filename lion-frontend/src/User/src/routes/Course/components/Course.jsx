import React, { Component } from 'react';
import Banner from '../../../common/Banner';
import config from '../../../../../config';
import axios from 'axios'
import CourseElement from './CourseElement';
import jwt from 'jsonwebtoken';

export default class Course extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataCourse: [],
            dataLearning: []
        }
    }
    handleOnClickCourse = () => {
        const { history } = this.props;
        history.push('/course-open');
    }
    componentDidMount() {
        // axios.get(`${config.host}/list-learning-path`).
        let userToken = localStorage.getItem('userToken');
        jwt.verify(userToken, config.secret, (err, decoded) => {
            const { userId } = decoded;
            axios.get(`${config.host}/list-myCourse/${userId}`).
                then(res => {
                    this.setState({
                        dataCourse: res.data.dataCourse,
                        dataLearning: res.data.dataLearningPath
                    })
                    // this.setState({ data: res.data.data })
                }).catch(
                err => alert('Error')
                )
        })
    }
    render() {
        const { dataCourse, dataLearning } = this.state
        let sections = [];
        let result = [];
        let dataResult = []
        dataCourse.map((v, i) => {
            let arr = [];
            let totalTime = 0;
            let count = 0;
            let totalLecture = 0;
            v._id.sections.map((value, key) => {
                value.lectures.map((_v, _k) => {
                    totalTime += _v.duration;
                    if (_v.type === 'quiz') {
                        let obj = {
                            sectionId: value._id,
                            lectureId: _v._id,
                        }
                        arr.push(obj)
                    }
                })
            })
            v.sectionIds.map((_v, _k) => {
                for (let i of arr) {
                    if (i.sectionId === _v._id) {
                        _v.lectureIds.map((value, key) => {
                            if (i.lectureId === value._id) (value.result) ? count++ : count
                        })
                    }
                }
            })
            let obj = {
                idCourse: v._id._id,
                totalTime,
                lecturePass: count,
                totalSection: v._id.sections.length
            }
            dataResult.push(obj)
        })
        return (
            <div>
                <Banner />
                {
                    dataLearning.map((value, index) => {
                        return (
                            <CourseElement
                                history={this.props.history}
                                dataCourse={dataCourse}
                                idCourse={value.data}
                                learningName={value.name}
                                dataResult={dataResult}
                            />
                        )
                    })
                }
            </div>
        )
    }
}