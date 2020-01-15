import React, { Component } from 'react';
import * as stylePart from '../../../styleCss/styleCss.js';
import { connect } from 'react-redux';
import PrintQuestionEnglish from '../../../PrintQuestionEnglish/PrintQuestionEnglish.jsx';
import Modal from '../../../../Modal/Modal.jsx'
class PartFour extends Component {
    constructor(props) {
        super(props)
        this.state = {
            valueTextarea: '',
            isOpenModal: "",
            messageModal: "",
        }
    }

    componentDidMount() {
        if (localStorage.getItem(`answerE${this.props.time}`)) {
            this.setState({ valueTextarea: localStorage.getItem(`answerE${this.props.time}`) })
        }
    }

    countChar = text => {
        let _text = text.split(" ");
        let count = 0;
        for (let i in _text) {
            if (_text[i] !== "") {
                count += 1;
            }
        }
        return count;
    }

    checkLengthTextarea = text => {
        if (text.length >= 1000) {
            return {
                status: false,
                message: `You wrote it such a long letter`
            }
        } else if (this.countChar(text) >= 50) {
            return {
                status : false,
                message : `Please write in 50 words or less`
            }
        }
        return {
            status: true
        }
    }

    hangleOnchange = (e) => {
        let checkLengthTextarea = this.checkLengthTextarea(e.target.value)
        if (checkLengthTextarea.status) {
            this.setState({ valueTextarea: e.target.value })
            localStorage.setItem(`answerE${this.props.time}`, e.target.value)
        } else {
            this.setState({ isOpenModal: true, messageModal: checkLengthTextarea.message })
        }

    }

    closeModal = () => {
        this.setState({ isOpenModal: false })
    }

    render() {
        let { questionPartFour } = this.props
        return (
            <div>
                {
                    this.state.isOpenModal ?
                        <Modal
                            isOpen={this.state.isOpenModal}
                            message={this.state.messageModal}
                            closeModal={this.closeModal}
                        /> :
                        <div></div>
                }

                <div style={stylePart.stylePart}>Part 4: Writing Section
                    <div style={stylePart.stylePartFour}>
                        <label style={stylePart.styleQuestionPartFour}>{questionPartFour[0].title}</label>
                        <textarea
                            style={stylePart.styleTextareaPartFour}
                            type="text"
                            onChange={e => this.hangleOnchange(e)}
                            value={this.state.valueTextarea}
                        >
                        </textarea>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        questionPartFour: state.TestDetail.get("dataQuestion").listQuestion[3],
        time: state.TestDetail.get("dataQuestion").time
    }
}

export default connect(mapStateToProps, null)(PartFour);