import React, { Component } from 'react';
import config from '../../../../../config'
import { connect } from 'react-redux'
import { changeCurrentCourse } from '../../../../../actions/index'

class DropdownCoursesMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: ''
        }
    }
    render() {
        const { urlIcon, courseName, _id }
            = this.props.course !== undefined ? this.props.course : {};
        const { history, learningPath } = this.props
        return (
            <li className='item-courses' onClick={async () => {
                        await this.props.changeCurrentCourse(_id, learningPath)
                        history.push(`/course-open`)
                    }
                }>
                <div className='img-item'>
                    <img src={`${config.host}/${urlIcon}`} title='courseImg' alt="image course"/>
                </div>
                <div className='courses-infor'>
                    <div className='courses-title' title={courseName}>{courseName}</div>
                    <div className='courses-dis'></div>
                </div>
            </li>
        )
    }
}

const mapStateToProps = ({currentCourse}) => {
    return {currentCourse}
}

export default connect(mapStateToProps, { changeCurrentCourse })(DropdownCoursesMenu);