import React, { Component } from 'react';
import config from '../../../../../config';
import axios from 'axios'
import CourseItem from './CourseItem';
import moment from 'moment'


const CourseElement = ({ idCourse, learningName, dataCourse, history, dataResult }) => {
    let data = [];
    for (const i of idCourse) {
        dataCourse.map((v, k) => {
            if (i === v._id._id) data.push(v._id)
        })
    }
    let count = 0;
    let timeAfter = 0;
    let timeBefore = 0;
    for (const i of data) {
        dataResult.map(v => {
            if (i._id === v.idCourse) {
                if (v.lecturePass === v.totalSection) {
                    count++;
                    timeBefore = + v.totalTime
                } else {
                    count;
                    timeAfter = +v.totalTime
                }
            }
        })
    }
    return (
        <div className='anhtuan'>
            <div className="container">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="wrap-course-name">
                                <div className="course-name">{learningName}</div>
                                <div className="line-light-blue"></div>
                            </div>
                        </div>
                        <div className="col-md-4 wrap-course-name">
                            <div className="time-percent">
                                <div className="text">
                                    Watched {moment.duration(timeBefore * 1000).hours()} : {moment.duration(timeBefore * 1000).minutes()} of {moment.duration((timeBefore + timeAfter) * 1000).hours()} : { moment.duration((timeBefore + timeAfter) * 1000).minutes() } Hours <span className="percent">{Math.ceil(count * 100 / data.length)}%</span> Completed
                                </div>
                                <div className="slider_percent" style={{ width: `${Math.ceil(count * 100 / data.length)}%` }}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="card-columns ">
                        {idCourse.map((v, i) => {
                            return (
                                <CourseItem
                                    history={history}
                                    course={dataCourse}
                                    idCourse={v}
                                    learningPath={learningName}
                                />
                            )
                        })}

                    </div>
                </div>
                <div className="col-md-12">
                    <center className="line-border-bottom">
                        <button className="btn-view-more-course">More</button>
                    </center>
                </div>
            </div>
        </div>
    )
}
export default CourseElement