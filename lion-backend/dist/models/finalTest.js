'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteFinalTest = exports.editFinalTest = exports.getLastFinalTest = exports.getAllFinalTest = exports.createFinalTest = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FinalTest = new _mongoose.Schema({
    fresherId: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'Fresher'
    },
    templateId: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'TestTemplate'
    },
    questionIds: [{
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    answers: Array,
    point: Number,
    result: String,
    timeOpen: Date,
    timeClose: Date,
    startTime: Date,
    endTime: Date
});

var finalTable = _mongoose2.default.model('FinalTest', FinalTest);

var createFinalTest = exports.createFinalTest = function createFinalTest(fresherId, templateId, dataQuestion, timeOpen, timeClose) {
    var finalTest = new finalTable({
        questionIds: dataQuestion,
        templateId: templateId, fresherId: fresherId,
        timeOpen: timeOpen, timeClose: timeClose
    });
    return finalTest.save(function (err, data) {
        if (err) {
            throw 'Create Final Test Error !';
        } else {
            return data;
        }
    });
};

var getAllFinalTest = exports.getAllFinalTest = function getAllFinalTest(dataSearch) {
    return finalTable.find(dataSearch).populate('fresherId').populate('templateId').populate('questionIds').exec(function (err, data) {
        if (err) return err;
        return data;
    });
};

var getLastFinalTest = exports.getLastFinalTest = function getLastFinalTest(dataSearch) {
    return finalTable.findOne(dataSearch, { sort: { '_id': -1 } }).populate('fresherId').populate('templateId').populate('questionIds').exec(function (err, data) {
        if (err) return err;
        return data;
    });
};

var editFinalTest = exports.editFinalTest = function editFinalTest(_id, dataUpdate) {
    return finalTable.findOneAndUpdate({ _id: _id }, dataUpdate, { new: true }).exec(function (err, data) {
        if (err) return err;
        return data;
    });
};

var deleteFinalTest = exports.deleteFinalTest = function deleteFinalTest(dataDelete) {
    return finalTable.remove(dataDelete).exec(function (err, data) {
        if (err) return err;
        return data;
    });
};
//# sourceMappingURL=finalTest.js.map