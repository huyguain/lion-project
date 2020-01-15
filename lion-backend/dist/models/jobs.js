'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeJob = exports.editJob = exports.getOneJob = exports.listJobCategoryLocation = exports.listJobHashtag = exports.listJobLocation = exports.listJobCategory = exports.listJob = exports.createJob = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _slug = require('slug');

var _slug2 = _interopRequireDefault(_slug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jobsSchema = new _mongoose.Schema({
    title: String,
    location: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    deadlineSubmit: Date, //Han nop
    joinDate: Date, //ngay khai giang, bat dau lam viec
    category: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }, //fresher, thuc tap, junior
    salary: Number,
    offer: [{
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
    }],
    hashTag: [],
    content: String
});

var Jobs = _mongoose2.default.model('Jobs', jobsSchema);

var createJob = exports.createJob = function createJob(body, callback) {
    var title = body.title,
        location = body.location,
        deadlineSubmit = body.deadlineSubmit,
        joinDate = body.joinDate,
        category = body.category,
        salary = body.salary,
        offer = body.offer,
        hashTag = body.hashTag,
        content = body.content;

    Jobs.create({
        title: title,
        location: location,
        deadlineSubmit: deadlineSubmit,
        joinDate: joinDate,
        category: category,
        salary: salary,
        offer: offer,
        hashTag: hashTag,
        content: content
    }, function (err, data) {
        if (err) return callback(err);
        return callback(null, data);
    });
};

var listJob = exports.listJob = function listJob(callback) {
    Jobs.find({ deadlineSubmit: { $gt: Date.now() } }).limit(25).sort({ _id: 1 }).populate("location").populate("offer").populate('category').then(function (data) {
        return callback(null, data);
    }).catch(function (err) {
        return callback(err);
    });
};

var listJobCategory = exports.listJobCategory = function listJobCategory(category, callback) {
    console.log('date-now', Date.now());
    Jobs.find({ deadlineSubmit: { $gt: Date.now() } }).limit(25).sort({ deadlineSubmit: -1 }).populate("location").populate("offer").populate('category').then(function (data) {
        data = data.filter(function (item) {
            return item.category.title.toLowerCase() === category;
        });
        callback(null, data);
    }).catch(function (err) {
        return callback(err);
    });
};

var listJobLocation = exports.listJobLocation = function listJobLocation(location, callback) {
    console.log('date-now', location);
    Jobs.find({ deadlineSubmit: { $gt: Date.now() } }).limit(25).sort({ deadlineSubmit: -1 }).populate("location").populate("offer").populate('category').then(function (data) {
        console.log('data-back', data[0].location.zone, location);
        data = data.filter(function (item) {
            return (0, _slug2.default)(item.location.zone.toLowerCase().trim()) === location;
        });
        console.log('data', data);
        callback(null, data);
    }).catch(function (err) {
        return callback(err);
    });
};

var listJobHashtag = exports.listJobHashtag = function listJobHashtag(hashTag, callback) {
    console.log('date-now', hashTag);
    Jobs.find({ deadlineSubmit: { $gt: Date.now() }, hashTag: hashTag }).limit(25).sort({ deadlineSubmit: -1 }).populate("location").populate("offer").populate('category').then(function (data) {
        // data = data.filter(item => item.category.title.toLowerCase() === category);
        callback(null, data);
    }).catch(function (err) {
        return callback(err);
    });
};

var listJobCategoryLocation = exports.listJobCategoryLocation = function listJobCategoryLocation(category, location, callback) {
    Jobs.find({ location: location }).populate("location").populate("offer").populate('category').then(function (data) {
        data = data.filter(function (item) {
            return item.category.title.toLowerCase() === category;
        });
        callback(null, data);
    }).catch(function (err) {
        return callback(err);
    });
};

var getOneJob = exports.getOneJob = function getOneJob(_id, callback) {
    Jobs.find({ _id: _id }).populate("location").populate("offer").populate('category').then(function (data) {
        return callback(null, data);
    }).catch(function (err) {
        return callback(err);
    });
};

var editJob = exports.editJob = function editJob(_id, body, callback) {
    var title = body.title,
        location = body.location,
        deadlineSubmit = body.deadlineSubmit,
        joinDate = body.joinDate,
        category = body.category,
        salary = body.salary,
        offer = body.offer,
        hashTag = body.hashTag,
        content = body.content;

    Jobs.findByIdAndUpdate(_id, {
        title: title, location: location, deadlineSubmit: deadlineSubmit, joinDate: joinDate,
        category: category, salary: salary, offer: offer, hashTag: hashTag, content: content
    }, { new: true }, function (err, data) {
        if (err) return callback(err);
        return callback(null, data);
    });
};

var removeJob = exports.removeJob = function removeJob(_id, callback) {
    Jobs.remove({ _id: _id }, function (err) {
        if (err) return callback(err);
        return callback(null);
    });
};
//# sourceMappingURL=jobs.js.map