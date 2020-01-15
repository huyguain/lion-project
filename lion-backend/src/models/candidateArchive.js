import mongoose, { Schema } from 'mongoose';

const CandidateArchive = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    university: String,
    note: String,
    state: String,
    entryCodeIds: [{
        type: Schema.Types.ObjectId,
        ref: 'EntryCode',
    }],
    mobile: Number
})
const candidateArchiveTable = mongoose.model('CandidateArchive', CandidateArchive);

export const createCandidateArchive = (dataCreate) => {
    let CandidateArchive = new candidateArchiveTable(dataCreate);
    return CandidateArchive.save((err, data) => {
        if (err) throw ('Create Errors');
        return data;
    })
}

export const getCandidate = (dataSearch) => {
    return candidateArchiveTable
        .find(dataSearch)
        .populate('entryCodeIds')
        .exec((err, data) => {
            if (err) return err;
            return data;
        })
}

export const updateCandidate = (_id, dataUpdate) => {
    return candidateArchiveTable
        .findOneAndUpdate({ _id },
        dataUpdate,
        { new: true }
        ).exec((err, data) => {
            if (err) return err;
            return data;
        })
}

export const removeCandidate = (dataRemove) => {
    return candidateArchiveTable
        .remove(dataRemove)
        .exec((err, data) => {
            if (err) return err;
            return data;
        })
}