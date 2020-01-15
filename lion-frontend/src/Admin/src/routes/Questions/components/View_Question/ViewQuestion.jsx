import React from "react";
import axios from 'axios'
import { showNav } from '../../../../../../actions';
import { connect } from 'react-redux';
import config from '../../../../../../config'
import { Loader, Button } from 'semantic-ui-react';
import FormatTable from '../../../../common/Table';
import { CSVLink } from 'react-csv';

class ViewQuestion extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataQuestion: [],
			dataEntryTest: [],
			dataFinalTest: [],
			dataQuiz: [],
			pageSize: 0,
			load: false,

			searchResult: [],
			showSearch: false,
			currentPage: 0,
			numberPage: 0,

			sortDomain: false,
			sortLevel: false
		};
	}
	componentDidMount() {
		this.props.showNav('NAV_QUESTION');
		this.setState({ load: !this.state.load })
		const userToken = localStorage.getItem('userToken')
		axios.get(`${config.host}/getAllQuestion`, { headers: { userToken } }).
			then(res => {
				res.data.forEach(e => {
					if (e.level === 1) {
						e.levels = 'Easy'
					} else {
						(e.level === 2) ? e.levels = 'Medium' : e.levels = 'Hard'
					}
				})
				this.setState({
					// dataQuestion: res.data.reverse(),
					dataEntryTest: res.data.filter(v => v.type === "Entry Test").reverse(),
					dataFinalTest: res.data.filter(v => v.type === "Final Test").reverse(),
					dataQuiz: res.data.filter(v => v.type === "Quiz").reverse(),
					load: !this.state.load
				})
			}).catch(err => {
				this.setState({ load: !this.state.load })
			})
	}
	deleteQuestion(id) {
		this.setState({ load: !this.state.load })
		let userToken = localStorage.getItem('userToken')
		axios.delete(`${config.host}/deleteQuestion/${id}`, { headers: { userToken } })
			.then(res => {
				this.setState({
					dataQuestion: this.state.dataQuestion.filter(e => e._id !== id),
					load: !this.state.load
				})
			}).catch(err => {
				this.setState({ load: !this.state.load })
				alert('Delete Error!')
			})
	}
	render() {
		let dataQuestion;
		if (!this.state.showSearch) {
			(this.state.dataQuestion.length === 0) ? dataQuestion = this.state.dataEntryTest : dataQuestion = this.state.dataQuestion;
		} else {
			dataQuestion = this.state.searchResult;
		}
		let arrQuestion = dataQuestion.map((value, i) => {
			return {
				stt: i + 1,
				type: value.type,
				id: value._id,
				multi: value.multi,
				correct: value.correct,
				level: value.levels,
				section: value.section,
				course: value.course,
				language: value.language,
				question: value.question,
				'options[a]': value.options.a,
				'options[b]': value.options.b,
				'options[c]': value.options.c,
				'options[d]': value.options.d,
			}
		})
		let dataExport = dataQuestion.map((v, i) => {
			return {
				type: `${v.type}`.toString().replace(/"/gi, '\""'),
				language: `${v.language}`.toString().replace(/"/gi, '\""'),
				course: `${v.course}`.toString().replace(/"/gi, '\""'),
				section: `${v.section}`.toString().replace(/"/gi, '\""'),
				multi: `${v.multi}`.toString().replace(/"/gi, '\""'),
				level: `${v.level}`.toString().replace(/"/gi, '\""'),
				question: `${v.question}`.toString().replace(/"/gi, '\""'),
				'options[a]': `${v.options.a}`.toString().replace(/"/gi, '\""'),
				'options[b]': `${v.options.b}`.toString().replace(/"/gi, '\""'),
				'options[c]': `${v.options.c}`.toString().replace(/"/gi, '\""'),
				'options[d]': `${v.options.d}`.toString().replace(/"/gi, '\""'),
				correct: `${v.correct}`.toString().replace(/"/gi, '\""'),
			}
		})
		if (this.state.load) return (
			<div className="cover-loader">
				<Loader active inline='centered'>
					Loading...
				</Loader>
			</div>
		)
		return (
			<div>
				<Button onClick={_ => this.setState({ dataQuestion: this.state.dataEntryTest })} >Entry Test</Button>
				<Button onClick={_ => this.setState({ dataQuestion: this.state.dataFinalTest })} > Final Test</Button>
				<Button onClick={_ => this.setState({ dataQuestion: this.state.dataQuiz })}>Quiz</Button>
				<FormatTable
					data={arrQuestion}
					headers={[{ name: '...', prop: 'stt', search: false, },
					{ name: "Question", prop: "question", search: true },
					{ name: "Language", prop: "language", search: true },
					{ name: "Level", prop: "level", search: true }]}
					onAddItem={_ => {
						const { history } = this.props;
						history.push('/admin/question/add-question');
					}}
					actions={[
						{
							icon: "fa fa-eye",
							action: item => this.props.history.push(`/admin/question/view-detail/${item.id}`)
						},
						{
							icon: 'fa fa-pencil',
							action: item => this.props.history.push(`/admin/question/edit-question/${item.id}`)
						},
						{
							icon: 'fa fa-trash',
							action: item => this.deleteQuestion(item.id),
							tooltip: 'Delete'
						}
					]}
					actionFooter={
						{
							importTo: _ => this.props.history.push('/admin/question/upload-question'),
							nameExport: "questions.csv",
							filedExport:
							[{ name: 'Id', prop: 'id' },
							{ name: 'Type', prop: 'type' },
							{ name: 'Language', prop: 'language' },
							{ name: 'Question', prop: 'question' },
							{ name: 'Multi', prop: 'multi' },
							{ name: 'Level', prop: 'level' },
							{ name: 'course', prop: 'course' },
							{ name: 'Section', prop: 'section' },
							{ name: 'Options[a]', prop: 'options[a]' },
							{ name: 'Options[b]', prop: 'options[b]' },
							{ name: 'Options[c]', prop: 'options[c]' },
							{ name: 'Options[d]', prop: 'options[d]' },
							{ name: 'Correct', prop: 'correct' }]
						}
					}
				/>
			</div>
		);
	}
}
export default connect(null, { showNav })(ViewQuestion);
