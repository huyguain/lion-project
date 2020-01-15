import mongoose, { Schema } from 'mongoose';

const ClassFresher = new Schema({
    className: String,
    fresherIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Fresher'
    }],
    learningPathCustomiseIds: [{
        type: Schema.Types.ObjectId,
        ref: 'LearningCustomise'
    }],
    startDate: Date,
    endDate: Date,
})
const classTable = mongoose.model('ClassFresher', ClassFresher);
//createClass
export const _createClass = (dataClass) => {
    let _classTable = new classTable({
        className: dataClass.className,
        fresherIds: dataClass.fresherIds,
        learningPathCustomiseIds: dataClass.learningPathCustomiseIds,
        startDate: dataClass.startDate,
        endDate: dataClass.endDate,
    })
    return _classTable.save((err, data) => {
        if (err) {
            return ('Create Class Error !')
        } else {
            return data
        }
    })
}
//getClassByClassName
export const _getClassByClassName = (className) => {
    return classTable.findOne({ className }).exec((err, data) => {
        if (err) {
            return ('Get Class Error !')
        } else {
            return data
        }
    })
}
//getAllClass
export const _getAllClass = () => {
    return classTable.find({})
        .populate({
            path: 'learningPathCustomiseIds',
            select: ['learningPath']
        })
        .exec((err, data) => {
            if (err) {
                return ('Get Class Error !')
            } else {
                return data
            }
        })
}
//deleteClass
export const _deleteClass = (_id) => {
    return classTable.remove({ _id }, err => {
        if (err) {
            return ('Delete Class Error !')
        } else {
            return 1;
        }
    })
}
//getClassById
export const _getClassById = (_id) => {
    return classTable.findOne({ _id })
        .exec((err, data) => {
            if (err) {
                return ('Get Class Error !')
            } else {
                return data
            }
        })
}
//editClass
export const _editClass = (_id, dataClass) => {
    return classTable.findOneAndUpdate({ _id }, {
        className: dataClass.className,
        fresherIds: dataClass.fresherIds,
        learningPathCustomiseIds: dataClass.learningPathCustomiseIds,
        startDate: dataClass.startDate,
        endDate: dataClass.endDate,
    }, { new: true }).exec((err, data) => {
        if (err) {
            return ('Update Class Error !')
        } else {
            return data
        }
    })
}