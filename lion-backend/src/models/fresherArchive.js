import mongoose, { Schema } from 'mongoose';

const FresherArchive = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    passWord: String,
    mobile: Number,
    language: String,
    program: String,
    note: String,
    StartDate: Date,
    finalIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Final'
    }],
    university: String,
    token: String,
    Unit: String,
})
const fresherArchiveTable = mongoose.model('FresherArchive', FresherArchive)

export const createFresherArchive = (dataCreate) => {
    let fresherArchive = new fresherArchiveTable({ dataCreate });
    return fresherArchive.save((err, data) => {
        if (err) throw `Create Error: ${err}`;
        return data;
    })
}

export const getFresherArchive = (dataSearch) => {
    return fresherArchiveTable
        .find(dataSearch)
        .populate('finalIds')
        .exec((err, data) => {
            if (err) return err;
            return data;
        })
}

export const updateFresherArchive = (_id, dataUpdate) => {
    return fresherArchiveTable
        .findOneAndUpdate({ _id },
        dataUpdate, { new: true })
        .exec((err, data) => {
            if (err) return err;
            return data;
        })
}

export const deleteFresherArchive = (dataDelete) => {
    return fresherArchiveTable
        .remove(dataDelete)
        .exec((err, data) => {
            if (err) return err;
            return data;
        })
}