import React from "react";
import axios from 'axios'
import { showNav } from '../../../../../../actions';
import { connect } from 'react-redux';
import config from '../../../../../../config'
import { Loader, Button, Icon } from 'semantic-ui-react';
import MapNPM from 'es6-map'
import FormatTable from '../../../../common/Table'

class QuesitonTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataQuestion: [],
			pageSize: 0,
			load: false,
			dataArr: [],

			searchResult: [],
			showSearch: false,
			currentPage: 0,
			numberPage: 0
		};
	}
	componentDidMount() {
		this.props.showNav('NAV_QUESTION');
		this.setState({ load: !this.state.load })
		const userToken = localStorage.getItem('userToken')
		axios.get(`${config.host}/getAllQuestion`, { headers: { userToken } }).
			then(async (res) => {
				let map = new MapNPM()
				res.data.forEach(e => {
					if (!map.has(e.language)) {
						map.set(e.language, { easy: 0, medium: 0, hard: 0, type: e.type, total: 0 })
					}
					if (e.type == 'Entry Test' || e.type == 'Final Test') {
						map.get(e.language).total++;
						if (e.level === 1) {
							map.get(e.language).easy++
						}
						if (e.level === 2) {
							map.get(e.language).medium++
						}
						if (e.level === 3) {
							map.get(e.language).hard++
						}
					} else if (e.type == 'Quiz') {
						map.get(e.language).total++;
					}
				})
				this.setState({
					dataArr: [...map]
				})
				this.setState({
					dataQuestion: res.data,
					load: !this.state.load
				})
			}).catch(err => {
				this.setState({ load: !this.state.load })
				alert('Error!')
			})
	}
	render() {
		let dataArr, { dataQuestion } = this.state
		if (!this.state.showSearch) {
			dataArr = this.state.dataArr;
		} else {
			dataArr = this.state.searchResult;
		}
		let arrQuestion = dataQuestion.map((value, key) => {
			return {
				multi: value.multi,
				correct: value.correct,
				level: value.level,
				section: value.section,
				course: value.course,
				question: value.question,
				'options[a]': value.options.a,
				'options[b]': value.options.b,
				'options[c]': value.options.c,
				'options[d]': value.options.d,
			}
		})
		if (this.state.load) return (
			<Loader active inline='centered' />
		)
		return (
			<div>
				<Button onClick={_ => this.props.history.push('/admin/question/view-question')}
					className="view-admin"
				><Icon name='building outline' />
				</Button>
				<FormatTable
					data={dataArr.map((item, i) => ({
						stt: i + 1,
						language: item[0],
						easy: item[1].easy,
						medium: item[1].medium,
						hard: item[1].hard,
						type: item[1].type,
						total: item[1].total
					}))}
					headers={[{ name: '...', prop: 'stt', search: false, },
					{ name: "Type", prop: "type", search: false },
					{ name: "Language", prop: "language", search: true },
					{ name: "Easy", prop: "easy", search: true },
					{ name: "Medium", prop: "medium", search: true },
					{ name: "Hard", prop: "hard", search: true },
					{ name: "Total", prop: "total", search: false }]}
					onAddItem={_ => {
						const { history } = this.props;
						history.push('/admin/question/add-question');
					}}
				/>
			</div>
		);
	}
}
export default connect(null, { showNav })(QuesitonTable);
