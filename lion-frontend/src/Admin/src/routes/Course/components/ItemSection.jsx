import React, { Component } from 'react';
import { Button, Form, Input, Select, Dropdown, Icon, List, TextArea } from 'semantic-ui-react';
import ListLecture from './ListLecture';
import AddLecture from './AddLecture';
class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionName: "",
            id: Math.random()
        }
        this.addSection = this.addSection.bind(this);
        this.changeSectionName = this.changeSectionName.bind(this);
        this.removeSection = this.removeSection.bind(this);
        this.dispatchIdModal = this.dispatchIdModal.bind(this);
        this.addMoreLecture = this.addMoreLecture.bind(this);
        this.editLecture = this.editLecture.bind(this);
        this.deleteLecture = this.deleteLecture.bind(this);
    }
    addSection() {
       this.props.addSection();
    }
    changeSectionName(id, sectionName) {
        this.props.changeSectionName(id, sectionName)
    }
    removeSection(id) {
        this.props.removeSection(id);
    }
    dispatchIdModal(idSection) {
        this.props.dispatchIdModal(idSection);
    }
    addMoreLecture(lecture) {
        this.props.addMoreLecture(lecture)
    }
    editLecture(idSection, idlecture) {
        this.props.editLecture(idSection, idlecture);
    }
    deleteLecture(idSection, idlecture) {
        this.props.deleteLecture(idSection, idlecture)
    }
    render() {
        const { lectures, id, section } = this.props.section;
        const { lectureEdit } = this.props;
        console.log("555", this.props.section)
        return (
            <div>
                <Form.Group widths='equal'>
                    <Form.Field id='form-textarea-control-opinion'
                        value={section} 
                        control={Input}
                        placeholder='Section'
                        onChange={(event, data) => this.changeSectionName(id, data.value)}
                        width={1}
                    />
                    <Button icon className="btn-add-lecture" onClick={this.addSection}>
                        <Icon name="add" size="large" />
                    </Button>
                    <Button icon className="btn-cancel-lecture" 
                        onClick={() => this.removeSection(id)}
                    >
                        <Icon name="cancel" size="large" />
                    </Button>
                </Form.Group>
                <ListLecture listLecture={lectures}
                idSection={id} 
                editLecture = {this.editLecture}
                deleteLecture={this.deleteLecture}
               
                />
                <AddLecture idSection={id} 
                dispatchIdModal={this.dispatchIdModal}
                addMoreLecture={this.addMoreLecture}
                lectureEdit = { lectureEdit }/>
            </div>

        )
    }
}
export default Section;