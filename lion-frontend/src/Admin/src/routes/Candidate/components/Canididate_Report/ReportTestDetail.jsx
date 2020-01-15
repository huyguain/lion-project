import React, { Component } from 'react';
import axios from 'axios';
import config from '../../../../../../config';
import { Checkbox } from 'semantic-ui-react';
import ReportEngLishTest from './ReportEngLishTest';
import './ReportTestDetail.css';

export default class TestDeatail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            answers: [],
            result: "",
            point: "",
            testEngList: false
        }
        this.getAnswerCorrect = this.getAnswerCorrect.bind(this);
        this.getChecked = this.getChecked.bind(this);
        this.formatText = this.formatText.bind(this);
        this.getAnswerPart4 = this.getAnswerPart4.bind(this);
    }
    componentDidMount() {
        const { code } = this.props.match.params;
        axios.get(`${config.host}/report-detail-test/${code}`)
            .then(res => {
                const { data } = res.data;
                const questions = data.englishExamId ? data.englishExamId.questions : data.questionIds;
                const urlImg = data.englishExamId ? {
                    urlImg1: data.englishExamId.urlImg1,
                    urlImg2: data.englishExamId.urlImg2
                } : {}
                this.setState({
                    questions, answers: data.answers,
                    urlImg,
                    result: data.result, point: data.point,
                    testEngList: data.englishExamId ? true : false
                })
            })
            .catch(err => console.log(err))
    }
    getAnswerPart4() {
        const { answers } = this.state;
        return answers[answers.length - 1] ? answers[answers.length - 1].answers[0] : 'No answers';
    }

    getAnswerCorrect(answers, option) {
        return answers.some((correct) => correct === option)
    }
    getChecked(idQuestion, option) {
        let i;
        const { answers } = this.state;
        for (i = 0; i < answers.length; i++) {
            if (idQuestion === answers[i].id) {
                return answers[i].answer ? answers[i].answer.some((chooseAnswer => chooseAnswer === option)) :
                    answers[i].answers.some((chooseAnswer => chooseAnswer === option))
            }
        }
    }
    formatText(text) {
        if (!text) {
            return
        } else {
            let _text = text.split(`<`).join(`&lsaquo;`)
            let _text1 = _text.split(`>`).join(`&rsaquo;`)
            let _text2 = _text1.split(`'`).join(`&Prime;;`)
            return (
                _text2.split("\n").map(value => {
                    return (
                        <div dangerouslySetInnerHTML={{ __html: value.split(" ").join('&nbsp') }} />
                    )
                })
            )
        }

    }
    render() {
        const { questions, result, point, testEngList, urlImg } = this.state;
        return (
            < div className="row justify-content-center cover-layout-editor" >
                {
                    testEngList ? <ReportEngLishTest
                        questions={questions}
                        urlImg={urlImg}
                        result={result}
                        point={point}
                        formatText={this.formatText}
                        getAnswerCorrect={this.getAnswerCorrect}
                        getChecked={this.getChecked}
                        getAnswerPart4={this.getAnswerPart4}
                    /> :
                        <div className="col-md-10">
                            <div className="cover-title-0">TEST DETAIL</div><div className="float-right" style={{ marginTop: "-20px", fontFamily: 'Lato-Bold' }}>{`Result: ${result}`}<br />{`Point: ${point}/${questions.length}`}</div>
                            <div className="cover-line-blue"></div>
                            {
                                questions.map((question, index) => {
                                    return (
                                        <div className="wrap-question-test">
                                            <div className="question-test">
                                                {this.formatText(index + 1 + ".  " + question.question)}
                                            </div>
                                            <div>
                                                <ul style={{ listStyleType: "none" }}>
                                                    {
                                                        Object.entries(question.options).map((option, index) => {
                                                            if (!option[1]) {
                                                                return
                                                            }
                                                            return (
                                                                <li key={index} style={this.getAnswerCorrect(question.correct, option[0]) ? { background: "yellow" } : { background: "none" }}>
                                                                    <Checkbox className=" item-answer" readOnly label={this.formatText(option[1])} checked={this.getChecked(question._id, option[0])} radio={question.multi ? false : true} />
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                }
            </div>
        )
    }
}