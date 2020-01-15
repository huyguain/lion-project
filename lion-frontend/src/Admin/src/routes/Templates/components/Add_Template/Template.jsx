import React, { Component } from 'react'
import { Form, Dropdown, Loader, Input } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import axios from 'axios'
import { showNav } from '../../../../../../actions';
import config from '../../../../../../config'
import { connect } from 'react-redux';

const languageArr = [
    { key: 'c', text: 'C/C++', value: 'C/C++' },
    { key: 'j', text: 'JavaScript', value: 'JavaScript' },
    { key: '.', text: '.NET', value: '.NET' },
    { key: 'a', text: 'Java', value: 'Java' },
    { key: 'n', text: 'NodeJS', value: 'NodeJS' },
    { key: 'r', text: 'ReactJS', value: 'ReactJS' },
    { key: 'ag', text: 'AngularJS', value: 'AngularJS' },
    { key: '#', text: 'C#', value: 'C#' },
    { key: 'p', text: 'PHP', value: 'PHP' },
    { key: 't', text: 'Test', value: 'Test' }
];
let numberLevel = [];
for (let index = 0; index <= 30; index++) {
    let obj = { key: index, text: index, value: index }
    numberLevel.push(obj)
}
let passScoreNumber = [];
for (let index = 0; index <= 100; index += 5) {
    let obj = { key: index, text: `${index} %`, value: index }
    passScoreNumber.push(obj)
}
let durationNumber = [];
for (let index = 0; index <= 100; index += 5) {
    let obj = { key: index, text: `${index} minutes`, value: index }
    durationNumber.push(obj)
}
class Template extends Component {
    state = {
        load: false,
        message: '',
        language: '',
        testName: '',
        easy: '',
        medium: '',
        hard: '',
        passScore: '',
        duration: '',
        testNameError: '',
        defaultEntry: false,
    }
    componentDidMount() {
        this.props.showNav('NAV_USER');
        console.log(this.state)
    }
    validate = () => {
        let check = true;
        let easy = this.state.easy;
        let medium = this.state.medium;
        let hard = this.state.hard;
        let passCore = this.state.passScore;
        let duration = this.state.duration;
        let language = this.state.language;
        let testName = this.state.testName.trim();
        let checkStatus = (data, arr) => {
            for (let i of arr) {
                if (data === i.value) { return true }
            }
        }
        console.log(easy + medium + hard )        
        let isError = false;
        const errors = {
            easyError: "",
            mediumError: "",
            hardError: "",
            passScoreError: "",
            durationError: '',
            languageError: '',
            testNameError: ''
        }
        if (easy === "" || hard === "" || medium === "" || passCore === "" || duration === ""
            || language === "" || testName === "") {
            if (easy === "") {
                isError = true;
                errors.easyError = "Require easy!";
            }
            if (hard === "") {
                isError = true;
                errors.hardError = "Require hard!";
            }
            if (medium === "") {
                isError = true;
                errors.mediumError = "Require medium!";
            } if (passCore === "") {
                isError = true;
                errors.passScoreError = "Require passCore!";
            } if (duration === "") {
                isError = true;
                errors.durationError = "Require duration!";
            } if (language === "") {
                isError = true;
                errors.languageError = "Please Enter language!";
            } if (testName === "") {
                isError = true;
                errors.testNameError = "Require testName!";
            }
        }
        if (!checkStatus(language, languageArr)) {
            isError = true;
            errors.languageError = "Please choose language again!";
        }
        if (!checkStatus(easy, numberLevel)) {
            isError = true;
            errors.easyError = "Please choose easy again!";
        }
        if (!checkStatus(medium, numberLevel)) {
            isError = true;
            errors.mediumError = "Please choose medium again!";
        }
        if (!checkStatus(hard, numberLevel)) {
            isError = true;
            errors.hardError = "Please choose hard again!";
        }
        if (!checkStatus(passCore, passScoreNumber)) {
            isError = true;
            errors.passScoreError = "Please choose passScore again!";
        }
        if (!checkStatus(duration, durationNumber)) {
            isError = true;
            errors.durationError = "Please choose duration again!";
        }
        if (!/^([a-zA-Z_-\s]){3,15}(\d+)$/.test(testName)) {
            if (!/^([a-zA-Z_-\s]){3,15}$/.test(testName)) {
                isError = true;
                errors.testNameError = "Please enter enough characters!";
            } else {
                isError = true;
                errors.testNameError = "Must have numbers and letters!";
            }
        }
        if (easy + medium + hard <= 20) {
            isError = true;
            errors.easyError = errors.mediumError = errors.hardError = "Total of question must greater than 20!";
        }
        if (isError) {
            this.setState({
                ...this.state,
                ...errors
            });
        }
        return isError;
    }
    sendData() {
        this.setState({
            easyError: "",
            mediumError: "",
            hardError: "",
            passScoreError: "",
            durationError: '',
            languageError: '',
            testNameError: ''
        })
        // this.setState({ load: !this.state.load })
        const err = this.validate();
        if (!err) {
            let { language, testName, easy, hard, medium, passScore, duration, defaultEntry } = this.state;
            let obj = {
                language,
                testName,
                easy,
                medium,
                hard,
                passScore,
                duration,
                defaultEntry
            }
            const userToken = localStorage.getItem('userToken');
            axios.post(`${config.host}/createTemplate`, obj, { headers: { userToken } })
                .then(res => {
                    if (res.data.success) {
                        this.setState({
                            load: !this.state.load
                        })
                        this.props.history.push("/admin/template")
                    } else {
                        this.setState({
                            message: res.data.message,
                            load: !this.state.load
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            this.setState({
                language: '',
                testName: '',
                easy: '',
                medium: '',
                hard: '',
                passScore: '',
                duration: '',
            })
        }
    }
    render() {
        const { defaultEntry } = this.state;
        if (this.state.load) return (
            <Loader active inline='centered' />
        )
        return (
            <div className="container-fluid">
                <div className="row justify-content-center cover-layout-editor">
                    <div className="col-md-6">
                        <div className="cover-title-0">TEST TEMPLATE</div>
                        <div className="cover-line-blue"></div>
                        <Form>
                            <p className="admin-create-show-detail-total"><span className="total">Total: </span><span className="detail">{this.state.easy + this.state.medium + this.state.hard} Questions</span></p>
                            <p className="admin-create-show-detail-title"><span>Language</span></p>
                            <Dropdown placeholder='Language' fluid search
                                error={(this.state.languageError) ? true : false}
                                selection
                                onChange={(e, data) => this.setState({
                                    language: data.value,
                                    languageError: ``
                                })}
                                options={languageArr}
                                value={this.state.language}
                                onClick={_ => this.setState({ languageError: `` })}
                            />
                            <div className="text-error">{this.state.languageError}</div>
                            <p className="admin-create-show-detail-title"><span>Test Name</span></p>
                            <Input fluid placeholder='Test Name'
                                error={(this.state.testNameError) ? true : false}
                                onChange={e => this.setState({
                                    testName: e.target.value,
                                    testNameError: ``
                                })}
                                value={this.state.testName}
                                onClick={_ => this.setState({ testNameError: `` })}
                            />
                            <div className="text-error">{this.state.testNameError}</div>
                            <p className="admin-create-show-detail-title"><span>Easy</span></p>
                            <Dropdown
                                search
                                fluid
                                searchInput={{ type: 'number' }}
                                selection
                                error={(this.state.easyError) ? true : false}
                                onChange={(e, data) => this.setState({
                                    easy: data.value,
                                    easyError: ``
                                })}
                                options={numberLevel}
                                value={this.state.easy}
                                placeholder='Number Easy'
                                onClick={_ => this.setState({ easyError: `` })}
                            />
                            <div className="text-error">{this.state.easyError}</div>
                            <p className="admin-create-show-detail-title"><span>Medium</span></p>
                            <Dropdown
                                search
                                fluid
                                searchInput={{ type: 'number' }}
                                selection
                                error={(this.state.mediumError) ? true : false}
                                value={this.state.medium}
                                onChange={(e, data) => this.setState({
                                    medium: data.value,
                                    mediumError: ``
                                })}
                                options={numberLevel}
                                placeholder='Number Medium'
                                onClick={_ => this.setState({ mediumError: `` })}
                            />
                            <div className="text-error">{this.state.mediumError}</div>
                            <p className="admin-create-show-detail-title"><span>Hard</span></p>
                            <Dropdown
                                fluid
                                search
                                searchInput={{ type: 'number' }}
                                selection
                                error={(this.state.hardError) ? true : false}
                                value={this.state.hard}
                                onChange={(e, data) => this.setState({
                                    hard: data.value,
                                    hardError: ``
                                })}
                                options={numberLevel}
                                placeholder='Number Hard'
                                onClick={_ => this.setState({ hardError: `` })}
                            />
                            <div className="text-error">{this.state.hardError}</div>
                            <p className="admin-create-show-detail-title"><span>Pass Score</span></p>
                            <Dropdown
                                fluid
                                search
                                searchInput={{ type: 'number' }}
                                selection
                                error={(this.state.passScoreError) ? true : false}
                                value={this.state.passScore}
                                onChange={(e, data) => this.setState({
                                    passScore: data.value,
                                    passScoreError: ``
                                })}
                                options={passScoreNumber}
                                placeholder='Pass Score'
                                onClick={_ => this.setState({ passScoreError: `` })}
                            />
                            <div className="text-error">{this.state.passScoreError}</div>
                            <p className="admin-create-show-detail-title"><span>Duration</span></p>
                            <Dropdown
                                fluid
                                search
                                searchInput={{ type: 'number' }}
                                selection
                                error={(this.state.durationError) ? true : false}
                                value={this.state.duration}
                                onChange={(e, data) => this.setState({
                                    duration: data.value,
                                    durationError: ``
                                })}
                                options={durationNumber}
                                placeholder='Duration'
                                onClick={_ => this.setState({ durationError: `` })}
                            />
                            <div className="text-error">{this.state.durationError}</div>

                            < label className="admin-create-show-detail-title">Default EntryTest</label>
                            <Checkbox toggle checked={defaultEntry}
                                onClick={_ => this.setState({ defaultEntry: !defaultEntry })}
                            />
                            <div className="cover-action-btn">
                                <Button className="float-right cover-btn-cancel"
                                    onClick={_ => this.props.history.push('/admin/template/')}
                                >Cancel</Button>
                                <Button className="float-right cover-btn-save"
                                    onClick={_ => this.sendData()}
                                >Save</Button>
                            </div>
                            <div><span style={{ color: "red" }}>{this.state.message}</span></div>
                        </Form>

                    </div>
                </div>
            </div>
        )
    }
}
export default connect(null, { showNav })(Template);