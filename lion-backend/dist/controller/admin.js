'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.editAdmin = exports.getAdminById = exports.deleteAdmin = exports.getAllAdmin = exports.createAdmin = exports.signIn = undefined;

var _admin = require('../models/admin');

var _fresher = require('../models/fresher');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var signIn = exports.signIn = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, userName, passWord, type, admin, user;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _req$body = req.body, userName = _req$body.userName, passWord = _req$body.passWord, type = _req$body.type;

                        if (!(!userName || !passWord || !type)) {
                            _context.next = 6;
                            break;
                        }

                        throw 'No Data!';

                    case 6:
                        if (!(type === 'Admin')) {
                            _context.next = 13;
                            break;
                        }

                        _context.next = 9;
                        return (0, _admin._SignInAdmin)(userName, passWord);

                    case 9:
                        admin = _context.sent;

                        res.status(200).json({
                            success: true,
                            token: admin.token
                        });
                        _context.next = 19;
                        break;

                    case 13:
                        _context.next = 15;
                        return (0, _fresher._SignInFresher)(userName, passWord);

                    case 15:
                        user = _context.sent;

                        if (user) {
                            _context.next = 18;
                            break;
                        }

                        throw 'Fresher does not exist !';

                    case 18:
                        res.status(200).json({
                            success: true,
                            token: user.token
                        });

                    case 19:
                        _context.next = 24;
                        break;

                    case 21:
                        _context.prev = 21;
                        _context.t0 = _context['catch'](0);

                        res.status(203).json({
                            success: false,
                            message: _context.t0
                        });

                    case 24:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 21]]);
    }));

    return function signIn(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
//create Admin
var createAdmin = exports.createAdmin = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var dataAdmin, _dataAdmin, data;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        dataAdmin = req.body.dataAdmin;

                        if (dataAdmin) {
                            _context2.next = 6;
                            break;
                        }

                        throw 'No Data!';

                    case 6:
                        _context2.next = 8;
                        return (0, _admin._getAdminByUser)(dataAdmin.userName);

                    case 8:
                        _dataAdmin = _context2.sent;

                        if (!_dataAdmin) {
                            _context2.next = 13;
                            break;
                        }

                        throw 'Admin existed!';

                    case 13:
                        _context2.next = 15;
                        return (0, _admin._createAdmin)(dataAdmin);

                    case 15:
                        data = _context2.sent;

                        if (!data) {
                            _context2.next = 20;
                            break;
                        }

                        res.status(204).end();
                        _context2.next = 21;
                        break;

                    case 20:
                        throw 'Can\'t Not Create Admin';

                    case 21:
                        _context2.next = 26;
                        break;

                    case 23:
                        _context2.prev = 23;
                        _context2.t0 = _context2['catch'](0);

                        res.status(203).json({
                            success: false,
                            message: _context2.t0
                        });

                    case 26:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 23]]);
    }));

    return function createAdmin(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
//getAllAdmin
var getAllAdmin = exports.getAllAdmin = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var dataAdmin;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return (0, _admin._getAllAdmin)();

                    case 3:
                        dataAdmin = _context3.sent;

                        res.status(200).json({
                            success: true,
                            dataAdmin: dataAdmin
                        });
                        _context3.next = 10;
                        break;

                    case 7:
                        _context3.prev = 7;
                        _context3.t0 = _context3['catch'](0);

                        res.status(403).json({
                            success: false,
                            message: _context3.t0
                        });

                    case 10:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 7]]);
    }));

    return function getAllAdmin(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();
//delete Admin
var deleteAdmin = exports.deleteAdmin = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var id, check;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        id = req.params.id;

                        if (id) {
                            _context4.next = 6;
                            break;
                        }

                        throw 'No Data';

                    case 6:
                        _context4.next = 8;
                        return (0, _admin._deleteAdmin)(id);

                    case 8:
                        check = _context4.sent;

                        if (!check) {
                            _context4.next = 13;
                            break;
                        }

                        res.status(204).end();
                        _context4.next = 14;
                        break;

                    case 13:
                        throw 'Delete Admin Error!';

                    case 14:
                        _context4.next = 19;
                        break;

                    case 16:
                        _context4.prev = 16;
                        _context4.t0 = _context4['catch'](0);

                        res.status(403).json({
                            success: false,
                            message: _context4.t0
                        });

                    case 19:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 16]]);
    }));

    return function deleteAdmin(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();
//getAdminById
var getAdminById = exports.getAdminById = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var id, dataAdmin;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        id = req.params.id;

                        if (id) {
                            _context5.next = 6;
                            break;
                        }

                        throw 'No Data!';

                    case 6:
                        _context5.next = 8;
                        return (0, _admin._getAdminById)(id);

                    case 8:
                        dataAdmin = _context5.sent;

                        if (!dataAdmin) {
                            _context5.next = 13;
                            break;
                        }

                        res.status(200).json({
                            success: true,
                            dataAdmin: dataAdmin
                        });
                        _context5.next = 14;
                        break;

                    case 13:
                        throw 'Can\'t not get Admin!';

                    case 14:
                        _context5.next = 19;
                        break;

                    case 16:
                        _context5.prev = 16;
                        _context5.t0 = _context5['catch'](0);

                        res.status(203).json({
                            success: false,
                            message: _context5.t0
                        });

                    case 19:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 16]]);
    }));

    return function getAdminById(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();
//editAdmin
var editAdmin = exports.editAdmin = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var id, dataAdmin, data;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        id = req.params.id;
                        dataAdmin = req.body.dataAdmin;

                        if (!(!id || !dataAdmin)) {
                            _context6.next = 7;
                            break;
                        }

                        throw 'No Data!';

                    case 7:
                        _context6.next = 9;
                        return (0, _admin._editAdmin)(id, dataAdmin);

                    case 9:
                        data = _context6.sent;

                        if (!data) {
                            _context6.next = 14;
                            break;
                        }

                        res.status(204).end();
                        _context6.next = 15;
                        break;

                    case 14:
                        throw 'Can\'t Not Updata Admin!';

                    case 15:
                        _context6.next = 20;
                        break;

                    case 17:
                        _context6.prev = 17;
                        _context6.t0 = _context6['catch'](0);

                        res.status(203).json({
                            success: false,
                            message: _context6.t0
                        });

                    case 20:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[0, 17]]);
    }));

    return function editAdmin(_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}();
//# sourceMappingURL=admin.js.map