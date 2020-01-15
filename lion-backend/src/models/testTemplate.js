import mongoose, { Schema } from 'mongoose';
import { type } from 'os';
import { duration, relativeTimeRounding } from 'moment';

let TestTemplateModel = new Schema({
    language: { type: String, required: true },
    testName: { type: String, required: true },
    easy: {
        type: Number,
        min: 0,
    },
    medium: {
        type: Number,
        min: 0,
    },
    hard: {
        type: Number,
        min: 0,
    },
    passScore: Number,
    duration: {
        type: Number,
        min: 0,
    },
    deleteVisible: {
        type: Boolean,
        default: false
    },
    defaultEntryTest: {
        type: Boolean,
        default: false
    },
})
const testTemplateTable = mongoose.model('TestTemplate', TestTemplateModel)

//createTemplate
export const createTestTemplate = async (dataTemplate) => {
    let _testTemplateTable = new testTemplateTable({
        language: dataTemplate.language,
        testName: dataTemplate.testName,
        easy: dataTemplate.easy,
        medium: dataTemplate.medium,
        hard: dataTemplate.hard,
        passScore: dataTemplate.passScore,
        duration: dataTemplate.duration,
        defaultEntryTest: dataTemplate.defaultEntryTest,
        deleteVisible: dataTemplate.deleteVisible,
    })
    if (dataTemplate.defaultEntryTest === true) {
        const dataRef = {
            language: dataTemplate.language,
            defaultEntryTest: true,
        }
        await updateTestTemplate(dataRef, { defaultEntryTest: false })
    }
    return _testTemplateTable.save((err, data) => {
        if (err) {
            return ('Create Template Error!')
        } else {
            return data;
        }
    })
}
export const updateTestTemplate = async (dataRef, dataUpdate) => {
    return testTemplateTable.update(dataRef, dataUpdate, { multi: true })
        .exec((err, data) => {
            if (err) return err;
            return data;
        })
}
export const getTemplateDefaultEntry = async (language) => {
    return testTemplateTable.findOne({
        language, defaultEntryTest: true
    }).exec((err, data) => {
        if (err) throw `Get Template Default Entry Test ${err}`;
        else return data
    })
}
//////////////////////////////////////////////////////////////////////////////////////
export const getTestTemplate = async (course, testName, callback) => {
    try {
        await testTemplateTable.findOne({
            language: course, testName: testName
        }).exec((err, datas) => {
            return callback(null, datas)
        })
    } catch (err) {
        return callback(err)
    }
}
export const _getAllTemplate = () => {
    return testTemplateTable.find({ deleteVisible: false }, (err, data) => {
        if (err) {
            return ('Get Template Error!')
        } else {
            return data
        }
    })
}
export const getTemplate = async (language, testName, callback) => {
    try {
        await testTemplateTable.findOne({
            language,
            testName
        }).exec((err, _data) => {
            return callback(null, _data)
        })
    } catch (err) {
        return callback(err)
    }
}
export const getTemplateById = async (_id, callback) => {
    try {
        testTemplateTable.findOne({ _id }, (err, data) => {
            return callback(null, data)
        })
    } catch (err) {
        return callback(err)
    }
}
export const _deleteTemplateById = (_id) => {
    return testTemplateTable.remove({ _id }, (err => {
        if (err) {
            return err;
        } else {
            return 1;
        }
    }))
}