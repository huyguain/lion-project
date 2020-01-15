import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { connect } from 'react-redux';
import { showNav } from '../../../../../../actions';
import Modal from '../DialogAction';
import config from '../../../../../../config'
import { Form, Button, TextArea, Checkbox } from 'semantic-ui-react';

import UploadMulti from './UploadMulti';
import CreateHashTag from './CreateHashTag';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './index.css';;

const listCategorys = [
    { value: 0, label: 'Page' },
    { value: 1, label: 'Đời Sống' },
    { value: 2, label: 'Sự Kiện' },
    { value: 3, label: 'Tâm Sự' },
];

class FormPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagePreview: { preview: '' },
            title: '',
            description: '',
            hashTag: '',
            category: listCategorys[0],
            status: true,
            errTitle: false,
            errDes: false,
            displayDialog: false,
            listImage: [],
            listDelete: [],
            listHashTag: [],
            editorState: EditorState.createEmpty()
        };
        this.onDrop = this.onDrop.bind(this);
        this.saveUpdatePost = this.saveUpdatePost.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.createPost = this.createPost.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
    }
    onDrop(acceptedFiles, rejectedFiles) {
        const imagePreview = acceptedFiles[0];
        this.setState({ imagePreview });
    }
    setListHashTag = (listHashTag, hashTag) => {
        this.setState({ listHashTag, hashTag });
    }
    onDropListItem = (listImage, itemDelete) => {
        if (itemDelete) {
            const urlDelete = itemDelete.substring(itemDelete.lastIndexOf('/') + 1, itemDelete.length);
            const listDelete = [...this.state.listDelete, urlDelete];
            this.setState({ listImage, listDelete });
            return;
        }
        this.setState({ listImage });
    }

    closeDialog() {
        this.setState({ displayDialog: false });
    }
    updatePost(fromData, id) {
        const userToken = localStorage.getItem('userToken')
        axios.put(`${config.host}/edit-post/${id}`, fromData, {
            headers: {
                'Content-Type': `multipart/form-data`,
                userToken
            }
        })
            .then(res => {
                if (res.status === 200) {
                    localStorage.removeItem('currentPost')
                    const { history } = this.props;
                    history.push("/admin/post");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    createPost(fromData) {
        const userToken = localStorage.getItem('userToken')
        axios.post(`${config.host}/createPost`, fromData, {
            headers: {
                'Content-Type': `multipart/form-data`,
                userToken
            }
        })
            .then(res => {
                if (res.status === 200) {
                    localStorage.removeItem('currentPost');
                    const { history } = this.props;
                    history.push("/admin/post");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    saveUpdatePost() {
        const { imagePreview, title, description, editorState,
            status, listImage, listDelete, listHashTag, category } = this.state;
        const { id } = this.props.match.params;
        if (imagePreview.preview && title && description && editorState.getCurrentContent()) {
            const formData = new FormData();
            formData.append('image', imagePreview);
            formData.append("title", title);
            formData.append('content', draftToHtml(convertToRaw(editorState.getCurrentContent())));
            formData.append('description', description);
            formData.append('status', status);
            formData.append('listDelete', listDelete);
            formData.append('hashTag', listHashTag);
            formData.append('category', category.label);
            listImage.map((item, index) => {
                formData.append(`slider`, item);
                return true;
            })
            if (id) {
                this.updatePost(formData, id);
            }
            else {
                this.createPost(formData);
            }
            return;
        }
        else {
            const errImage = imagePreview.preview ? false : true;
            const errDes = description.trim() ? false : true;
            const errTitle = title.trim() ? false : true;
            if (errImage || errTitle || errDes) {
                const dataDiaLog = {
                    title: 'Message',
                    content: 'Thiếu Trường Dữ liệu',
                    onsubmit: this.closeDialog,
                    item: {}
                }
                this.setState({ displayDialog: true, dataDiaLog, errDes, errTitle })
            }
            this.setState({
                errDes, errTitle
            })
        }
    }
    onEditorStateChange(editorState) {
        this.setState({ editorState });
    };
    convertToDraft(html) {
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({
                editorState,
            });
        }
    }
    componentDidUpdate() {
        const { id } = this.props.match.params;
        const { imagePreview, title, description, status,
            editorState, listImage, listHashTag, category } = this.state;
        localStorage.setItem('currentPost',
            JSON.stringify({
                listImage, imagePreview,
                title, listHashTag, category,
                content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
                description, status, id
            })
        );
    }
    componentDidMount() {
        this.props.showNav('NAV_POST');
        const { id } = this.props.match.params;
        const { path } = this.props.match;
        const data = JSON.parse(localStorage.getItem('currentPost'));
        if ((!data || data.id !== id) && path === "/admin/post/edit-post/:id") {
            const userToken = localStorage.getItem('userToken')
            axios.get(`${config.host}/post/${id}`, {
                headers: {
                    'Content-Type': `multipart/form-data`,
                    userToken
                }
            })
                .then(res => {
                    const { urlImage, title, content,
                        description, status, urlImageSlider, hashTag, category } = res.data.data;
                    this.setState({
                        title, description, status,
                        category: listCategorys.filter(item => item.label === category)[0],
                        imagePreview: {
                            preview: `${config.imageUrl}/${urlImage}`
                        },
                        listImage: urlImageSlider.map(item => ({
                            preview: `${config.imageUrl}/${item}`
                        })),
                        listHashTag: hashTag
                    })
                    this.convertToDraft(content);
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else if (data) {
            if (data.id === id) {
                const { imagePreview, listImage, title, description,
                    status, content, listHashTag, category } = data;
                this.setState({ imagePreview, listImage, title, description, status, listHashTag, category });
                this.convertToDraft(content);
            } else {
                localStorage.removeItem('currentPost');
            }
        }
    }
    render() {
        const { imagePreview, title, description, status, editorState, listImage, category,
            errTitle, errDes, dataDiaLog, displayDialog, listHashTag, hashTag } = this.state;
        const { path } = this.props.match;
        return (
            <div className="container-fluid postForm">
                {
                    dataDiaLog ?
                        <Modal displayDialog={displayDialog} closeDialog={this.closeDialog}
                            dataDiaLog={dataDiaLog} />
                        : null
                }
                <div className="row justify-content-center cover-layout-editor">
                    <div className="col-md-10">
                        <div className="cover-title-0">
                            {path === "/admin/post/edit-post/:id" ? `Edit Post ` : 'Add New Post'}
                        </div>
                        <div className="cover-line-blue"></div>
                        <Form encType="multipart/form-data">
                            <label className="cover-label">
                                Title:
                            </label>
                            <Form.Input fluid placeholder='Title'
                                onChange={(event) => { this.setState({ title: event.target.value }) }}
                                value={title}
                                error={errTitle}
                            />
                            <label className="cover-label">
                                Image:
                            </label>
                            <Dropzone
                                accept="image/jpeg, image/png"
                                className="dropzone"
                                onDrop={this.onDrop}
                                style={{
                                    backgroundImage: `url(${imagePreview.preview})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '100% 100%',
                                    zIndex: '1',
                                    align: "center"
                                }} />
                            <label className="cover-label">
                                Description
                            </label>
                            <Form.Field id='form-textarea-control-opinion'
                                control={TextArea}
                                error={errDes}
                                value={description}
                                placeholder='Description'
                                onChange={(event) => { this.setState({ description: event.target.value }) }}
                            />
                            <label className='cover-label'>Category</label>
                            <Select
                                onChange={category => {
                                    category.value === 0 ? this.setState({ category })
                                        : this.setState({ category, listImage: [] })
                                }}
                                value={category ? category.value : 0}
                                name="category"
                                options={listCategorys}
                                className={'SelectElementFormPost'}
                            />
                            {
                                category.value === 0 && <label className='cover-label' >Slider Image</label>
                            }
                            {
                                category.value === 0 &&
                                <UploadMulti
                                    listImage={listImage}
                                    onDrop={this.onDropListItem}
                                />
                            }
                            < label className="cover-label" htmlFor="">
                                Content
                            </label>
                            <br></br>
                            <span style={{ color: "red" }}>
                                Note: Cần xóa hết định dạng khi paste nội dụng  ngoài (ctrl+a click vào biểu tượng tẩy)
                            </span>
                            <Editor
                                editorState={editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={this.onEditorStateChange}
                            />
                            <label className="cover-label">Hash Tag</label>
                            <CreateHashTag
                                value={hashTag}
                                listHashTag={listHashTag}
                                setListHashTag={this.setListHashTag}
                            />
                            < label className="cover-label">Highlights</label>
                            <div>
                                <Checkbox toggle checked={status}
                                    onClick={_ => this.setState({ status: !status })}
                                />
                            </div>

                            <div className="cover-action-btn">
                                <Link to="/admin/post">
                                    <Button className="float-right cover-btn-cancel"
                                    >Cancel</Button>
                                </Link>
                                <Button className="float-right cover-btn-save"
                                    onClick={this.saveUpdatePost}>Save</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div >
        )
    }
}
export default connect(null, { showNav })(FormPost);