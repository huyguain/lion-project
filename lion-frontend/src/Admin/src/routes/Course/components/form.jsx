import React, { Component } from 'react';
import { Button, Form, Input, Select, Dropdown, Icon, List, TextArea } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import config from '../../../../../config';
import moment from 'moment';
import InlineError from '../../../components/InlineError';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../../../../actions';
import ListSection from './ListSection';
class FormCourse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            language: "",
            courseName: "",
            title: "",
            content: "",
            start_at: "",
            deadline: "",
            iconPreview: { preview: '' },
            imagePreview: { preview: '' },
            sections: [
                {
                    id: Math.random(),
                    section: "",
                    lectures: []
                }
            ],
            lectureEdit: "",
            errors: {},
            idModal: ""

        }
        // this.addSection = this.addSection.bind(this);
        // this.removeSection = this.removeSection.bind(this);
        // this.changesection = this.changeSectionName.bind(this);
        // this.dispatchIdModal = this.dispatchIdModal.bind(this);
        // this.handleAddMoreLecture = this.handleAddMoreLecture.bind(this);
        this.onDropIcon = this.onDropIcon.bind(this);
        this.onDropImage = this.onDropImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.editLecture = this.editLecture.bind(this);
        // this.handleDeleteLecture = this.handleDeleteLecture.bind(this);
        this.onChangeSection = this.onChangeSection.bind(this);
        this.onAddSection = this.onAddSection.bind(this);
        this.onRemoveSection = this.onRemoveSection.bind(this);
        this.onDispatchIdModal = this.onDispatchIdModal.bind(this);
        this.onAddMoreLecture = this.onAddMoreLecture.bind(this);
        this.onEditLecture = this.onEditLecture.bind(this);
        this.onDeleteLecture = this.onDeleteLecture.bind(this);
    }
    onChangeSection(id, sectionName) {
        const sections = this.state.sections.map(section => section.id !== id ? section : { ...section, section: sectionName });
        this.setState({ sections: sections });
    }
    onAddSection() {
        this.setState({ sections: [...this.state.sections, { id: Math.random(), section: "", lectures: [] }] })
    }
    onRemoveSection(id) {
        if (this.state.sections.length === 1) {
            return;
        }
        const newSections = this.state.sections.filter(section => section.id !== id);
        this.setState({ sections: newSections });
    }
    onDispatchIdModal(idSection) {
        this.setState({ idModal: idSection })
    }
    onAddMoreLecture(lecture) {
        const { idModal } = this.state;
        const { lectureEdit } = this.state;
        if (lecture.id !== lectureEdit.id) {
            //create
            const sections = this.state.sections.map(section => section.id !== idModal ?
                section : { ...section, lectures: [...section.lectures, lecture] });
            this.setState({ sections: sections });
        } else {
            //edit
            const sections = this.state.sections.map(section => section.id !== idModal ?
                section : { ...section, lectures: section.lectures.map(lec => lec.id !== lectureEdit.id ? lec : { ...lecture }) });
            this.setState({ sections: sections });
        }
    }
    onEditLecture(idSection, idLecture) {
        const { sections } = this.state;
        const section = sections.filter(section => section.id === idSection);
        const lectures = section[0].lectures;
        const lectureEdit = lectures.filter(lecture => lecture.id === idLecture);
        this.setState({ lectureEdit: lectureEdit[0], idModal: idSection })
    }
    componentDidUpdate() {
        console.log(this.state)
    }
    validate = () => {
        const { language, courseName, title, content, start_at, deadline, sections } = this.state;
        const previewIcon = this.state.iconPreview.preview;
        const previewImage = this.state.imagePreview.preview;
        
        const errors = {};
        if (!language) errors.language = "Can't be blank";
        if (!courseName) errors.courseName = "Can't be blank";
        if (!title) errors.title = "Can't be blank";
        if (!content) errors.content = "Can't be blank";
        if (!start_at) errors.start_at = "Can't be blank";
        if (!deadline) errors.deadline = "Can't be blank";
        const { id } = this.props.match.params;
        if (!id) {
            if (!previewIcon) errors.previewIcon = "Can't be blank";
            if (!previewImage) errors.previewImage = "Can't be blank";
        }
        return errors;
    }
    onDropImage(acceptedFiles, rejectedFiles) {
        const imagePreview = acceptedFiles[0];
        this.setState({ imagePreview });
    }
    onDropIcon(acceptedFiles, rejectedFiles) {
        const iconPreview = acceptedFiles[0];
        this.setState({ iconPreview });
    }
    handleSubmit(e) {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            const userToken = localStorage.getItem("userToken");
            const { id } = this.props.match.params;
            const { language, courseName, title, content, start_at, deadline, iconPreview, imagePreview, sections } = this.state;
            const formData = new FormData();
            formData.append("language", language);
            formData.append('courseName', courseName);
            formData.append("title", title);
            formData.append('content', content);
            formData.append("start_at", start_at);
            formData.append('deadline', deadline);
            formData.append('iconPreview', iconPreview);
            formData.append('imagePreview', imagePreview);
            formData.append('sections', JSON.stringify(sections));
            console.log("section", sections)
            if (id) {
                //edit
                console.log(config.host)
                axios.put(`${config.host}/edit-course/${id}`, formData, {
                    headers: {
                        'Content-Type': `multipart/form-data`,
                        userToken
                    }
                })
                    .then(res => {
                        const { data } = res;
                        const { history } = this.props;
                        if (data.success) {
                            this.props.addFlashMessage({
                                type: 'success',
                                text: "Update successfully"
                            })
                            history.push('/admin/course');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                axios.post(`${config.host}/createCourse`, formData, {
                    headers: {
                        'Content-Type': `multipart/form-data`,
                        userToken
                    }
                })
                    .then(res => {
                        this.props.addFlashMessage({
                            type: 'success',
                            text: "Create successfully"
                        })
                        this.props.history.push("/admin/course");
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }


    }
    onDeleteLecture(idSection, idLecture) {
        const sections = this.state.sections.map(section => section.id !== idSection ?
            section : {
                ...section, lectures:
                section.lectures.filter(lecture => lecture.id !== idLecture)
            });
        this.setState({ sections: sections });
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        if (id) {
            const userToken = localStorage.getItem('userToken');
            axios.get(`${config.host}/getCourse/${id}`, { headers: { userToken } })
                .then(res => {
                    const { data } = res.data;
                    console.log("data1111", data)
                    this.setState({
                        language: data.language,
                        courseName: data.courseName,
                        title: data.title,
                        content: data.content,
                        start_at: data.start_at,
                        deadline: data.deadline,
                        iconPreview: { preview: `${config.imageUrl}/${data.urlIcon}` },
                        imagePreview: { preview: `${config.imageUrl}/${data.urlImage}` },
                        sections: data.sections.map(section => ({
                            ...section, id: Math.random(),
                            lectures: section.lectures.map(lecture => ({ ...lecture, id: Math.random() }))
                        }))
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    componentDidUpdate() {
        console.log("update state", this.state)
    }
    render() {
        const languages = [
            { key: '1', value: 'C/C++', text: 'C/C++' },
            { key: '2', value: 'C#', text: 'C#' },
            { key: '3', value: 'Java', text: 'Java' },
            { key: '4', value: 'JavaScript', text: 'JavaScript' },
            { key: '5', value: 'PHP', text: 'PHP' }
        ]
        const { language, courseName, title,
            content, start_at, deadline,
            sections, iconPreview, imagePreview, lectureEdit, errors } = this.state;
        return (
            <div>
                <div className="container-fluid">
                    <div className="row justify-content-center cover-layout-editor">
                        <div className="col-md-8">
                            <div className="cover-title-0">ADD COURSE</div>
                            <div className="cover-line-blue"></div>
                            <Form onSubmit={this.ActionSubmit} encType="multipart/form-data">
                                <label className="cover-label">Language</label>
                                <Dropdown placeholder='Select Language' fluid search
                                    error={errors.language ? true : false}
                                    value={language}
                                    selection
                                    options={languages}
                                    onChange={(event, data) => { this.setState({ language: data.value }) }} />
                                    {errors.language && <InlineError text={errors.language} />}
                                <label className="cover-label">Course Name</label>
                              
                                <Form.Field id='form-textarea-control-opinion'
                                    error={errors.courseName ? true : false}
                                    value={courseName}
                                    control={Input}
                                    placeholder='Course Name'
                                    onChange={(event, data) => { this.setState({ courseName: data.value }) }}
                                />
                                {errors.courseName && <InlineError text={errors.courseName} />}
                                <label className="cover-label">Title</label>
                                <Form.Field id='form-textarea-control-opinion'
                                    error={errors.title ? true : false}
                                    value={title}
                                    control={Input}
                                    placeholder='Title'
                                    onChange={(event, data) => { this.setState({ title: data.value }) }}
                                />
                                {errors.title && <InlineError text={errors.title} />}
                                <label className="cover-label">Content</label>
                                <Form.Field id='form-textarea-control-opinion'
                                    error={errors.content ? true : false}
                                    value={content}
                                    control={TextArea}
                                    placeholder='Content'
                                    onChange={(event, data) => { this.setState({ content: data.value }) }}
                                />
                                {errors.content && <InlineError text={errors.content} />}
                                <div className="row justify-content-between">
                                    <div className="col-md-3">
                                        <label className="cover-label" htmlFor="">Icon course</label>
                                        <Dropzone className="icon-preview" onDrop={this.onDropIcon} style={{
                                            backgroundImage: `url(${iconPreview.preview})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: '100% 100%',
                                            zIndex: '1',
                                            align: "center",
                                            name: "icon"
                                        }} />
                                        {errors.previewIcon && <InlineError text={errors.previewIcon} />}
                                    </div>
                                    <div className="col-md-5">
                                        <label className="cover-label float-left">Image Course</label><br/><br/>
                                        <Dropzone className="image-course-preview float-left" onDrop={this.onDropImage} style={{
                                            backgroundImage: `url(${imagePreview.preview})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: '100% 100%',
                                            zIndex: '1',
                                            align: "center"
                                        }} /><br/>
                                        {errors.previewImage && <InlineError text={errors.previewImage} />}
                                    </div>
                                </div>


                                <label className="cover-label">Section</label>
                                <ListSection listSection={sections}
                                    onChangeSection={this.onChangeSection}
                                    onAddSection={this.onAddSection}
                                    onRemoveSection={this.onRemoveSection}
                                    onAddLecture={this.onAddLecture}
                                    onDispatchIdModal={this.onDispatchIdModal}
                                    onAddMoreLecture={this.onAddMoreLecture}
                                    onEditLecture={this.onEditLecture}
                                    lectureEdit={lectureEdit}
                                    onDeleteLecture={this.onDeleteLecture}
                                />
                                <label className="cover-label">Start at</label>
                                <Input fluid
                                    error={errors.start_at ? true : false}
                                    type="date"
                                    onChange={e => this.setState({
                                        start_at: e.target.value
                                    })}
                                    value={moment(start_at).format("YYYY-MM-DD")}
                                />
                                {errors.start_at && <InlineError text={errors.start_at} />}
                                <label className="cover-label">Deadline</label>
                                <Input fluid placeholder='22/10/2018'
                                    error={errors.deadline ? true : false}
                                    type="date"
                                    onChange={e => this.setState({
                                        deadline: e.target.value
                                    })}
                                    value={moment(deadline).format("YYYY-MM-DD")}
                                />
                                {errors.deadline && <InlineError text={errors.deadline} />}
                                <div className="cover-action-btn">
                                    <Link to="/admin/course">
                                        <Button className="float-right cover-btn-cancel" >Cancel</Button>
                                    </Link>
                                    <Button className="float-right cover-btn-save" onClick={this.handleSubmit}>Save</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(null, { addFlashMessage })(FormCourse);
