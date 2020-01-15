import React from 'react';
import * as stylePart from '../../../styleCss/styleCss.js';
import { connect } from 'react-redux';
import PrintQuestionEnglish from '../../../PrintQuestionEnglish/PrintQuestionEnglish.jsx';
import config from '../../../../../../../../config';

const PartThree = props => {
    let { urlImg } = props;
    return (
        <div>
            <div style={stylePart.stylePart}>Part 3: Read the passage and choose the correct answer
                <div style={stylePart.styleImgQuestionEnglish}>
                    <img src={`${config.imageUrl}/${urlImg.urlImg1}`} alt="" />
                </div>
                <div style={stylePart.styleImgQuestionEnglish}>
                    <img src={`${config.imageUrl}/${urlImg.urlImg2}`} alt="" />
                </div>
                <PrintQuestionEnglish part={`partThree`} language={`English`} question={props.question} />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        question: state.TestDetail.get("dataQuestion").listQuestion[2],
        urlImg: state.TestDetail.get("dataQuestion").urlImg
    }
}

export default connect(mapStateToProps, null)(PartThree);