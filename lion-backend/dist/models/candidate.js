'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._updateCandidatePull = exports._updateCandidate = exports._deleteCandidate = exports._editCandidate = exports._getCandidateById = exports._getAllCandidate = exports._getCanidateByEmail = exports._createCanidate = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Candidate = new _mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    university: String,
    note: String,
    state: String,
    entryCodeIds: [{
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'EntryCode'
    }],
    mobile: Number
});
var candidateTable = _mongoose2.default.model('Candidate', Candidate);

Candidate.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
});
//create candidate
var _createCanidate = exports._createCanidate = function _createCanidate(dataCandidate) {
    var _candidateTable = new candidateTable(dataCandidate);
    return _candidateTable.save(function (err, data) {
        if (err) {
            return err;
        } else {
            return data;
        }
    });
};
//get candidate by Email
var _getCanidateByEmail = exports._getCanidateByEmail = function _getCanidateByEmail(email) {
    return candidateTable.findOne({ email: email }).exec(function (err, data) {
        if (err) {
            return 'Get Canidate By Email Error!';
        } else {
            return data;
        }
    });
};
//get all candidate
var _getAllCandidate = exports._getAllCandidate = function _getAllCandidate() {
    return candidateTable.find().populate({
        path: 'entryCodeIds',
        populate: { path: 'englishExamId' }
    }).populate({
        path: 'entryCodeIds',
        populate: { path: 'templateId' }
    }).exec(function (err, data) {
        if (err) {
            return 'Get Data Candidate Error!';
        } else {
            return data;
        }
    });
};
//get Candidate by Id
var _getCandidateById = exports._getCandidateById = function _getCandidateById(_id) {
    return candidateTable.findOne({ _id: _id }).exec(function (err, data) {
        if (err) {
            return 'Get Canidate Error!';
        } else {
            return data;
        }
    });
};
//editCandidate 
var _editCandidate = exports._editCandidate = function _editCandidate(_id, dataCandidate) {
    console.log({ dataCandidate: dataCandidate }, dataCandidate.note);
    return candidateTable.findOneAndUpdate({ _id: _id }, {
        firstName: dataCandidate.firstName,
        lastName: dataCandidate.lastName,
        university: dataCandidate.university,
        note: dataCandidate.note,
        mobile: dataCandidate.mobile
    }, { new: true }).exec(function (err, data) {
        if (err) {
            console.log('loi roi');
            return 'Update Candidate Error!';
        } else {
            console.log('data', data);
            return data;
        }
    });
};
//deleteCandidate
var _deleteCandidate = exports._deleteCandidate = function _deleteCandidate(_id) {
    return candidateTable.remove({ _id: _id }, function (err) {
        if (err) {
            return 'Delete Candidate Error!';
        } else {
            return 1;
        }
    });
};
//update Entry code id push entry id
var _updateCandidate = exports._updateCandidate = function _updateCandidate(_id, entryCodeId) {
    return candidateTable.findOneAndUpdate({ _id: _id }, { $push: { "entryCodeIds": entryCodeId } }, { new: true }).exec(function (err, data) {
        if (err) {
            throw 'Update Candidate Error !';
        } else {
            return data;
        }
    });
};
//update Entry Code delete EntryId
var _updateCandidatePull = exports._updateCandidatePull = function _updateCandidatePull(_id, entryCodeId) {
    return candidateTable.findByIdAndUpdate({ _id: _id }, { $pull: { "entryCodeIds": entryCodeId } }, { new: true }).exec(function (err, data) {
        if (err) {
            return 'Update Candidate Error !';
        } else {
            return data;
        }
    });
};
//# sourceMappingURL=candidate.js.map