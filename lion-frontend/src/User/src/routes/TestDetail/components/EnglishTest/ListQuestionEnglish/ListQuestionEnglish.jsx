import React from 'react';
import './ListQuestionEnglish.css';
import PartOne from '../PartQuestion/PartOne/PartOne.jsx';
import PartTwo from '../PartQuestion/PartTwo/PartTwo.jsx';
import PartThree from '../PartQuestion/PartThree/PartThree.jsx';
import PartFour from '../PartQuestion/PartFour/PartFour.jsx';

const QuestionEnglish = props => {
    return (
        <div className="english-test" id="style-scroll-englishTest">
            <PartOne />
            <PartTwo />
            <PartThree />
            <PartFour />
        </div>
    )
}


export default QuestionEnglish;