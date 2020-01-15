import React, { Component } from 'react';
import { Button, Form, Input, Select, Dropdown, Icon, List, TextArea } from 'semantic-ui-react';
class ItemLecture extends Component {  
    constructor(props) {
        super(props);
        this.editLecture = this.editLecture.bind(this);
        this.deleteLecture = this.deleteLecture.bind(this);
    }
    editLecture(idSection, idLecture) {
        this.props.editLecture(idSection, idLecture);
    }
    deleteLecture(idSection, idLecture) {
        this.props.deleteLecture(idSection, idLecture)
    }
    render() {
        const { lecture, index, idSection } = this.props;
        console.log("2323", this.props)
        return (
            <List.Item className={(index + 1) % 2 === 0 ? "oddItem" : "evenItem"}>
                <List.Content floated='right'>
                    <Icon name="trash" className="float-right" size="large"
                        onClick={() => this.deleteLecture(idSection, lecture.id)}
                        />
                </List.Content>
                <List.Content floated='right'>
                    <Icon name="pencil"
                        data-toggle="modal"
                        data-target="#add-lecture"
                        className="float-right"
                        size="large"
                        onClick={() => this.editLecture(idSection, lecture.id)}
                         />
                </List.Content>
                <List.Content>
                    <span>
                        <Icon name={lecture.type === "video" ?
                            "caret right" : "question circle"}
                            size="large"
                        />
                        {lecture.title ? lecture.title : "quiz"}
                    </span>
                </List.Content>
            </List.Item>
        )
    }
}
export default ItemLecture;