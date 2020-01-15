import {
	TEST_DETAIL_LOAD,
	UPDATE_ANSWER,
} from '../constants';
import { Map } from 'immutable';

const initialState = Map({
	dataQuestion: [],
	account: '',
	listAnswer: [],
	timeEnd: '',
})

const handleData = action => {
	let QuestionPartOne = action.data.listQuestions.filter(obj => obj.partNumber === 1 && !obj.essay)
	let QuestionPartTwo = action.data.listQuestions.filter(obj => obj.partNumber === 2 && !obj.essay)
	let QuestionPartThree = action.data.listQuestions.filter(obj => obj.partNumber === 3 && !obj.essay)
	let QuestionPartfour = action.data.listQuestions.filter(obj => obj.partNumber === 4 && obj.essay)
	return {
		language: action.data.language,
		listQuestion: action.data.language === `English` ? [QuestionPartOne, QuestionPartTwo, QuestionPartThree, QuestionPartfour] : action.data.listQuestions,
		time: action.data.time,
		urlImg: { urlImg1: action.data.urlImg1, urlImg2: action.data.urlImg2 },
		lengthQuestion: action.data.question,
		duration: action.data.duration,
	}
}

const handleListAnswer = action => {
	return action.data.listQuestions.map(obj => ({ id: obj.id, essay: obj.essay, answers: [] }))
}

const listQuestion = (state = initialState, action) => {
	switch (action.type) {
		case TEST_DETAIL_LOAD:
			let obj = handleData(action);
			// let timeEnd = (Date.parse(JSON.parse(action.timeStart)) + action.data.duration)
			let timeEnd = action.timeStart;
			let getlistAnswer = localStorage.getItem("listAnswer") ? JSON.parse(localStorage.getItem("listAnswer")) : handleListAnswer(action)
			return state.set("dataQuestion", obj).set("account", action.data.account).set("listAnswer", getlistAnswer).set("timeEnd", timeEnd)

		case UPDATE_ANSWER:
			let _listAnswer
			if (state.get("listAnswer").some(obj => obj.id === action.id)) {
				_listAnswer = state.get("listAnswer").map(obj => {
					if (obj.id === action.id && !action.multi) {
						return {
							id: action.id,
							answers: [action.answers]

						}
					} else if (obj.id === action.id && action.multi) {
						let abc = obj.answers.some(_answer => _answer === action.answers) ?
							obj.answers.filter(item => item !== action.answers)
							: [...obj.answers, action.answers]
						return {
							id: action.id,
							answers: abc

						}
					} else return obj
				})
			} else {
				_listAnswer = [...state.get("listAnswer"), { id: action.id, answers: [action.answer] }]
			}
			localStorage.setItem("listAnswer", JSON.stringify(_listAnswer))
			return state.set("listAnswer", _listAnswer)
		default:
			return state;
	}
}

export default listQuestion;
