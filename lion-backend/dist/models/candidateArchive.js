'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeCandidate = exports.updateCandidate = exports.getCandidate = exports.createCandidateArchive = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CandidateArchive = new _mongoose.Schema({
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
var candidateArchiveTable = _mongoose2.default.model('CandidateArchive', CandidateArchive);

var createCandidateArchive = exports.createCandidateArchive = function createCandidateArchive(dataCreate) {
    var CandidateArchive = new candidateArchiveTable(dataCreate);
    return CandidateArchive.save(function (err, data) {
        if (err) throw 'Create Errors';
        return data;
    });
};

var getCandidate = exports.getCandidate = function getCandidate(dataSearch) {
    return candidateArchiveTable.find(dataSearch).populate('entryCodeIds').exec(function (err, data) {
        if (err) return err;
        return data;
    });
};

var updateCandidate = exports.updateCandidate = function updateCandidate(_id, dataUpdate) {
    return candidateArchiveTable.findOneAndUpdate({ _id: _id }, dataUpdate, { new: true }).exec(function (err, data) {
        if (err) return err;
        return data;
    });
};

var removeCandidate = exports.removeCandidate = function removeCandidate(dataRemove) {
    return candidateArchiveTable.remove(dataRemove).exec(function (err, data) {
        if (err) return err;
        return data;
    });
};
//# sourceMappingURL=candidateArchive.js.map