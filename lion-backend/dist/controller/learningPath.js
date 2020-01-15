'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLearningPath = exports.getLearningPathName = exports.remove = exports.edit = exports.getById = exports.list = exports.listMyCourse = exports.create = undefined;

var _LearningPath = require('../models/LearningPath');

var _course = require('../models/course');

var _courseUser = require('../models/courseUser');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var create = exports.create = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, language, learningPath, courseIds, title, content;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _req$body = req.body, language = _req$body.language, learningPath = _req$body.learningPath, courseIds = _req$body.courseIds, title = _req$body.title, content = _req$body.content;

                        (0, _LearningPath.createLearningPath)(language, learningPath, courseIds, title, content, function (err, data) {
                            if (err) {
                                res.json({
                                    success: false,
                                    message: "error"
                                });
                            } else {
                                res.json({
                                    success: true,
                                    message: "success"
                                });
                            }
                        });

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function create(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var listMyCourse = exports.listMyCourse = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var id, dataLearning, dataCourse, dataSet, dataAll, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, i, _data, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, j, obj, dataLearningPath, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop, _iterator2, _step2;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        id = req.params.id;
                        dataLearning = [];
                        dataCourse = [];
                        dataSet = new Set();
                        _context2.next = 7;
                        return (0, _courseUser.listCourse)(id);

                    case 7:
                        dataAll = _context2.sent;

                        if (!(dataAll === [])) {
                            _context2.next = 12;
                            break;
                        }

                        throw 'No Data!';

                    case 12:
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context2.prev = 15;
                        _iterator = dataAll[Symbol.iterator]();

                    case 17:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context2.next = 46;
                            break;
                        }

                        i = _step.value;

                        if (!i.courseId) {
                            _context2.next = 43;
                            break;
                        }

                        dataCourse.push(i.courseId);
                        _context2.next = 23;
                        return (0, _LearningPath.listLearning)(i.courseId._id._id);

                    case 23:
                        _data = _context2.sent;
                        _iteratorNormalCompletion3 = true;
                        _didIteratorError3 = false;
                        _iteratorError3 = undefined;
                        _context2.prev = 27;

                        for (_iterator3 = _data[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            j = _step3.value;
                            obj = {
                                learningPath: j.learningPath,
                                idCourse: i.courseId._id._id
                            };

                            dataLearning.push(obj);
                        }
                        _context2.next = 35;
                        break;

                    case 31:
                        _context2.prev = 31;
                        _context2.t0 = _context2['catch'](27);
                        _didIteratorError3 = true;
                        _iteratorError3 = _context2.t0;

                    case 35:
                        _context2.prev = 35;
                        _context2.prev = 36;

                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }

                    case 38:
                        _context2.prev = 38;

                        if (!_didIteratorError3) {
                            _context2.next = 41;
                            break;
                        }

                        throw _iteratorError3;

                    case 41:
                        return _context2.finish(38);

                    case 42:
                        return _context2.finish(35);

                    case 43:
                        _iteratorNormalCompletion = true;
                        _context2.next = 17;
                        break;

                    case 46:
                        _context2.next = 52;
                        break;

                    case 48:
                        _context2.prev = 48;
                        _context2.t1 = _context2['catch'](15);
                        _didIteratorError = true;
                        _iteratorError = _context2.t1;

                    case 52:
                        _context2.prev = 52;
                        _context2.prev = 53;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 55:
                        _context2.prev = 55;

                        if (!_didIteratorError) {
                            _context2.next = 58;
                            break;
                        }

                        throw _iteratorError;

                    case 58:
                        return _context2.finish(55);

                    case 59:
                        return _context2.finish(52);

                    case 60:
                        dataLearning.map(function (v, i) {
                            dataSet.add(v.learningPath);
                        });
                        dataLearningPath = [];
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context2.prev = 65;

                        _loop = function _loop() {
                            var i = _step2.value;

                            var dataIdCourse = [];
                            dataLearning.map(function (v) {
                                if (i === v.learningPath) {
                                    dataIdCourse.push(v.idCourse);
                                }
                            });
                            var obj = {
                                name: i,
                                data: dataIdCourse
                            };
                            dataLearningPath.push(obj);
                        };

                        for (_iterator2 = dataSet[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            _loop();
                        }
                        _context2.next = 74;
                        break;

                    case 70:
                        _context2.prev = 70;
                        _context2.t2 = _context2['catch'](65);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context2.t2;

                    case 74:
                        _context2.prev = 74;
                        _context2.prev = 75;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }

                    case 77:
                        _context2.prev = 77;

                        if (!_didIteratorError2) {
                            _context2.next = 80;
                            break;
                        }

                        throw _iteratorError2;

                    case 80:
                        return _context2.finish(77);

                    case 81:
                        return _context2.finish(74);

                    case 82:
                        res.json({
                            success: true,
                            message: "success",
                            dataCourse: dataCourse,
                            dataLearningPath: dataLearningPath
                        });

                    case 83:
                        ;

                        _context2.next = 89;
                        break;

                    case 86:
                        _context2.prev = 86;
                        _context2.t3 = _context2['catch'](0);

                        res.json({
                            success: false,
                            message: _context2.t3
                        });

                    case 89:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 86], [15, 48, 52, 60], [27, 31, 35, 43], [36,, 38, 42], [53,, 55, 59], [65, 70, 74, 82], [75,, 77, 81]]);
    }));

    return function listMyCourse(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var list = exports.list = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        (0, _LearningPath.listLearningPath)(function (err, data) {
                            if (err) {
                                res.json({
                                    success: false,
                                    message: "error"
                                });
                            } else {
                                res.json({
                                    success: true,
                                    message: "success",
                                    data: data
                                });
                            }
                        });

                    case 1:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function list(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var getById = exports.getById = function getById(req, res) {
    var id = req.params.id;

    (0, _LearningPath.getLearningById)(id, function (err, data) {
        if (err) {
            res.json({
                success: false,
                message: 'error'
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'success',
                data: data
            });
        }
    });
};

var edit = exports.edit = function edit(req, res) {
    var id = req.params.id;
    var _req$body2 = req.body,
        language = _req$body2.language,
        learningPath = _req$body2.learningPath,
        courseIds = _req$body2.courseIds,
        title = _req$body2.title,
        content = _req$body2.content;

    (0, _LearningPath.editLearningById)(id, language, learningPath, courseIds, title, content, function (err, data) {
        if (err) {
            res.json({
                success: false,
                message: 'error'
            });
        } else {
            res.json({
                success: true,
                message: 'success'
            });
        }
    });
};

var remove = exports.remove = function remove(req, res) {
    var id = req.params.id;

    (0, _LearningPath.removeLearning)(id, function (err) {
        if (err) {
            res.json({
                success: false,
                message: 'error'
            });
        } else {
            res.json({
                success: true,
                message: 'success'
            });
        }
    });
};
//getLearningPathName
var getLearningPathName = exports.getLearningPathName = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var dataLearning;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return (0, _LearningPath._getLearningPathName)();

                    case 3:
                        dataLearning = _context4.sent;

                        if (!(dataLearning.length === 0)) {
                            _context4.next = 8;
                            break;
                        }

                        throw 'Learning Path Does Not Existed !';

                    case 8:
                        res.status(200).json({
                            success: true,
                            dataLearning: dataLearning
                        });

                    case 9:
                        _context4.next = 14;
                        break;

                    case 11:
                        _context4.prev = 11;
                        _context4.t0 = _context4['catch'](0);

                        res.status(203).json({
                            success: false,
                            message: _context4.t0
                        });

                    case 14:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 11]]);
    }));

    return function getLearningPathName(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();
//getLearningPath
var getLearningPath = exports.getLearningPath = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var id, dataLearning, dataCourse;
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

                        throw 'No Data';

                    case 6:
                        _context5.next = 8;
                        return (0, _LearningPath._getLearningPath)(id);

                    case 8:
                        dataLearning = _context5.sent;

                        if (dataLearning) {
                            _context5.next = 13;
                            break;
                        }

                        throw 'Can\'t Not Get Learning !';

                    case 13:
                        _context5.next = 15;
                        return (0, _course._getAllCourse)();

                    case 15:
                        dataCourse = _context5.sent;

                        res.status(200).json({
                            success: true,
                            dataLearning: dataLearning,
                            dataCourse: dataCourse
                        });

                    case 17:
                        _context5.next = 22;
                        break;

                    case 19:
                        _context5.prev = 19;
                        _context5.t0 = _context5['catch'](0);

                        res.status(203).json({
                            success: false,
                            message: _context5.t0
                        });

                    case 22:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 19]]);
    }));

    return function getLearningPath(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();
//# sourceMappingURL=learningPath.js.map