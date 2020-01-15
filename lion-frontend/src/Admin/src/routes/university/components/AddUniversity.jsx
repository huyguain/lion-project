import React, { Component } from 'react'
import '../../styles/index.css';
import config from '../../../../../config';
import { Button, Form, Icon } from 'semantic-ui-react';
import axios from 'axios'

class AddLocation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            location: '',
            formErrors: {}
        }
    }
    componentDidMount() {
        const userToken = localStorage.getItem("userToken");
        let { id } = this.props.match.params
        console.log('id', id)
        if (id) {
            axios.get(`${config.host}/get-university/${id}`, { headers: { userToken } }).
                then(
                    data => {
                        console.log('data', data.data.data)
                        let result = data.data.data[0]
                        this.setState({
                            name: result.name,
                            location: result.location
                        })
                    }
                ).catch(
                    err => console.log(err)
                )
        }
    }
    validate() {
        const userToken = localStorage.getItem("userToken");
        const id = this.props.match.params.id;
        const action = id ? `edit-university/${id}` : 'create-university'
        let { name, location, formErrors } = this.state,
            flag = true;
        if (name === '') {
            flag = false
            formErrors.name = true
        } else {
            formErrors.name = false
        }
        if (location === '') {
            flag = false
            formErrors.location = true
        } else {
            formErrors.location = false
        }
        this.setState({
            formErrors: this.state.formErrors
        })
        if (!flag) return 0
        axios.post(`${config.host}/${action}`, { name, location }, {
            headers: {
                userToken
            }
        })
            .then(res => {
                console.log('ok')
                this.props.history.push('/admin/university')
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        let { name, location } = this.state
        console.log('zone', this.state)
        return (
            <div className="container-fluid">
                <div className="row justify-content-center cover-layout-editor">
                    <div className="col-md-6">
                        <div className="cover-title-0">
                            {this.props.match.params.id ? 'EDIT' : 'ADD'} UNIVERSITY
                        </div>
                        <div className="cover-line-blue"></div>
                            {/*UNIVERSITY*/}
                            <p className="admin-create-show-detail-title"><span>University</span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.name ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                fluid placeholder='Content'
                                value={name ? name : ''}
                                onChange={e => this.setState({ name: e.target.value })}
                            />
                            {/*LOCATION*/}
                            <p className="admin-create-show-detail-title"><span>Location</span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.location ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                fluid placeholder='Content'
                                value={location ? location : ''}
                                onChange={e => this.setState({ location: e.target.value })}
                            />

                            <div className="cover-action-btn">
                                <Button className="float-right cover-btn-cancel"
                                    onClick={() => this.props.history.push('/admin/university')}
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
                                            Add University
                                        </Button>
                                }
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default (AddLocation)