'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateResultVideo = exports.search = exports.remove = exports.edit = exports.getCourse = exports.getById = exports.create = exports.list = exports.youtube1 = undefined;

var _course = require('../models/course');

var _LearningPath = require('../models/LearningPath');

var _youtubeFeeds = require('youtube-feeds');

var _youtubeFeeds2 = _interopRequireDefault(_youtubeFeeds);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _courseUser = require('../models/courseUser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var youtube1 = exports.youtube1 = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log('huy');
                        _context.next = 3;
                        return _youtubeFeeds2.default.feeds.videos({ q: 'EWLF_1M5LYM' }, function (err, data) {
                            if (err) console.log(err);
                            console.log('data', data);
                        });

                    case 3:
                        console.log('thom');
                        res.status(200).end('ok');

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function youtube1(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
var list = exports.list = function list(req, res) {
    var limit = "";
    (0, _course.listCourse)(limit, function (err, data) {
        if (err) {
            res.json({
                success: false
            });
        } else {
            res.json({
                success: true,
                data: data
            });
        }
    });
};
var create = exports.create = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var sections;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        sections = JSON.parse(req.body.sections);

                        req.body.sections = sections;
                        _context2.next = 5;
                        return req.files[0].filename;

                    case 5:
                        req.body.urlIcon = _context2.sent;
                        _context2.next = 8;
                        return req.files[1].filename;

                    case 8:
                        req.body.urlImage = _context2.sent;

                        (0, _course.createCourse)(req.body, function (err, data) {
                            if (err) {
                                console.log("err", err);
                                res.json({
                                    success: false,
                                    massage: "error"
                                });
                            } else {
                                res.json({
                                    success: true,
                                    massage: "success"
                                });
                            }
                        });
                        _context2.next = 15;
                        break;

                    case 12:
                        _context2.prev = 12;
                        _context2.t0 = _context2['catch'](0);

                        res.json({
                            success: true,
                            massage: "fail"
                        });

                    case 15:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 12]]);
    }));

    return function create(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
var getById = exports.getById = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var id, _data;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        id = req.params.id;
                        _context3.next = 4;
                        return (0, _courseUser.getCourseUserById)(id);

                    case 4:
                        _data = _context3.sent;

                        if (!_data) {
                            _context3.next = 9;
                            break;
                        }

                        res.status(200).json({
                            data: _data
                        });
                        _context3.next = 11;
                        break;

                    case 9:
                        _context3.next = 11;
                        return (0, _course.getCourseById)(id, function (err, data) {
                            if (err) {
                                throw err;
                            } else {
                                res.status(200).json({
                                    data: data
                                });
                            };
                        });

                    case 11:
                        _context3.next = 16;
                        break;

                    case 13:
                        _context3.prev = 13;
                        _context3.t0 = _context3['catch'](0);

                        res.status(500).send(_context3.t0);

                    case 16:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 13]]);
    }));

    return function getById(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();
var getCourse = exports.getCourse = function getCourse(req, res) {
    var id = req.params.id;

    (0, _course.getCourseById)(id, function (err, data) {
        if (err) {
            res.status(500).send();
        } else {
            res.status(200).json({
                data: data
            });
        }
    });
};
var edit = exports.edit = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var id, sections, data;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        id = req.params.id;
                        _context4.prev = 1;
                        sections = JSON.parse(req.body.sections);

                        console.log(sections);
                        req.body.sections = sections;

                        if (!(req.files.length !== 0)) {
                            _context4.next = 24;
                            break;
                        }

                        if (!(req.files[0] && req.files[1])) {
                            _context4.next = 15;
                            break;
                        }

                        _context4.next = 9;
                        return req.files[0].filename;

                    case 9:
                        req.body.urlIcon = _context4.sent;
                        _context4.next = 12;
                        return req.files[1].filename;

                    case 12:
                        req.body.urlImage = _context4.sent;
                        _context4.next = 24;
                        break;

                    case 15:
                        if (!(req.files[0].fieldname === 'imagePreview')) {
                            _context4.next = 21;
                            break;
                        }

                        _context4.next = 18;
                        return req.files[0].filename;

                    case 18:
                        req.body.urlImage = _context4.sent;
                        _context4.next = 24;
                        break;

                    case 21:
                        _context4.next = 23;
                        return req.files[0].filename;

                    case 23:
                        req.body.urlIcon = _context4.sent;

                    case 24:
                        data = req.body;

                        (0, _course.editCourse)(id, data, function (err, editCourse) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    success: false
                                });
                            } else {
                                res.json({
                                    success: true
                                });
                            }
                        });
                        _context4.next = 31;
                        break;

                    case 28:
                        _context4.prev = 28;
                        _context4.t0 = _context4['catch'](1);

                        res.json({
                            success: false,
                            massage: "fail"
                        });

                    case 31:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[1, 28]]);
    }));

    return function edit(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();
var remove = exports.remove = function remove(req, res) {
    var id = req.params.id;

    (0, _course.deleteCourse)(id, function (err, data) {
        if (err) {
            res.status(500).json({
                success: false
            });
        } else {
            try {
                var link = 'upload/' + data.urlImage;
                _fs2.default.unlinkSync(link);
            } catch (err) {
                console.log(err);
            }
            res.status(200).json({
                success: true,
                id: id
            });
        }
    });
};
var search = exports.search = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var value, dataCourse, dataLearning, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

        return regeneratorRuntime.wrap(function _callee6$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        value = req.params.value;
                        dataCourse = [], dataLearning = [];
                        _context7.prev = 2;
                        _context7.next = 5;
                        return (0, _course.searchSuggest)(value, function () {
                            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(err, data) {
                                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                    while (1) {
                                        switch (_context5.prev = _context5.next) {
                                            case 0:
                                                dataCourse = data;

                                            case 1:
                                            case 'end':
                                                return _context5.stop();
                                        }
                                    }
                                }, _callee5, undefined);
                            }));

                            return function (_x11, _x12) {
                                return _ref6.apply(this, arguments);
                            };
                        }());

                    case 5:
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context7.prev = 8;
                        _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
                            var item;
                            return regeneratorRuntime.wrap(function _loop$(_context6) {
                                while (1) {
                                    switch (_context6.prev = _context6.next) {
                                        case 0:
                                            item = _step.value;
                                            _context6.next = 3;
                                            return (0, _LearningPath.listLearning)(item._id, function (err, data) {
                                                if (!err && data.length != 0) {
                                                    var index = 0;
                                                    while (index < data.length && data[index].learningPath === undefined) {
                                                        index++;
                                                    }if (index < data.length) dataLearning.push({
                                                        learningPath: data[index].learningPath,
                                                        courseName: item.courseName,
                                                        _id: item._id
                                                    });
                                                }
                                            });

                                        case 3:
                                        case 'end':
                                            return _context6.stop();
                                    }
                                }
                            }, _loop, undefined);
                        });
                        _iterator = dataCourse[Symbol.iterator]();

                    case 11:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context7.next = 16;
                            break;
                        }

                        return _context7.delegateYield(_loop(), 't0', 13);

                    case 13:
                        _iteratorNormalCompletion = true;
                        _context7.next = 11;
                        break;

                    case 16:
                        _context7.next = 22;
                        break;

                    case 18:
                        _context7.prev = 18;
                        _context7.t1 = _context7['catch'](8);
                        _didIteratorError = true;
                        _iteratorError = _context7.t1;

                    case 22:
                        _context7.prev = 22;
                        _context7.prev = 23;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 25:
                        _context7.prev = 25;

                        if (!_didIteratorError) {
                            _context7.next = 28;
                            break;
                        }

                        throw _iteratorError;

                    case 28:
                        return _context7.finish(25);

                    case 29:
                        return _context7.finish(22);

                    case 30:
                        res.json({
                            success: true,
                            data: dataLearning
                        });
                        _context7.next = 36;
                        break;

                    case 33:
                        _context7.prev = 33;
                        _context7.t2 = _context7['catch'](2);

                        res.json({
                            success: false
                        });

                    case 36:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee6, undefined, [[2, 33], [8, 18, 22, 30], [23,, 25, 29]]);
    }));

    return function search(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();

var updateResultVideo = exports.updateResultVideo = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var _req$body$data, userId, idLecture, idCourse, result, data_CourseUser, data_out, _dataCourse;

        return regeneratorRuntime.wrap(function _callee7$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        _req$body$data = req.body.data, userId = _req$body$data.userId, idLecture = _req$body$data.idLecture, idCourse = _req$body$data.idCourse, result = _req$body$data.result;
                        _context8.prev = 1;
                        _context8.next = 4;
                        return (0, _courseUser.getCourseUserByUserName)(userId, idCourse);

                    case 4:
                        data_CourseUser = _context8.sent;

                        if (!data_CourseUser) {
                            _context8.next = 10;
                            break;
                        }

                        _context8.next = 8;
                        return (0, _courseUser.updateCourseUser)(data_CourseUser, userId, idCourse, idLecture, result);

                    case 8:
                        _context8.next = 16;
                        break;

                    case 10:
                        data_out = void 0;
                        _dataCourse = void 0;
                        _context8.next = 14;
                        return (0, _course.getCourseById)(idCourse, function (err, dataCourse) {
                            _dataCourse = dataCourse;
                        });

                    case 14:
                        _context8.next = 16;
                        return (0, _courseUser.importcourseUserModel)(userId, _dataCourse, idLecture);

                    case 16:
                        res.status(200).json({
                            success: true,
                            message: 'Upload data success!'
                        });
                        _context8.next = 22;
                        break;

                    case 19:
                        _context8.prev = 19;
                        _context8.t0 = _context8['catch'](1);

                        res.status(500).send('Upload data Error!');

                    case 22:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee7, undefined, [[1, 19]]);
    }));

    return function updateResultVideo(_x13, _x14) {
        return _ref7.apply(this, arguments);
    };
}();
//# sourceMappingURL=course.js.map