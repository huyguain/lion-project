import mongoose, { Schema, Error } from 'mongoose';
import random from 'mongoose-random';

let QuestionSchema = new Schema({
    type: {
        type: String,
        default: "Entry Test",
    },
    language: {
        type: String,
        required: true
    },
    course: String,
    section: String,
    multi: { type: Boolean, default: false },
    level: { type: Number, min: 0, max: 3 }, //1 easy, 2.medium, 3.hard
    question: {
        type: String,
        required: true
    },
    options: {
        a: {
            type: String,
            required: true
        },
        b: {
            type: String,
            required: true
        },
        c: String,
        d: String
    },
    correct: []
})
QuestionSchema.pre('save', function (next) {
    if (!this.options.d) {
        this.options.d = undefined;
    }
    next();
})

QuestionSchema.plugin(random, { path: 'r' })
const questionTable = mongoose.model('Question', QuestionSchema)

export const importToDb = async (data, callback) => {
    try {
        if (data.multi && data.question && data.type) {
            data.correct = data.correct.split(",")
            console.log('data-question', data)
            let options = data["options[d]"] ? 
                            {a: data["options[a]"], b: data["options[b]"], c: data["options[c]"], d: data["options[d]"]}                            
                            : {a: data["options[a]"], b: data["options[b]"], c: data["options[c]"]}
            let _table = new questionTable({
                type: data.type,
                language: data.language,
                course: data.course,
                section: data.section,
                question: data.question,
                multi: (data.multi === 'TRUE' ? true : false),
                level: data.level,
                correct: data.correct,
                options: options,
                essay: (data.essay === 'TRUE' ? true : false),
                testCode: data.testCode,
                partNumber: data.partNumber,
                partTitle: data.partTitle
            })
            await _table.save((err, datas) => {
                return callback(null, datas)
            })
        } else {
            throw new Error('Error!')
        }
    } catch (err) {
        return callback(err)
    }
}
export const questionsRamdom = (language, type, level, number) => {
    if (number === 0) {
        return []
    }
    return new Promise((resolve, reject) => {
        questionTable.findRandom(
            { language: language, type: type, level: level },
            { _id: 1 },
            { limit: number },
            (err, questions) => {
                if (err) throw reject(err)
                resolve(questions)
            }
        )
    })
}
//question random
export const _questionsRamdom = (language, level, number) => {
    if (number === 0) {
        return [];
    } else {
        return questionTable.findRandom(
            { language: language, type: 'Entry Test', level: level },
            { _id: 1 },
            { limit: number },
            (err, data) => {
                if (err) {
                    return (`Get Data Question Error`)
                } else {
                    return data
                }
            }
        )
    }
}
export const getAllQuestion = async (callback) => {
    try {
        await questionTable.find({}).exec((err, data) => {
            return callback(null, data)
        })
    } catch (err) {
        return callback(err)
    }
}
export const getQuestionByCouse = async (language, type, callback) => {
    try {
        await questionTable.find({ language, type }).exec((err, data) => {
            return callback(null, data)
        })
    } catch (err) {
        return callback(err)
    }
}
export const getQuestionBy_Id = async (_id, callback) => {
    try {
        await questionTable.findOne({ _id }).exec((err, data) => {
            return callback(null, data)
        })
    } catch (err) {
        return callback(err)
    }
}
export const add_question = async (newQuestion, callback) => {

    let Question = new questionTable(newQuestion);
    try {
        const data = await Question.save();
        callback(null, data);
    } catch (err) {
        callback(err);
    }
}
export const edit_question = async (_id, data, callback) => {
    if (!data.options.c) {
        data.options.c = undefined;
    }
    if (!data.options.d) {
        data.options.d = undefined;
    }
    try {
        await questionTable.findOneAndUpdate({ _id }, {
            type: data.type,
            language: data.language,
            question: data.question,
            multi: data.multi,
            course: data.course,
            section: data.section,
            level: data.level,
            options: {
                a: data.options.a,
                b: data.options.b,
                c: data.options.c,
                d: data.options.d
            },
            correct: data.correct
        }).exec((err, _data) => {
            return callback(null, _data)
        })
    } catch (err) {
        return callback(err)
    }
}
export const delete_question = async (_id, callback) => {
    try {
        await questionTable.findOneAndRemove({ _id }, (err, data) => {
            return callback(null, data)
        })
    } catch (err) {
        return callback(err)
    }
}

export const getQuizModel = async (language, course, section, limit, callback) => {
    try {
        const questions = await questionTable.find({ type: "Quiz", language, course, section });
        return callback(null, questions);
    } catch (err) {
        return callback(err);
    }
}
