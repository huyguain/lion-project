import React from 'react';
import * as stylePart from '../../../styleCss/styleCss.js';
import { connect } from 'react-redux';
import PrintQuestionEnglish from '../../../PrintQuestionEnglish/PrintQuestionEnglish.jsx';

const PartOne = props => {
    return (
        <div
            className="part-one"
            style={stylePart.stylePart}
        >Part 1: Choose the best response to each sentence
                <PrintQuestionEnglish part={`partOne`} language={`English`} question={props.question} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        question: state.TestDetail.get("dataQuestion").listQuestion[0]
    }
}

export default connect(mapStateToProps, null)(PartOne);