import mongoose, { Schema } from 'mongoose';
import uid from 'uid'

let EntryCode = new Schema({
    code: { type: String, required: true },
    createCode: {
        type: Date,
        default: new Date()
    },
    deadline: Date,
    startTime: Date,
    endTime: Date,
    candidateId: {
        type: Schema.Types.String,
        ref: 'Candidate'
    },
    questionIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }],
    templateId: {
        type: Schema.Types.ObjectId,
        ref: 'TestTemplate'
    },
    englishExamId: {
        type: Schema.Types.ObjectId,
        ref: 'EnglishTest'
    },
    answers: [],
    point: Number,
    result: String,
    status: Boolean
})
const entryCodeTable = mongoose.model('EntryCode', EntryCode)


export const _getAllEntryCode = () => {
    return entryCodeTable.find({}).
        select({ deadline: 1, createCode: 1, point: 1, code: 1, startTime: 1, endTime: 1, result: 1, questionIds: 1 }).
        populate({
            path: 'candidateId'
        })
        .populate({
            path: 'templateId'
        })
        .populate('englishExamId')
        .populate({
            path: 'questionIds'
        })
        .exec((err, data) => {
            if (err) {
                console.log(err);
                return ('Get Entry Code Error !')
            } else {
                return data;
            }
        })
}
//deleteEntryCode
export const _deleteEntryCode = (_id) => {
    return entryCodeTable.remove({ _id }, (err => {
        if (err) {
            return ('Delete Entry Code Error !')
        } else {
            return 1;
        }
    }))
}
export const deleteEntryCodeModel = (id) => {
    entryCodeTable.findOneAndRemove({ _id: id }, (err, response) => {
        if (err) return err
    })
}
export const deleteEntryCodeByUserId = (userId, callback) => {
    return entryCodeTable.remove({ userId }, (err => {
        if (err) return callback(err)
    }))
}
//create Entry Code
export const _createEntryCode = (dataQuestion, candidateId, templateId, deadline) => {
    let _entryCodeTable = new entryCodeTable({
        code: uid(),
        questionIds: dataQuestion,
        candidateId,
        deadline,
        templateId
    })
    return _entryCodeTable.save((err, data) => {
        if (err) {
            throw ('Create Entry Code Error !')
        } else {
            return data
        }
    })
}
export const addEntryCode = async (exam, userId, templateId, deadline, callback) => {
    let newEntryCode = new entryCodeTable({
        "code": uid(),
        "questionIds": exam,
        userId,
        deadline,
        templateId
    });
    await newEntryCode.save((err, data) => {
        if (err) throw err
    }).then(data => {
        return callback(null, data)
    }).catch(err => {
        return callback(err)
    })
}
export const addEntryCodeEnglish = async (userId, englishExamId, callback) => {
    let deadline = new Date()
    deadline.setMonth(deadline.getMonth() + 1)
    await entryCodeTable.create({
        code: uid(),
        userId,
        englishExamId,
        deadline,
    }, (err, data) => {
        if (err) return callback(err)
        return callback(null, data)
    })
}

export const saveEntryCodeEnglishToDB = async (userId, englishExamId) => {
    let deadline = new Date()
    deadline.setMonth(deadline.getMonth() + 1)
    let obj = {
        code: uid(),
        userId,
        englishExamId,
        deadline
    }
    try {
        let result = await entryCodeTable.create(obj)
        return {
            message: true,
            data: result
        }
    } catch (error) {
        return {
            message: false,
            data: error
        }
    }
}


export const findCode = (code) => {
    return entryCodeTable.findOne({ code })
        .populate('templateId')
        .populate('candidateId')
        .populate('englishExamId')
        .populate('questionIds')
        .exec((err, data) => {
            if (err) return err;
            return data;
        })
}
export const updateEntryCode = (dataInput) => {
    const { conditions, update } = dataInput;
    return entryCodeTable.findOneAndUpdate(conditions, update, { new: true }).
        exec((err, data) => {
            if (err) return err;
            return data;
        })

}
export const editEntryCode = async (_id, questionIds, deadline, callback) => {
    let entryCode = await entryCodeTable.findOne({ _id }).select({ point: 1 })
    try {
        await entryCodeTable.findOneAndUpdate({ _id },
            { code: uid(), deadline: deadline, questionIds: questionIds },
            { new: true },
            (err, data) => {
                return callback(null, data)
            })
    } catch (err) {
        return callback(err);
    }
}
export const endTestModel = (duration, answers, code, callback) => {
    entryCodeTable.findOne({ code })
        .populate('questionIds')
        .populate('templateId')
        .then(result => {
            console.log('answers', answers)
            console.log('answers', result)
            let count = 0;
            for (let i = 0; i < answers.length; i++) {
                for (let j = 0; j < result.questionIds.length; j++) {
                    if (answers[i].id == result.questionIds[j]._id) {
                        let a, b;
                        //sort đáp án mà người dùng chọn rồi convert sang string
                        a = answers[i].answers.sort() + "";
                        b = result.questionIds[j].correct.sort() + "";
                        if (a === b) {
                            count++;
                        }
                        break;
                    }
                }
            }
            /* save data in entry test */
            result.point = count;
            result.result = (((count / result.questionIds.length) * 100) >= result.templateId.passScore ? 'PASS' : 'FAIL')
            if ((Date.parse(result.endTime) - Date.parse(result.startTime)) > duration) result.endTime = new Date();
            result.answers = answers;
            result.save((err, result) => {
                if (err) callback(err)
                callback(null, result);
            })
        })
        .catch(err => {

            callback(err);
        })
}
/* load data vao page finish test */
export const finishTestModel = (code, callback) => {
    entryCodeTable.findOne({ code })
        .populate('templateId')
        .populate('candidateId')
        .then(result => {
            const data = {
                "duration": Math.ceil((Date.parse(result.endTime) - Date.parse(result.startTime)) / 1000 / 60),
                "point": result.point,
                "totalQuestion": result.questionIds.length,
                "result": result.result
            }
            callback(null, data);
        })
        .catch(err => {
            callback(err);
        })

}
export const checkCode = async (templateId, userId, callback) => {
    try {
        await entryCodeTable.findOne({ templateId, userId }, (err, data) => {
            return callback(null, data)
        })
    } catch (error) {
        return callback(err)
    }
}
export const getGenByTemplateId = async (templateId, callback) => {
    try {
        await entryCodeTable.find({ templateId }).exec((err, data) => {
            return callback(null, data)
        })
    } catch (err) {
        return callback(err)
    }
}
export const _updateGenByTemplateId = (templateId) => {
    return entryCodeTable.update({ templateId, result: { $exists: true } }, { templateId: null }, { multi: true }, err => {
        if (err) {
            throw ('Update Data Entry Error !')
        }
    })
}
//get detail test of candidate => view result question which candidate choosed
export const detailResultTest = async (code, callback) => {
    try {
        await entryCodeTable.findOne({ code })
            .populate('questionIds')
            .populate('englishExamId')
            .then(data => {
                // console.log(data)
                callback(data, null);
            })
            .catch(err => {
                callback(null, { status: 500, message: err });
            })
    } catch (err) {
        return callback(err)
    }

}
//regenerate
export const _regenerate = (_id, dataQuestion, deadline) => {
    return entryCodeTable.findOneAndUpdate({ _id }, {
        code: uid(),
        deadline: deadline,
        questionIds: dataQuestion
    }, { new: true }).exec((err, data) => {
        if (err) {
            return ('Update Entry Code Error !')
        } else {
            return data
        }
    })
}
//delete Entry Code By CandidateId
export const _deleteEntryCodeByCandi = (candidateId) => {
    return entryCodeTable.remove({ candidateId }, (err => {
        if (err) {
            return ('Delete EntryCode Error !')
        } else {
            return 1;
        }
    }))
}

//calculator point when end english test
export const endEnglishTestModel = (duration, list_answer, code, callback) => {
    entryCodeTable.findOne({ code: code })
        .populate('englishExamId')
        .then((result) => {
            let { questions } = result.englishExamId;
            questions.pop();
            result.questionIds = questions;
            let point = 0;
            list_answer.forEach(function (answerElement) {
                questions.forEach(function (question) {
                    if (question.essay) {
                        return;
                    }
                    if (answerElement.id == question._id) {
                        let correct_answer, option_answer;
                        correct_answer = question.correct.sort() + "";
                        option_answer = answerElement.answers.sort() + "";
                        if (correct_answer === option_answer) {
                            point++;
                        }
                        return;
                    }
                })
            });
            result.point = point;
            if ((Date.parse(result.endTime) - Date.parse(result.startTime)) > duration) result.endTime = new Date();
            result.answers = list_answer;
            result.save((err, result) => {
                if (err) return callback(err)
                return callback(null, result);
            })
        })
        .catch(err => {
            callback(err);
        })
}
//create Entry English Test 
export const _createEntryEnglish = (candidateId, englishExamId) => {
    let deadline = new Date()
    deadline.setMonth(deadline.getMonth() + 1)
    let _entryCodeTable = new entryCodeTable({
        code: uid(),
        candidateId,
        englishExamId,
        deadline,
        status: false
    })
    return _entryCodeTable.save((err, data) => {
        if (err) {
            return ('Create Entry English Error!')
        }
        return data
    })
}

export const getAllEnglishTestModel = (callback) => {
    entryCodeTable.find({ englishExamId: { $exists: true }, endTime: { $exists: true } })
        .populate("candidateId", { firstName: 1, lastName: 1 })
        .populate("englishExamId", { questions: 1 })
        .select({ code: 1, candidateId: 1, endTime: 1, status: 1, point: 1 })
        .sort({ status: 1, endTime: 1, _id: -1 })
        .then((data) => {
            const dataRs = data.filter(item =>
                Object.keys(item._doc).map(key =>
                    item[key] !== null && item[key] !== undefined ? true : false)
                    .filter(item => item === false).length === 0 ? true : false);
            callback(null, dataRs)
        })
        .catch(err => console.log(err))
}

export const countEnglishNotPointModel = (callback) => {
    entryCodeTable.count({ status: false, endTime: { $exists: true } })
        .then((count) => {
            callback(null, count)
        })
        .catch(err => {
            callback(err)
        });
}

export const getQuestionEssayEnglishTestModel = (id, callback) => {
    console.log(id)
    entryCodeTable.findOne({ _id: id })
        .populate({
            path: "englishExamId",
            select: "questions"
        })
        .then((entryCode) => {
            const english_exam = entryCode.englishExamId;
            const question_essay = english_exam.questions.filter(question => question.essay);
            const answer_essay =
                question_essay.map(item =>
                    entryCode.answers.filter(answer => answer.id == item._id)[0]);
            const data = {
                totalQuestion: english_exam.questions.length,
                question: question_essay,
                answer: answer_essay,
                point: entryCode.point,
                status: entryCode.status
            }
            callback(null, data)
        })
        .catch(err => {
            callback(err);
        })
}
//save point into exam
export const savePointEssayToDbModel = (idExam, point, callback) => {
    entryCodeTable.findOne({ _id: idExam })
        .then(entryTest => {
            try {
                entryTest.point += parseInt(point) || 0;
            } catch (err) {
                return callback(err)
            }
            entryTest.status = true;
            entryTest.save((err, data) => {
                if (err)
                    return callback(err)
                return callback(null, data)
            });
        })
        .catch(err => {
            callback(err);
        })
}
//delete Entry by Template Id and sate
export const _deleteEntryByTemplate = (templateId) => {
    return entryCodeTable.remove({ templateId, result: null }, (err, data) => {
        if (err) {
            return ('Delete Entry Code Error !')
        } else {
            return 1;
        }
    })
}
//get Entry by templateid
export const _getAllEntryByTemplate = (templateId) => {
    return entryCodeTable.find({ templateId }).exec((err, data) => {
        if (err) {
            return ('Get Entry Error !')
        } else {
            return data;
        }
    })
}

