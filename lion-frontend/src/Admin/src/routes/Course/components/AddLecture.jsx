import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
// import ModalAddLecture from './ModalAddLecture';
class AddLecture extends Component {
    constructor(props) {
        super(props);
        this.dispatchIdModal = this.dispatchIdModal.bind(this);
        this.addMoreLecture = this.addMoreLecture.bind(this);
    }
    dispatchIdModal(idSection) {
        this.props.dispatchIdModal(idSection)
    }
    addMoreLecture(lecture) {
        this.props.addMoreLecture(lecture)
    }
    render() {
        const { idSection, lectureEdit } = this.props;
        return (
            <div>
                {/* <ModalAddLecture addMoreLecture={ this.addMoreLecture }
                lecture={lectureEdit}/> */}
                <Icon name="plus" size="large"
                    data-toggle="modal"
                    data-target="#add-lecture"
                    onClick={() => this.dispatchIdModal(idSection)}
                    style={{ marginBottom: '10px' }}
                />
            </div>

        )
    }
}
export default AddLecture;