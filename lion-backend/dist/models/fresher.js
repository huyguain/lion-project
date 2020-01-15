'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._getFresherForClass = exports._editFresherById = exports._getFresherById = exports._deleteFresherById = exports._getAllFresher = exports._getCampuslinkByUserName = exports._createCampuslink = exports._SignInFresher = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fresher = new _mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    mobile: Number,
    language: String,
    program: String,
    note: String,
    startDate: Date,
    finalIds: [{
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'Final'
    }],
    university: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'University'
    },
    token: String
});
var fresherTable = _mongoose2.default.model('Fresher', Fresher);
//
var _SignInFresher = exports._SignInFresher = function _SignInFresher(userName, passWord) {
    return fresherTable.findOne({ userName: userName, passWord: (0, _md2.default)(passWord) }).exec(function (err, fresher) {
        if (err) {
            return "Username or password is not exitst";
        } else if (fresher) {
            var token = generateTokenUser(userName, fresher.program, fresher._id);
            fresher.token = token;
            fresher.save();
            return fresher;
        } else {
            return "System error in Authentication";
        }
    });
};
//createCampuslink
var _createCampuslink = exports._createCampuslink = function _createCampuslink(dataCampuslink) {
    var _fresherTable = new fresherTable({
        firstName: dataCampuslink.firstName,
        lastName: dataCampuslink.lastName,
        email: dataCampuslink.email,
        mobile: dataCampuslink.mobile,
        language: dataCampuslink.language,
        program: 'Campuslink',
        note: dataCampuslink.note,
        startDate: dataCampuslink.startDate,
        university: dataCampuslink.university
    });
    return _fresherTable.save(function (err, data) {
        if (err) {
            return 'Create Campuslink Error !';
        } else {
            return data;
        }
    });
};
//getCampuslinkByUserName
var _getCampuslinkByUserName = exports._getCampuslinkByUserName = function _getCampuslinkByUserName(userName) {
    return fresherTable.findOne({ userName: userName }).exec(function (err, data) {
        if (err) {
            return 'Get Campus Error !';
        } else {
            return data;
        }
    });
};
//getAllFresher
var _getAllFresher = exports._getAllFresher = function _getAllFresher() {
    return fresherTable.find({}).select({
        firstName: 1, lastName: 1, email: 1, mobile: 1, language: 1,
        program: 1, note: 1, startDate: 1, university: 1
    }).exec(function (err, data) {
        if (err) {
            return 'Get Fresher Error !';
        } else {
            return data;
        }
    });
};
//deleteFresherById
var _deleteFresherById = exports._deleteFresherById = function _deleteFresherById(_id) {
    return fresherTable.remove({ _id: _id }, function (err) {
        if (err) {
            return 'Delete Frehser Error !';
        } else {
            return 1;
        }
    });
};
//getFresherById
var _getFresherById = exports._getFresherById = function _getFresherById(_id) {
    return fresherTable.findOne({ _id: _id }).select({
        firstName: 1, lastName: 1, email: 1, mobile: 1, language: 1,
        program: 1, note: 1, startDate: 1, university: 1
    }).exec(function (err, data) {
        if (err) {
            return 'Get Fresher Error!';
        } else {
            return data;
        }
    });
};
//editFresherById
var _editFresherById = exports._editFresherById = function _editFresherById(_id, dataFresher) {
    return fresherTable.findOneAndUpdate({ _id: _id }, {
        firstName: dataFresher.firstName,
        lastName: dataFresher.lastName,
        mobile: dataFresher.mobile,
        language: dataFresher.language,
        note: dataFresher.note,
        startDate: dataFresher.startDate,
        university: dataFresher.university
    }, { new: true }).exec(function (err, data) {
        if (err) {
            return 'Update Frehser Error !';
        } else {
            return data;
        }
    });
};
//getFresherForClass 
var _getFresherForClass = exports._getFresherForClass = function _getFresherForClass() {
    return fresherTable.find({}).select({ email: 1 }).exec(function (err, data) {
        if (err) {
            return 'Get Data Fresher Error !';
        } else {
            return data;
        }
    });
};
//# sourceMappingURL=fresher.js.map