import React, { Component } from 'react';
import ItemLecture from './ItemLecture';
import { List } from 'semantic-ui-react';
class ListLecture extends Component {
    constructor(props) {
        super(props);
        this.editLecture = this.editLecture.bind(this);
        this.deleteLecture = this.deleteLecture.bind(this);
    }
    editLecture(idSection, idLecture) {
        this.props.editLecture(idSection, idLecture)
    }
    deleteLecture(idSection, idLecture) {
        this.props.deleteLecture(idSection, idLecture)
    }
    render() {
        const { idSection, lectureEdit } = this.props;
        return (
            <List divided verticalAlign='middle' className="listSection">
                {
                    this.props.listLecture.map((lecture, index) => {
                        return (
                            <ItemLecture 
                            lecture={lecture} 
                            index={index} 
                            idSection={idSection}
                            editLecture={this.editLecture}
                            deleteLecture={this.deleteLecture}
                            />
                        )
                    })
                }
            </List>
        )
    }
}
export default ListLecture;