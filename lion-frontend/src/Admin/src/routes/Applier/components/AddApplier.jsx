import React, { Component } from 'react'
import '../../styles/index.css';
import config from '../../../../../config';
import { Button, Form, Icon, Dropdown } from 'semantic-ui-react';
import axios from 'axios'
import './AddJob.css'

class AddApplier extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: "",
            cpa: '',
            location: '',
            cv: '',
            email: '',
            fullName: '',
            graduationYear: '',
            jobApply: '',
            major: '',
            phoneNumber: '',
            typeJob: '',
            wordExperience: '',

            formErrors: []
        }
    }
    convertData(data) {
        let result = []
        data.forEach(element => {
            result.push(element.content)
        })
        return result.join(', ')
    }
    convertOffer(offers) {
        let result = []
        offers.forEach(e => {
            result.push(e._id)
        })
        return result
    }
    componentDidMount() {
        const userToken = localStorage.getItem("userToken");
        let { id } = this.props.match.params
        console.log('id', id)
        if (id) {
            axios.get(`${config.host}/get-applier/${id}`, { headers: { userToken } }).
                then(
                    data => {
                        console.log('data', data.data.data)
                        let result = data.data.data[0]
                        this.setState({
                            category: result.category,
                            cpa: result.cpa,
                            location: result.location,
                            cv: result.cv,
                            email: result.email,
                            fullName: result.fullName,
                            graduationYear: result.graduationYear,
                            jobApply: result.jobApply._id,
                            major: result.major,
                            phoneNumber: result.phoneNumber,
                            typeJob: result.typeJob,
                            wordExperience: result.wordExperience
                        })
                    }
                ).catch(
                    err => console.log(err)
                )
        }
    }
    checkError (field) {
        if (field === '') {
            return [false, true]
        } else {
            return [true, false]
        }
    }
    validate() {
        const userToken = localStorage.getItem("userToken");
        const id = this.props.match.params.id;
        const action = id ? `edit-applier/${id}` : 'create-applier'
        let { category, cpa, location, cv, email, fullName, graduationYear, jobApply,
            major, phoneNumber, typeJob, wordExperience, formErrors } = this.state,
            flag = true;
        [flag, formErrors.category]         = this.checkError(category)
        [flag, formErrors.cpa]              = this.checkError(category)
        [flag, formErrors.location]         = this.checkError(category)
        [flag, formErrors.cv]               = this.checkError(category)
        [flag, formErrors.fullName]         = this.checkError(category)
        [flag, formErrors.graduationYear]   = this.checkError(category)
        [flag, formErrors.jobApply]         = this.checkError(category)
        [flag, formErrors.major]            = this.checkError(category)
        [flag, formErrors.phoneNumber]      = this.checkError(category)
        [flag, formErrors.typeJob]          = this.checkError(category)
        [flag, formErrors.wordExperience]   = this.checkError(category)
        this.setState({
            formErrors: this.state.formErrors
        })
        if (!flag) return 0
        console.log('state', this.state)
        axios.post(`${config.host}/${action}`, {
            category, cpa, location, cv, email, fullName, graduationYear, jobApply,
            major, phoneNumber, typeJob, wordExperience
        }, {
                headers: {
                    userToken
                }
            })
            .then(res => {
                console.log('ok')
                this.props.history.push('/admin/jobs')
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        let { category, cpa, location, cv, email, fullName, graduationYear, jobApply,
            major, phoneNumber, typeJob, wordExperience } = this.state;
        console.log('state-huyguain', this.state)
        return (
            <div className="container-fluid">
                <div className="row justify-content-center cover-layout-editor">
                    <div className="col-md-6">
                        <div className="cover-title-0">
                            {this.props.match.params.id ? 'EDIT' : 'ADD'} APPLIER
                        </div>
                        <div className="cover-line-blue"></div>
                        <Form>
                            {/* Fullname */}
                            <p className="admin-create-show-detail-title"><span><b>Họ tên</b></span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.fullName ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                fluid placeholder='Icon'
                                value={fullName ? fullName : ''}
                                onChange={e => this.setState({ fullName: e.target.value })}
                            />
                            {/* Email */}
                            <p className="admin-create-show-detail-title"><span><b>Email</b></span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.email ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                fluid placeholder='Icon'
                                value={email ? email : ''}
                                onChange={e => this.setState({ email: e.target.value })}
                            />
                            {/* Location */}
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.location ? 'Not be empty' : ''}
                            </span>
                            <div class="field">
                                <label><b>Location</b></label>
                                <select 
                                    onChange={e => this.setState({ location: e.target.value })}
                                >
                                </select>
                            </div>
                            {/* Năm tốt nghiệp */}
                            <p className="admin-create-show-detail-title"><span><b>Năm tốt nghiệp</b></span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.graduationYear ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                fluid placeholder='Icon'
                                type="number"
                                value={graduationYear ? graduationYear : ''}
                                onChange={e => this.setState({ graduationYear: e.target.value })}
                            />
                            {/* CPA */}
                            <p className="admin-create-show-detail-title"><span><b>CPA</b></span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.cpa ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                fluid placeholder='Deadline submit'
                                type="number"
                                value={cpa ? cpa : ''}
                                onChange={e => this.setState({ cpa: e.target.value })}
                            />
                            {/* Phonenumber */}
                            <p className="admin-create-show-detail-title"><span><b>Phone number</b></span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.phoneNumber ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                fluid placeholder='Phone number'
                                type="number"
                                value={phoneNumber ? phoneNumber : ''}
                                onChange={e => this.setState({ phoneNumber: e.target.value })}
                            />
                            {/* Category */}
                            <p className="admin-create-show-detail-title"><span><b>Chương trình</b></span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.category ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                fluid placeholder='Phone number'
                                value={category ? category : ''}
                                onChange={e => this.setState({ category: e.target.value })}
                            />

                            {/* //// */}
                            {/* Chuyên nghành */}
                            <p className="admin-create-show-detail-title"><span><b>Chuyên nghành</b></span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.major ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                fluid placeholder='Content'
                                value={major ? major : ''}
                                onChange={e => this.setState({ major: e.target.value })}
                            />
                            {/* Hình thức */}
                            <p className="admin-create-show-detail-title"><span><b>Hình thức</b></span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.typeJob ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                fluid placeholder='Content'
                                value={typeJob ? typeJob : ''}
                                onChange={e => this.setState({ typeJob: e.target.value })}
                            />
                            {/* wordExperience */}
                            <p className="admin-create-show-detail-title"><span><b>Kinh nghiệm</b></span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.wordExperience ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                fluid placeholder='Phone number'
                                value={wordExperience ? wordExperience : ''}
                                onChange={e => this.setState({ wordExperience: e.target.value })}
                            />

                            <div className="cover-action-btn">
                                <Button className="float-right cover-btn-cancel"
                                    onClick={() => this.props.history.push('/admin/jobs')}
                                >
                                    Cancel
                                    </Button>
                                {
                                    this.props.match.params.id ?
                                        <Button className="float-right cover-btn-save"
                                            onClick={_ => this.validate()}
                                        >
                                            Save
                                        </Button> :
                                        <Button primary
                                            className="float-right cover-btn-create"
                                            onClick={_ => this.validate()}
                                        >
                                            Add Location
                                        </Button>
                                }
                            </div>
                        </Form>

                    </div>
                </div>
            </div>
        )
    }
}
export default (AddApplier)