'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkTokenRole = exports.checkToken = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _util = require('../lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var checkToken = exports.checkToken = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        token = req.headers.token;

                        if (!token) {
                            _context.next = 6;
                            break;
                        }

                        _context.next = 4;
                        return (0, _util.verifyToken)(token, function (err, decoded) {
                            if (err) {
                                var message = err.message;

                                return {
                                    error: {
                                        success: false,
                                        message: message
                                    }
                                };
                            } else {
                                var code = decoded.code;

                                req.code = code;
                                next();
                            }
                        });

                    case 4:
                        _context.next = 7;
                        break;

                    case 6:
                        res.status(401).json({
                            success: false,
                            message: "No token provided"
                        });

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function checkToken(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();
var checkTokenRole = exports.checkTokenRole = function checkTokenRole(req, res, next) {
    var userToken = req.headers.usertoken;
    if (userToken) {
        return _jsonwebtoken2.default.verify(userToken, _config2.default.secret, function (err, decoded) {
            if (err) {
                var message = err.message;

                return {
                    error: {
                        success: false,
                        message: message
                    }
                };
            } else {
                var role = decoded.role;

                switch (role) {
                    case 1:
                        role = "Admin";
                        break;
                    case 2:
                        role = "Design";
                        break;
                    case 3:
                        role = "Hr";
                        break;
                    case 4:
                        role = "Fresher";
                    case 5:
                        role = "Candidate";
                }
                req.role = role;
                next();
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: "No token provided"
        });
    }
};
//# sourceMappingURL=checkCode.js.map