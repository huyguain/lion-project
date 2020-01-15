'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._getLearningPathName = exports.listLearning = exports.removeLearning = exports.editLearningById = exports._getLearningPath = exports.getLearningById = exports.listLearningPath = exports.createLearningPath = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LearningPath = new _mongoose.Schema({
    language: String,
    learningPath: String,
    title: String,
    content: String,
    courseIds: [{
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});
var LearningPathTable = _mongoose2.default.model('Learning', LearningPath);
var createLearningPath = exports.createLearningPath = function createLearningPath(language, learningPath, courseIds, title, content, callback) {
    LearningPathTable.create({
        language: language,
        learningPath: learningPath,
        courseIds: courseIds,
        title: title,
        content: content
    }, function (err, data) {
        if (err) return callback(err);
        callback(null, data);
    });
};

var listLearningPath = exports.listLearningPath = function listLearningPath(callback) {
    LearningPathTable.find({}).populate({
        path: "courseIds",
        select: ["_id", "language", "courseName", "urlIcon", "urlImage", "__v"]
    }).then(function (data) {
        return callback(null, data);
    }).catch(function (err) {
        return callback(err);
    });
};

var getLearningById = exports.getLearningById = function getLearningById(_id, callback) {
    LearningPathTable.findOne({ _id: _id }).populate({
        path: "courseIds",
        select: ["_id", "language", "courseName", "urlIcon", "urlImage", "__v"]
    }).then(function (data) {
        callback(null, data);
    }).catch(function (err) {
        return callback(err);
    });
};
//getLearningPath
var _getLearningPath = exports._getLearningPath = function _getLearningPath(_id) {
    return LearningPathTable.findOne({ _id: _id }).exec(function (err, data) {
        if (err) {
            return 'Get Learning Error !';
        } else {
            return data;
        }
    });
};
var editLearningById = exports.editLearningById = function editLearningById(id, language, learningPath, courseIds, title, content, callback) {
    LearningPathTable.findByIdAndUpdate(id, { language: language, learningPath: learningPath, courseIds: courseIds, title: title, content: content }, { new: true }, function (err, data) {
        if (err) return callback(err);
        return callback(null, data);
    });
};

var removeLearning = exports.removeLearning = function removeLearning(_id, callback) {
    LearningPathTable.remove({ _id: _id }, function (err) {
        if (err) return callback(err);else return callback(null);
    });
};

var listLearning = exports.listLearning = function listLearning(courseIds) {
    return LearningPathTable.find({ courseIds: courseIds }).exec(function (err, data) {
        if (err) return err;
        return data;
    });
};
//getLearningPathName
var _getLearningPathName = exports._getLearningPathName = function _getLearningPathName() {
    return LearningPathTable.find({}).select({ learningPath: 1 }).exec(function (err, data) {
        if (err) {
            throw 'Get Data Error !';
        } else {
            return data;
        }
    });
};
//# sourceMappingURL=LearningPath.js.map