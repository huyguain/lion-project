import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button, Form, Icon, Dropdown, TextArea } from 'semantic-ui-react';
import { showNav } from '../../../../../actions'
import config from '../../../../../config'

const listGender = [
    { value: 'Male' },
    { value: 'Female' }
]

class FromTestimonial extends Component {
    constructor() {
        super();
        this.state = {
            imagePreview: { preview: '' },
            fullName: '',
            gender: 0,
            position: '',
            content: '',
            formErrors: {}
        }
    }
    onDrop = (acceptedFiles, rejectedFiles) => {
        const imagePreview = acceptedFiles[0];
        this.setState({ imagePreview });
    }
    saveUpdate = () => {
        const { imagePreview, fullName, gender, position, content, formErrors } = this.state;
        const { id } = this.props.match.params;
        if (imagePreview.preview && fullName && position && content) {
            const formData = new FormData();
            formData.append('image', imagePreview);
            formData.append('fullName', fullName);
            formData.append('gender', gender);
            formData.append('position', position);
            formData.append('content', content);
            const urlAPi = id ? `${config.host}/edit-testimonial/${id}` : `${config.host}/createTestimonial`;
            const userToken = localStorage.getItem('userToken')
            axios.post(urlAPi, formData, {
                headers: {
                    'Content-Type': `multipart/form-data`,
                    userToken
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        const { history } = this.props;
                        history.push("/admin/testimonial");
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            return;
        }
    }
    componentDidMount() {
        this.props.showNav('NAV_POST');
        const { id } = this.props.match.params;
        const { path } = this.props.match;
        if (path === "/admin/testimonial/edit-testimonial/:id" && id) {
            const userToken = localStorage.getItem('userToken')
            axios.get(`${config.host}/testimonial/${id}`, {
                headers: { 'Content-Type': `multipart/form-data`, userToken }
            })
                .then(res => {
                    const { urlImage, fullName, gender, position, content } = res.data.data;
                    this.setState({
                        imagePreview: {
                            preview: `${config.imageUrl}/${urlImage}`
                        }, fullName, gender, position, content
                    })
                }).catch(err => {
                    console.log(err)
                })
        }
    }
    render() {
        const { imagePreview, fullName, gender, position, content, formErrors } = this.state;
        return (
            <div className="container-fluid">
                <div className="row justify-content-center cover-layout-editor">
                    <div className="col-md-6">
                        <div className="cover-title-0">
                            {this.props.match.params.id ? 'EDIT' : 'ADD'} Testimonial
                        </div>
                        <div className="cover-line-blue"></div>
                        <Form encType="multipart/form-data">
                            <p className="admin-create-show-detail-title"><span><b>Name</b></span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.title ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                fluid placeholder='Full Name'
                                value={fullName ? fullName : ''}
                                onChange={e => this.setState({ fullName: e.target.value })}
                            />
                            <label className="cover-label">
                                Image:
                            </label>
                            <Dropzone
                                accept="image/jpeg, image/png"
                                className="dropzoneItem"
                                onDrop={this.onDrop}
                                style={{
                                    backgroundImage: `url(${imagePreview.preview})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '100% 100%',
                                    zIndex: '1',
                                    align: "center"
                                }} />
                            <div class="field">
                                <label><b>Gender</b></label>
                                <select
                                    onChange={e => this.setState({ gender: e.target.value })}
                                    value={gender}
                                >
                                    {listGender.map((e, i) => {
                                        return (
                                            <option key={Math.random()} value={i}>
                                                {e.value}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <p className="admin-create-show-detail-title"><span><b>Position</b></span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.title ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                fluid placeholder='Position'
                                value={position ? position : ''}
                                onChange={e => this.setState({ position: e.target.value })}
                            />

                            <p className="admin-create-show-detail-title"><span><b>Content</b></span></p>
                            <span style={{ color: "red" }}>
                                {formErrors.content ? 'Not be empty' : ''}
                            </span>
                            <Form.Field id='form-textarea-control-opinion'
                                control={TextArea}
                                error={formErrors.content}
                                value={content}
                                placeholder='Description'
                                onChange={(event) => { this.setState({ content: event.target.value }) }}
                            />
                            <div className="cover-action-btn">
                                <Link to="/admin/testimonial">
                                    <Button className="float-right cover-btn-cancel"
                                    >Cancel</Button>
                                </Link>
                                <Button className="float-right cover-btn-save"
                                    onClick={this.saveUpdate}>Save</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { showNav })(FromTestimonial);