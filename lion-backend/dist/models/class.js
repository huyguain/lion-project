'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._editClass = exports._getClassById = exports._deleteClass = exports._getAllClass = exports._getClassByClassName = exports._createClass = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClassFresher = new _mongoose.Schema({
    className: String,
    fresherIds: [{
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'Fresher'
    }],
    learningPathCustomiseIds: [{
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'LearningCustomise'
    }],
    startDate: Date,
    endDate: Date
});
var classTable = _mongoose2.default.model('ClassFresher', ClassFresher);
//createClass
var _createClass = exports._createClass = function _createClass(dataClass) {
    var _classTable = new classTable({
        className: dataClass.className,
        fresherIds: dataClass.fresherIds,
        learningPathCustomiseIds: dataClass.learningPathCustomiseIds,
        startDate: dataClass.startDate,
        endDate: dataClass.endDate
    });
    return _classTable.save(function (err, data) {
        if (err) {
            return 'Create Class Error !';
        } else {
            return data;
        }
    });
};
//getClassByClassName
var _getClassByClassName = exports._getClassByClassName = function _getClassByClassName(className) {
    return classTable.findOne({ className: className }).exec(function (err, data) {
        if (err) {
            return 'Get Class Error !';
        } else {
            return data;
        }
    });
};
//getAllClass
var _getAllClass = exports._getAllClass = function _getAllClass() {
    return classTable.find({}).populate({
        path: 'learningPathCustomiseIds',
        select: ['learningPath']
    }).exec(function (err, data) {
        if (err) {
            return 'Get Class Error !';
        } else {
            return data;
        }
    });
};
//deleteClass
var _deleteClass = exports._deleteClass = function _deleteClass(_id) {
    return classTable.remove({ _id: _id }, function (err) {
        if (err) {
            return 'Delete Class Error !';
        } else {
            return 1;
        }
    });
};
//getClassById
var _getClassById = exports._getClassById = function _getClassById(_id) {
    return classTable.findOne({ _id: _id }).exec(function (err, data) {
        if (err) {
            return 'Get Class Error !';
        } else {
            return data;
        }
    });
};
//editClass
var _editClass = exports._editClass = function _editClass(_id, dataClass) {
    return classTable.findOneAndUpdate({ _id: _id }, {
        className: dataClass.className,
        fresherIds: dataClass.fresherIds,
        learningPathCustomiseIds: dataClass.learningPathCustomiseIds,
        startDate: dataClass.startDate,
        endDate: dataClass.endDate
    }, { new: true }).exec(function (err, data) {
        if (err) {
            return 'Update Class Error !';
        } else {
            return data;
        }
    });
};
//# sourceMappingURL=class.js.map