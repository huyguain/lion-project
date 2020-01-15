'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeApplier = exports.editApplier = exports.getOneApplier = exports.listApplier = exports.createApplier = exports.Applier = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _location = require('./location');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applierSchema = new _mongoose.Schema({
    fullName: String,
    email: String,
    jobApply: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'Jobs'
    },
    location: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    graduationYear: Number,
    cpa: Number,
    phoneNumber: String,
    category: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    major: String,
    university: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'University'
    },
    typeJob: Boolean,
    wordExperience: String,
    cv: String
});

var Applier = exports.Applier = _mongoose2.default.model('Applier', applierSchema);

var createApplier = exports.createApplier = function createApplier(body, callback) {
    var fullName = body.fullName,
        email = body.email,
        location = body.location,
        jobApply = body.jobApply,
        graduationYear = body.graduationYear,
        cpa = body.cpa,
        phoneNumber = body.phoneNumber,
        category = body.category,
        major = body.major,
        typeJob = body.typeJob,
        wordExperience = body.wordExperience,
        cv = body.cv,
        university = body.university;

    Applier.create({
        fullName: fullName,
        email: email,
        location: location,
        jobApply: jobApply,
        graduationYear: graduationYear,
        cpa: cpa,
        phoneNumber: phoneNumber,
        category: category,
        major: major,
        university: university,
        typeJob: typeJob,
        wordExperience: wordExperience,
        cv: cv
    }, function (err, data) {
        if (err) return callback(err);
        return callback(null, data);
    });
};

var listApplier = exports.listApplier = function listApplier(callback) {
    Applier.find({}).sort({ _id: -1 }).populate({
        path: 'jobApply',
        populate: { path: 'location' }
    }).populate("location").populate("category").populate("university").then(function (data) {
        return callback(null, data);
    }).catch(function (err) {
        return callback(err);
    });
};

var getOneApplier = exports.getOneApplier = function getOneApplier(_id, callback) {
    console.log(_id);
    Applier.find({ _id: _id }).populate({
        path: 'jobApply',
        populate: { path: 'location' }
    }).populate("location").populate("category").populate("university").then(function (data) {
        return callback(null, data);
    }).catch(function (err) {
        return callback(err);
    });
};

var editApplier = exports.editApplier = function editApplier(_id, body, callback) {
    var fullName = body.fullName,
        email = body.email,
        jobApply = body.jobApply,
        location = body.location,
        graduationYear = body.graduationYear,
        cpa = body.cpa,
        phoneNumber = body.phoneNumber,
        category = body.category,
        major = body.major,
        typeJob = body.typeJob,
        wordExperience = body.wordExperience,
        cv = body.cv;

    Applier.findByIdAndUpdate(_id, {
        fullName: fullName, email: email, jobApply: jobApply, location: location, graduationYear: graduationYear,
        cpa: cpa, phoneNumber: phoneNumber, category: category, major: major, typeJob: typeJob, wordExperience: wordExperience, cv: cv
    }, { new: true }, function (err, data) {
        if (err) return callback(err);
        return callback(null, data);
    });
};

var removeApplier = exports.removeApplier = function removeApplier(_id, callback) {
    Applier.remove({ _id: _id }, function (err) {
        if (err) return callback(err);
        return callback(null);
    });
};
//# sourceMappingURL=applier.js.map