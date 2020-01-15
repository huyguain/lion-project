import React, { Component } from 'react';
import Lecture from './Lecture'
import './Lecture.css';

class Section extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let { lectures, result, history, idSection } = this.props
        return (
            <div className="lecture">
                {
                    this.props.lectures.map((obj, index) => {
                        return (
                            <Lecture
                                // idCourse={idCourse}
                                obj={obj}
                                index={index}
                                history={history}
                                result={this.props.result}
                                idSection={idSection}
                            />
                        )
                    })
                }
            </div>
        )
    }
}

export default Section;