import React, { Component } from 'react';
import axios from 'axios';
import { showNav } from '../../../../../../actions';
import config from '../../../../../../config';
import { connect } from 'react-redux';
import InlineError from '../../../../components/InlineError';

import {
    Form,
    TextArea,
    Button,
    Dropdown,
    Checkbox,
    Loader
} from 'semantic-ui-react';
const languages = [
    { key: 'JavaScript', value: 'JavaScript', text: 'JavaScript' },
    { key: 'Java', value: 'Java', text: 'Java' },
    { key: '1', value: 'C#', text: 'C#' },
    { key: "C/C++", value: "C/C++", text: "C/C++" }
];
const optionAnswer = [
    {
        key: 'a',
        text: 'A',
        value: 'a'
    },
    {
        key: 'b',
        text: 'B',
        value: 'b'
    },
    {
        key: 'c',
        text: 'C',
        value: 'c'
    },
    {
        key: 'd',
        text: 'D',
        value: 'd'
    }
];
const types = [
    {
        text: 'Entry Test',
        value: "Entry Test",
    },
    {
        text: "Final Test",
        value: "Final Test"
    },
    {
        text: "Quiz",
        value: "Quiz"
    }
]
const levels = [
    {
        text: 'Easy',
        value: 1,
    },
    {
        text: "Medium",
        value: 2
    },
    {
        text: "Hard",
        value: 3
    }
]
class AddQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: "",
            level: 1,
            type: "Entry Test",
            language: "",
            course: "",
            section: "",
            options: {
                a: "",
                b: "",
                c: "",
                d: ""
            },
            multi: false,
            correct: [],
            courses: [],
            sectionss: [],
            loading: false,
            errors: {}

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    checkExist(language, arrLanguage) {
        for (let item of arrLanguage) {
            if (language === item.value) { return true }
        }
    }
    validate = () => {
        const errors = {};
        const { question, language, correct, multi } = this.state;
        const { a, b } = this.state.options;
        if (!question) errors.question = "Can't be blank";
        if (!a) errors.optionA = "Can't be blank";
        if (!b) errors.optionB = "Can't be blank";
        if (multi) {
            if (correct.length < 2) {
                errors.correct = "Please add more answer!"
            }
        } else {
            if (correct.length === 0) {
                errors.correct = "Can't be blank";
            }
        }
        if (!this.checkExist(language, languages)) {
            errors.language = "Please choose language again!";
        }
        return errors;
    }
    handleSubmit() {
        let { id } = this.props.match.params;
        const { question, level, type, language, course, section, multi, correct, options } = this.state;
        const dataQuestion = {
            question,
            level,
            type,
            language,
            course, 
            section,
            multi,
            correct,
            options
        }
        const userToken = localStorage.getItem("userToken")
        const errors = this.validate();
        this.setState({ errors })
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true })
            if (!id) {
                axios.post(`${config.host}/addQuestion`, dataQuestion, { headers: { userToken } })
                    .then(res => {
                        this.props.history.push("/admin/question/view-question")
                    }).catch(err => {
                        this.setState({ loading: false })
                    })
            } else {
                console.log(dataQuestion)
                axios.post(`${config.host}/editQuestion/${id}`, dataQuestion, { headers: { userToken } })
                    .then(res => {
                        this.props.history.push("/admin/question/view-question")
                    }).catch(err => {
                        this.setState({ loading: false })
                    })
            }
        }

    }
    onCancel() {
        const { history } = this.props;
        history.push("/admin/question/view-question");
    }
    onChange(event, data) {
        this.setState({ [data.name]: data.value });
        console.log(this.state)
    }
    componentDidMount() {
        let { id } = this.props.match.params
        const userToken = localStorage.getItem("userToken")
        if (id) {
            axios.get(`${config.host}/getQuestionById/${id}`, { headers: { userToken } })
                .then(res => {
                    this.setState({
                        question: res.data.question,
                        language: res.data.language,
                        section: res.data.section,
                        type: res.data.type,
                        level: res.data.level,
                        multi: res.data.multi,
                        options: {
                            a: res.data.options.a,
                            b: res.data.options.b,
                            c: res.data.options.c,
                            d: res.data.options.d
                        },
                        course: res.data.course,
                        correct: res.data.correct,
                    })
                }).catch(err => {
                    alert('Error!')
                })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const { language } = this.state;
        const userToken = localStorage.getItem("userToken")
        if (prevState.language !== language) {
            const { type, language } = this.state;
            if (type !== "Entry Test") {
                axios.get('/list-course', { headers: { userToken } })
                    .then(res => {
                        console.log("/list-course", res.data)
                        const arrCourse = res.data.data.filter((course) => course.language === language);
                        let courses = [];
                        let sectionss = [];
                        arrCourse.forEach(function (course) {
                            const { _id, courseName, sections } = course;
                            courses = [...courses, { key: _id, text: courseName, value: courseName }];
                            if (type === "Quiz") {
                                sections.forEach(function (sec) {
                                    const { _id, section } = sec;
                                    sectionss = [...sectionss, { key: _id, text: section, value: section }];
                                })
                            }
                        });
                        this.setState({ courses, sectionss });
                    }).catch(err => {
                        console.log('Error!', err)
                    })
            }
        }
    }
    render() {
        let { id } = this.props.match.params
        const { type, multi, language, course, section, question, level, options, correct, courses, sectionss, errors, loading } = this.state;
        return (
            <div className="container-fluid">
                <div className="row justify-content-center cover-layout-editor">
                    <div className="col-md-8">
                        <div className="cover-title-0">{id ? 'EDIT' : 'ADD'} QUESTION</div>
                        <div className="cover-line-blue"></div>
                        <Form loading={loading} onSubmit={this.handleSubmit}>
                            <label className="cover-label">Question</label>
                            <Form.Field id='form-textarea-control-opinion'
                                name="question"
                                error={(errors.question) ? true : false}
                                control={TextArea}
                                placeholder='Question'
                                value={question}
                                onChange={this.onChange}
                            />
                            {errors.question && <InlineError text={errors.question} />}
                            <label className="cover-label" htmlFor="">Level</label>
                            <Dropdown placeholder='Select level'
                                name="level"
                                fluid selection options={levels}
                                renderLabel={({ text }) => text}
                                value={level}
                                onChange={this.onChange}
                            />
                            <label className="cover-label" htmlFor="">Type</label>
                            <Dropdown placeholder='Select Type'
                                name="type"
                                defaultValue="Entry Test"
                                fluid selection options={types}
                                renderLabel={({ text }) => text}
                                value={type}
                                onChange={this.onChange}
                            />
                            <label className="cover-label" htmlFor="">Language</label>
                            <Dropdown placeholder='Select Language'
                                name="language"
                                error={(errors.language) ? true : false}
                                fluid search selection options={languages}
                                renderLabel={({ text }) => text}
                                value={language}
                                onChange={this.onChange}
                            />
                            {errors.language && <InlineError text={errors.language} />}
                            <div className={type === "Entry Test" ? "hide-input" : "show-input"}>
                                <label className="cover-label" htmlFor="">Course Name</label>
                                <Dropdown placeholder='Select Course'
                                    name="course"
                                    fluid search selection options={courses}
                                    renderLabel={({ text }) => text} 
                                    value={course}
                                    onChange={this.onChange}/>
                            </div>
                            <div className={type === "Quiz" ? "show-input" : "hide-input"}>
                                <label className="cover-label" htmlFor="">Section</label>
                                <Dropdown placeholder='Select Section'
                                    name="section"
                                    fluid search selection options={sectionss}
                                    renderLabel={({ text }) => text} 
                                    value={section}
                                    onChange={this.onChange}/>
                            </div>
                            <label className="cover-label">Option A</label>
                            <Form.Field id='form-textarea-control-opinion'
                                error={(errors.optionA) ? true : false}
                                control={TextArea}
                                placeholder='Option A'
                                value={options.a}
                                onChange={(event, data) => { this.setState({ options: { ...options, a: data.value } }) }}
                            />
                            {errors.optionA && <InlineError text={errors.optionA} />}
                            <label className="cover-label">Option B</label>
                            <Form.Field id='form-textarea-control-opinion'
                                error={(errors.optionB) ? true : false}
                                control={TextArea}
                                placeholder='Option B'
                                value={options.b}
                                onChange={(event, data) => { this.setState({ options: { ...options, b: data.value } }) }}
                            />
                            {errors.optionB && <InlineError text={errors.optionB} />}
                            <label className="cover-label">Option C</label>
                            <Form.Field id='form-textarea-control-opinion'
                                error={(this.state.optionC_Error) ? true : false}
                                control={TextArea}
                                placeholder='Option C'
                                value={options.c}
                                onChange={(event, data) => { this.setState({ options: { ...options, c: data.value } }) }}
                            />
                            <label className="cover-label">Option D</label>
                            <Form.Field id='form-textarea-control-opinion'
                                control={TextArea}
                                placeholder='Option D'
                                onChange={(event, data) => { this.setState({ options: { ...options, d: data.value } }) }}
                                value={options.d}
                            />
                            <Checkbox className="cover-label"
                                defaultChecked={false}
                                label={<label>Multible Choices</label>}
                                value={multi}
                                checked={multi}
                                onChange={(event, data) => { this.setState({ multi: data.checked }) }}
                            />
                            <br />
                            <label className="cover-label" >Correct Answer</label>
                            <div className={multi ? "hide-input" : "show-input"} >
                                <Dropdown
                                    placeholder='Select correct answer'
                                    fluid selection options={optionAnswer}
                                    value={correct[0]}
                                    onChange={(event, data) => { this.setState({ correct: [data.value] }) }}
                                />
                                {errors.correct && <InlineError text={errors.correct} />}
                            </div>
                            <div className={multi ? "show-input" : "hide-input"}>
                                <Dropdown
                                    error={(this.state.correctError) ? true : false}
                                    multiple placeholder='Select correct answer'
                                    fluid selection options={optionAnswer}
                                    value={correct}
                                    onChange={(event, data) => { this.setState({ correct: data.value }) }}
                                />
                                {errors.correct && <InlineError text={errors.correct} />}
                            </div>
                            <div className="cover-action-btn">
                                <Button className="float-right cover-btn-cancel" onClick={this.onCancel} >Cancel</Button>
                                <Button className="float-right cover-btn-save"
                                    onClick={this.handleSubmit} >{id ? 'Edit' : 'Save'}</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(null, { showNav })(AddQuestion)