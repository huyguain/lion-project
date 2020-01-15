import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button, Form, Icon, Dropdown, TextArea } from 'semantic-ui-react';
import { showNav } from '../../../../../actions'
import config from '../../../../../config'

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-select/dist/react-select.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class From extends Component {
    constructor() {
        super();
        this.state = {
            imagePreview: { preview: '' },
            title: '',
            description: EditorState.createEmpty(),
            formErrors: {}
        }
    }
    onDrop = (acceptedFiles, rejectedFiles) => {
        const imagePreview = acceptedFiles[0];
        this.setState({ imagePreview });
    }
    convertToDraft(html) {
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            return editorState;
        }
        return EditorState.createEmpty();
    }
    saveUpdate = () => {
        const { imagePreview, title, description } = this.state;
        const { id } = this.props.match.params;
        if (imagePreview.preview && title && description.getCurrentContent()) {
            const formData = new FormData();
            formData.append('image', imagePreview);
            formData.append('title', title);
            formData.append('description', draftToHtml(convertToRaw(description.getCurrentContent())));
            const urlAPi = id ? `${config.host}/edit-category/${id}` : `${config.host}/createCategory`;
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
                        history.push("/admin/category");
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
        console.log('EEF');
        if (path === "/admin/category/edit-category/:id" && id) {
            console.log('dsfads', id);
            const userToken = localStorage.getItem('userToken')
            axios.get(`${config.host}/category/${id}`, {
                headers: { 'Content-Type': `multipart/form-data`, userToken }
            })
                .then(res => {
                    const { urlImage, title, description } = res.data.data;
                    this.setState({
                        imagePreview: {
                            preview: `${config.imageUrl}/${urlImage}`
                        }, title,
                        description: this.convertToDraft(description)
                    })
                }).catch(err => {
                    console.log(err)
                })
        }
    }
    render() {
        const { imagePreview, title, description } = this.state;
        return (
            <div className="container-fluid">
                <div className="row justify-content-center cover-layout-editor">
                    <div className="col-md-6">
                        <div className="cover-title-0">
                            {this.props.match.params.id ? 'EDIT' : 'ADD'} category
                        </div>
                        <div className="cover-line-blue"></div>
                        <Form encType="multipart/form-data">
                            <p className="admin-create-show-detail-title"><span><b>Title</b></span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.title ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                disabled={this.props.match.params.id ? true : false}
                                fluid placeholder='Title'
                                value={title ? title : ''}
                                onChange={e => this.setState({ title: e.target.value })}
                            />
                            <label className="admin-create-show-detail-title">
                                <b>Image:</b>
                            </label>
                            <Dropzone
                                accept="image/jpeg, image/png"
                                className="dropzoneItem dropzoneItemBanner"
                                onDrop={this.onDrop}
                                style={{
                                    backgroundImage: `url(${imagePreview.preview})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '100% 100%',
                                    zIndex: '1',
                                    align: "center"
                                }} />
                            <p className="admin-create-show-detail-title cover-label"><span><b>Description</b></span></p>
                            <span style={{ color: "red" }}>
                                Note: Cần xóa hết định dạng khi paste nội dụng  ngoài (ctrl+a click vào biểu tượng tẩy)
                            </span>
                            <Editor
                                editorState={description}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={description => this.setState({ description })}
                            />
                            <div className="cover-action-btn">
                                <Link to="/admin/category">
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

export default connect(null, { showNav })(From);