import React, { Component } from 'react';
import PropTypes from 'prop-types'
class FlashMessage extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        this.props.deleteFlashMessage(this.props.message.id);
    }
    render() {
        const { id, type, text } = this.props.message;
        return (
            <div className={type==="success" ? "alert alert-success alert-dismissible" : 
            "alert alert-danger alert-dismissible"}>
             <button type="button" onClick={this.onClick} class="close">&times;</button>
                { text }
            </div>
        )
    }
}
FlashMessage.propsTypes = {
    message: PropTypes.object.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired
}

export default FlashMessage;