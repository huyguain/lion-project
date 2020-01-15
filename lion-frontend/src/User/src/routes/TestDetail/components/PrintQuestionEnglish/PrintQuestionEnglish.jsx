import React from 'react';
import PrintAnswer from '../PrintAnser/PrintAnswer.jsx';
import * as style from '../styleCss/styleCss.js';
const PrintQuestion = props => {
    let { question } = props;
    const formatText = (text) => {
        if (text) {
            let _text = text.split(`<`).join(`&lsaquo;`).split(`>`).join(`&rsaquo;`).split(`'`).join(`&Prime;;`)
            // let _text1 = _text.split(`>`).join(`&rsaquo;`)
            // let _text2 = _text1.split(`'`).join(`&Prime;;`)
            return (
                _text.split("\n").map(value => {
                    return (
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: value.split(" ").join('&nbsp') }} />
                        </div>
                    )
                })
            )
        }
    }

    const checkQuestion = part => {
        if (part) {
            if (part === "partOne") {
                return 0;
            } else if (part === "partTwo") {
                return 10;
            } else if (part === `partThree`) {
                return 15
            }
        } else return 0;
    }

    let stylePartTwo = {
        marginTop: `20px`,
        fontSize: `18px`,
        fontFamily: `SFUIDisplay-Light`,
        fontWeight: `300`,
        display: `flex`,        
    }
    let stylePTLabel = {
        marginTop : `5px`
    }
    return (
        <div
            className="part-question"
            style={props.language === `English` ? style.partQuestionE : {}}
        >
            {question.map((obj, index) => {
                return (
                    <div
                        key={Math.random()}
                        style={props.language === `English` ? 
                        props.part===`partTwo`?stylePartTwo:style.styleQuestionEnglish : 
                        style.styleQuestionEntryTest}
                    >
                        <div 
                            style={{ 
                                display: `flex`, 
                                flexDirection: `${props.language === `English` ? `` : `column`}`,
                                marginTop : props.part===`partTwo`?`5px`:``
                            }}    
                        >
                            {
                                props.language === `English` ?
                                    <label>{checkQuestion(props.part) + index + 1}. </label> :
                                    <label style={style.styleIntQ}><label style={style._styleQI}></label>{`Question ${index + 1}`}. </label>}
                            <label style={props.language === `English` ? style.labelQuestion : style.styleQuestions}>{formatText(obj.title)}</label>
                        </div>
                        <PrintAnswer
                            part={props.part}
                            answers={obj.options}
                            multi={obj.multi}
                            id={obj.id}
                            formatText={formatText}
                            essay={obj.essay ? obj.essay : false}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default PrintQuestion;