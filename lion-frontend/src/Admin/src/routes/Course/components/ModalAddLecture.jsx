import React, { Component } from 'react';
import { Button, Form, Input, Dropdown } from 'semantic-ui-react';
import InlineError from "../../../components/InlineError";
const typeLectures = [{
    value: "video",
    text: "Video"
},
{
    value: "quiz",
    text: "Quiz"
}
]
export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: Math.random(),
            type: "video",
            urlVideo: "",
            title: "",
            numberQuestion: "",
            duration: "",
            passScore: "",
            errors: {}
        }
        this.addMoreLecture = this.addMoreLecture.bind(this);
    }
    validate = () => {
        const { type, urlVideo, title, numberQuestion, duration, passScore } = this.state;
        const errors = {};
        if(!duration) errors.duration = "Can't be blank";
        if(type === "video") {
            if(!urlVideo) errors.urlVideo = "Can't be blank";
            if(!title) errors.title = "Can't be blank";
        } else {
            if(!numberQuestion) errors.numberQuestion = "Can't be blank";
            if(!passScore) errors.passScore = "Can't be blank";
        }
        return errors;
    }
    componentDidUpdate(prevProps, prevState) {
        const { lecture } = this.props;  
        if(lecture !== prevProps.lecture) {
            this.setState({
                id: lecture.id,
                type: lecture.type,
                urlVideo: lecture.urlVideo,
                title: lecture.title,
                numberQuestion: lecture.numberQuestion,
                duration: lecture.duration,
                passScore: lecture.passScore
            })
        }
    }
    addMoreLecture() {
        const errors = this.validate();
        this.setState({errors})
        if(Object.keys(errors).length === 0) {
            this.props.addMoreLecture(this.state);
            this.setState({
                id: Math.random(),
                urlVideo: "",
                title: "",
                numberQuestion: "",
                duration: "",
                passScore: ""
            })
        }
    }
    render() {
        const { type, errors } = this.state;
        return (
            <div class="modal fade" id="add-lecture" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header" id="modal-header-lecture">
                            <h5 class="modal-title" id="exampleModalLabel">ADD LECTURE</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <Form>
                                            <Dropdown placeholder='Select type' fluid selection
                                             
                                                value={this.state.type}
                                                options={typeLectures}
                                                onChange={(event, data) => { this.setState({ type: data.value }) }} />
                                            <div className={type === "video" ? "show-input" : "hide-input"}>
                                                <label className="cover-label">URI</label>
                                                <Form.Field
                                                    error = {errors.urlVideo ? true : false} 
                                                    value={this.state.urlVideo}
                                                    control={Input}
                                                    placeholder='Path video'
                                                    onChange={(event, data) => { this.setState({ urlVideo: data.value }) }}
                                                />
                                                {errors.urlVideo && <InlineError text={errors.urlVideo} />}
                                            </div>
                                            <div className={type === "video" ? "show-input" : "hide-input"}>
                                                <label className="cover-label">Title</label>
                                                <Form.Field
                                                    error = {errors.title ? true : false} 
                                                    value={this.state.title}
                                                    control={Input}
                                                    placeholder='Title'
                                                    onChange={(event, data) => { this.setState({ title: data.value }) }}
                                                />
                                                {errors.title && <InlineError text={errors.title} />}
                                            </div>
                                            <div className={type === "quiz" ? "show-input" : "hide-input"}>
                                                <label className="cover-label">Number of Questions</label>
                                                <Form.Field
                                                    error = {errors.numberQuestion ? true : false} 
                                                    value={this.state.numberQuestion}
                                                    control={Input}
                                                    placeholder='Number of Questions'
                                                    onChange={(event, data) => { this.setState({ numberQuestion: data.value }) }}
                                                />
                                                {errors.numberQuestion && <InlineError text={errors.numberQuestion} />}
                                            </div>
                                            <div className={type ? "show-input" : "hide-input"}>
                                                <label className="cover-label" htmlFor="">Duration</label>
                                                <Form.Field 
                                                    error = {errors.duration ? true : false}
                                                    value={this.state.duration}
                                                    control={Input}
                                                    placeholder="Duration"
                                                    onChange={(event, data) => { this.setState({ duration: data.value }) }}
                                                />
                                                {errors.duration && <InlineError text={errors.duration} />}
                                            </div>
                                            <div className={type === "quiz" ? "show-input" : "hide-input"}>
                                                <label className="cover-label" htmlFor="">Pass Score</label>
                                                <Form.Field 
                                                    error = {errors.passScore ? true : false}
                                                    value={this.state.passScore}
                                                    control={Input}
                                                    placeholder="Pass Score"
                                                    onChange={(event, data) => { this.setState({ passScore: data.value }) }}
                                                />
                                                {errors.passScore && <InlineError text={errors.passScore} />}
                                            </div>
                                            <div className={type ? "cover-action-btn show-input" : "hide-input"}>
                                                <Button 
                                                    className="float-right cover-btn-cancel"
                                                    content="Cancel"
                                                    data-dismiss="modal"
                                                />
                                                <Button 
                                                    className="float-right cover-btn-create"
                                                    content ={'Save & Add More'}
                                                    onClick = {this.addMoreLecture}
                                                />
                                                <Button 
                                                    className="float-right cover-btn-save"
                                                    content={`Save & Close`}
                                                    onClick = {this.addMoreLecture}
                                                    data-dismiss="modal"
                                                />
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}