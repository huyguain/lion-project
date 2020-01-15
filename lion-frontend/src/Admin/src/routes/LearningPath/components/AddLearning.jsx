
import React, { Component } from 'react'
import '../../styles/index.css';
import config from '../../../../../config';
import { Button, Form, Icon } from 'semantic-ui-react';
import axios from 'axios'

const optionsLanguage = [
    { key: '1', value: 'C/C++', text: 'C/C++' },
    { key: '2', value: 'C#', text: 'C#' },
    { key: '3', value: 'Java', text: 'Java' },
    { key: '4', value: 'JavaScript', text: 'JavaScript' },
    { key: '5', value: 'PHP1', text: 'PHP' }
]
class AddLearning extends Component {
    constructor(props) {
        super(props)
        this.state = {
            language: '',
            learningPath: '',
            title: '',
            content: '',
            courseName: [],
            courses: [],
            formErrors: {
                language: false,
                learningPath: false,
                courses: []
            }
        }
    }
    componentDidMount() {
        const userToken = localStorage.getItem("userToken");
        let { id } = this.props.match.params
        if (id) {
            axios.get(`${config.host}/get-learning-path/${id}`, { headers: { userToken } }).
                then(
                data => {
                    let result = data.data.data
                    console.log('anhtuan', result)
                    this.setState({
                        language: result.language,
                        learningPath: result.learningPath,
                        title: result.title,
                        content: result.content,
                        courses: result.courseIds
                    })
                }
                ).catch(
                err => console.log(err)
                )
        } else {
            this.setState({ courses: [''] })
        }
        axios.get(`http://localhost:8080/list-course`, {
            headers: { userToken }
        }).then(
            res => {
                let data = res.data.data,
                    courseName = [];
                for (let i = 0, l = data.length; i < l; i++) {
                    courseName.push({
                        value: data[i]._id,
                        text: data[i].courseName
                    })
                }
                this.setState({
                    courseName
                })
            }
            )
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
        const action = id ? `edit-learning-path/${id}` : 'create-learning-path'
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
        axios.post(`${config.host}/${action}`, { language, learningPath, courseIds, content, title }, {
            headers: {
                userToken
            }
        })
            .then(res => {
                console.log('ok')
                this.props.history.push('/admin/learning-path/table')
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        let { language, courses, learningPath, content, title } = this.state
        console.log('language', language)
        return (
            <div className="container-fluid">
                <div className="row justify-content-center cover-layout-editor">
                    <div className="col-md-6">
                        <div className="cover-title-0">
                            {this.props.match.params.id ? 'EDIT' : 'ADD'} LEARNING PATH
                        </div>
                        <div className="cover-line-blue"></div>
                        <Form>
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
                                                        options={this.state.courseName}
                                                        defaultValue={e._id}
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
                                    onClick={() => this.props.history.push('/admin/learning-path/table')}
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
export default (AddLearning)