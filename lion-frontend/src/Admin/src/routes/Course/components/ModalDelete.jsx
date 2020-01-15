import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Modal extends Component {
    render() {
        const { displayDialog, closeDialog, dataDiaLog } = this.props;
        return (
            <div className="modal" tabIndex="-1" role="dialog"
                style={{ display: displayDialog ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'end'
                        }}>
                            <h5 className="modal-title" style={{ width: '100%' }}>{dataDiaLog.title}</h5>
                            <button type="button" className="close"
                                onClick={_ => closeDialog()}
                                data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{dataDiaLog.content}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={_ => dataDiaLog.onsubmit(dataDiaLog.item)}
                                className="btn btn-primary">Ok</button>
                            <button type="button" className="btn btn-secondary"
                                onClick={_ => closeDialog()}
                                data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Modal.propTypes = {
    displayDialog: PropTypes.string,
    closeDialog: PropTypes.func
}

export default Modal;