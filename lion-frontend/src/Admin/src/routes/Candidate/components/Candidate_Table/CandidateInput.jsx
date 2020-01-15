import React, { Component } from 'react';

class CandidateInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInput: false,
            value: props.note
        }
        this.editTodo = this.editTodo.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
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
    componentDidUpdate() {
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
    }
    render() {
        const { showInput } = this.state;
        const { showHandleInput } = this.props;
        return (
            <div
                onDoubleClick={_ => {
                    if (!showInput) {
                        this.setState({ showInput: !showInput })
                        showHandleInput(false)
                    }
                }}
                onMouseOver={_ => showHandleInput(false)}
                onMouseOut={_ => showHandleInput(true)}
                onMouseLeave={_ => showHandleInput(true)}
                style={{ width: 110, height: '100%', minHeight: 23 }}>
                {
                    showInput ?
                        <input
                            value={this.state.value}
                            ref={(input) => { this.nameInput = input; }}
                            style={{
                                width: '100%', height: 23,
                                display: this.state.showInput ? 'block' : 'none',
                            }}
                            onChange={e => this.setState({ value: e.target.value })}
                        />
                        :
                        <div
                            style={{
                                width: '100%', height: 23,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                            {this.state.value}
                        </div>
                }
            </div >
        )
    }
}

export default CandidateInput;