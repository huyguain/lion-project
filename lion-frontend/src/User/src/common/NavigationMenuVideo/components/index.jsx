import React, { Component } from 'react';
import NavContentListItem from './elements/NavContentListItem';
import datademo from './data';
import './index.css';
import axios from 'axios'
import config from '../../../../../config'

class NavigationVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaymenu: false,
            data: [],
            result: [],
            idCourse: ''
        }
    }
    callAPI() {
        const { idCourse } = this.props;
        axios.get(`${config.host}/course/${idCourse}`).
            then(
            res => {
                let dataCourse = res.data.data

                if (dataCourse.courseId) {
                    this.setState({
                        data: dataCourse.courseId._id.sections ? dataCourse.courseId._id.sections : [],
                        result: dataCourse.courseId.sectionIds,
                        idCourse
                    })
                } else {
                    this.setState({
                        data: dataCourse.sections,
                        idCourse
                    })
                }
            }).catch(
            err => console.log(err)
            )
    }
    componentDidMount() {
        this.callAPI();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.changedata || this.props.changedata !== prevProps.changedata) {
            this.callAPI();
        }
    }
    render() {
        let { data, displaymenu, result, idCourse } = this.state;
        let { history } = this.props
        return (
            <div className={'NavigationForVideo'}>
                {displaymenu ? <NavContentListItem
                    listitem={data}
                    naviLecture={this.props.naviLecture}
                    result={result}
                    idCourse={idCourse}
                    history={history} /> : <div></div>}
                <nav className={'NavigationVideo'}>
                    <div className={'NavHeaderVideo'}>
                        <button className={'NavHambugerVideo'}
                            onClick={() => this.setState({ displaymenu: !displaymenu })}
                        >
                            <span className={'NavIconBar'}></span>
                            <span className={'NavIconBar'}></span>
                            <span className={'NavIconBar'}></span>
                        </button>
                    </div>
                </nav >
            </div >
        )
    }

}

export default NavigationVideo