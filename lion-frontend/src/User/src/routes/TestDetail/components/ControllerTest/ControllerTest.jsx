import React from 'react'
import { connect } from "react-redux";
import EnglistTest from '../EnglishTest/ListQuestionEnglish/ListQuestionEnglish.jsx';
import EntryTest from '../EntryTest/EntryTest.jsx';

const ControllerTest = props => {
    if(props.language === `English`) {
        return (
            <div>
                <EnglistTest/>
            </div>
        )
    } else return (
        <div>
            <EntryTest/>
        </div>
    )
}

export default ControllerTest;