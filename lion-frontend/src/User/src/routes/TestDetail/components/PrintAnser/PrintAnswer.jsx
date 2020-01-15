import React from 'react';
import * as style from '../styleCss/styleCss.js';
import { connect } from 'react-redux';
import { updateAnswer } from '../../../../../../actions/index.js';
const PrintAnswer = props => {
    const handleChecked = (id, key) => {
        if (props.listAnswer.length) {
            if (!props.listAnswer.some(obj => obj.id === id)) {
                return false
            } else {
                return props.listAnswer.filter(obj => obj.id === id)[0].answers.some(item => item === key)
            }
        } else return false
    }
    let { answers } = props
    if (answers) {
        let answerReverse = {};
        Object.keys(answers).sort().forEach(key => {
            answerReverse[key] = answers[key];
        });

        return (
            <div style={props.part === `partTwo`?{}:style.answer}>
                {
                    Object.entries(answerReverse).map(arr => {
                        
                        return (
                            <div style={style.answerBody} key={Math.random()}>
                                <input
                                    style={style.inputAnswer}
                                    type={props.multi ? "checkbox" : "radio"}
                                    value={arr[1]}
                                    onClick={_ => props.updateAnswer(props.id, arr[0], props.multi)}
                                    checked={handleChecked(props.id, arr[0])}
                                />
                                <label
                                    style={style.labelAnswer}
                                    onClick={_ => props.updateAnswer(props.id, arr[0], props.multi)}
                                > {props.formatText(arr[1])}</label>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        listAnswer: state.TestDetail.get("listAnswer")
    }
}

export default connect(mapStateToProps, { updateAnswer })(PrintAnswer);