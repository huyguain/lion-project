'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.editLearningCusById = exports.getLearningCusById = exports.deleteLearningCus = exports.getAllLearningCus = exports.createLearningPathCus = undefined;

var _learningPathCustomise = require('../models/learningPathCustomise');

var _course = require('../models/course');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var createLearningPathCus = exports.createLearningPathCus = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var dataLearningPathCus, dataCoures, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, id, dataCus;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        dataLearningPathCus = req.body.dataLearningPathCus;

                        if (dataLearningPathCus) {
                            _context.next = 6;
                            break;
                        }

                        throw 'No Data !';

                    case 6:
                        dataCoures = new Set();
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 10;

                        for (_iterator = dataLearningPathCus.courseIds[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            id = _step.value;

                            dataCoures.add(id);
                        }
                        _context.next = 18;
                        break;

                    case 14:
                        _context.prev = 14;
                        _context.t0 = _context['catch'](10);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 18:
                        _context.prev = 18;
                        _context.prev = 19;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 21:
                        _context.prev = 21;

                        if (!_didIteratorError) {
                            _context.next = 24;
                            break;
                        }

                        throw _iteratorError;

                    case 24:
                        return _context.finish(21);

                    case 25:
                        return _context.finish(18);

                    case 26:
                        dataCus = (0, _learningPathCustomise._createLearningPathCus)(dataLearningPathCus, dataCoures);

                        if (dataCus) {
                            _context.next = 31;
                            break;
                        }

                        throw 'Can\'t Create Learning Path';

                    case 31:
                        res.status(204).end();

                    case 32:
                        _context.next = 37;
                        break;

                    case 34:
                        _context.prev = 34;
                        _context.t1 = _context['catch'](0);

                        res.status(203).json({
                            success: false,
                            message: _context.t1
                        });

                    case 37:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 34], [10, 14, 18, 26], [19,, 21, 25]]);
    }));

    return function createLearningPathCus(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
//getAllLearningCus
var getAllLearningCus = exports.getAllLearningCus = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var dataLearning;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return (0, _learningPathCustomise._getAllLearningCus)();

                    case 3:
                        dataLearning = _context2.sent;

                        res.status(200).json({
                            success: true,
                            dataLearning: dataLearning
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

    return function getAllLearningCus(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
//deleteLearningCus
var deleteLearningCus = exports.deleteLearningCus = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var id, checkLearning;
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
                        return (0, _learningPathCustomise._deleteLearningCus)(id);

                    case 8:
                        checkLearning = _context3.sent;

                        if (!checkLearning) {
                            _context3.next = 13;
                            break;
                        }

                        res.status(204).end();
                        _context3.next = 14;
                        break;

                    case 13:
                        throw 'Can\'t Delete Learning !';

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

    return function deleteLearningCus(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();
//getLearningCusById
var getLearningCusById = exports.getLearningCusById = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var id, dataLearning, dataCourse;
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
                        return (0, _learningPathCustomise._getLearningCusById)(id);

                    case 8:
                        dataLearning = _context4.sent;

                        if (dataLearning) {
                            _context4.next = 13;
                            break;
                        }

                        throw 'Can\'t Get Learning !';

                    case 13:
                        _context4.next = 15;
                        return (0, _course._getAllCourse)();

                    case 15:
                        dataCourse = _context4.sent;

                        res.status(200).json({
                            success: true,
                            dataLearning: dataLearning,
                            dataCourse: dataCourse
                        });

                    case 17:
                        _context4.next = 22;
                        break;

                    case 19:
                        _context4.prev = 19;
                        _context4.t0 = _context4['catch'](0);

                        res.status(203).json({
                            success: false,
                            message: _context4.t0
                        });

                    case 22:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 19]]);
    }));

    return function getLearningCusById(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();
//editLearningCusById
var editLearningCusById = exports.editLearningCusById = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var id, dataLearningPathCus, dataCoures, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _id, dataLearning;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        id = req.params.id;
                        dataLearningPathCus = req.body.dataLearningPathCus;

                        if (!(!id || !dataLearningPathCus)) {
                            _context5.next = 7;
                            break;
                        }

                        throw 'No Data !';

                    case 7:
                        dataCoures = new Set();
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context5.prev = 11;

                        for (_iterator2 = dataLearningPathCus.courseIds[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            _id = _step2.value;

                            dataCoures.add(_id);
                        }
                        _context5.next = 19;
                        break;

                    case 15:
                        _context5.prev = 15;
                        _context5.t0 = _context5['catch'](11);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context5.t0;

                    case 19:
                        _context5.prev = 19;
                        _context5.prev = 20;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }

                    case 22:
                        _context5.prev = 22;

                        if (!_didIteratorError2) {
                            _context5.next = 25;
                            break;
                        }

                        throw _iteratorError2;

                    case 25:
                        return _context5.finish(22);

                    case 26:
                        return _context5.finish(19);

                    case 27:
                        _context5.next = 29;
                        return (0, _learningPathCustomise._editLearningCusById)(id, dataLearningPathCus, dataCoures);

                    case 29:
                        dataLearning = _context5.sent;

                        if (dataLearning) {
                            _context5.next = 34;
                            break;
                        }

                        throw 'Can\'t Update Learning !';

                    case 34:
                        res.status(204).end();

                    case 35:
                        _context5.next = 40;
                        break;

                    case 37:
                        _context5.prev = 37;
                        _context5.t1 = _context5['catch'](0);

                        res.status(203).json({
                            success: false,
                            message: _context5.t1
                        });

                    case 40:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 37], [11, 15, 19, 27], [20,, 22, 26]]);
    }));

    return function editLearningCusById(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();
//# sourceMappingURL=learningPathCustomise.js.map