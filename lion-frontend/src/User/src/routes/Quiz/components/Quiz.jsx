import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import classNames from 'classnames';
import config from '../../../../../config';
import Clock from '../../../routes/TestDetail/components/Clock/Clock';
import Countdown from 'react-countdown-now';
import FinishQuiz from './FinishQuiz';
import jwt from 'jsonwebtoken';

// Renderer callback with condition


class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listQuestion: [],
            activeIndex: -1,
            list_quiz: [],
            infoQuiz: {},
            sectionName: "",
            finish: {
                status: false,
                point: 0
            }
        }
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChooseQuestion = this.handleChooseQuestion.bind(this);
    }
    componentDidMount() {
        const { idCourse, idSection, idLecture } = this.props.match.params;
        axios.get(`${config.host}/list-quiz/${idCourse}/${idSection}/${idLecture}`)
            .then(res => {
                const { success } = res.data;
                const { questions, infoQuiz, sectionName } = res.data.data;
                if (success) {
                    const listQuestion = questions.map((question, index) => {
                        return {
                            ...question
                        }
                    })
                    const quiz_answer = localStorage.getItem('quizAnswers')
                    const index = localStorage.getItem('activeIndex');
                    const timeNow = Date.now();
                    localStorage.setItem("timeDown", timeNow)
                    const objQuiz = questions.map((question, index) => {
                        const { _id, answers, multi, correct } = question;
                        return {
                            _id,
                            answers: [],
                            multi,
                            correct
                        }
                    })
                    const timeDown = localStorage.getItem('timeDown');
                    const list_quiz = quiz_answer ? JSON.parse(quiz_answer).list_quiz : objQuiz;
                    const activeIndex = index ? JSON.parse(index).activeIndex : 0
                    this.setState({ activeIndex, listQuestion, list_quiz, infoQuiz, sectionName, timeDown: parseInt(timeNow) })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    handleNext() {
        this.setState((prevState, props) => {
            localStorage.setItem("activeIndex", JSON.stringify({ activeIndex: prevState.activeIndex + 1 }))
            return { activeIndex: prevState.activeIndex + 1 }
        })
    }
    handlePrevious() {
        this.setState((prevState, props) => {
            localStorage.setItem("activeIndex", JSON.stringify({ activeIndex: prevState.activeIndex - 1 }))
            return { activeIndex: prevState.activeIndex - 1 }
        })
    }
    handleChooseQuestion(index) {
        this.setState((prevState, props) => {
            localStorage.setItem("activeIndex", JSON.stringify({ activeIndex: index }))
            return { activeIndex: index }
        })
    }
    handleChange(e, objQuestion, myAnswer) {
        let { list_quiz } = this.state;
        list_quiz = list_quiz.map((question, index) => {
            if (e.target.checked) {
                //check push answer [a] => [a,b]
                return (question._id !== objQuestion._id) ? { ...question } : {
                    ...question,
                    answers: objQuestion.multi ? [...question.answers, myAnswer] : [myAnswer]
                }
            } else {
                //uncheck => remove answer [a, b] => [a]
                return (question._id !== objQuestion._id) ?
                    { ...question } : { ...question, answers: question.answers.filter(answer => answer !== myAnswer) }
            }

        })
        localStorage.setItem('quizAnswers', JSON.stringify({ list_quiz }));
        this.setState({ list_quiz });
    }
    handleSubmit() {
        const { idCourse, idLecture } = this.props.match.params;
        const { list_quiz } = this.state;
        const { numberQuestion, passScore } = this.state.infoQuiz;
        let i = 0;
        let point = 0;
        for (i; i < list_quiz.length; i++) {
            if (list_quiz[i].answers.sort() + "" === list_quiz[i].correct.sort() + "") {
                point++;
            }
        }
        const percent = ((point / numberQuestion) * 100);
        const result =  percent >= passScore ? true : false

        const timeDown = localStorage.getItem('timeDown');
        const finish = {
            status: true,
            point,
            percent
        }
        this.setState({ finish, timeDown })
        localStorage.removeItem('quizAnswers');
        localStorage.removeItem('activeIndex');
        localStorage.removeItem('timeDown');

        let userToken = localStorage.getItem('userToken');
        jwt.verify(userToken, config.secret, (err, decoded) => {
            const { userId } = decoded;
            let data = {
                idLecture,
                userId,
                idCourse,
                result
            }
            axios.post(`${config.host}/updateResultVideo`, { data })
                .then(res => {
                    this.setState({ changedata: false })
                }).catch(err => {
                    alert('Error')
                })
        })
    }
    render() {
        const { listQuestion, activeIndex, list_quiz, infoQuiz, sectionName, finish, timeDown } = this.state;
        const { status, point, percent } = finish;
        const { idCourse, idSection, idLecture } = this.props.match.params;
        const timeNow = Date.now();
        let timeSpent = timeNow - parseInt(timeDown);
        // console.log("timeDown", timeDown)
        const Renderer = ({ hours, minutes, seconds, completed }) => {
            console.log("this.props", this.props)
            if (completed) {
                // Render a complete state
                this.handleSubmit();
                return <div />;
            } else {
                // Render a countdown
                return <span>{minutes}:{seconds}</span>;
            }
        };
        if (status) {
            return (
                <FinishQuiz 
                sectionName={sectionName} 
                infoQuiz={infoQuiz} 
                point={point}
                percent={percent}
                onTryAgain = {() => window.location.href = `/quiz/${idCourse}/${idSection}/${idLecture} `}
                timeSpent = {timeSpent}
                />
            )
        }
        return (
            <div>
                <div className="row">
                    <div className="col-md-2" style={{ background: '#fff', paddingRight: '0px' }}>
                        <div className="nav-quiz">
                            <h2>Quiz</h2>
                            <ul className="quiz_ul">
                                {
                                    list_quiz.map((option, index) => (
                                        <li className={classNames({
                                            "quiz_li": true,
                                            "active_color": index === activeIndex
                                        })}
                                            onClick={() => this.handleChooseQuestion(index)}>{`Question ${index + 1}`}</li>
                                    ))
                                }
                            </ul>

                        </div>
                    </div>
                    <div className="col-md-10 wrap-quiz">
                        <div className="lecture-quiz">
                            <h1>{sectionName}</h1>
                            {
                                listQuestion.map((q, index) => (
                                    <div className={classNames({
                                        "lecture-quiz-content": true,
                                        "active": activeIndex === index
                                    })} style={{ display: 'none' }}>
                                        <div className="lecture-quiz-question">
                                            {index + 1}. {q.question}
                                        </div>
                                        <div className="lecture-quiz-answers" >
                                            {
                                                Object.entries(q.options).map((option) => {
                                                    return (
                                                        <div className={classNames({
                                                            'checkbox': q.multi,
                                                            'radio': !q.multi
                                                        })}>
                                                            <label>
                                                                <input type={q.multi ? "checkbox" : "radio"}
                                                                    onChange={(e) => this.handleChange(e, q, option[0])}
                                                                    name="quiz_answer"
                                                                    value={option[1]}
                                                                    checked={list_quiz.length > 0 ? list_quiz[index].answers.some(answer => answer === option[0]) : false}
                                                                />
                                                                {option[1]}
                                                            </label>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <button
                                            onClick={this.handlePrevious}
                                            className={classNames({
                                                "d-none": activeIndex === 0,
                                                "quiz-button": true
                                            })}>Previous</button>
                                        <button onClick={this.handleNext}
                                            className={classNames({
                                                "d-none": activeIndex === listQuestion.length - 1,
                                                "quiz-button": true
                                            })}>Next</button>
                                        <button onClick={this.handleSubmit}
                                            className={classNames({
                                                "float-right": true,
                                                "quiz-button": true,
                                                "d-none": activeIndex !== listQuestion.length - 1
                                            })}>Finish</button>
                                    </div>
                                ))
                            }
                            <div className="lecture-quiz-infor">
                                <span className="total-question">{`Total ${listQuestion.length} questions`}</span>
                                <span className="time-spent">Time:<Countdown
                                    date={timeDown + 10 * 1000}
                                    renderer={Renderer}
                                /> </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
const mapStateToProps = ({ listQuiz }) => {
    return listQuiz
}
export default connect(mapStateToProps)(Quiz);