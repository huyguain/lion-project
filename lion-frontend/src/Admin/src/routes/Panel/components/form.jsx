import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { showNav } from '../../../../../actions';
import config from '../../../../../config';
import Dropzone from 'react-dropzone';
import InlineError from '../../../components/InlineError';
//semantic-ui
import {
    Form,
    Button,
    TextArea,
    Checkbox,
} from 'semantic-ui-react';

class FormPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagePreview: { preview: '' },
            errorTitle: "",
            errorDescription: "",
            errorPreview: "",
            title: "",
            description: "",
            status: true,
            linkToPage: '',
            errors: {}
        };
        //upload image
        this.onDrop = this.onDrop.bind(this);
        //create or update
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onDrop(acceptedFiles, rejectedFiles) {
        const imagePreview = acceptedFiles[0];
        this.setState({ imagePreview });
    }
    validate = () => {
        let title = this.state.title.trim();
        let description = this.state.description.trim();
        let fileImage = this.state.imagePreview.preview.trim();
        let linkToPage = this.state.linkToPage.trim();
        const errors = {};
        if (!title) errors.title = "Can't be blank";
        if (!description) errors.description = "Can't be blank";
        if (!linkToPage) errors.description = "Can't be blank";
        if (this.props.match.path === "/admin/panel/create-panel") {
            if (fileImage === "") {
                errors.fileImage = "Can't be blank";
            }
        }
        return errors;
    }
    handleSubmit(e) {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors });
        const { id } = this.props.match.params;
        if (Object.keys(errors).length === 0) {
            const userToken = localStorage.getItem("userToken");
            const { title, description, status,
                linkToPage, imagePreview } = this.state;
            const formData = new FormData();
            formData.append('file', imagePreview);
            formData.append("title", title);
            formData.append('description', description);
            formData.append('status', status);
            formData.append('linkto', linkToPage);
            if (id) {
                axios.put(`${config.host}/edit/${id}`, formData, {
                    headers: {
                        'Content-Type': `multipart/form-data`,
                        userToken
                    }
                })
                    .then(res => {
                        const { history } = this.props;
                        history.push("/admin/panel");
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                axios.post(`${config.host}/createPanel`, formData, {
                    headers: {
                        'Content-Type': `multipart/form-data`,
                        userToken
                    }
                })
                    .then(res => {
                        const { history } = this.props;
                        if (res.data.success) {
                            history.push("/admin/panel");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
    }
    componentDidMount() {
        this.props.showNav('NAV_PANEL');
        const { id } = this.props.match.params;
        if (id) {
            const userToken = localStorage.getItem('userToken');
            axios.get(`${config.host}/panel/${id}`, { headers: { userToken } })
                .then(res => {
                    const { data } = res.data;
                    this.setState({
                        title: data.title,
                        description: data.description,
                        status: data.status,
                        linkToPage: data.linkto,
                        imagePreview: {
                            preview: `${config.imageUrl}/${data.urlImage}`
                        }
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    render() {
        const { imagePreview, title, description,
            status, linkToPage, errors } = this.state;
        let lable;
        const { id } = this.props.match.params;
        id ? lable = "Update" : lable = "Create";
        return (
            <div className="container-fluid">
                <div className="row justify-content-center cover-layout-editor">
                    <div className="col-md-8">
                        <div className="cover-title-0">{lable} a Panel</div>
                        <div className="cover-line-blue"></div>
                        <Form onSubmit={this.ActionSubmit} encType="multipart/form-data">
                            <label className="cover-label">Title</label>
                            <Form.Input fluid placeholder='Title'
                                error={(errors.title) ? true : false}
                                required
                                onChange={(event) => { this.setState({ title: event.target.value }) }}
                                value={title} />
                            {errors.title && <InlineError text={errors.title} />}
                            <label className="cover-label">Image</label>
                            <Dropzone className="dropzone" onDrop={this.onDrop} style={{
                                backgroundImage: `url(${imagePreview.preview})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '100% 100%',
                                zIndex: '1',
                                align: "center"
                            }} />
                            {errors.fileImage && <InlineError text={errors.fileImage} />}
                            <label className="cover-label">Description</label>
                            <Form.Field id='form-textarea-control-opinion'
                                error={(errors.description) ? true : false}
                                onChange={(event) => { this.setState({ description: event.target.value }) }}
                                control={TextArea}
                                placeholder='Description'
                                value={description}
                            />
                            {errors.description && <InlineError text={errors.description} />}

                            <Form.Input fluid 
                                error={(errors.linkto) ? true : false}
                                required
                                onChange={event => this.setState({ linkToPage: event.target.value })}
                                placeholder='Link To'
                                value={linkToPage}
                            />
                            {errors.linkto && <InlineError text={errors.linkto} />}

                            <label className="cover-label">Status</label>
                            <div>
                                <Checkbox
                                    toggle
                                    checked={status}
                                    onChange={(event, data) => { this.setState({ status: data.checked }) }}
                                />
                            </div>

                            <div className="cover-action-btn">
                                <Link to="/admin/panel">
                                    <Button className="float-right cover-btn-cancel" >Cancel</Button>
                                </Link>
                                <Button className="float-right cover-btn-save" onClick={this.handleSubmit}>Save</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(null, { showNav })(FormPanel);
