import mongoose, { Schema, Error } from 'mongoose';

let questionSchema = new Schema({
    questions: String,
    options: {
        a: String,
        b: String,
        c: String,
        d: String
    },
    correct: [],
    essay: Boolean,
    partNumber: Number
})

let englishTestSchema = new Schema({

    testCode: String,

    urlImg1: String,

    urlImg2: String,
    language: { type: String, default: `English` },
    duration: { type: Number, default: 40 },
    passScore: { type: Number, default: 80 },
    questions: [questionSchema]
})

const EnglishTest = mongoose.model('EnglishTest', englishTestSchema)


export const createEnglishTest = (testCode, urlImg1, urlImg2, questions, callback) => {
    let englishTest = new EnglishTest()
    englishTest.testCode = testCode
    englishTest.urlImg1 = urlImg1
    englishTest.urlImg2 = urlImg2
    questions.forEach(element => {
        const optionChoice = element['options[d]'] ? 
                                { a: element['options[a]'], b: element['options[b]'], c: element['options[c]'], d: element['options[d]']} :
                                { a: element['options[a]'], b: element['options[b]'], c: element['options[c]']} 

        englishTest.questions.push({
            questions: element.question,
            options: optionChoice,
            correct: element.correct.split(','),
            essay: (element.essay === 'TRUE' ? true : false),
            partNumber: element.partNumber
        })
    });
    englishTest.save((err, result) => {
        if (err) return callback(err)
        return callback(null, result)
    })
}

export const getEnglishTestAsAw = async () => {
    try {
        let result = await EnglishTest.find({})
        return { message: true, data: result }
    } catch (error) {
        return {
            message: false, data: error
        }
    }

}

export const getEnglishTest = (callback) => {
    EnglishTest.find({}, (err, data) => {
        if (err) return callback(err)
        callback(null, data)
    })
}
//get English Test
export const _getEnglishTest = async () => {
    let result
    await EnglishTest.find({}).sort({_id: -1}).limit(1).exec((err, data) => {
        if (err) {
            result = 'Get English Test Error !'
        } else {
            result = data[0]
        }
    })
    return result
}
