'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._getLearningForClass = exports._editLearningCusById = exports._getLearningCusById = exports._deleteLearningCus = exports._getAllLearningCus = exports._createLearningPathCus = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LearningPathCustomise = new _mongoose.Schema({
    language: String,
    learningPath: String,
    title: String,
    content: String,
    courseIds: [{
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});
var LearningPathCustomiseTable = _mongoose2.default.model('LearningCustomise', LearningPathCustomise);

var _createLearningPathCus = exports._createLearningPathCus = function _createLearningPathCus(data, dataCoures) {
    var courseIds = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = dataCoures[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var id = _step.value;

            courseIds.push(id);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var _LearningPathCustomiseTable = new LearningPathCustomiseTable({
        language: data.language,
        learningPath: data.learningPath,
        title: data.title,
        content: data.content,
        courseIds: courseIds
    });
    return _LearningPathCustomiseTable.save(function (err, dataLearning) {
        if (err) {
            return 'Create Learning Error !';
        } else {
            return dataLearning;
        }
    });
};
//getAllLearningCus
var _getAllLearningCus = exports._getAllLearningCus = function _getAllLearningCus() {
    return LearningPathCustomiseTable.find({}).populate({
        path: "courseIds",
        select: ["courseName"]
    }).exec(function (err, data) {
        if (err) {
            throw 'Get Learning Error !';
        } else {
            return data;
        }
    });
};
//deleteLearningCus
var _deleteLearningCus = exports._deleteLearningCus = function _deleteLearningCus(_id) {
    return LearningPathCustomiseTable.remove({ _id: _id }).exec(function (err) {
        if (err) {
            return 'Delete Learning Error !';
        } else {
            return 1;
        }
    });
};
//getLearningCusById
var _getLearningCusById = exports._getLearningCusById = function _getLearningCusById(_id) {
    return LearningPathCustomiseTable.findOne({ _id: _id }).exec(function (err, data) {
        if (err) {
            return 'Get Learning Error!';
        } else {
            return data;
        }
    });
};
//_editLearningCusById
var _editLearningCusById = exports._editLearningCusById = function _editLearningCusById(_id, dataLearning, dataCoures) {
    var courseIds = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = dataCoures[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var id = _step2.value;

            courseIds.push(id);
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return LearningPathCustomiseTable.findOneAndUpdate({ _id: _id }, {
        language: dataLearning.language,
        learningPath: dataLearning.learningPath,
        title: dataLearning.title,
        content: dataLearning.content,
        courseIds: courseIds
    }).exec(function (err, data) {
        if (err) {
            return 'Update Data Error !';
        } else {
            return data;
        }
    });
};
//getLearningForClass
var _getLearningForClass = exports._getLearningForClass = function _getLearningForClass() {
    return LearningPathCustomiseTable.find({}).select({ learningPath: 1 }).exec(function (err, data) {
        if (err) {
            return 'Get Learning Error!';
        } else {
            return data;
        }
    });
};
//# sourceMappingURL=learningPathCustomise.js.map