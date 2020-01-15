
import React, { Component } from 'react'
import { Form, Input, Loader, Button } from 'semantic-ui-react';
import { showNav } from '../../../../../../actions';
import { connect } from 'react-redux';
import axios from 'axios'
import config from '../../../../../../config';

class CandidateAdd extends Component {
    state = {
        email: '',
        firstName: '',
        lastName: '',
        university: '',
        mobile: '',
        note: '',

        emailError: "",
        firstNameError: "",
        lastNameError: "",
        mobileError: "",
        universityError: '',

        message: '',
        load: false,
    }
    componentDidMount() {
        this.props.showNav('NAV_USER');
        let { id } = this.props.match.params
        if(id){
            this.setState({ load: !this.state.load })
        const userToken = localStorage.getItem("userToken")
        axios.get(`${config.host}/getCandidateById/${id}`, { headers: { userToken } })
            .then(res => {
                if(res.status===200){
                    this.setState({
                        note: res.data.dataCandidate.note,
                        email: res.data.dataCandidate.email,
                        firstName: res.data.dataCandidate.firstName,
                        lastName: res.data.dataCandidate.lastName,
                        university: res.data.dataCandidate.university,
                        mobile: `${res.data.dataCandidate.mobile}`,
                        load: !this.state.load
                    })
                }else{
                    this.setState({
                        message: res.data.message,
                        load: !this.state.load
                    })
                }
            }).catch(err => {
                console.log(err)
                this.setState({ load: !this.state.load })
                alert('Error!')
            })
        }
    }
    validate = () => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let email = this.state.email.trim();
        let firstName = this.state.firstName.trim();
        let lastName = this.state.lastName.trim();
        let mobile = this.state.mobile.trim();
        let university = this.state.university.trim();
        let isError = false;
        const errors = {
            emailError: "",
            firstNameError: "",
            lastNameError: "",
            mobileError: "",
            universityError: ''
        }
        if (firstName === "" || lastName === "" || email === '' || mobile === "" || university === '') {
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
            indetityCardError: ""
        })
        let { id } = this.props.match.params
        this.setState({ load: !this.state.load })
        const err = this.validate();
        if (!err) {
            let dataCandidate = {
                note: this.state.note,
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                university: this.state.university,
                mobile: parseInt(this.state.mobile),
            }
            const userToken = localStorage.getItem("userToken");
            if (!id) {
                axios.post(`${config.host}/createCandidate`, {dataCandidate}, { headers: { userToken } })
                    .then(res => {
                        if (res.status ===204) {
                            this.props.history.push('/admin/candidate')
                            this.setState({
                                load: !this.state.load
                            })
                        } else {
                            this.setState({
                                message: res.data.message,
                                load: !this.state.load
                            })
                        }
                    }).catch(err => {
                        console.log(err)
                        this.setState({ load: !this.state.load })
                        alert('Error!')
                    })
            } else {
                let dataUpdate = dataCandidate
                axios.patch(`${config.host}/editCandidate/${id}`, {dataUpdate}, { headers: { userToken } })
                    .then(res => {
                        if(res.status ===204){
                            this.props.history.push('/admin/candidate')
                            this.setState({
                                load: !this.state.load
                            })
                        }else{
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
                email: '',
                firstName: '',
                lastName: '',
                university: '',
                mobile: '',
            })
        }

    }
    render() {
        let { id } = this.props.match.params
        if (this.state.load) return (
            <Loader active inline='centered' />
        )
        return (
            <div className="container-fluid">
                <div className="row justify-content-center cover-layout-editor">
                    <div className="col-md-6">
                        <div className="cover-title-0">{(id) ? "EDIT CANDIDATE" : "CREATE CANDIDATE"}</div>
                        <div className="cover-line-blue"></div>
                        <Form>
                            <p className="cover-label"><span>First Name</span></p>
                            <Input fluid placeholder='First Name'
                                error={(this.state.firstNameError) ? true : false}
                                onChange={e => this.setState({
                                    firstName: e.target.value,
                                    firstNameError: ``
                                })}
                                value={this.state.firstName}
                                onClick={_ => this.setState({ firstNameError: `` })}
                            />
                            <div className="text-error">{this.state.firstNameError}</div>
                            <p className="cover-label"><span>Last Name</span></p>
                            <Input fluid placeholder='Last Name'
                                error={(this.state.lastNameError) ? true : false}
                                onChange={e => this.setState({
                                    lastName: e.target.value,
                                    lastNameError: ``
                                })}
                                value={this.state.lastName}
                                onClick={_ => this.setState({ lastNameError: `` })}
                            />
                            <div className="text-error">{this.state.lastNameError}</div>
                            <p className="cover-label"><span>Email</span></p>
                            <Input fluid placeholder='Email'
                                disabled={(id) ? true : false}
                                error={(this.state.emailError) ? true : false}
                                onChange={e => this.setState({
                                    email: e.target.value,
                                    emailError: ``
                                })}
                                value={this.state.email}
                                onClick={_ => this.setState({ emailError: `` })}
                            />
                            <div className="text-error">{this.state.emailError}</div>
                            <p className="cover-label"><span>University</span></p>
                            <Input fluid placeholder='University'
                                error={(this.state.universityError) ? true : false}
                                onChange={e => this.setState({
                                    university: e.target.value,
                                    universityError: ``
                                })}
                                value={this.state.university}
                                onClick={_ => this.setState({ universityError: `` })}
                            />
                            <div className="text-error">{this.state.universityError}</div>
                            <p className="cover-label"><span>Note</span></p>
                            <Input fluid placeholder='University'
                                onChange={e => this.setState({
                                    note: e.target.value,
                                })}
                                value={this.state.note}
                            />
                            <p className="cover-label"><span>Mobile</span></p>
                            <Input fluid placeholder='Mobile'
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
                            <div className="cover-action-btn">
                                <Button className="float-right cover-btn-cancel"
                                    onClick={_ => this.props.history.push('/admin/candidate')}
                                >Cancel</Button>
                                <Button className="float-right cover-btn-save"
                                    onClick={_ => this.sendData()}
                                >{(id) ? "Edit" : "Save"}</Button>
                            </div>
                            <div><span style={{ color: "red" }}>{this.state.message}</span></div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(null, { showNav })(CandidateAdd)