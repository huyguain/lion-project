import React from 'react';
import { connect } from 'react-redux';
import PrintQuestion from '../PrintQuestionEnglish/PrintQuestionEnglish.jsx';
const EntryTest = props => {
    let listQuestion = props.question.listQuestion || []
    return (
        <div className="english-test" id="style-scroll-englishTest">
            <PrintQuestion question={listQuestion} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        question: state.TestDetail.get("dataQuestion")
    }
}
export default connect(mapStateToProps, null)(EntryTest);