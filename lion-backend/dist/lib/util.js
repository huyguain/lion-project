'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateUserInfo = exports.generateTokenUser = exports.verifyToken = exports.generateToken = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Generate token base on email, role and expiration time of token
var generateToken = exports.generateToken = function generateToken(code) {
    return _jsonwebtoken2.default.sign({ code: code }, _config2.default.secret);
};
//giaima 
var verifyToken = exports.verifyToken = function verifyToken(token, callback) {
    _jsonwebtoken2.default.verify(token, _config2.default.secret, function (err, decoded) {
        if (err) {
            callback(err);
        }
        return callback(null, decoded);
    });
};

var generateTokenUser = exports.generateTokenUser = function generateTokenUser(username, role, userId) {
    return _jsonwebtoken2.default.sign({ username: username, role: role, userId: userId }, _config2.default.secret, { expiresIn: '10h' });
};
//validate form login
var validateUserInfo = exports.validateUserInfo = function validateUserInfo(info) {
    if (!info) {
        return 'No user information found';
    }
    var userName = info.userName,
        passWord = info.passWord;

    if (!userName || !passWord) {
        if (!userName) {
            return 'UserName is a must';
        }
        if (!passWord) {
            return "Password is a must";
        }
    } else {
        if (userName.length < 6 || userName.length > 30) {
            return "Username must be between 6 to 30 character";
        }
        if (passWord.length < 6 || passWord.length > 30) {
            return "Password must be between 6 to 30 character";
        }
    }
    return '';
};
//# sourceMappingURL=util.js.map