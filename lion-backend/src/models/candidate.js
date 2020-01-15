import mongoose, { Schema } from 'mongoose';

const Candidate = new Schema({
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
const candidateTable = mongoose.model('Candidate', Candidate);

Candidate.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
});
//create candidate
export const _createCanidate = (dataCandidate) => {
    let _candidateTable = new candidateTable(dataCandidate);
    return _candidateTable.save((err, data) => {
        if (err) {
            return err;
        } else {
            return data;
        }
    })
}
//get candidate by Email
export const _getCanidateByEmail = (email) => {
    return candidateTable.findOne({ email })
        .exec((err, data) => {
            if (err) {
                return ('Get Canidate By Email Error!')
            } else {
                return data;
            }
        })
}
//get all candidate
export const _getAllCandidate = () => {
    return candidateTable.find()
        .populate({
            path: 'entryCodeIds',
            populate: { path: 'englishExamId' },
        })
        .populate({
            path: 'entryCodeIds',
            populate: { path: 'templateId' },
        })
        .exec((err, data) => {
            if (err) {
                return ('Get Data Candidate Error!')
            } else {
                return data;
            }
        })
}
//get Candidate by Id
export const _getCandidateById = (_id) => {
    return candidateTable.findOne({ _id })
        .exec((err, data) => {
            if (err) {
                return ('Get Canidate Error!')
            } else {
                return data
            }
        })
}
//editCandidate 
export const _editCandidate = (_id, dataCandidate) => {
    console.log({ dataCandidate }, dataCandidate.note);
    return candidateTable.findOneAndUpdate({ _id }, {
        firstName: dataCandidate.firstName,
        lastName: dataCandidate.lastName,
        university: dataCandidate.university,
        note: dataCandidate.note,
        mobile: dataCandidate.mobile
    }, { new: true }).exec((err, data) => {
        if (err) {
            console.log('loi roi')
            return ('Update Candidate Error!')
        } else {
            console.log('data', data)
            return data
        }
    })
}
//deleteCandidate
export const _deleteCandidate = (_id) => {
    return candidateTable.remove({ _id }, (err) => {
        if (err) {
            return ('Delete Candidate Error!')
        } else {
            return 1;
        }
    })
}
//update Entry code id push entry id
export const _updateCandidate = (_id, entryCodeId) => {
    return candidateTable.findOneAndUpdate({ _id },
        { $push: { "entryCodeIds": entryCodeId } },
        { new: true })
        .exec((err, data) => {
            if (err) {
                throw ('Update Candidate Error !')
            } else {
                return data
            }
        })
}
//update Entry Code delete EntryId
export const _updateCandidatePull = (_id, entryCodeId) => {
    return candidateTable.findByIdAndUpdate({ _id },
        { $pull: { "entryCodeIds": entryCodeId } },
        { new: true }).exec((err, data) => {
            if (err) {
                return ('Update Candidate Error !')
            } else {
                return data
            }
        })
}