import React, { Component } from 'react'
import '../../styles/index.css';
import config from '../../../../../config';
import { Button, Form, Icon } from 'semantic-ui-react';
import axios from 'axios'

const optionsLanguage = [
    { key: '1', value: 'Hà Nội', text: 'Hà Nội' },
    { key: '2', value: 'Đà Nẵng', text: 'Đà Nẵng' },
    { key: '3', value: 'Sài Gòn', text: 'Sài Gòn' }
]
class AddLocation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            zone: '',
            formErrors: {}
        }
    }
    componentDidMount() {
        const userToken = localStorage.getItem("userToken");
        let { id } = this.props.match.params
        console.log('id', id)
        if (id) {
            axios.get(`${config.host}/get-location/${id}`, { headers: { userToken } }).
                then(
                    data => {
                        console.log('data', data.data.data)
                        let result = data.data.data[0]
                        this.setState({
                            zone: result.zone
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
        const action = id ? `edit-location/${id}` : 'create-location'
        let { zone, formErrors } = this.state,
            flag = true;
        if (zone === '') {
            flag = false
            formErrors.zone = true
        } else {
            formErrors.zone = false
        }
        this.setState({
            formErrors: this.state.formErrors
        })
        if (!flag) return 0
        console.log('zone-huy', zone)
        axios.post(`${config.host}/${action}`, { zone }, {
            headers: {
                userToken
            }
        })
            .then(res => {
                console.log('ok')
                this.props.history.push('/admin/location')
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        let { zone, address } = this.state
        console.log('zone', this.state)
        return (
            <div className="container-fluid">
                <div className="row justify-content-center cover-layout-editor">
                    <div className="col-md-6">
                        <div className="cover-title-0">
                            {this.props.match.params.id ? 'EDIT' : 'ADD'} LOCATION
                        </div>
                        <div className="cover-line-blue"></div>
                        <Form>
                            <p className="admin-create-show-detail-title"><span>Location</span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.zone ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                fluid placeholder='Location'
                                value={zone ? zone : ''}
                                onChange={e => this.setState({ zone: e.target.value })}
                            />

                            <div className="cover-action-btn">
                                <Button className="float-right cover-btn-cancel"
                                    onClick={() => this.props.history.push('/admin/learning-path/table')}
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
export default (AddLocation)