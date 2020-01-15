import React, { Component } from 'react';
//import PrintQuestion from '../PrintQuestion/PrintQuestion.jsx';
import LanguageAndCountDown from '../LanguageAndCountDown/LanguageAndCountDown.jsx';
import { testDetailLoad, sendListAnser } from '../../../../../../actions';
import { connect } from 'react-redux';
import Account from '../../../../common/Account/index';
import config from '../../../../../../config';
import { Loader } from 'semantic-ui-react';
import axios from 'axios';
import ModalFinish from './ModalFinish'
import './TestDetail.css';
import ControllerTest from '../ControllerTest/ControllerTest.jsx'

class TestDetail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			load: false,
			display: 'none',
		}
		this.onUnload = this.onUnload.bind(this)
	}
	onUnload(event) {
		event.preventDefault();
		return event.returnValue = "Do you really want to exit?"
	}
	checkLocalStorage = (duration, currentTime, timeEnd) => {
		let _duration = Date.parse(currentTime) + duration
		if (!localStorage.getItem("timeStart")) {
			localStorage.setItem("timeStart", JSON.stringify(currentTime))
			if (((_duration + 60 * 1000) - timeEnd) <= 0 || ((_duration - 60 * 1000) - timeEnd) <= 0) {
				return true
			} else {
				return false
			}
		} else {
			return true
		}
	}

	componentDidMount() {
		const token = localStorage.getItem('token');
		this.setState({ load: !this.state.load });
		window.addEventListener("beforeunload", this.onUnload)
		axios.post(`${config.host}/listQuestion`, { time: new Date() }, { headers: { token } })
			.then(res => {
				if (res.status === 200) {
					const { data } = res;
					this.setState({ load: !this.state.load, duration: data.duration });
					// if (this.checkLocalStorage(data.duration, data.currentTime, Date.parse(data.time))) {
					// 	this.props.testDetailLoad(data, localStorage.getItem("timeStart"));
					// } else this.setState({ display: `block` });
					if (data.currentTime > 0) {
						this.props.testDetailLoad(data, data.currentTime);
					} else this.setState({ display: `block` })
				} else {
					this.setState({ load: !this.state.load })
					this.props.history.push('/test');
				}
			})
			.catch(err => {
				console.log('err', err)
				this.setState({ load: !this.state.load })
				// alert('Error!')
			})
	}
	handleSendListAnswer() {
		const token = localStorage.getItem('token');
		const timeStartMiliSenconds = Date.parse(JSON.parse(localStorage.getItem('timeStart')));
		const { duration } = this.state;
		const timeRest = localStorage.getItem('timeRest');
		const timework = (Date.parse(new Date() - timeStartMiliSenconds)) - (duration * 60 * 1000 - timeRest) > 0
			? duration * 60 * 1000 - timeRest : Date.parse(new Date() - timeStartMiliSenconds);
		const obj = {
			list_answer: this.props.listAnswer,
			duration: timework
		}
		let _router = this.props.dataQuestion.language === `English` ? `end-english-test` : `end-test`
		if (_router === `end-english-test`) {
			const answerE = localStorage.getItem(`answerE${this.props.dataQuestion.time}`)
			obj.list_answer[obj.list_answer.length - 1].answers = [answerE];
		}
		axios.post(`${config.host}/${_router}`, obj, { headers: { token } })
			.then(res => {
				this.props.history.push('/test/test-finish')
			})
			.catch(err => {
				console.log(err)
			})
	}

	handleCloseModalFinish = () => {
		this.setState({ display: 'none' })
	}

	checkAnswerNotFinish = listAnswer => {
		const listQuestion = this.props.dataQuestion.listQuestion;
		let listAnswerNotFinish = [];
		listAnswer.forEach((element, i) => {
			if (!element.answers.some(item => item) && !element.essay) {
				listAnswerNotFinish = [...listAnswerNotFinish, i + 1]
			}
		});
		return listAnswerNotFinish;
	}

	handleOpenModalFinish = () => {
		this.setState({ display: 'block' })
	}

	componentWillUnmount() {
		localStorage.removeItem("timeStart");
		localStorage.removeItem("listAnswer");
		localStorage.removeItem("timeRest");
		localStorage.removeItem(`answerE${this.props.dataQuestion.time}`);
		window.removeEventListener("beforeunload", this.onUnload);
	}

	render() {
		let inforUser = this.props.account;
		let languageAndLengthQuestion = {
			language: this.props.dataQuestion.language,
			lengthQuestion: this.props.dataQuestion.lengthQuestion
		}
		if (this.state.load) return (
			<div>
				<div className='Rectangle-3'>
					<Loader active inline='centered' />
				</div>
			</div>
		)
		else return (
			<div style={{ backgroundColor: `#ffffff` }}>
				<ModalFinish
					answerNotFinish={this.checkAnswerNotFinish(this.props.listAnswer)}
					display={this.state.display}
					closeModal={this.handleCloseModalFinish}
					handleSubmit={this.handleSendListAnswer.bind(this)}
				/>
				<Account inforUser={inforUser} />
				<LanguageAndCountDown data={languageAndLengthQuestion}
					history={this.props.history}
				/>
				<ControllerTest language={languageAndLengthQuestion.language} />

				<div className="Rounded-Rectangle">
					<button
						type="button"
						className="button-end"
						onClick={this.handleOpenModalFinish}
					>END</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		dataQuestion: state.TestDetail.get("dataQuestion"),
		account: state.TestDetail.get("account"),
		listAnswer: state.TestDetail.get("listAnswer"),
	}
}

export default connect(mapStateToProps, { testDetailLoad, sendListAnser })(TestDetail);

