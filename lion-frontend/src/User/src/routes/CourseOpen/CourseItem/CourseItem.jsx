import React, { Component } from 'react';
import { connect } from 'react-redux'
import './CourseItem.css';
import Section from '../Lecture/Section.jsx';
import { getDataCourse } from '../../../../../actions'

class CourseItem extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { sections, history, result } = this.props
        return (
            <div className="course-item">
                {
                    sections.map((obj, index) => {
                        return (
                            <ul
                                className="c-i-section"
                                key={index}
                                style={{ paddingTop: `${index === 0 ? `53px` : `none`}` }}
                            >
                                <h1 className={`cis-item`}>{obj.section}</h1>
                                <Section
                                    // idCourse={idCourse}
                                    history={history}
                                    lectures={obj.lectures}
                                    result={result}
                                    idSection={obj._id}
                                />
                            </ul>
                        )
                    })
                }
            </div>
        )
    }
}

export default CourseItem;