import React, { Component } from 'react';
import './TestDetail.css'

class ModalFinish extends Component {
    handleOnClick = e => {
        if (e.target.id === `modal-delete`) {
            this.props.closeModal();
        }
    }

    handleListAnswerNotFinish = listAnswer => {
        if (listAnswer.length) {
            return (
                <div>
                    {`${listAnswer.length} question are not finished. Do you want to submit`}
                </div>
            )
        }
    }

    render() {
        let lengthAnswer = this.props.answerNotFinish.length
        let styleBody = {
            display: `flex`,
            justifyContent: `center`,
            fontSize: `18px`,
        }
        let styleHeader = {
            borderBottom: `none`,
        }
        let styleFooter = {
            borderTop: `none`,
            display: `flex`,
            justifyContent: `center`,
        }
        let styleButton = {
            fontSize: `18px`,
            fontFamily: `SFUIDisplay-Bold`,
        }
        return (
            <div
                className="modal-delete"
                id={`modal-delete`}
                style={{ display: `${this.props.display}` }}
                onClick={e => this.handleOnClick(e)}
            >
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header" style={styleHeader}>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div class="modal-body" style={styleBody}>
                            {
                                this.props.answerNotFinish.length ?
                                    <p>{`${lengthAnswer} question are not finished. Do you want to submit`}</p> :
                                    <p>Are you sure ?</p>
                            }
                        </div>
                        <div class="modal-footer" style={styleFooter}>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" style={styleButton}
                                onClick={() => this.props.closeModal()}>Cancel</button>
                            <button type="button" class="btn btn-primary" style={styleButton}
                                onClick={_ => this.props.handleSubmit()}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ModalFinish;