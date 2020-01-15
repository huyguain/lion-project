import React, { Component } from 'react'
import { Form, Input, Dropdown, Loader, Button, Icon } from 'semantic-ui-react';
import { showNav } from '../../../../../../actions';
import axios from 'axios'
import config from '../../../../../../config';
import jwt from 'jsonwebtoken';

const optionsLanguage = [
    { key: '1', value: 'C/C++', text: 'C/C++' },
    { key: '2', value: 'C#', text: 'C#' },
    { key: '3', value: 'Java', text: 'Java' },
    { key: '4', value: 'JavaScript', text: 'JavaScript' },
    { key: '5', value: 'PHP1', text: 'PHP' }
]
class LearningPathCusAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            learningPathName: [],
            dataCourse: [],
            pathName: '',
            language: '',
            message: '',
            learningPath: '',
            title: '',
            content: '',
            courses: [],
            formErrors: {
                language: false,
                learningPath: false,
                courses: []
            }
        }
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        const userToken = localStorage.getItem("userToken");
        if (id) {
            axios.get(`${config.host}/getLearningCusById/${id}`, { headers: { userToken } })
                .then(res => {
                    if (res.status === 200) {
                        this.setState({
                            dataCourse: res.data.dataCourse,
                            language: res.data.dataLearning.language,
                            learningPath: res.data.dataLearning.learningPath,
                            title: res.data.dataLearning.title,
                            content: res.data.dataLearning.content,
                            courses: res.data.dataLearning.courseIds
                        })
                    } else {
                        this.setState({
                            message: res.data.message
                        })
                    }
                }).catch(err => {

                })
        } else {
            axios.get(`${config.host}/getLearningPathName`, { headers: { userToken } }).
                then(res => {
                    if (res.status === 200) {
                        this.setState({
                            learningPathName: res.data.dataLearning,
                        })
                    } else {
                        this.setState({
                            message: res.data.message
                        })
                    }
                }).catch(err => {
                    console.log(err);
                    alert('Server Error!')
                })
        }
    }
    setCourse(value, i) {
        this.state.courses[i] = value
    }
    addCourse() {
        this.state.courses.push('')
        this.setState({
            courses: this.state.courses
        })
    }
    deleteCouse(index) {
        this.state.courses.splice(index, 1)
        this.setState({
            courses: this.state.courses
        })
    }
    validate() {
        const userToken = localStorage.getItem("userToken");
        const id = this.props.match.params.id;
        const action = id ? `editLearningCusById/${id}` : 'create-learning-pathCus'
        let { language, learningPath, title, content, formErrors, courses } = this.state,
            flag = true;
        if (language === '') {
            flag = false
            formErrors.language = true
        } else {
            formErrors.language = false
        }
        if (learningPath === '') {
            flag = false
            formErrors.learningPath = true
        } else {
            formErrors.learningPath = false
        }
        if (title === '') {
            flag = false
            formErrors.title = true
        } else {
            formErrors.title = false
        }
        if (content === '') {
            flag = false
            formErrors.content = true
        } else {
            formErrors.content = false
        }
        for (let i = 0, l = courses.length; i < l; i++) {
            if (courses[i] === '') {
                flag = false
                formErrors.courses[i] = true
            } else {
                formErrors.courses[i] = false
            }
        }
        this.setState({
            formErrors: this.state.formErrors
        })
        let courseIds = courses
        if (!flag) return 0
        let dataLearningPathCus = {
            language,
            learningPath,
            courseIds,
            content,
            title
        }
        axios.post(`${config.host}/${action}`, { dataLearningPathCus }, { headers: { userToken } })
            .then(res => {
                if (res.status === 204) {
                    this.props.history.push('/admin/learning-pathCustomise')
                } else {
                    this.setState({ message: res.data.message })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    getDataLearningPath(learningPathId) {
        const userToken = localStorage.getItem("userToken");
        axios.get(`${config.host}/getLearningPath/${learningPathId}`, { headers: { userToken } }).
            then(res => {
                if (res.status === 200) {
                    this.setState({
                        dataCourse: res.data.dataCourse,
                        language: res.data.dataLearning.language,
                        learningPath: res.data.dataLearning.learningPath,
                        title: res.data.dataLearning.title,
                        content: res.data.dataLearning.content,
                        courses: res.data.dataLearning.courseIds
                    })
                } else {
                    this.setState({
                        message: res.data.message
                    })
                }
            }).catch(err => {
                console.log(err);
                alert('Server Error !')
            })
    }
    render() {
        // const { id } = this.props.match.history
        let { language, courses, learningPath, content, title, learningPathName, dataCourse } = this.state;
        let arrPathName = learningPathName.map(v => {
            return {
                key: Math.random(),
                value: v._id,
                text: v.learningPath
            }
        })
        // for (const idCourse of courses) {
        //     for (const courseAll of dataCourse) {
        //         if (idCourse == courseAll._id) {
        //             dataCourse.splice(dataCourse.indexOf(courseAll), 1)
        //         }
        //     }
        // }
        let arrCourse = dataCourse.map(v => {
            return {
                key: Math.random(),
                value: v._id,
                text: v.courseName
            }
        })
        return (
            <div className="container-fluid">
                <div className="row justify-content-center cover-layout-editor">
                    <div className="col-md-6">
                        <div className="cover-title-0">
                            {this.props.match.params.id ? 'EDIT' : 'ADD'} LEARNING PATH CUSTOMISE
                        </div>
                        <div className="cover-line-blue"></div>
                        <Form>
                            <p className="admin-create-show-detail-title"><span>Path Name</span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.language ? 'Not be empty' : ''}
                            </span>
                            <Form.Select fluid search options={arrPathName} placeholder='Language'
                                // value={language ? language : ''}
                                disabled={this.props.match.params.id ? true : false}
                                onChange={(e, { value }) => this.getDataLearningPath(value)}
                            />

                            <p className="admin-create-show-detail-title"><span>Language</span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.language ? 'Not be empty' : ''}
                            </span>
                            <Form.Select fluid options={optionsLanguage} placeholder='Language'
                                value={language ? language : ''}
                                onChange={(e, { value }) => this.setState({ language: value })}
                            />

                            <p className="admin-create-show-detail-title"><span>Learning Path</span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.learningPath ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                fluid placeholder='Learning Path'
                                value={learningPath ? learningPath : ''}
                                onChange={e => this.setState({ learningPath: e.target.value })}
                            />

                            <p className="admin-create-show-detail-title"><span>Title</span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.title ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                fluid placeholder='Learning Path'
                                value={title ? title : ''}
                                onChange={e => this.setState({ title: e.target.value })}
                            />

                            <p className="admin-create-show-detail-title"><span>Content</span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.content ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                fluid placeholder='Content'
                                value={content ? content : ''}
                                onChange={e => this.setState({ content: e.target.value })}
                            />

                            <p className="admin-create-show-detail-title"><span>Courses</span></p>
                            <div className="container-fluid">
                                {
                                    courses.map((e, i) => {
                                        return (
                                            <div>
                                                <span style={{ color: "red" }}>
                                                    {this.state.formErrors.courses[i] ? 'Not be empty' : ''}
                                                </span>
                                                <Form.Group widths='equal'>
                                                    <Form.Select fluid
                                                        options={arrCourse}
                                                        defaultValue={e}
                                                        placeholder='Course'
                                                        onChange={(e, { value }) => this.setCourse(value, i)}
                                                    />
                                                    <Button icon className="btn-cancel-lecture" onClick={() => this.deleteCouse(i)}>
                                                        <Icon name="cancel" size="large" />
                                                    </Button>
                                                </Form.Group>
                                            </div>
                                        )
                                    })
                                }
                                <Button icon className="btn-add-lecture" onClick={_ => this.addCourse()}>
                                    <Icon name="add" size="large" />
                                </Button>
                            </div>
                            <div className="cover-action-btn">
                                <Button className="float-right cover-btn-cancel"
                                    onClick={() => this.props.history.push('/admin/learning-pathCustomise')}
                                >
                                    Cancel
                                    </Button>
                                {
                                    this.props.match.params.id ?
                                        <Button className="float-right cover-btn-save"
                                            onClick={_ => this.validate()}
                                        >
                                            Save
                                        </Button> :
                                        <Button primary
                                            className="float-right cover-btn-create"
                                            onClick={_ => this.validate()}
                                        >
                                            Add Courses
                                        </Button>
                                }
                            </div>
                        </Form>

                    </div>
                </div>
            </div>
        )
    }
}
export default LearningPathCusAdd