import React, { Component } from 'react';
import './Modal.css';
const Modal = props => {

    const handleClose = () => {
        props.closeModal()
    }
    let styleOpenModal = {
        display: `block`
    }
    let styleCloseModal = {
        display: `none`
    }
    return (
        <div className="body-modal" style={props.isOpen ? styleOpenModal : styleCloseModal}>
            <div className="body-d" >
                <form className="b-d-form">
                    <div className="message-d">
                        {props.message}
                    </div>
                    <button
                        className="button-d"
                        onClick={handleClose}
                    >Ok</button>
                </form>
            </div>
        </div>

    )
}

export default Modal;