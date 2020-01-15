
import React, { Component } from 'react';
import { Form, Input, Loader, Button, Dropdown } from 'semantic-ui-react';
import moment from 'moment';
import axios from 'axios';
import config from '../../../../../../config';
const languages = [
    { key: 'c', text: 'C/C++', value: 'C/C++' },
    { key: 'j', text: 'JavaScript', value: 'JavaScript' },
    { key: '.', text: '.NET', value: '.NET' },
    { key: 'a', text: 'Java', value: 'Java' },
    { key: 'n', text: 'NodeJS', value: 'NodeJS' },
    { key: 'r', text: 'ReactJS', value: 'ReactJS' },
    { key: 'ag', text: 'AngularJS', value: 'AngularJS' },
    { key: '#', text: 'C#', value: 'C#' },
    { key: 'p', text: 'PHP', value: 'PHP' },
    { key: 't', text: 'Test', value: 'Test' }
];
class FrehserAdd extends Component {
    state = {
        firstName: '',
        lastName: '',
        userName: '',
        passWord: '',
        language: '',
        note: '',
        startDate: '',
        university: '',
        mobile: '',

        firstNameError: "",
        lastNameError: "",
        userNameError: "",
        passWordError: '',
        languageError: '',
        startDateError: '',
        mobileError: "",
        universityError: '',

        message: '',
        load: false,
    }
    componentDidMount() {
        let { id } = this.props.match.params
        const userToken = localStorage.getItem("userToken")
        axios.get(`${config.host}/getFresherById/${id}`, { headers: { userToken } })
            .then(res => {
                this.setState({
                    firstName: res.data.dataFresher.firstName,
                    lastName: res.data.dataFresher.lastName,
                    userName: res.data.dataFresher.userName,
                    language: res.data.dataFresher.language,
                    passWord: '*********',
                    note: res.data.dataFresher.note,
                    startDate: moment(res.data.dataFresher.startDate).format("MM/DD/YYYY"),
                    university: res.data.dataFresher.university,
                    mobile: res.data.dataFresher.mobile,
                })
            }).catch(err => {
                alert('Error!')
            })
    }
    validate = () => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let userName = this.state.userName.trim();
        let firstName = this.state.firstName.trim();
        let lastName = this.state.lastName.trim();
        let mobile = (this.state.mobile).toString().trim();
        let university = this.state.university.trim();
        let passWord = this.state.passWord.trim();
        let language = this.state.language.trim();
        let startDate = this.state.startDate;
        let isError = false;
        const errors = {
            userNameError: "",
            firstNameError: "",
            lastNameError: "",
            mobileError: "",
            universityError: '',
            passWordError: '',
            languageError: '',
            startDateError: ''
        }
        if (firstName === "" || lastName === "" || userName === '' || mobile === "" ||
            university === '' || passWord === '' || language === '' || startDate === '') {
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
            if (typeof (startDate) === 'undefined') {
                isError = true;
                errors.dateError = "Require deadline";
            }
        }
        if (!re.test(userName)) {
            isError = true;
            errors.userNameError = "Error ! Requires valid userName!";
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
            userNameError: "",
            firstNameError: "",
            lastNameError: "",
            mobileError: "",
            universityError: '',
            indetityCardError: "",
            passWordError: '',
            languageError: '',
            startDateError: ''
        })
        let { id } = this.props.match.params
        this.setState({ load: !this.state.load })
        const err = this.validate();
        if (!err) {
            let dataCampuslink = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                userName: this.state.userName,
                passWord: this.state.passWord,
                university: this.state.university,
                mobile: this.state.mobile,
                language: this.state.language,
                startDate: this.state.startDate,
                note: this.state.note
            }
            const userToken = localStorage.getItem("userToken");
            if (!id) {
                axios.post(`${config.host}/createCampuslink`, { dataCampuslink }, { headers: { userToken } })
                    .then(res => {
                        if (res.status === 204) {
                            this.setState({ load: !this.state.load })
                            this.props.history.push('/admin/fresher')
                        } else {
                            this.setState({
                                load: !this.state.load,
                                message: res.data.message
                            })
                        }
                    }).catch(err => {
                        console.log(err)
                        this.setState({ load: !this.state.load })
                        alert('Error!')
                    })
            } else {
                axios.patch(`${config.host}/editFresherById/${id}`, { dataCampuslink }, { headers: { userToken } })
                    .then(res => {
                        if (res.status === 204) {
                            this.setState({ load: !this.state.load })
                            this.props.history.push('/admin/fresher')
                        } else {
                            this.setState({
                                load: !this.state.load,
                                message: res.data.message
                            })
                        }
                    }).catch(err => {
                        console.log(err)
                        this.setState({ load: !this.state.load })
                        alert('Error!')
                    })
            }
            this.setState({
                userName: '',
                firstName: '',
                lastName: '',
                university: '',
                mobile: '',
                passWord: '',
                language: '',
                startDate: '',
                note: ''
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
                        <div className="cover-title-0">{(id) ? "EDIT CAMPUSLINK" : "ADD CAMPUSLINK"}</div>
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
                                disabled={id ? true : false}
                                error={(this.state.userNameError) ? true : false}
                                onChange={e => this.setState({
                                    userName: e.target.value,
                                    userNameError: ``
                                })}
                                value={this.state.userName}
                                onClick={_ => this.setState({ userNameError: `` })}
                            />
                            <div className="text-error">{this.state.userNameError}</div>
                            <p className="cover-label"><span>Pass Word</span></p>
                            <Input fluid placeholder='Pass Word'
                                disabled={id ? true : false}
                                type="password"
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
                                value={moment(this.state.startDate).format('YYYY-MM-DDTHH:mm')}
                                onClick={_ => this.setState({ dateError: `` })}
                                error={this.state.dateError ? true : false}
                            />
                            <div className="text-error">{this.state.startDateError}</div>
                            <p className="cover-label"><span>Note</span></p>
                            <Input fluid placeholder='note'
                                onChange={e => this.setState({
                                    note: e.target.value,
                                })}
                                value={this.state.note}
                            />
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
export default FrehserAdd;