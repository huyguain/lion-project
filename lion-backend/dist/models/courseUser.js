'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateCourseUser = exports.getCourseUserByUserName = exports.getCourseUserById = exports.listCourse = exports.importcourseUserModel = exports.courseUserModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var courseUser = new _mongoose.Schema({
    userId: { type: _mongoose.Schema.Types.ObjectId, ref: 'User' },
    courseId: {
        _id: { type: _mongoose.Schema.Types.ObjectId, ref: 'Course' },
        sectionIds: [{
            _id: { type: _mongoose.Schema.Types.ObjectId, ref: 'Course.sections' },
            lectureIds: [{
                id: { type: _mongoose.Schema.Types.ObjectId, ref: 'Course.sections.lectures' },
                result: { type: Boolean, default: false }
            }]
        }]
    }
});
var couresUserTable = _mongoose2.default.model('CourseUser', courseUser);

var courseUserModel = exports.courseUserModel = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(callback) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return couresUserTable.findOne({ "_id": "5a7d1489602eb12260e8b733" }).populate('courseId._id').populate('userId').exec(function (err, data) {
                            return callback(null, data);
                        });

                    case 3:
                        _context.next = 9;
                        break;

                    case 5:
                        _context.prev = 5;
                        _context.t0 = _context['catch'](0);

                        console.log(_context.t0);
                        return _context.abrupt('return', callback(_context.t0));

                    case 9:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 5]]);
    }));

    return function courseUserModel(_x) {
        return _ref.apply(this, arguments);
    };
}();
var importcourseUserModel = exports.importcourseUserModel = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(userId, dataCourse, idLecture) {
        var data, _couresUserTable;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        data = {
                            userId: userId,
                            courseId: {
                                _id: dataCourse._id,
                                sectionIds: dataCourse.sections.map(function (v) {
                                    return {
                                        _id: v._id,
                                        lectureIds: v.lectures.map(function (val) {
                                            if (JSON.stringify(val._id) === JSON.stringify(idLecture)) {
                                                return {
                                                    _id: val._id,
                                                    result: true
                                                };
                                            } else {
                                                return {
                                                    _id: val._id
                                                };
                                            }
                                        })
                                    };
                                })
                            }
                        };
                        _couresUserTable = new couresUserTable(data);
                        _context2.next = 5;
                        return _couresUserTable.save(function (err, _data) {
                            return _data;
                        });

                    case 5:
                        _context2.next = 10;
                        break;

                    case 7:
                        _context2.prev = 7;
                        _context2.t0 = _context2['catch'](0);
                        return _context2.abrupt('return', _context2.t0);

                    case 10:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 7]]);
    }));

    return function importcourseUserModel(_x2, _x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
var listCourse = exports.listCourse = function listCourse(userId) {
    return couresUserTable.find({ userId: userId }).populate('courseId._id').populate('userId').exec(function (err, data) {
        if (err) return err;
        return data;
    });
};
var getCourseUserById = exports.getCourseUserById = function getCourseUserById(Id) {
    return couresUserTable.findOne({ "courseId._id": Id }).populate('courseId._id').populate('userId').exec(function (err, data) {
        if (err) return err;
        return data;
    });
};
var getCourseUserByUserName = exports.getCourseUserByUserName = function getCourseUserByUserName(userId, courseId) {
    return couresUserTable.findOne({ userId: userId, "courseId._id": courseId }).exec(function (err, data) {
        if (err) return err;
        return data;
    });
};
var updateCourseUser = exports.updateCourseUser = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dataCourse, userId, idCourse, idLecture, result) {
        var data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        data = {
                            courseId: {
                                _id: dataCourse.courseId._id,
                                sectionIds: dataCourse.courseId.sectionIds.map(function (v) {
                                    return {
                                        _id: v._id,
                                        lectureIds: v.lectureIds.map(function (val) {
                                            if (JSON.stringify(val._id) === JSON.stringify(idLecture)) {
                                                return {
                                                    _id: val._id,
                                                    result: typeof result == "boolean" ? result : true
                                                };
                                            } else {
                                                return {
                                                    _id: val._id,
                                                    result: val.result
                                                };
                                            }
                                        })
                                    };
                                })
                            }
                        };
                        _context3.prev = 1;
                        _context3.next = 4;
                        return couresUserTable.update({ userId: userId, "courseId._id": idCourse }, data, { new: true }, function (err, data) {
                            return data;
                        });

                    case 4:
                        _context3.next = 9;
                        break;

                    case 6:
                        _context3.prev = 6;
                        _context3.t0 = _context3['catch'](1);
                        return _context3.abrupt('return', _context3.t0);

                    case 9:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[1, 6]]);
    }));

    return function updateCourseUser(_x5, _x6, _x7, _x8, _x9) {
        return _ref3.apply(this, arguments);
    };
}();
//# sourceMappingURL=courseUser.js.map