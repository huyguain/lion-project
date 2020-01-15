import mongoose, { Schema } from 'mongoose';

const FinalTest = new Schema({
    fresherId: {
        type: Schema.Types.ObjectId,
        ref: 'Fresher'
    },
    templateId: {
        type: Schema.Types.ObjectId,
        ref: 'TestTemplate'
    },
    questionIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }],
    answers: Array,
    point: Number,
    result: String,
    timeOpen: Date,
    timeClose: Date,
    startTime: Date,
    endTime: Date,
})

const finalTable = mongoose.model('FinalTest', FinalTest);

export const createFinalTest = (fresherId, templateId,
    dataQuestion, timeOpen, timeClose) => {
    let finalTest = new finalTable({
        questionIds: dataQuestion,
        templateId, fresherId,
        timeOpen, timeClose
    });
    return finalTest.save((err, data) => {
        if (err) {
            throw ('Create Final Test Error !')
        } else {
            return data;
        }
    })
}

export const getAllFinalTest = (dataSearch) => {
    return finalTable.find(dataSearch)
        .populate('fresherId')
        .populate('templateId')
        .populate('questionIds')
        .exec((err, data) => {
            if (err) return err;
            return data;
        })
}

export const getLastFinalTest = (dataSearch) => {
    return finalTable.findOne(dataSearch, { sort: { '_id': -1 } })
        .populate('fresherId')
        .populate('templateId')
        .populate('questionIds')
        .exec((err, data) => {
            if (err) return err;
            return data;
        })
}

export const editFinalTest = (_id, dataUpdate) => {
    return finalTable.findOneAndUpdate({ _id },
        dataUpdate,
        { new: true }
    ).exec((err, data) => {
        if (err) return err;
        return data;
    })
}

export const deleteFinalTest = (dataDelete) => {
    return finalTable.remove(dataDelete)
        .exec((err, data) => {
            if (err) return err;
            return data;
        })
}