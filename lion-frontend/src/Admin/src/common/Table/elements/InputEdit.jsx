import React, { Component } from 'react';
import moment from 'moment';

class InputEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInput: false,
            value: props.value
        }
        this.editTodo = this.editTodo.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.onShowIputEdit = this.onShowIputEdit.bind(this);
    }
    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.nameInput.blur();
        }
    }
    editTodo() {
        const { updateData } = this.props;
        this.setState({ showInput: false })
        updateData(this.state.value);
    }
    onShowIputEdit() {
        const { showInput } = this.state;
        const { showHandleInput } = this.props;
        if (!showInput) {
            this.setState({ showInput: !showInput })
            showHandleInput(false)
        }
    }
    getDate(date) {
        if (date === '') return '';
        const form = date.split("/");
        const dt = new Date(form[2], form[0] - 1, form[1]);
        return moment(dt).format("YYYY-MM-DD");
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.showInput) {
            this.nameInput.onfocus = (e => {
                const temp_value = e.target.value
                e.target.value = ''
                e.target.value = temp_value
            });
            this.nameInput.focus();
            this.nameInput.onblur = this.editTodo;
            this.nameInput.onkeypress = this.handleKeyPress;
        }
        else if (this.props.id !== prevProps.id) {
            this.setState({ value: this.props.value });
        } 
    }
    render() {
        const { showHandleInput, type, id } = this.props;
        const { showInput } = this.state;
        return (
            <div className={'columnInputEdit'}
                onDoubleClick={this.onShowIputEdit}
                onMouseOver={_ => showHandleInput(false)}
                onMouseOut={_ => showHandleInput(true)}
                onMouseLeave={_ => showHandleInput(true)}>
                {
                    showInput ?
                        <input
                            id={id}
                            type={type}
                            value={this.state.value ? this.state.value : ''}
                            ref={(input) => { this.nameInput = input; }}
                            className={'columnShowInputEdit'}
                            value={type === 'date' ?
                                this.getDate(this.state.value) : this.state.value}
                            onChange={event => {
                                const value = type === 'date' ?
                                    moment(event.target.value).format("MM/DD/YYYY") === 'Invalid date' ?
                                        '' : moment(event.target.value).format("MM/DD/YYYY")
                                    : event.target.value;
                                this.setState({ value });
                            }}
                        />
                        :
                        <div className={'columnShowEdit'}>
                            {this.state.value}
                        </div>
                }
            </div>
        )
    }
}

export default InputEdit;