import React from 'react';
import moment from 'moment';
export default ({ sectionName, point, infoQuiz, onTryAgain, timeSpent, percent }) => {
    const time = moment.utc(timeSpent).format('mm:ss');
    return (
        <div>
            <div className="row justify-content-center" style={{ background: "#fff" }}>
                <div className="col-md-7 container-quiz">
                    <div className="main-leader-board"></div>
                    <h1 className="quiz-title">{sectionName}</h1>
                    <div className="quiz-light-grey">
                        <center>
                            <h2>Result:</h2>
                            {`${point}/${infoQuiz.numberQuestion}`}
                            <p><b>{ percent }</b></p>
                            <p><b>Time Spent:</b><br />{time}</p>
                        </center>
                        <button className="quiz-button">Check Your Answers</button>
                        <button className="quiz-button float-right" onClick={onTryAgain}>Try Again</button>
                    </div>
                    <div className="main-bottom-board"></div>
                </div>
            </div>
        </div>
    )
}