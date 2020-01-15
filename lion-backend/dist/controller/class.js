'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.editClass = exports.getClassById = exports.deleteClass = exports.getAllClass = exports.createClass = exports.getDataClass = undefined;

var _fresher = require('../models/fresher');

var _learningPathCustomise = require('../models/learningPathCustomise');

var _class = require('../models/class');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getDataClass = exports.getDataClass = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var dataFresher, dataLearning;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return (0, _fresher._getFresherForClass)();

                    case 3:
                        dataFresher = _context.sent;

                        if (!(dataFresher.length === 0)) {
                            _context.next = 8;
                            break;
                        }

                        throw 'No Data Frehser !';

                    case 8:
                        _context.next = 10;
                        return (0, _learningPathCustomise._getLearningForClass)();

                    case 10:
                        dataLearning = _context.sent;

                        if (!(dataLearning.length === 0)) {
                            _context.next = 15;
                            break;
                        }

                        throw 'No Data Learning !';

                    case 15:
                        res.status(200).json({
                            success: true,
                            dataFresher: dataFresher,
                            dataLearning: dataLearning
                        });

                    case 16:
                        _context.next = 21;
                        break;

                    case 18:
                        _context.prev = 18;
                        _context.t0 = _context['catch'](0);

                        res.status(203).json({
                            success: false,
                            message: _context.t0
                        });

                    case 21:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 18]]);
    }));

    return function getDataClass(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
//createClass
var createClass = exports.createClass = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var dataClass, dataCheck, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        dataClass = req.body.dataClass;

                        if (dataClass) {
                            _context2.next = 6;
                            break;
                        }

                        throw 'No Data';

                    case 6:
                        _context2.next = 8;
                        return (0, _class._getClassByClassName)(dataClass.className);

                    case 8:
                        dataCheck = _context2.sent;

                        if (dataCheck) {
                            _context2.next = 20;
                            break;
                        }

                        _context2.next = 12;
                        return (0, _class._createClass)(dataClass);

                    case 12:
                        data = _context2.sent;

                        if (!data) {
                            _context2.next = 17;
                            break;
                        }

                        res.status(204).end();
                        _context2.next = 18;
                        break;

                    case 17:
                        throw 'Can\'t Create Class';

                    case 18:
                        _context2.next = 21;
                        break;

                    case 20:
                        throw 'Class Existed !';

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

    return function createClass(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
//getAllClass
var getAllClass = exports.getAllClass = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var dataClass;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return (0, _class._getAllClass)();

                    case 3:
                        dataClass = _context3.sent;

                        res.status(200).json({
                            success: true,
                            dataClass: dataClass
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

    return function getAllClass(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();
//deleteClass
var deleteClass = exports.deleteClass = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var id, checkClass;
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
                        return (0, _class._deleteClass)(id);

                    case 8:
                        checkClass = _context4.sent;

                        if (!checkClass) {
                            _context4.next = 13;
                            break;
                        }

                        res.status(204).end();
                        _context4.next = 14;
                        break;

                    case 13:
                        throw 'Can\'t Delete Class!';

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

    return function deleteClass(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();
//getClassById
var getClassById = exports.getClassById = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var id, dataClass;
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

                        throw 'No Data !';

                    case 6:
                        _context5.next = 8;
                        return (0, _class._getClassById)(id);

                    case 8:
                        dataClass = _context5.sent;

                        if (dataClass) {
                            _context5.next = 13;
                            break;
                        }

                        throw 'Can\'t Get Class';

                    case 13:
                        res.status(200).json({
                            success: true,
                            dataClass: dataClass
                        });

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

    return function getClassById(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();
//editClass
var editClass = exports.editClass = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var id, dataClass, dataCheck, data;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        id = req.params.id;
                        dataClass = req.body.dataClass;

                        if (!(!id || !dataClass)) {
                            _context6.next = 7;
                            break;
                        }

                        throw 'No Data !';

                    case 7:
                        _context6.next = 9;
                        return (0, _class._getClassByClassName)(dataClass.className);

                    case 9:
                        dataCheck = _context6.sent;

                        if (dataCheck) {
                            _context6.next = 21;
                            break;
                        }

                        _context6.next = 13;
                        return (0, _class._editClass)(id, dataClass);

                    case 13:
                        data = _context6.sent;

                        if (data) {
                            _context6.next = 18;
                            break;
                        }

                        throw 'Can\'t Update Class !';

                    case 18:
                        res.status(204).end();

                    case 19:
                        _context6.next = 22;
                        break;

                    case 21:
                        throw 'Class Existed !';

                    case 22:
                        _context6.next = 27;
                        break;

                    case 24:
                        _context6.prev = 24;
                        _context6.t0 = _context6['catch'](0);

                        res.status(203).json({
                            success: false,
                            message: _context6.t0
                        });

                    case 27:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[0, 24]]);
    }));

    return function editClass(_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}();
//# sourceMappingURL=class.js.map