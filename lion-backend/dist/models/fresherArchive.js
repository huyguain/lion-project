'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteFresherArchive = exports.updateFresherArchive = exports.getFresherArchive = exports.createFresherArchive = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FresherArchive = new _mongoose.Schema({
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
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'Final'
    }],
    university: String,
    token: String,
    Unit: String
});
var fresherArchiveTable = _mongoose2.default.model('FresherArchive', FresherArchive);

var createFresherArchive = exports.createFresherArchive = function createFresherArchive(dataCreate) {
    var fresherArchive = new fresherArchiveTable({ dataCreate: dataCreate });
    return fresherArchive.save(function (err, data) {
        if (err) throw 'Create Error: ' + err;
        return data;
    });
};

var getFresherArchive = exports.getFresherArchive = function getFresherArchive(dataSearch) {
    return fresherArchiveTable.find(dataSearch).populate('finalIds').exec(function (err, data) {
        if (err) return err;
        return data;
    });
};

var updateFresherArchive = exports.updateFresherArchive = function updateFresherArchive(_id, dataUpdate) {
    return fresherArchiveTable.findOneAndUpdate({ _id: _id }, dataUpdate, { new: true }).exec(function (err, data) {
        if (err) return err;
        return data;
    });
};

var deleteFresherArchive = exports.deleteFresherArchive = function deleteFresherArchive(dataDelete) {
    return fresherArchiveTable.remove(dataDelete).exec(function (err, data) {
        if (err) return err;
        return data;
    });
};
//# sourceMappingURL=fresherArchive.js.map