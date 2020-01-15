'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._editAdmin = exports._getAdminById = exports._deleteAdmin = exports._getAllAdmin = exports._getAdminByUser = exports._createAdmin = exports._SignInAdmin = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _util = require('../lib/util');

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Admin = new _mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    passWord: String,
    role: { type: Number, min: 1, max: 3 }, //1: SuperAdmin, 2: Design, 3: Hr;
    mobile: Number,
    token: String
});
var adminTable = _mongoose2.default.model('Admin', Admin);
//signIn
var _SignInAdmin = exports._SignInAdmin = function _SignInAdmin(userName, passWord) {
    return adminTable.findOne({ userName: userName, passWord: (0, _md2.default)(passWord) }).exec(function (err, user) {
        if (err) {
            return "Username or password is not exitst";
        } else if (user) {
            var token = (0, _util.generateTokenUser)(userName, user.role, user._id);
            user.token = token;
            user.save();
            return user;
        } else {
            return "System error in Authentication";
        }
    });
};
//create admin
var _createAdmin = exports._createAdmin = function _createAdmin(dataAdmin) {
    var _adminTable = new adminTable({
        firstName: dataAdmin.firstName,
        lastName: dataAdmin.lastName,
        userName: dataAdmin.userName,
        passWord: (0, _md2.default)(dataAdmin.passWord),
        role: dataAdmin.role, //1: SuperAdmin, 2: Design, 3: Hr;
        mobile: dataAdmin.mobile
    });
    return _adminTable.save(function (err, data) {
        if (err) {
            return 'Admin Create Error!';
        } else {
            return data;
        }
    });
};
//get admin by User
var _getAdminByUser = exports._getAdminByUser = function _getAdminByUser(userName) {
    return adminTable.findOne({ userName: userName }).exec(function (err, data) {
        if (err) {
            return 'Get data admin error!';
        } else {
            return data;
        }
    });
};
//getAllAdmin
var _getAllAdmin = exports._getAllAdmin = function _getAllAdmin() {
    return adminTable.find().exec(function (err, data) {
        if (err) {
            return 'Get Data Admin Error!';
        } else {
            return data;
        }
    });
};
//delete admin 
var _deleteAdmin = exports._deleteAdmin = function _deleteAdmin(_id) {
    return adminTable.remove({ _id: _id }, function (err) {
        if (err) {
            return err;
        } else {
            return 1;
        }
    });
};
//getAdminById
var _getAdminById = exports._getAdminById = function _getAdminById(_id) {
    return adminTable.findOne({ _id: _id }).exec(function (err, data) {
        if (err) {
            return 'Get Admin Error!';
        } else {
            return data;
        }
    });
};
var _editAdmin = exports._editAdmin = function _editAdmin(_id, dataAdmin) {
    return adminTable.findOneAndUpdate({ _id: _id }, {
        firstName: dataAdmin.firstName,
        lastName: dataAdmin.lastName,
        role: dataAdmin.role,
        mobile: dataAdmin.mobile
    }, { new: true }).exec(function (err, data) {
        if (err) {
            return 'Update Admin Error!';
        } else {
            return data;
        }
    });
};
//# sourceMappingURL=admin.js.map