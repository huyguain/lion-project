import React, { Component } from 'react';
import config from '../../../../../config';
import axios from 'axios'

const CourseItem = ({ course, history, idCourse, learningPath }) => {
    let dataCourse;
    course.map((v, i) => (idCourse == v._id._id) ? dataCourse = v._id : '')
    const { courseName, urlIcon, urlImage, _id, start_at, deadline, sections } = dataCourse
    let totalTime = 0
    sections.map((value, key) => {
        value.lectures.map((v, k) => {
            totalTime += v.duration;
        })
    })
    const arrMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    return (
        <div onClick={_ => history.push(`/course-open/${_id}/${learningPath}`)}>
            <div className=" card section-language" onClick={this.handleOnClickCourse}>
                <img class="card-img-top" src={`${config.host}/${urlImage}`} alt="Card image cap" />
                <div className="wrap-description-course card-block">
                    <img className="icon-image-course float-left" src={`${config.host}/${urlIcon}`} alt="" />
                    <div className="float-left ">
                        <div className="course-detail-name">
                            {courseName}
                        </div>
                        <div className="course-time">
                            <span className="hours">
                                {(totalTime / 60 / 60).toFixed(3)} Hours
                                                </span>
                            <span className="date">
                                {(new Date(start_at)).getDate()} {arrMonth[(new Date(start_at)).getMonth()]} - {(new Date(deadline)).getDate()} {arrMonth[(new Date(deadline)).getMonth()]}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CourseItem