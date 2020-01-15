import React, { Component } from 'react';
import ItemSection from './ItemSection';

class ListSection extends Component {
    constructor(props) {
        super(props);
        this.changeSectionName = this.changeSectionName.bind(this);
        this.addSection = this.addSection.bind(this);
        this.removeSection = this.removeSection.bind(this);
        this.dispatchIdModal = this.dispatchIdModal.bind(this);
        this.addMoreLecture = this.addMoreLecture.bind(this);
        this.editLecture = this.editLecture.bind(this);
        this.deleteLecture = this.deleteLecture.bind(this);
    }
    changeSectionName(id, sectionName) {
        this.props.onChangeSection(id, sectionName);
    }
    addSection() {
        this.props.onAddSection();
    }
    removeSection(id) {
        this.props.onRemoveSection(id)
    }
    dispatchIdModal(idSection) {
        this.props.onDispatchIdModal(idSection)
    }
    addMoreLecture(lecture) {
        this.props.onAddMoreLecture(lecture)
    }
    editLecture(idSection, idLecture) {
        this.props.onEditLecture(idSection, idLecture);
    }
    deleteLecture(idSection, idLecture) {
        this.props.onDeleteLecture(idSection, idLecture);
    }
    render() {
        return (
            this.props.listSection.map((section, index) => {
                return (
                    <ItemSection section={section} 
                    changeSectionName={this.changeSectionName}
                    addSection={this.addSection}
                    removeSection={this.removeSection}
                    dispatchIdModal={this.dispatchIdModal}
                    addMoreLecture={this.addMoreLecture}
                    editLecture={this.editLecture}
                    lectureEdit={this.props.lectureEdit}
                    deleteLecture = {this.deleteLecture}
                    />
                )
            })
        )
    }
}

export default ListSection;