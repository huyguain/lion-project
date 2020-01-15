import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from "axios";
import { Redirect } from 'react-router-dom';
import config from '../../../../../config'
import './SignIn.css';
const style = {
    margin: 12,
};
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            usernameError: "",
            passwordError: "",
            error: "",
            username: "",
            password: ""
        }
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    validate = () => {
        const username = this.state.username.trim();
        const password = this.state.password.trim();
        console.log("adsad", username, password)
        let isError = false;
        const errors = {
            usernameError: "",
            passwordError: "",
            error: ""
        };
        if (username.length < 5) {
            isError = true;
            errors.usernameError = "Username needs to be atleast 5 characters long";
        }
        if (password.length < 6) {
            isError = true;
            errors.passwordError = "Password needs to be atleast 6 characters long";
        }
        if (isError) {
            this.setState({
                ...errors
            });
        }
        return isError;
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleBlur(e) {
        const err = this.validate(e);

        if (!err) {
            this.setState({ usernameError: "", passwordError: "" })
        }
    }

    login(e) {
        const username = this.state.username.trim();
        const password = this.state.password.trim();
        if (username === "" || password === "") {
            if (username === "") {
                this.setState({ usernameError: "Require UserName!", error: "" })
            } else {
                this.setState({ usernameError: "" })
            }
            if (password === "") {
                this.setState({ passwordError: "Require Password", error: "" })
            }
        } else {
            axios.post(`${config.host}/signIn`, { username, password })
                .then(res => {
                    console.log("{res", res)
                    if (res.data.success) {
                        localStorage.setItem("userToken", res.data.token);
                        this.setState({ redirectToReferrer: true })
                    } else {
                        this.setState({ error: "username or password is uncorrect", usernameError: "", passwordError: "" })
                    }
                })
                .catch(err => {
                    console.log("{res", err)
                    this.setState({ error: "server error", usernameError: "", passwordError: "" })
                })
        }
    }
    render() {
        const { from } = this.props.location.state || { from: { pathname: 'admin/manager' } };
        const { redirectToReferrer } = this.state;
        const { username, password } = this.state;
        if (redirectToReferrer) {
            return (
                <Redirect to={from} />
            )
        }
        return (
            <MuiThemeProvider >
                <div className="loginForm">
                    <form>
                        <hgroup>
                            <h1>Login</h1>
                        </hgroup>
                        <TextField
                            autoFocus
                            name="username"
                            floatingLabelText="User Name"
                            value={username}
                            ref={(input) => { this.username = input; }}
                            name="username"
                            errorText={this.state.usernameError}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                        /><br />
                        <TextField
                            name="password"
                            floatingLabelText="Password"
                            value={password}
                            name="password"
                            type="password"
                            errorText={this.state.passwordError}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                        /><br /><br />
                        <span className="error">{this.state.error}</span><br />
                        <RaisedButton label="Sign In" primary={true} style={style} onClick={this.login} />
                        <div className="powered">
                            Fresher Academy
                    </div>
                    </form>
                </div>
            </MuiThemeProvider>
        )
    }
}
export default SignIn;