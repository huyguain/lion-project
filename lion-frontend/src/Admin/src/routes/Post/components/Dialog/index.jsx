import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Visibility from "material-ui-icons/Visibility";
import './Dialog.css';
export default class DialogExampleSimple extends React.Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const actions = [
            <FlatButton
                className="button"
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />
        ];
        const { content, label } = this.props;
        return (
            <div className="post-dialog">
                <FlatButton hoverColor='none' icon={<Visibility />} onClick={this.handleOpen} />
                <Dialog
                    title={label}
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    {content}
                </Dialog>
            </div>
        );
    }
}