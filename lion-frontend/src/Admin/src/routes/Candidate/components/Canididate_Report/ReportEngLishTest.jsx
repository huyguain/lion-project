import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import config from '../../../../../../config';

const ReportEnglishTest = props => {

    const { questions, result, point, formatText, getAnswerCorrect, getChecked, getAnswerPart4, urlImg } = props;
    console.log(questions);
    return (
        <div className="col-md-10">
            <div className="cover-title-0">Test Endlish DetailL</div>
            <div className="float-right" style={{ marginTop: "-20px", fontFamily: 'Lato-Bold' }}>{`Result: ${result}`}<br />{`Point: ${point}/${questions.length}`}</div>
            <div className="cover-line-blue"></div>
            {
                [
                    'Part 1: Choose the best response to each sentence',
                    'Part 2: Choose the correct sentence',
                    'Part 3: Read the passage and choose the correct answer',
                    'Part 4: Writing Section'
                ].map((item, index) => (
                    <div className="stylePart" key={Math.random() + index}>
                        <p style={{ marginBottom: 24 }}>{item}</p>
                        {
                            index === 2 &&
                            <div
                                style={{
                                    fontSize: '20px',
                                    fontWeight: `bold`,
                                    marginRight: `12%`,
                                    marginTop: `20px`,
                                    paddingTop: `30px`,
                                    borderTop: `dashed 1px #cccccc`,
                                }}
                            >

                                <div style={{
                                    display: `flex`,
                                    alignItems: `center`,
                                    justifyContent: `center`,
                                    marginTop: `20px`,
                                    marginBottom: `5px`,
                                }}>
                                    <img src={`${config.imageUrl}/${urlImg.urlImg1}`} alt="" />
                                </div>
                                <div style={{
                                    display: `flex`,
                                    alignItems: `center`,
                                    justifyContent: `center`,
                                    marginTop: `20px`,
                                    marginBottom: `5px`,
                                }}>
                                    <img src={`${config.imageUrl}/${urlImg.urlImg2}`} alt="" />
                                </div>
                            </div>
                        }
                        {
                            questions.filter(item => item.partNumber === (index + 1)).map((question, index) => {
                                return (
                                    <div className="wrap-question-test">
                                        <div className="question-test">
                                            {formatText(`${index + 1}. ${question.partNumber !== 2 ? question.questions : ''}`)}
                                        </div>
                                        {
                                            question.partNumber !== 4 ?
                                                <ul style={{ listStyleType: "none" }}>
                                                    {
                                                        Object.entries(question.options).map((option, index) => {
                                                            if (!option[1]) {
                                                                return
                                                            }
                                                            return (
                                                                <li key={index} style={getAnswerCorrect(question.correct, option[0]) ? { background: "yellow" } : { background: "none" }}>
                                                                    <Checkbox className=" item-answer" readOnly label={formatText(option[1])} checked={getChecked(question._id, option[0])} radio={question.multi ? false : true} />
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                                : <textarea
                                                    className='styleResultFour'
                                                    disabled={true}
                                                    rows={6}
                                                    value={getAnswerPart4()}
                                                />
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }

        </div>
    )
}

export default ReportEnglishTest;