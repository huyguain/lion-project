import React, { Component } from 'react';
import './Clock.css';
import { connect } from 'react-redux';
import { sendListAnser } from '../../../../../../actions';
import axios from 'axios';
import config from '../../../../../../config';

class Clock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			minutes: '00',
			senconds: '00'
		}
	}
	countDown(timeTest) {
		if (timeTest >= 0) {
			let senconds = Math.floor((timeTest / 1000) % 60);
			senconds = (senconds < 10) ? ("0" + senconds) : senconds;
			let minutes = Math.floor((timeTest / 1000 / 60));
			minutes = (minutes < 10) ? ("0" + minutes) : minutes;
			localStorage.setItem('timeRest', timeTest)
			this.setState({ minutes, senconds });
		} else {
			const token = localStorage.getItem('token');
			const obj = {
				list_answer: this.props.listAnswer,
				duration: this.props.dataQuestion.duration
			}
			let _router = this.props.dataQuestion.language === `English` ? `end-english-test` : `end-test`;
			clearInterval(this.setTime);
			axios.post(`${config.host}/${_router}`, obj, { headers: { token } })
				.then(res => {
					this.props.history.push('/test/test-finish')
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
	componentDidUpdate(prevProps, prevState) {
		let time = this.props.timeEnd;
		if (time !== prevProps.timeEnd) {
			clearInterval(this.setTime);
			this.setTime = setInterval(() => { this.countDown(time); time -= 1000 }, 1000);
		}
	}
	componentWillUnmount() {
		clearInterval(this.setTime);
	}
	render() {
		return (
			<div className="clock">
				<div className="clock-minutest">{this.state.minutes}:</div>
				<div className="clock-senconds"> {this.state.senconds}</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		timeEnd: state.TestDetail.get("timeEnd") || '',
		dataQuestion: state.TestDetail.get("dataQuestion"),
		listAnswer: state.TestDetail.get("listAnswer")
	}
}
export default connect(mapStateToProps, { sendListAnser })(Clock);