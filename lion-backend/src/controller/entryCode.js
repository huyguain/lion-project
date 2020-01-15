import {
    findCode, findEntryCode, updateEntryCode, endTestModel,
    finishTestModel, checkTest, editEntryCode,
    _getAllEntryCode, deleteEntryCodeModel,
    detailResultTest,
    _createEntryCode,
    _regenerate,
    _deleteEntryCode,
    endEnglishTestModel,
    getAllEnglishTestModel,
    countEnglishNotPointModel,
    getQuestionEssayEnglishTestModel,
    savePointEssayToDbModel
} from '../models/entryCode'
import {
    _getAllCandidate,
    _updateCandidate,
    _updateCandidatePull
} from '../models/candidate'
import { questionsRamdom, _questionsRamdom } from '../models/question'
import { addEntryCode } from '../models/entryCode'
import { getTestTemplate, _getAllTemplate, getTemplateDefaultEntry } from '../models/testTemplate'
import { generateToken, verifyToken } from '../lib/util'
import jwt from 'jsonwebtoken';
import config from '../config.js'
import moment from 'moment';
import { decode } from 'punycode';
import { send, sendApply } from '../lib/mailer';

//Get EntryCode
export const getAllEntryCode = async (req, res) => {
    try {
        let dataEntryCode = await _getAllEntryCode();
        if (dataEntryCode) {
            res.status(200).json({
                success: true,
                dataEntryCode
            })
        } else {
            throw (`Can't Get Entry Code !`)
        }
    } catch (err) {
        res.status(403).json({
            success: false,
            message: err
        })
    }
}
//getDataEntry
export const getDataEntry = async (req, res) => {
    try {
        let dataTemplate = await _getAllTemplate();
        if (!dataTemplate) {
            throw ('Template Not Existed Please Create Template !')
        } else {
            let dataCandidate = await _getAllCandidate();
            if (!dataCandidate) {
                throw ('Candidate Not Existed Please Create Candidate !')
            } else {
                res.status(200).json({
                    success: true,
                    dataCandidate,
                    dataTemplate
                })
            }
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err
        })
    }
}
//deleteEntryCode  
export const deleteEntryCode = async (req, res) => {
    try {
        const { idEntryCode, idCandidate } = req.params
        if (!idEntryCode || !idCandidate) {
            throw ('No Date !')
        } else {
            let checkEntry = await _deleteEntryCode(idEntryCode);
            if (!checkEntry) {
                throw (`Can't Delete Entry Code !`)
            } else {
                let dataCandidate = await _updateCandidatePull(idCandidate, idEntryCode);
                if (dataCandidate) {
                    res.status(204).end()
                } else {
                    throw (`Can't Update Entry Code !`)
                }
            }
        }
    } catch (err) {
        res.status(403).json({
            success: false,
            message: err
        })
    }

}
//createEntryCode
export const createEntryCode = async (req, res) => {
    try {
        const { candidateIds, deadline, testName, numberEasy, numberHard, numberMedium, language, templateId } = req.body.dataEntryCode;
        if (!candidateIds || !deadline || !testName || !language || !templateId) {
            throw ('No Data !')
        } else {
            for (const idCandi of candidateIds) {
                let random = async _ => Promise.all([
                    _questionsRamdom(language, 1, numberEasy),
                    _questionsRamdom(language, 2, numberMedium),
                    _questionsRamdom(language, 3, numberHard)
                ])
                let arrQuestion = await random();
                if (arrQuestion[0].length !== numberEasy || arrQuestion[1].length !== numberMedium || arrQuestion[2].length !== numberHard) {
                    if (arrQuestion[0].length !== numberEasy) throw ('Question Easy Not Enough !');
                    if (arrQuestion[1].length !== numberMedium) throw ('Question Medium Not Enough !');
                    if (arrQuestion[2].length !== numberHard) throw ('Question Hard Not Enough !');
                } else {
                    let dataQuestion = [...arrQuestion[0], ...arrQuestion[1], ...arrQuestion[2]];
                    let dataEntryCode = await _createEntryCode(dataQuestion, idCandi, templateId, deadline);
                    let dataCandidate = await _updateCandidate(idCandi, dataEntryCode._id)
                    let payload = {
                        TO: dataCandidate.email,
                        code: dataEntryCode.code
                    }
                    console.log({ payload })
                    // await send(payload, (err, dataMail) => { console.log(dataMail) })
                    res.status(204).end();
                }
            }
        }
    } catch (err) {
        console.log(err);
        res.status(203).json({
            success: false,
            message: err.message
        })
    }
}

//createEntryCode
export const autoCreateEntryCode = async (req, res) => {
    try {
        let { resCandidate, newCandidate } = req.body
        console.log('req', req.body)
        for (let candidate of newCandidate) {
            console.log('candidate', candidate)
            console.log('language', candidate.language)
            let template = await getTemplateDefaultEntry(candidate.language)
            console.log('template', template)
            let { testName, easy, medium, hard, language } = template,
                templateId = template._id;
            let randQuestion = async _ => Promise.all([
                _questionsRamdom(language, 1, easy),
                _questionsRamdom(language, 2, medium),
                _questionsRamdom(language, 3, hard)
            ])
            let arrQuestion = await randQuestion();
            if (arrQuestion[0].length !== easy || arrQuestion[1].length !== medium || arrQuestion[2].length !== hard) {
                // if (arrQuestion[0].length !== numberEasy) throw ('Question Easy Not Enough !');
                // if (arrQuestion[1].length !== numberMedium) throw ('Question Medium Not Enough !');
                // if (arrQuestion[2].length !== numberHard) throw ('Question Hard Not Enough !');
                continue
            }
            let dataQuestion = [...arrQuestion[0], ...arrQuestion[1], ...arrQuestion[2]];
            console.log('arrQuestion', dataQuestion)
            let deadline = new Date()
            deadline.setMonth(deadline.getMonth() + 1)
            let dataEntryCode = await _createEntryCode(dataQuestion, candidate.id, templateId, deadline);
            let dataCandidate = await _updateCandidate(candidate.id, dataEntryCode._id)
            let payload = {
                TO: dataCandidate.email,
                code: dataEntryCode.code
            }
            // await send(payload, (err, dataMail) => { console.log(dataMail) })
        }
        res.status(200).json({
            candidateImported: resCandidate.candidateImported,
            success: resCandidate.success,
            result: resCandidate.result,
            CanidateImportError: resCandidate.CanidateImportError,
            EnglishCreateError: resCandidate.EnglishCreateError,
            CandidateUpdateError: resCandidate.CandidateUpdateError,
        })
    } catch (err) {
        res.status(203).json({
            success: false,
            message: err.message
        })
    }
}


//regenerate code
export const regenerate = async (req, res) => {
    try {
        let { _id, deadline, language, numberEasy, numberMedium, numberHard } = req.body.dataEntryCode;
        if (!_id || !deadline || !language || !numberEasy || !numberMedium || !numberHard) {
            throw ('No Data');
        } else {
            let questionEasy = await _questionsRamdom(language, 1, numberEasy);
            let questionMedium = await _questionsRamdom(language, 2, numberMedium);
            let questionHard = await _questionsRamdom(language, 3, numberHard);
            if (questionEasy.length !== numberEasy || questionMedium.length !== numberMedium || questionHard.length !== numberHard) {
                throw ('Please Check Again Template !')
            } else {
                let dataQuestion = questionEasy.concat(questionMedium).concat(questionHard);
                let dataEntryCode = await _regenerate(_id, dataQuestion, deadline);
                if (dataEntryCode) {
                    res.status(200).json({
                        success: true,
                        code: dataEntryCode.code
                    })
                } else {
                    throw (`Can't Regenerate`)
                }
            }
        }
    } catch (err) {
        res.status(403).json({
            success: false,
            message: err
        })
    }
}
//Check Code used
export const checkCode = async (req, res) => {
    try {
        let { code, timeNow } = req.body;
        if (!code || !timeNow) {
            throw ('No Data!')
        } else {
            let token;
            let data = await findCode(code);
            if (!data) {
                throw ('Code is not exist!')
            } else if (!data.endTime) {
                if (data.deadline.getTime() - Date.parse(timeNow) <= 0) {
                    throw ('Code expried!!')
                } else {
                    res.status(200).json({
                        success: true,
                        token: generateToken(code),
                        message: "Code right!"
                    })
                }
            } else if ((data.endTime.getTime() - Date.parse(timeNow)) > 0) {
                throw ('Code is using!');
            } else {
                throw ('Code was used!')
            };
        }
    } catch (err) {
        res.status(203).json({
            success: false,
            message: err
        })
    }
}
//get data Show to font-end
export const showData = async (req, res) => {
    try {
        const { code } = req
        //find code on EntryCodeTable
        let data = await findCode(code);
        if (!data) {
            throw ('Not Found!')
        } else {
            if (data.templateId) {
                res.status(200).json({
                    name: `${data.candidateId.firstName} ${data.candidateId.lastName}`,
                    mobile: data.candidateId.mobile,
                    question: data.questionIds.length,
                    duration: data.templateId.duration,
                    passScore: data.templateId.passScore,
                    language: data.templateId.language
                })
            } else if (data.englishExamId) {
                res.status(200).json({
                    name: `${data.candidateId.firstName} ${data.candidateId.lastName}`,
                    mobile: data.candidateId.mobile,
                    question: data.englishExamId.questions.length,
                    duration: data.englishExamId.duration,
                    passScore: data.englishExamId.passScore,
                    language: data.englishExamId.language
                })
            }
        }
    } catch (err) {
        res.send(500).send(err)
    }
}
// api endTest use when user click submit
export const endTest = async (req, res) => {
    //duration: time test,
    const { duration, list_answer } = req.body;
    const { code } = req
    // create point and save answers to database
    endTestModel(duration, list_answer, code, (err, result) => {
        if (err) {
            res.status(500).json({ success: false });
        } else {
            res.status(200).json({ success: true });
        }

    })
}
export const finishTest = async (req, res) => {
    const { code } = req
    try {
        let dataCandidate = await findCode(code)
        //get data from database by code
        let account = {
            name: `${dataCandidate.candidateId.firstName} ${dataCandidate.candidateId.lastName}`,
            mobile: dataCandidate.candidateId.mobile,
            language: dataCandidate.templateId ? dataCandidate.templateId.language : dataCandidate.englishExamId.language
        }
        finishTestModel(code, (err, result) => {
            if (err) {
                res.status(500).json({ success: false });
            } else {
                res.status(200).json({ success: true, data: result, account });
            }
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            message: "Not Found"
        })
    }
}
// api startTest when click button start 
export const startTest = async (req, res) => {
    try {
        const { time } = req.body;
        const { code } = req;
        let duration;
        if (!time || !code) {
            throw ('No Data')
        } else {
            let data = await findCode(code);
            if (!data) {
                throw ('Not Found!')
            } else {
                let { startTime, endTime } = data;
                if (data.templateId) {
                    duration = data.templateId.duration;
                } else {
                    duration = data.englishExamId.duration;
                }
                if (!endTime || !startTime || endTime.getTime() - startTime.getTime() < (duration * 1000)) {
                    startTime = new Date();
                    endTime = moment(startTime).add(duration, 'm').toDate()
                    let dataUpdate = await updateEntryCode({ conditions: { code }, update: { startTime, endTime, point: '0', result: 'FAIL' } });
                    res.status(200).send(endTime);
                } else if (endTime.getTime() > Date.parse(time)) {
                    res.status(200).send(endTime);
                } else {
                    throw ('Time OUT');
                }
            }
        }
    } catch (err) {
        res.status(500).send(err)
    }
}
//send database to font-end
export const listQuestion = async (req, res) => {
    try {
        const { time } = req.body;
        let { code } = req;
        if (!time || !code) {
            throw ('Not Found')
        } else {
            let dataEntry = await findCode(code);
            let account = {
                name: `${dataEntry.candidateId.firstName} ${dataEntry.candidateId.lastName}`,
                mobile: dataEntry.candidateId.mobile,
            }
            if (dataEntry.templateId) {
                const { questionIds } = dataEntry;
                const listQuestions = questionIds.map(q => {
                    return {
                        id: q.id,
                        title: q.question,
                        multi: q.multi,
                        options: q.options
                    }
                })
                res.status(200).json({
                    time: dataEntry.endTime,
                    currentTime: Date.parse(dataEntry.endTime) - Date.parse(new Date()),
                    listQuestions,
                    account,
                    language: dataEntry.templateId.language,
                    question: dataEntry.questionIds.length,
                    duration: dataEntry.templateId.duration * 60 * 1000
                });
            } else if (dataEntry.englishExamId) {
                const { questions } = dataEntry.englishExamId;
                const listQuestions = questions.map(q => {
                    return {
                        id: q._id,
                        title: q.questions,
                        multi: false,
                        options: q.options,
                        essay: q.essay,
                        partNumber: q.partNumber
                    }
                })
                res.status(200).json({
                    time: dataEntry.endTime,
                    currentTime: Date.parse(dataEntry.endTime) - Date.parse(new Date()),
                    urlImg1: dataEntry.englishExamId.urlImg1,
                    urlImg2: dataEntry.englishExamId.urlImg2,
                    listQuestions,
                    account,
                    language: dataEntry.englishExamId.language,
                    question: dataEntry.englishExamId.questions.length,
                    duration: dataEntry.englishExamId.duration * 60 * 1000
                });
            }
        }
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err
        })
    }
}
// report => testDetail
export const reportTestDetail = async (req, res) => {
    const { code } = req.params;
    try {
        const data = await detailResultTest(code, (data, err) => {
            if (err) {
                res.json({
                    success: false,
                })
            } else {
                res.status(200).json({
                    success: true,
                    data
                })
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

export const endEnglishTest = (req, res) => {
    const { duration, list_answer } = req.body;
    const { code } = req;
    endEnglishTestModel(duration, list_answer, code, (err, result) => {
        if (err) {
            res.status(404).json({ success: false });
        } else {
            res.status(200).json({ success: true });
        }
    })
}

export const getAllEnglishTest = (req, res) => {
    getAllEnglishTestModel((err, data) => {
        if (err) {
            res.json({
                success: false
            })
        }
        res.json({
            success: true,
            englishEntries: data
        })
    })
}
export const countEnglishNotPoint = (req, res) => {
    countEnglishNotPointModel((err, count) => {
        if (err) {
            res.json({
                success: false
            })
        }
        res.json({
            success: true,
            count
        })
    })
}

export const getQuestionEssayEnglishTest = (req, res) => {
    const { id } = req.params;
    getQuestionEssayEnglishTestModel(id, (err, question_essay) => {
        if (err) {
            res.json({
                success: false,
                err
            })
        }
        res.json({
            success: true,
            question_essay
        })
    })
}

export const savePointEssayToDb = (req, res) => {
    const { idExam, point } = req.body;
    console.log(point)
    savePointEssayToDbModel(idExam, point, (err, data) => {
        if (err) {
            res.json({
                success: false,
                err
            })
        }
        res.json({
            success: true,
            data
        })
    })
}
