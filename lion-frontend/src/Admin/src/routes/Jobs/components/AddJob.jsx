import React, { Component } from 'react'
import '../../styles/index.css';
import config from '../../../../../config';
import { Button, Form, Icon, Dropdown } from 'semantic-ui-react';
import moment from 'moment';
import axios from 'axios'

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import './AddJob.css'

class AddJob extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            salary: 0,
            location: '',
            deadlineSubmit: '',
            joinDate: '',
            content: EditorState.createEmpty(),
            offer: [],
            hashTag: [],
            category: '',
            formErrors: {},

            listLocation: [],
            listOffer: [],
            optionsOffer: [],
            optionsHashTag: [],
            optionsLocation: [],
            tempHashTag: ''
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
    convertToDraft(html) {
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            return editorState;
        }
        return EditorState.createEmpty();
    }
    componentDidMount() {
        const userToken = localStorage.getItem("userToken");
        let { id } = this.props.match.params
        if (id) {
            axios.get(`${config.host}/get-job/${id}`, { headers: { userToken } }).
                then(
                data => {
                    console.log('data', data.data.data)
                    let result = data.data.data[0],
                        optionsHashTag = [];
                    result.hashTag.map((value, key) => {
                        let obj = { key: key, text: value, value: value };
                        optionsHashTag.push(obj)
                    })
                    this.setState({
                        title: result.title,
                        salary: result.salary,
                        location: result.location._id,
                        deadlineSubmit: result.deadlineSubmit,
                        joinDate: result.joinDate,
                        content: this.convertToDraft(result.content),
                        offer: this.convertOffer(result.offer),
                        hashTag: result.hashTag,
                        category: {
                            value: result.category._id,
                            label: result.category.title
                        },
                        optionsHashTag
                    })
                }
                ).catch(
                err => console.log(err)
                )
        }
        axios.get(`${config.host}/list-category`, {
            headers: { userToken }
        }).then(
            res => {
                let listCategory = res.data.data.map(item => ({
                    value: item._id,
                    label: item.title
                }));
                console.log({ listCategory });
                this.setState({
                    listCategory
                })
            }
            ).catch(
            err => console.log(err)
            )
        axios.get(`${config.host}/list-location`, {
            headers: { userToken }
        }).then(
            res => {
                let listLocation = res.data.data.map(e => {
                        return { value: e._id, label: e.zone }
                    })
                this.setState({
                    listLocation
                })
            }
            )
        axios.get(`${config.host}/list-offer`, {
            headers: { userToken }
        }).then(
            res => {
                let listOffer = res.data.data,
                    optionsOffer = [];
                listOffer.map((value, key) => {
                    let obj = { key: key, text: value.content, value: value._id };
                    optionsOffer.push(obj)
                })
                this.setState({
                    listOffer,
                    optionsOffer
                })
            }
            )
    }
    validate() {
        const userToken = localStorage.getItem("userToken");
        const id = this.props.match.params.id;
        const action = id ? `edit-job/${id}` : 'create-job'
        let { title, salary, location, deadlineSubmit, joinDate,
            content, offer, hashTag, category } = this.state,
            formErrors = {};
        const contentHTML = draftToHtml(convertToRaw(content.getCurrentContent()));
        formErrors.title                = (title == '') ? true : false
        formErrors.salary                = (salary == '') ? true : false
        formErrors.location                = (location == '') ? true : false
        formErrors.deadlineSubmit       = (deadlineSubmit == '') ? true : false
        formErrors.joinDate             = (joinDate == '') ? true : false
        formErrors.content              = (!content.getCurrentContent()) ? true : false
        formErrors.offer                = (offer == '') ? true : false
        formErrors.category             = (!category) ? true : false
        formErrors.hashTag             = (hashTag == '') ? true : false
        this.setState({
            formErrors
        })
        if (!Object.values(formErrors).every(e => !e)) return 0
        axios.post(`${config.host}/${action}`, {
            title, salary, location, deadlineSubmit, joinDate,
            content: contentHTML, offer, hashTag, category:category.value
        }, {
                headers: {
                    userToken
                }
            })
            .then(res => {
                this.props.history.push('/admin/jobs')
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        let { title, salary, location, deadlineSubmit, joinDate,
            content, offer, hashTag, category, listLocation, listOffer, listCategory,
            optionsOffer, optionsHashTag, tempHashTag } = this.state;
        console.log({ category });
        return (
            <div className="container-fluid">
                <div className="row justify-content-center cover-layout-editor">
                    <div className="col-md-8">
                        <div className="cover-title-0">
                            {this.props.match.params.id ? 'EDIT' : 'ADD'} JOBS
                        </div>
                        <div className="cover-line-blue"></div>
                        <Form>
                            {/* Title */}
                            <p className="admin-create-show-detail-title"><span><b>Title</b></span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.title ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                fluid placeholder='Title'
                                value={title ? title : ''}
                                onChange={e => this.setState({ title: e.target.value })}
                            />
                            {/* Category */}
                            <p className="admin-create-show-detail-title"><span><b>Category</b></span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.title ? 'Not be empty' : ''}
                            </span>
                            <Select
                                className="react-select-element"
                                name="Category"
                                value={category && category.value}
                                onChange={selectedOption => this.setState({ category: selectedOption })}
                                options={listCategory}
                            />
                            {/* Salary */}
                            <p className="admin-create-show-detail-title"><span><b>Salary</b></span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.salary ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                fluid placeholder='Salary'
                                type="number"
                                value={salary ? salary : ''}
                                onChange={e => this.setState({ salary: e.target.value })}
                            />
                            {/* Location */}
                            <p className="admin-create-show-detail-title"><span><b>Location</b></span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.location ? 'Not be empty' : ''}
                            </span>
                            <Select
                                className="react-select-element"
                                name="placework"
                                value={location}
                                options={listLocation}
                                onChange={location => this.setState({ location: location.value })}
                            />
                            {/* Deadline submit */}
                            <p className="admin-create-show-detail-title"><span><b>Hạn nộp</b></span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.deadlineSubmit ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                fluid placeholder='Deadline submit'
                                type="date"
                                value={deadlineSubmit ? moment(deadlineSubmit).format("YYYY-MM-DD") : ''}
                                onChange={e => this.setState({ deadlineSubmit: e.target.value })}
                            />
                            {/* Start Date */}
                            <p className="admin-create-show-detail-title"><span><b>Start Date</b></span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.joinDate ? 'Not be empty' : ''}
                            </span>
                            <Form.Input
                                fluid placeholder='Join Date'
                                type="date"
                                value={joinDate ? moment(joinDate).format("YYYY-MM-DD") : ''}
                                onChange={e => this.setState({ joinDate: e.target.value })}
                            />
                            {/* Offer */}
                            <p className="admin-create-show-detail-title"><span><b>Offer</b></span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.offer ? 'Not be empty' : ''}
                            </span>
                            <Dropdown
                                multiple
                                search
                                fluid
                                selection
                                /* error={(this.state.email) ? true : false} */
                                onChange={
                                    (e, data) => {
                                        this.setState({
                                            offer: data.value
                                        })
                                    }
                                }
                                options={optionsOffer}
                                value={offer}
                                placeholder='Account'
                            />
                            {/* Content */}
                            <p className="admin-create-show-detail-title"><span><b>Content</b></span></p>
                            <span style={{ color: "red" }}>
                                Note: Cần xóa hết định dạng khi paste nội dụng  ngoài (ctrl+a click vào biểu tượng tẩy)
                            </span>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.content ? 'Not be empty' : ''}
                            </span>
                            <Editor
                                editorState={content}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={content => this.setState({ content })}
                            />
                            {/* Hashtag */}
                            <p className="admin-create-show-detail-title"><span><b>Hashtag</b></span></p>
                            <span style={{ color: "red" }}>
                                {this.state.formErrors.hashTag ? 'Not be empty' : ''}
                            </span>
                            <div className="form-hashtag">
                                <Form.Input
                                    value={this.state.tempHashTag}
                                    fluid placeholder='Hashtag'
                                    className="form-hashtag-input"
                                    onChange={e => this.setState({ tempHashTag: e.target.value })}
                                />
                                <Button icon className="btn-add-lecture"
                                    onClick={_ => {
                                        this.setState({ hashTag: hashTag.concat(tempHashTag) })
                                        this.setState({ tempHashTag: '' })
                                    }}
                                >
                                    <Icon name="add" size="large" />
                                </Button>
                            </div>
                            <div>
                                {
                                    hashTag.map((e, i) => {
                                        return (
                                            <span className="hashTagItem">
                                                <b>{e} </b>
                                                <i className="fa fa-times"
                                                    onClick={_ => {
                                                        hashTag.splice(i, 1)
                                                        this.setState({ hashTag })
                                                    }
                                                    }>
                                                </i>
                                            </span>
                                        )
                                    })
                                }
                            </div>
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
                                            Add Job
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
export default (AddJob)