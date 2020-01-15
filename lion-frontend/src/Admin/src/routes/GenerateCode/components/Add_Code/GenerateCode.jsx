import React, { Component } from 'react'
import { Form, Input, Dropdown, List } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import ModalTemaplate from './ModalTemaplate.jsx';
import axios from 'axios'
import config from '../../../../../../config'
import { clearDataGenCode } from '../../../../../../actions'
import moment from 'moment'
class GenerateCode extends Component {
    state = {
        dataCandidate: [],
        dataTemplate: [],
        deadline: '',
        email: '',
        teamplate: '',
        emailError: '',
        dateError: "",
        dataTemplateError: '',
        message: '',
        smShow: false,
        load: false
    };
    componentDidMount() {
        this.props.clearDataGenCode()
        this.setState({ load: !this.state.load })
        const userToken = localStorage.getItem('userToken');
        axios.get(`${config.host}/getDataEntry`, { headers: { userToken } })
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        load: !this.state.load,
                        dataCandidate: res.data.dataCandidate,
                        dataTemplate: res.data.dataTemplate
                    })
                } else {
                    this.setState({
                        load: !this.state.load,
                        message: res.data.message
                    })
                }
            }).catch(err => {
                console.log(err)
                this.setState({ load: !this.state.load })
                alert('Server Error !')
            })
    }
    showTemplate = (template) => {
        if (!template) {
            return <div></div>
        }
        return (
            <List divided verticalAlign='middle'>
                <List.Item>
                    <List.Content className="title-template">
                        {`Template ${template.language}/${template.testName}`}
                    </List.Content>
                </List.Item>
                <List.Item className="oddItem">
                    <List.Content floated='right'>
                        {template.easy} questions
                    </List.Content>
                    <List.Content floated='left'>
                        Number of Easy:
                    </List.Content>
                </List.Item>
                <List.Item className="evenItem">
                    <List.Content floated='right'>
                        {template.medium} questions
                    </List.Content>
                    <List.Content floated='left'>
                        Number of Medium:
                    </List.Content>
                </List.Item>
                <List.Item className="oddItem">
                    <List.Content floated='right'>
                        {template.hard} questions
                    </List.Content>
                    <List.Content floated='left'>
                        Number of Hard:
                    </List.Content>
                </List.Item>
                <List.Item className="evenItem">
                    <List.Content floated='right'>
                        {template.passScore}%
                    </List.Content>
                    <List.Content floated='left'>
                        Pass Score:
                    </List.Content>
                </List.Item>
                <List.Item className="oddItem">
                    <List.Content floated='right'>
                        {template.duration} minutes
                    </List.Content>
                    <List.Content floated='left'>
                        Duration:
                    </List.Content>
                </List.Item>
            </List>
        );
    }
    validate = () => {
        let email = this.state.email;
        let { TemplateCode } = this.props.TemplateCode
        let deadline = this.state.deadline;
        let isError = false;
        const errors = {
            emailError: "",
            dateError: '',
            dataTemplateError: ''
        }
        if (email === "" || TemplateCode.data === '' || deadline === '') {
            if (email === '') {
                isError = true;
                errors.emailError = "Require account";
            }
            if (deadline === '') {
                isError = true;
                errors.dateError = "Require deadline";
            }
            if (TemplateCode.data === '') {
                isError = true;
                errors.dataTemplateError = 'Require Template'
            }
        }
        if (Date.parse(deadline) < Date.parse(new Date())) {
            isError = true;
            errors.dateError = "Please choose again"
        }
        if ((new Date(deadline)).getFullYear() > 2100) {
            isError = true;
            errors.dateError = "Please choose year again"
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
        this.props.clearDataGenCode()
        this.setState({
            email: '',
            emailError: '',
            dateError: '',
            dataTemplateError: '',
            load: !this.state.load
        })
        const err = this.validate();
        if (!err) {
            let { TemplateCode } = this.props.TemplateCode
            let dataEntryCode = {
                numberEasy: TemplateCode.data.easy,
                numberMedium: TemplateCode.data.medium,
                numberHard: TemplateCode.data.hard,
                testName: TemplateCode.data.testName,
                language: TemplateCode.data.language,
                templateId: TemplateCode.data._id,
                candidateIds: this.state.email,
                deadline: this.state.deadline,
            }
            const userToken = localStorage.getItem('userToken');
            axios.post(`${config.host}/createEntryCode`, { dataEntryCode }, { headers: { userToken } })
                .then(res => {
                    if (res.status === 204) {
                        this.setState({ load: !this.state.load })
                        this.props.history.push("/admin/generate")
                    } else {
                        this.setState({
                            load: !this.state.load,
                            message: res.data.message
                        })
                    }
                }).catch(err => {
                    console.log(err)
                    this.setState({ load: !this.state.load })
                    alert('Server Error !')
                })
        }
        this.setState({
            email: '',
            deadline: '',
            teamplate: ''
        })
    }
    render() {
        let accArr = []
        this.state.dataCandidate.map((value, key) => {
            let obj = { key: key, text: value.email, value: value._id };
            accArr.push(obj)
        })

        let { TemplateCode } = this.props.TemplateCode
        return (
            <div className="container-fluid">
                <ModalTemaplate
                    dataTemplate={this.state.dataTemplate}
                />
                <div className="row justify-content-center cover-layout-editor">
                    <div className="col-md-6">
                        <div className="cover-title-0">GENERATE CODE</div>
                        <div className="cover-line-blue"></div>
                        <center><Button className="choose-template" content="Choose Template"
                            data-toggle="modal" data-target=".bd-example-modal-lg"
                            onClick={_ => this.setState({ dataTemplateError: '' })}
                        ></Button>
                            {
                                this.showTemplate(TemplateCode.data)
                            }
                        </center>
                        <div className="text-error">{this.state.dataTemplateError}</div>
                        <Form>
                            <p className="cover-label"><span>Account</span></p>
                            <Dropdown
                                multiple
                                search
                                fluid
                                selection
                                /* error={(this.state.email) ? true : false} */
                                onChange={(e, data) => this.setState({
                                    email: data.value,
                                    emailError: ``
                                })}
                                options={accArr}
                                value={this.state.email}
                                placeholder='Account'
                                onClick={_ => this.setState({ emailError: `` })}
                                error={this.state.emailError ? true : false}
                            />
                            <div className="text-error">{this.state.emailError}</div>
                            <p className="cover-label"><span>Deadline</span></p>
                            <Form.Field>
                                <Input fluid placeholder='Deadline'
                                    type="datetime-local"
                                    error={(this.state.dateError) ? true : false}
                                    onChange={e => this.setState({
                                        deadline: e.target.value,
                                        dateError: ``
                                    })}
                                    value={this.state.deadline}
                                    onClick={_ => this.setState({ dateError: `` })}
                                    error={this.state.dateError ? true : false}
                                />
                            </Form.Field>
                            <div className="text-error">{this.state.dateError}</div>
                            <div className="cover-action-btn">
                                <Button className="float-right cover-btn-cancel"
                                    onClick={_ => this.props.history.push('/admin/generate')}
                                >Cancel</Button>
                                <Button className="float-right cover-btn-save"
                                    onClick={_ => this.sendData()}
                                >Save</Button>
                            </div>
                        </Form>
                        <div><span style={{ color: "red" }}>{this.state.message}</span></div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        TemplateCode: state
    }
}

export default connect(mapStateToProps, { clearDataGenCode })(GenerateCode)