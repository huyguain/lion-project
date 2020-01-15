import React, { Component } from 'react'
import { Form, Input, Dropdown, Loader, Button } from 'semantic-ui-react';
import { showNav } from '../../../../../../actions';
import { connect } from 'react-redux';
import axios from 'axios'
import config from '../../../../../../config';
import jwt from 'jsonwebtoken';

const RoleArr = [
    { key: 'h', text: 'Hr', value: 'Hr' },
    { key: 'd', text: 'Design', value: 'Design' },
]
class AdminAdd extends Component {
    state = {
        userName: '',
        passWord: '',
        Role: '',
        firstName: '',
        lastName: '',
        mobile: '',

        userNameError: "",
        firstNameError: "",
        lastNameError: "",
        mobileError: "",
        passWordError: '',
        RoleError: '',

        message: '',
        load: false,
    }
    componentDidMount() {
        this.props.showNav('NAV_ADMIN');
        let { id } = this.props.match.params
        if(id){
            this.setState({load: !this.state.load })
            let userToken = localStorage.getItem('userToken');
            axios.get(`${config.host}/getAdminById/${id}`, { headers: { userToken } })
                .then(res => {
                    if(res.status===200){
                        this.setState({
                            userName: res.data.dataAdmin.userName,
                            load: !this.state.load,
                            firstName: res.data.dataAdmin.firstName,
                            Role: (res.data.dataAdmin.role === 3) ? 'Hr' : 'Design',
                            lastName: res.data.dataAdmin.lastName,
                            passWord: res.data.dataAdmin.passWord,
                            mobile: `${res.data.dataAdmin.mobile}`,
                        })
                    }else{
                        this.setState({
                            message: res.data.message,
                            load: !this.state.load
                        })
                    }
                   
                }).catch(err => {
                    console.log(err)
                    this.setState({load: !this.state.load })
                    alert('Server Error!')
                })
        }
    }

    validate = () => {
        let check = true;
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let userName = this.state.userName.trim();
        let passWord = this.state.passWord.trim();
        let firstName = this.state.firstName.trim();
        let Role = this.state.Role.trim();
        let lastName = this.state.lastName.trim();
        let mobile = this.state.mobile.trim();
        for (let i of RoleArr) {
            if (i.value === Role) check = false;
        }
        let isError = false;
        const errors = {
            userNameError: "",
            firstNameError: "",
            lastNameError: "",
            mobileError: "",
            passWordError: '',
            RoleError: '',
        }
        if (firstName === "" || lastName === "" || mobile === "" || Role === '' || passWord === '' || userName === '') {
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
                errors.mobileError = "Error ! Require Moblie";
            }
            if (userName === "") {
                isError = true;
                errors.userNameError = "Error ! Require User Name";
            }
            if (passWord === "") {
                isError = true;
                errors.passWordError = "Error ! Require PassWord";
            }
            if (Role === "") {
                isError = true;
                errors.RoleError = "Error ! Require Role";
            }
        }
        if (!re.test(userName)) {
            isError = true;
            errors.userNameError = "Error ! Requires valid Email";
        }
        if (mobile <= 0) {
            if (mobile <= 0) {
                isError = true;
                errors.mobileError = "Please insert again"
            }
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
        if (passWord.length < 1 || passWord.length > 101) {
            isError = true;
            errors.passWordError = "Please! Enter enough 1-100 characters!";
        }
        if (mobile.charAt(0) === '0') {
            isError = true;
            errors.mobileError = "Error ! Must start with other numbers 0!";
        }
        if (check) {
            isError = true;
            errors.RoleError = "Please! Choose role again";
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
        let { id } = this.props.match.params
        this.setState({
            userNameError: "",
            firstNameError: "",
            lastNameError: "",
            mobileError: "",
            passWordError: '',
            RoleError: '',
        })
        this.setState({ load: !this.state.load })
        const err = this.validate();
        if (!err) {
            let dataAdmin = {
                userName: this.state.userName,
                passWord: this.state.passWord,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                role: (this.state.Role === 'Hr') ? 3 : 2,
                mobile: parseInt(this.state.mobile),
            }
            const userToken = localStorage.getItem("userToken")
            if (!id) {
                axios.post(`${config.host}/createAdmin`, { dataAdmin }, { headers: { userToken } })
                    .then(res => {
                        if (res.status === 204) {
                            this.props.history.push("/admin/admin")
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
                        alert('Server Error!')
                    })
            } else {
                axios.patch(`${config.host}/editAdmin/${id}`, { dataAdmin }, { headers: { userToken } })
                    .then(res => {
                      if(res.status ===204){
                        this.props.history.push("/admin/admin")
                        this.setState({
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
                        alert('Server Error!')
                    })
            }
            this.setState({
                userName: '',
                passWord: '',
                Role: '',
                firstName: '',
                lastName: '',
                mobile: '',
            })
        }

    }

    render() {
        let { id } = this.props.match.params;
        if (this.state.load) return (
            <Loader active inline='centered' />
        )
        return (
            <div className="container-fluid">
                <div className="row justify-content-center cover-layout-editor">
                    <div className="col-md-6">
                        <div className="cover-title-0">{(id) ? "EDIT ADMIN" : "CREATE ADMIN"}</div>
                        <div className="cover-line-blue"></div>
                        <Form>
                            <p className="cover-label"><span>First Name</span></p>
                            <Input fluid placeholder='First Name'
                                onChange={e => this.setState({
                                    firstName: e.target.value,
                                    firstNameError: ``
                                })}
                                value={this.state.firstName}
                                error={this.state.firstNameError ? true : false}
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
                            <p className="cover-label"><span>User Name</span></p>
                            <Input fluid placeholder='User Name'
                                disabled={(id) ? true : false}
                                onChange={e => this.setState({
                                    userName: e.target.value,
                                    userNameError: ``
                                })}
                                value={this.state.userName}
                                error={this.state.userNameError ? true : false}
                                onClick={_ => this.setState({ userNameError: `` })}
                            />
                            <div className="text-error">{this.state.userNameError}</div>
                            {(!id)?(<div><p className="cover-label" htmlFor=""><span>PassWord</span></p>
                            <Input fluid placeholder='Pass Word'
                                disabled={(id) ? true : false}
                                type="password"
                                onChange={e => this.setState({
                                    passWord: e.target.value,
                                    passWordError: ``
                                })}
                                value={this.state.passWord}
                                error={this.state.passWordError ? true : false}
                                onClick={_ => this.setState({ passWordError: `` })}
                            />
                           <div className="text-error">{this.state.passWordError}</div></div>):(<div></div>)}
                            <p className="cover-label" htmlFor=""><span>Role</span></p>
                            <Dropdown fluid search selection
                                error={this.state.RoleError ? true : false}
                                value={this.state.Role}
                                onChange={(e, data) => this.setState({
                                    Role: data.value,
                                    RoleError: ``
                                })}
                                options={RoleArr}
                                placeholder='Duration'
                                onClick={_ => this.setState({ RoleError: `` })}
                            />
                            <div className="text-error">{this.state.RoleError}</div>
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
                                    onClick={_ => this.props.history.push('/admin/admin')}
                                >Cancel</Button>
                                <Button className="float-right cover-btn-save"
                                    onClick={_ => this.sendData()}>{(id) ? "Edit" : "Save"}</Button>
                            </div>
                            <div><span style={{ color: "red" }}>{this.state.message}</span></div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(null, { showNav })(AdminAdd)