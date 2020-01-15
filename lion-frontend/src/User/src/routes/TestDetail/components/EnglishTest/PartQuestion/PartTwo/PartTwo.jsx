import React from 'react';
import * as stylePart from '../../../styleCss/styleCss.js';
import { connect } from 'react-redux';
import PrintQuestionEnglish from '../../../PrintQuestionEnglish/PrintQuestionEnglish.jsx';

const PartTwo = props => {
    return (
        <div>
            <div style={stylePart.stylePart}>Part 2: Choose the correct sentence
                <PrintQuestionEnglish part={`partTwo`} language={`English`} question={props.question}/>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        question: state.TestDetail.get("dataQuestion").listQuestion[1]
    }
}

export default connect(mapStateToProps, null)(PartTwo);