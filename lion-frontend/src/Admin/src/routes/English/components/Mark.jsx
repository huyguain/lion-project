import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, Input } from 'semantic-ui-react';
import config from '../../../../../config';
import InlineError from '../../../components/InlineError';
class Mark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            point: 0,
            errors: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        axios.get(`${config.host}/get-question-essay-english-test/${id}`)
            .then((res) => {
                const { question_essay } = res.data;
                this.setState({
                    question: question_essay.question[0].questions,
                    answer: question_essay.answer[0] && question_essay.answer[0].answers,
                    status: question_essay.status,
                    totalQuestion: question_essay.totalQuestion
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    validate() {
        const { totalQuestion, point } = this.state;
        const errors = {};
        if (point > totalQuestion - 1 || point < 0) {
            errors.errPoint = "Invalid point";
        }
        return errors;
    }
    handleSubmit(e) {
        e.preventDefault();
        const { id } = this.props.match.params;
        const { point } = this.state;
        const errors = this.validate();
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            axios.post(`${config.host}/save-point-mark-english`, { idExam: id, point: point })
                .then((res) => {
                    this.props.history.push('/admin/english');
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
    render() {
        const { question, answer, status, errors } = this.state;
        return (
            <div className="row justify-content-center cover-layout-editor">
                <div className="col-md-10">
                    <div className="cover-title-0">Mark english test</div>
                    <div className="cover-line-blue"></div>
                    <div className="wrap-question-test">
                        <div className="question-test">
                            {question} <br />
                        </div>
                        <div style={{
                            fontFamily: 'Roboto-Regular',
                            fontSize: 16,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            fontStretch: 'normal',
                            lineHeight: 1.25,
                            letterSpacing: 'normal',
                            textAlign: 'left',
                            minHeight: '250px',
                            padding: '10px',
                            border: '1px solid #333333',
                            marginTop: 20
                        }}>
                            {answer ? answer : "No any answer"}
                        </div>
                        <br />
                        <div>
                            {
                                status ? "Completed mark!" : (
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Group style={{ display: 'flex', alignItems: 'center' }}>
                                            Mark: <Form.Field control={Input}
                                                type='number'
                                                value={this.state.point}
                                                onChange={(e, { value }) => this.setState({ point: value })}
                                            />
                                            <Button color='green'>Save</Button>
                                        </Form.Group>
                                        {errors.errPoint && <InlineError text={errors.errPoint} />}
                                    </Form>
                                )
                            }
                        </div>

                    </div>
                </div>
            </div >
        )
    }
}
export default Mark;