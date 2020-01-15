import React, { Component } from 'react';
import './SignIn.css'
import config from '../../../../config';
import axios from "axios";
import jwt from 'jsonwebtoken';

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			textError: ``,
			errUser: ``,
			errPass: ``,
			valueUser: ``,
			valuePass: ``,
			type: `Admin`
		}
	}

	handleButtonX = () => {
		this.setState({ textError: '' })
	}

	validate = (valueUser, valuePass) => {
		let count = 0
		if (valueUser === `` || valuePass === ``) {
			if (valueUser === ``) {
				this.setState({ errUser: `Please enter your username` })
				count += 1;
			} else if (valueUser.length < 6 || valueUser.length > 30) {
				this.setState({ errUser: `Username must be between 6 to 30 character` })
				count += 1;
			}
			if (valuePass === ``) {
				this.setState({ errPass: `Please enter your password` })
				count += 1;
			} else if (valuePass.length < 6 || valuePass.length > 16) {
				this.setState({ errPass: `Password must be between 6 to 16 character` })
				count += 1;
			}
		} else {
			if (valueUser.length < 6 || valueUser.length > 50) {
				this.setState({ errUser: `Username must be between 6 to 50 character` })
				count += 1;
			}
			if (valuePass.length < 6 || valuePass.length > 16) {
				this.setState({ errPass: `Password must be between 6 to 16 character` })
				count += 1;
			}
		}
		return count === 0 ? true : false;
	}

	handleOnclickSignIn = (e) => {
		e.preventDefault();
		const valueUser = this.state.valueUser.trim();
		const valuePass = this.state.valuePass.trim();
		if (this.validate(valueUser, valuePass)) {
			axios.post(`${config.host}/signIn`, { userName: valueUser, passWord: valuePass, type: this.state.type })
				.then(res => {
					console.log('anhtuan', res.data)
					if (res.data.success) {
						localStorage.setItem("userToken", res.data.token);
						jwt.verify(res.data.token, config.secret, (err, decoded) => {
							const { username, role, userId } = decoded;
							if (role === 4) {
								this.props.history.push(`/list-myCourse`);
							} else {
								this.props.history.push(`/admin/generate`);
							}
						})
					} else {
						this.setState({ textError: "Username or password is incorrect" })
					}
				})
				.catch(err => {
					this.setState({ textError: "server error" })
				})
		}
	}
	render() {
		return (
			<div className="sign-in">
				<form className="s-body" onSubmit={e => this.handleOnclickSignIn(e)}>
					<div className="sb-top">
					</div>
					<div className="sb-center">
						<div className="sbc-up">
							<h1 className="sbcu-title">Sign in</h1>
							<div className="sbcu-rectangle"></div>
							<div
								className="sbcu-error"
								style={{ display: `${this.state.textError === `` ? `none` : `block`}` }}>
								<div>
									<div className="sbcue-text"><span>{this.state.textError}</span></div>
									<div className="sbcue-button">
										<button onClick={this.handleButtonX}>x</button>
									</div>
								</div>
							</div>
							<h1 className="sbcu-username">Username</h1>
							<input
								value={this.state.valueUser}
								type="text"
								placeholder="Enter your Username"
								style={{
									border: `${this.state.errUser === `` ? `` : `solid 1px #ff0000`}`,
									backgroundColor: `${this.state.errUser === `` ? `` : `#fff3f3`}`
								}}
								onChange={e => this.setState({ valueUser: e.target.value })}
								onClick={e => this.setState({ errUser: ``, textError: `` })}
							/>
							<h1
								className="err-user"

							>{this.state.errUser}</h1>
							<h1 className="sbcu-password">Password</h1>
							<input
								type="password"
								placeholder="Enter your Password"
								value={this.state.valuePass}
								onChange={e => this.setState({ valuePass: e.target.value })}
								onClick={e => this.setState({ errPass: ``, textError: `` })}
								style={{
									border: `${this.state.errPass === `` ? `` : `solid 1px #ff0000`}`,
									backgroundColor: `${this.state.errPass === `` ? `` : `#fff3f3`}`
								}}
							/>
							<h1
								className="err-pass"

							>{this.state.errPass}</h1>
							<select
								className="sbcu-select"
								onChange={e => this.setState({ type: e.target.value })}
							>
								<option value="Admin">Admin</option>
								<option value="Fresher">Fresher</option>
								{/* <option value="Campuslink">Campuslink</option> */}
							</select>
							<div className="sbcu-botton">
								<div className="sbcub-left">
									<input type="checkbox" />
									<h1>Remember me</h1>
								</div>
								<div className="sbcub-right">
									<h1>Forgot password?</h1>
								</div>
							</div>
						</div>
						<div className="sbc-down">
							<button
								className="sbcd-button"
								onClick={this.handleOnclickSignIn}
							>Sign in</button>
						</div>
					</div>
				</form>
			</div>
		)
	}

}

export default SignIn
