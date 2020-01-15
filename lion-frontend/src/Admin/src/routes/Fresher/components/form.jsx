
import React, { Component } from 'react';
import {
    Form,
    Input,
    Loader,
    Button,
    Dropdown
} from 'semantic-ui-react';
import moment from 'moment';
import axios from 'axios';
import config from '../../../../../config';
const languages = [
    { key: 'JavaScript', value: 'JavaScript', text: 'JavaScript' },
    { key: 'Java', value: 'Java', text: 'Java' },
    { key: '1', value: 'C#', text: 'C#' },
    { key: "C/C++", value: "C/C++", text: "C/C++" }
];
const programs = [
    { key: "Campuslink", value: "Campuslink", text: "Campuslink" },
    { key: "Fresher", value: "Fresher", text: "Fresher" }
];
class Candidate extends Component {
    state = {
        email: '',
        firstName: '',
        lastName: '',
        university: '',
        mobile: '',
        passWord: '',
        language: '',
        program: '',
        startDate: '',
        passWordError: '',
        emailError: "",
        firstNameError: "",
        lastNameError: "",
        mobileError: "",
        universityError: '',
        languageError: '',
        programError: '',
        startDateError: '',

        message: '',
        load: false,
    }
    componentDidMount() {
        let { id } = this.props.match.params
        const userToken = localStorage.getItem("userToken")
        axios.get(`${config.host}/getUserById/${id}`, { headers: { userToken } })
            .then(res => {
                this.setState({
                    note: res.data.note,
                    email: `${(res.data.email.split('@',1))}@fsoft.com.vn`,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    university: res.data.university,
                    mobile: res.data.mobile,
                    passWord: 'fresher@12345',
                })
            }).catch(err => {
                alert('Error!')
            })
    }
    validate = () => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let email = this.state.email.trim();
        let firstName = this.state.firstName.trim();
        let lastName = this.state.lastName.trim();
        let mobile = this.state.mobile.trim();
        let university = this.state.university.trim();
        let passWord = this.state.passWord.trim();
        let language = this.state.language.trim();
        let program = this.state.program.trim();
        let startDate = this.state.startDate;
        let isError = false;
        const errors = {
            emailError: "",
            firstNameError: "",
            lastNameError: "",
            mobileError: "",
            universityError: '',
            passWordError: '',
            languageError: '',
            programError: '',
            startDateError: ''
        }
        if (firstName === "" || lastName === "" || email === '' || mobile === "" ||
            university === '' || passWord === '' || language === '' || program === '' || startDate === '') {
            if (firstName === "") {
                isError = true;
                errors.firstNameError = "Error ! Require First Name";
            }
            if (lastName === "") {
                isError = true;
                errors.lastNameError = "Error ! Require Last Name";
            }
            if (mobile === "") {
                isError = true;
                errors.mobileError = "Error ! Require Mobile";
            }
            if (university === "") {
                isError = true;
                errors.universityError = "Error ! Require University";
            }
            if (passWord === "") {
                isError = true;
                errors.passWordError = "Error ! Require Pass Word";
            }
            if (language === "") {
                isError = true;
                errors.languageError = "Error ! Require language";
            }
            if (program === "") {
                isError = true;
                errors.programError = "Error ! Require Program";
            }
            if (typeof (startDate) === 'undefined') {
                isError = true;
                errors.dateError = "Require deadline";
            }
        }
        if (!re.test(email)) {
            isError = true;
            errors.emailError = "Error ! Requires valid email!";
        }
        if (!/^\d{9,10}$/.test(mobile)) {
            isError = true;
            errors.mobileError = "Please! Enter enough 9 or 10 characters";
        }
        if (firstName.length < 1 || firstName.length > 21) {
            isError = true;
            errors.firstNameError = "Please! Enter enough 1-20 characters !";
        }
        if (lastName.length < 1 || lastName.length > 21) {
            isError = true;
            errors.lastNameError = "Please! Enter enough 1-20 characters!";
        }
        if (university.length < 1 || university.length > 51) {
            isError = true;
            errors.universityError = "Please! Enter enough 1-50 characters!";
        }
        if (mobile.charAt(0) === '0') {
            isError = true;
            errors.mobileError = "Error ! Must start with other numbers 0!";
        }
        if (mobile <= 0) {
            if (mobile <= 0) {
                isError = true;
                errors.mobileError = "Please ! Insert again"
            }
        }
        if (isError) {
            this.setState({
                ...this.state,
                ...errors
            });
        }
        return isError;
    }
    sendData() {
        this.setState({
            emailError: "",
            firstNameError: "",
            lastNameError: "",
            mobileError: "",
            universityError: '',
            indetityCardError: "",
            passWordError: '',
            languageError: '',
            programError: '',
            startDateError: ''
        })
        let { id } = this.props.match.params
        this.setState({ load: !this.state.load })
        const err = this.validate();
        if (!err) {
            let dataStudent = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                userName: this.state.email,
                passWord: this.state.passWord,
                university: this.state.university,
                mobile: this.state.mobile,
                language: this.state.language,
                program: this.state.program,
                startDate: this.state.startDate
            }
            const userToken = localStorage.getItem("userToken");
            axios.post(`${config.host}/updateStudent/${id}`, { dataStudent }, { headers: { userToken } })
                .then(res => {
                    this.setState({
                        load: !this.state.load
                    })
                    this.props.history.push('/sign-in')
                }).catch(err => {
                    alert('Error!')
                })

            this.setState({
                email: '',
                firstName: '',
                lastName: '',
                university: '',
                mobile: '',
                passWord: '',
                language: '',
                program: '',
                startDate: ''
            })
        }

    }
    render() {
        let { id } = this.props.match.params
        const { language, startDate, program } = this.state;
        if (this.state.load) return (
            <Loader active inline='centered' />
        )
        return (
            <div className="container-fluid">
                <div className="row justify-content-center cover-layout-editor">
                    <div className="col-md-6">
                        <div className="cover-title-0">{(id) ? "EDIT STUDENT" : "CREATE STUDENT"}</div>
                        <div className="cover-line-blue"></div>
                        <Form>
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="cover-label"><span>First Name</span></p>
                                    <Input fluid placeholder='Nguyễn Văn'
                                        error={(this.state.firstNameError) ? true : false}
                                        onChange={e => this.setState({
                                            firstName: e.target.value,
                                            firstNameError: ``
                                        })}
                                        value={this.state.firstName}
                                        onClick={_ => this.setState({ firstNameError: `` })}
                                    />
                                    <div className="text-error">{this.state.firstNameError}</div>
                                </div>
                                <div className="col-md-6">
                                    <p className="cover-label"><span>Last Name</span></p>
                                    <Input fluid placeholder='Nam'
                                        error={(this.state.lastNameError) ? true : false}
                                        onChange={e => this.setState({
                                            lastName: e.target.value,
                                            lastNameError: ``
                                        })}
                                        value={this.state.lastName}
                                        onClick={_ => this.setState({ lastNameError: `` })}
                                    />
                                </div>
                            </div>
                            <div className="text-error">{this.state.lastNameError}</div>
                            <p className="cover-label"><span>User Name</span></p>
                            <Input fluid placeholder='nguanvannam@gmail.com'
                                error={(this.state.emailError) ? true : false}
                                onChange={e => this.setState({
                                    email: e.target.value,
                                    emailError: ``
                                })}
                                value={this.state.email}
                                onClick={_ => this.setState({ emailError: `` })}
                            />
                            <div className="text-error">{this.state.emailError}</div>
                            <p className="cover-label"><span>Pass Word</span></p>
                            <Input fluid placeholder='Pass Word'
                                // type="password"
                                onChange={e => this.setState({
                                    passWord: e.target.value,
                                    passWordError: ``
                                })}
                                value={this.state.passWord}
                                error={this.state.passWordError ? true : false}
                                onClick={_ => this.setState({ passWordError: `` })}
                            />
                            <div className="text-error">{this.state.passWordError}</div>
                            <p className="cover-label"><span>University</span></p>
                            <Input fluid placeholder='University of transport and comunication'
                                error={(this.state.universityError) ? true : false}
                                onChange={e => this.setState({
                                    university: e.target.value,
                                    universityError: ``
                                })}
                                value={this.state.university}
                                onClick={_ => this.setState({ universityError: `` })}
                            />
                            <div className="text-error">{this.state.universityError}</div>
                            <p className="cover-label"><span>Mobile</span></p>
                            <Input fluid placeholder='0978273282'
                                label='(+84)'
                                type='number'
                                error={(this.state.mobileError) ? true : false}
                                onChange={e => this.setState({
                                    mobile: e.target.value,
                                    mobileError: ``
                                })}
                                value={this.state.mobile}
                                onClick={_ => this.setState({ mobileError: `` })}
                            />
                            <div className="text-error">{this.state.mobileError}</div>
                            <p className="cover-label"><span>Language</span></p>
                            <Dropdown placeholder='Java'
                                fluid selection options={languages}
                                renderLabel={({ text }) => text}
                                value={language}
                                onChange={(event, data) => { this.setState({ language: data.value }) }}
                            />
                            <div className="text-error">{this.state.languageError}</div>
                            <p className="cover-label"><span>Start Date</span></p>
                            <Input fluid placeholder='22/10/2018'
                                type="date"
                                onChange={e => this.setState({
                                    startDate: e.target.value
                                })}
                                value={moment(new Date()).format("YYYY-MM-DD")}
                                onClick={_ => this.setState({ dateError: `` })}
                                error={this.state.dateError ? true : false}
                            />
                            <div className="text-error">{this.state.startDateError}</div>
                            <p className="cover-label"><span>Program</span></p>
                            <Dropdown placeholder='Frehser'
                                fluid selection options={programs}
                                renderLabel={({ text }) => text}
                                value={this.state.program}
                                onChange={(event, data) => { this.setState({ program: data.value }) }}
                            />
                            <div className="text-error">{this.state.programError}</div>
                            <div className="cover-action-btn">
                                <Button className="float-right cover-btn-cancel"
                                    onClick={_ => this.props.history.push('/admin/candidate')}>
                                    Cancel
                                </Button>
                                <Button className="float-right cover-btn-save"
                                    onClick={_ => this.sendData()} >
                                    Update
                                </Button>
                            </div>
                            <div><span style={{ color: "red" }}>{this.state.message}</span></div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Candidate;