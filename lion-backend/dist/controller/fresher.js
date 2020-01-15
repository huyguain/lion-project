'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.editFresherById = exports.getFresherById = exports.deleteFresherById = exports.getAllFresher = exports.createCampuslink = undefined;

var _fresher = require('../models/fresher');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var createCampuslink = exports.createCampuslink = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var dataCampuslink, checkCampus, dataCampus;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        dataCampuslink = req.body.dataCampuslink;

                        if (dataCampuslink) {
                            _context.next = 6;
                            break;
                        }

                        throw 'No Data !';

                    case 6:
                        _context.next = 8;
                        return (0, _fresher._getCampuslinkByUserName)(dataCampuslink.userName);

                    case 8:
                        checkCampus = _context.sent;

                        if (checkCampus) {
                            _context.next = 18;
                            break;
                        }

                        dataCampus = (0, _fresher._createCampuslink)(dataCampuslink);

                        if (!dataCampus) {
                            _context.next = 15;
                            break;
                        }

                        res.status(204).end();
                        _context.next = 16;
                        break;

                    case 15:
                        throw 'Can\'t Create Campuslink !';

                    case 16:
                        _context.next = 19;
                        break;

                    case 18:
                        throw 'Campuslink existed !';

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

    return function createCampuslink(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
//getAllFresher
var getAllFresher = exports.getAllFresher = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var dataFresher;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return (0, _fresher._getAllFresher)();

                    case 3:
                        dataFresher = _context2.sent;

                        res.status(200).json({
                            success: true,
                            dataFresher: dataFresher
                        });
                        _context2.next = 10;
                        break;

                    case 7:
                        _context2.prev = 7;
                        _context2.t0 = _context2['catch'](0);

                        res.status(403).json({
                            success: false,
                            message: _context2.t0
                        });

                    case 10:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 7]]);
    }));

    return function getAllFresher(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
//deleteFresherById
var deleteFresherById = exports.deleteFresherById = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var id, checkFresher;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        id = req.params.id;

                        if (id) {
                            _context3.next = 6;
                            break;
                        }

                        throw 'No Data !';

                    case 6:
                        _context3.next = 8;
                        return (0, _fresher._deleteFresherById)(id);

                    case 8:
                        checkFresher = _context3.sent;

                        if (!checkFresher) {
                            _context3.next = 13;
                            break;
                        }

                        res.status(204).end();
                        _context3.next = 14;
                        break;

                    case 13:
                        throw 'Can\'t Delete Fresher';

                    case 14:
                        _context3.next = 19;
                        break;

                    case 16:
                        _context3.prev = 16;
                        _context3.t0 = _context3['catch'](0);

                        res.status(403).json({
                            success: false,
                            message: _context3.t0
                        });

                    case 19:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 16]]);
    }));

    return function deleteFresherById(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();
//getFresherById
var getFresherById = exports.getFresherById = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var id, dataFresher;
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

                        throw 'No Data !';

                    case 6:
                        _context4.next = 8;
                        return (0, _fresher._getFresherById)(id);

                    case 8:
                        dataFresher = _context4.sent;

                        if (dataFresher) {
                            _context4.next = 13;
                            break;
                        }

                        throw 'Can\'t Get Fresher !';

                    case 13:
                        res.status(200).json({
                            success: true,
                            dataFresher: dataFresher
                        });

                    case 14:
                        _context4.next = 19;
                        break;

                    case 16:
                        _context4.prev = 16;
                        _context4.t0 = _context4['catch'](0);

                        res.status(203).json({
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

    return function getFresherById(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();
//editFresherById
var editFresherById = exports.editFresherById = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var id, dataCampuslink, dataFresher;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        id = req.params.id;
                        dataCampuslink = req.body.dataCampuslink;

                        if (!(!id || !dataCampuslink)) {
                            _context5.next = 7;
                            break;
                        }

                        throw 'No Data !';

                    case 7:
                        _context5.next = 9;
                        return (0, _fresher._editFresherById)(id, dataCampuslink);

                    case 9:
                        dataFresher = _context5.sent;

                        if (dataFresher) {
                            _context5.next = 14;
                            break;
                        }

                        throw 'Can\'t Update Fresher !';

                    case 14:
                        res.status(204).end();

                    case 15:
                        _context5.next = 20;
                        break;

                    case 17:
                        _context5.prev = 17;
                        _context5.t0 = _context5['catch'](0);

                        res.status(203).json({
                            success: true,
                            message: _context5.t0
                        });

                    case 20:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 17]]);
    }));

    return function editFresherById(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();
//# sourceMappingURL=fresher.js.map