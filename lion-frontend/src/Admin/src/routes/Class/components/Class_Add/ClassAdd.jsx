import React, { Component } from 'react'
import { Form, Input, Dropdown, List, Button, Loader } from 'semantic-ui-react';
import axios from 'axios'
import config from '../../../../../../config'
import { clearDataGenCode } from '../../../../../../actions'
import moment from 'moment'
class ClassAdd extends Component {
    state = {
        dataFresher: [],
        dataLearning: [],
        className: '',
        fresherIds: '',
        learningIds: '',
        startDate: '',
        endDate: '',

        classNameError: '',
        fresherIdsError: '',
        learningIdsError: '',
        startDateError: '',
        endDateError: '',
        load: false
    };
    componentDidMount() {
        let { id } = this.props.match.params;
        this.setState({ load: !this.state.load })
        const userToken = localStorage.getItem('userToken');
        axios.get(`${config.host}/getDataClass`, { headers: { userToken } })
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        load: !this.state.load,
                        dataFresher: res.data.dataFresher,
                        dataLearning: res.data.dataLearning
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
        if (id) {
            axios.get(`${config.host}/getClassById/${id}`, { headers: { userToken } })
                .then(res => {
                    if (res.status === 200) {
                        this.setState({
                            className: res.data.dataClass.className,
                            fresherIds: res.data.dataClass.fresherIds,
                            learningIds: res.data.dataClass.learningPathCustomiseIds,
                            startDate: res.data.dataClass.startDate,
                            endDate: res.data.dataClass.endDate,
                        })
                    } else {
                        this.setState({
                            message: res.data.message
                        })
                    }
                }).catch(err => {
                    console.log(err)
                    alert('Server Error !')
                })
        }
    }

    validate = () => {
        let className = this.state.className.trim();
        let fresherIds = this.state.fresherIds;
        let learningIds = this.state.learningIds;
        let startDate = this.state.startDate;
        let endDate = this.state.endDate;
        let isError = false;
        const errors = {
            classNameError: '',
            fresherIdsError: '',
            learningIdsError: '',
            startDateError: '',
            endDateError: '',
        }
        if (className === "" || fresherIds === '' || learningIds === '' || startDate === '' || endDate === '') {
            if (className === '') {
                isError = true;
                errors.classNameError = "Require Class Name";
            }
            if (fresherIds === '') {
                isError = true;
                errors.fresherIdsError = "Require Frehser ";
            }
            if (learningIds === '') {
                isError = true;
                errors.learningIdsError = 'Require Learning'
            }
            if (startDate === '') {
                isError = true;
                errors.startDateError = 'Require Start Date'
            }
            if (endDate === '') {
                isError = true;
                errors.endDateError = 'Require End Date'
            }
        }
        if (Date.parse(startDate) < Date.parse(new Date())) {
            isError = true;
            errors.startDateError = "Please choose again"
        }
        if ((new Date(startDate)).getFullYear() > 2100) {
            isError = true;
            errors.startDateError = "Please choose year again"
        }
        if (Date.parse(endDate) < Date.parse(new Date())) {
            isError = true;
            errors.endDateError = "Please choose again"
        }
        if ((new Date(endDate)).getFullYear() > 2100) {
            isError = true;
            errors.endDateError = "Please choose year again"
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
        const { id } = this.props.match.params
        this.setState({
            classNameError: '',
            fresherIdsError: '',
            learningIdsError: '',
            startDateError: '',
            endDateError: '',
            load: !this.state.load
        })
        const err = this.validate();
        if (!err) {
            let dataClass = {
                className: this.state.className,
                fresherIds: this.state.fresherIds,
                learningPathCustomiseIds: this.state.learningIds,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
            }
            const userToken = localStorage.getItem('userToken');
            if (!id) {
                axios.post(`${config.host}/createClass`, { dataClass }, { headers: { userToken } })
                    .then(res => {
                        if (res.status === 204) {
                            this.setState({ load: !this.state.load })
                            this.props.history.push("/admin/class")
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
            } else {
                axios.patch(`${config.host}/editClass/${id}`, { dataClass }, { headers: { userToken } })
                    .then(res => {
                        if (res.status === 204) {
                            this.setState({ load: !this.state.load })
                            this.props.history.push("/admin/class")
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

        }
        this.setState({
            className: '',
            fresherIds: '',
            learningIds: '',
            startDate: '',
            endDate: '',
        })
    }
    render() {
        const { id } = this.props.match.params;
        let { dataFresher, dataLearning } = this.state;
        let arrFresher = dataFresher.map(v => {
            return {
                key: Math.random(),
                text: v.userName,
                value: v._id
            }
        })
        let arrLearning = dataLearning.map(v => {
            return {
                key: Math.random(),
                text: v.learningPath,
                value: v._id
            }
        })
        if (this.state.load) return (
            <Loader active inline='centered' />
        )
        return (
            <div className="container-fluid">
                <div className="row justify-content-center cover-layout-editor">
                    <div className="col-md-6">
                        <div className="cover-title-0">ADD CLASS</div>
                        <div className="cover-line-blue"></div>
                        <Form>
                            <p className="cover-label"><span>Class Name</span></p>
                            <Input fluid placeholder='First Name'
                                onChange={e => this.setState({
                                    className: e.target.value,
                                    classNameError: ``
                                })}
                                value={this.state.className}
                                error={this.state.classNameError ? true : false}
                                onClick={_ => this.setState({ classNameError: `` })}
                            />
                            <div className="text-error">{this.state.classNameError}</div>
                            <p className="cover-label"><span>Fresher</span></p>
                            <Dropdown
                                multiple
                                search
                                fluid
                                selection
                                error={(this.state.fresherIdsError) ? true : false}
                                onChange={(e, data) => this.setState({
                                    fresherIds: data.value,
                                    fresherIdsError: ``
                                })}
                                options={arrFresher}
                                value={this.state.fresherIds}
                                placeholder='Account'
                                onClick={_ => this.setState({ fresherIdsError: `` })}
                            // error={this.state.emailError ? true : false}
                            />
                            <div className="text-error">{this.state.fresherIdsError}</div>
                            < p className="cover-label" > <span>Learning Path</span></p >
                            <Dropdown
                                multiple
                                search
                                fluid
                                selection
                                error={(this.state.learningIdsError) ? true : false}
                                onChange={(e, data) => this.setState({
                                    learningIds: data.value,
                                    learningIdsError: ``
                                })}
                                options={arrLearning}
                                value={this.state.learningIds}
                                placeholder='Learning Path'
                                onClick={_ => this.setState({ learningIdsError: `` })}
                            // error={this.state.emailError ? true : false}
                            />
                            <div className="text-error">{this.state.learningIdsError}</div>
                            <p className="cover-label"><span>Start Date</span></p>
                            <Input fluid placeholder='Deadline'
                                type="datetime-local"
                                error={(this.state.startDateError) ? true : false}
                                onChange={e => this.setState({
                                    startDate: e.target.value,
                                    startDateError: ``
                                })}
                                value={moment(this.state.endDate).format('YYYY-MM-DDTHH:mm')}
                                onClick={_ => this.setState({ startDateError: `` })}
                            />
                            <div className="text-error">{this.state.startDateError}</div>
                            <p className="cover-label"><span>End Date</span></p>
                            <Input fluid placeholder='Deadline'
                                type="datetime-local"
                                error={(this.state.endDateError) ? true : false}
                                onChange={e => this.setState({
                                    endDate: e.target.value,
                                    endDateError: ``
                                })}
                                value={moment(this.state.startDate).format('YYYY-MM-DDTHH:mm')}
                                onClick={_ => this.setState({ endDateError: `` })}
                            />
                            <div className="text-error">{this.state.endDateError}</div>
                            <div className="cover-action-btn">
                                <Button className="float-right cover-btn-cancel"
                                    onClick={_ => this.props.history.push('/admin/class')}
                                >Cancel</Button>
                                <Button className="float-right cover-btn-save"
                                    onClick={_ => this.sendData()}
                                >{id ? 'Edit' : 'Save'}</Button>
                            </div>
                        </Form>
                        <div><span style={{ color: "red" }}>{this.state.message}</span></div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ClassAdd