import React, { Component } from 'react'
import '../../styles/index.css';
import config from '../../../../../config';
import { Button, Form, Icon } from 'semantic-ui-react';
import ListIcon from './ListIcon.jsx'
import axios from 'axios'

class AddLocation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            icon: '',
            content: '',
            formErrors: {}
        }
    }
    componentDidMount() {
        const userToken = localStorage.getItem("userToken");
        let { id } = this.props.match.params
        console.log('id', id)
        if (id) {
            axios.get(`${config.host}/get-offer/${id}`, { headers: { userToken } }).
                then(
                    data => {
                        console.log('data', data.data.data)
                        let result = data.data.data[0]
                        this.setState({
                            icon: result.icon,
                            content: result.content
                        })
                    }
                ).catch(
                    err => console.log(err)
                )
        }
    }
    changeIconOffer(icon) {
        console.log('icon tra ve', icon)
        this.setState({ icon })
    }
    validate() {
        const userToken = localStorage.getItem("userToken");
        const id = this.props.match.params.id;
        const action = id ? `edit-offer/${id}` : 'create-offer'
        let { icon, content, formErrors } = this.state,
            flag = true;
        if (icon === '') {
            flag = false
            formErrors.icon = true
        } else {
            formErrors.icon = false
        }
        if (content === '') {
            flag = false
            formErrors.content = true
        } else {
            formErrors.content = false
        }
        this.setState({
            formErrors: this.state.formErrors
        })
        if (!flag) return 0
        axios.post(`${config.host}/${action}`, { icon, content }, {
            headers: {
                userToken
            }
        })
            .then(res => {
                console.log('ok')
                this.props.history.push('/admin/offer')
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        let { icon, content } = this.state
        console.log('zone', this.state)
        return (
            <div className="container-fluid">
                <div className="row justify-content-center cover-layout-editor">
                    <div className="col-md-6">
                        <div className="cover-title-0">
                            {this.props.match.params.id ? 'EDIT' : 'ADD'} OFFER
                        </div>
                        <div className="cover-line-blue"></div>
                        <Form>
                            {/* <p className="admin-create-show-detail-title"><span>Icon</span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.icon ? 'Not be empty' : ''}
                            </span>
                            <Form.Select fluid options={optionsLanguage} placeholder='Zone'
                                value={icon ? icon : ''}
                                onChange={(e, { value }) => this.setState({ icon: value })}
                            /> */}

                            <p className="admin-create-show-detail-title"><span>Icon</span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.icon ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                fluid placeholder='Icon'
                                value={icon ? icon : ''}
                                onChange={e => this.setState({ icon: e.target.value })}
                            />
                            <ListIcon iconText={icon} changeIconOffer={icon => this.changeIconOffer(icon)}/>
                            <p className="admin-create-show-detail-title"><span>Content</span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.content ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                fluid placeholder='Content'
                                value={content ? content : ''}
                                onChange={e => this.setState({ content: e.target.value })}
                            />

                            <div className="cover-action-btn">
                                <Button className="float-right cover-btn-cancel"
                                    onClick={() => this.props.history.push('/admin/offer')}
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
                                        Add Offer
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