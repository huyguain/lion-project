import React, { Component } from 'react';

class ModalTemplate extends Component {
    handleOnClick = e => {
        if (e.target.id === `modal-delete`) {
            this.props.closeModal();
        }
    }
    render() {
        return (
            <div
                className="modal-delete"
                id={`modal-delete`}
                style={{ display: `${this.props.display}` }}
                onClick={e => this.handleOnClick(e)}
            >
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>Do you want to delete?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                onClick={() => this.props.closeModal()}>Close</button>
                            <button type="button" class="btn btn-primary"
                                onClick={_ => this.props.submitDelete(this.props.idQuestion)}>Submit</button>                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ModalTemplate;