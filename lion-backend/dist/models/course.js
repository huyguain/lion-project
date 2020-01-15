'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getInfoQuestionQuiz = exports.deleteCourse = exports.searchSuggest = exports._getAllCourse = exports.listCourse = exports.getCourseById = exports.editCourse = exports.createCourse = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Lecture = new _mongoose.Schema({
    type: String,
    urlVideo: String,
    title: String,
    duration: Number,
    numberQuestion: Number,
    passScore: Number,
    result: String
});
var Section = new _mongoose.Schema({
    section: String,
    lectures: [Lecture]
});
var Course = new _mongoose.Schema({
    language: String,
    courseName: String,
    urlIcon: String,
    urlImage: String,
    totalTime: Number,
    start_at: Date,
    deadline: Date,
    title: String,
    content: String,
    sections: [Section]
});

var CourseModel = _mongoose2.default.model('Course', Course);

var createCourse = exports.createCourse = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(newCourse, callback) {
        var course, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        course = new CourseModel(newCourse);
                        _context.prev = 1;
                        _context.next = 4;
                        return course.save();

                    case 4:
                        data = _context.sent;

                        callback(null, data);
                        _context.next = 11;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](1);

                        callback(_context.t0);

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 8]]);
    }));

    return function createCourse(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var editCourse = exports.editCourse = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, _editCourse, callback) {
        var doc, language, courseName, title, content, urlVideo, urlIcon, urlImage, sections, link, _link, course;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return CourseModel.findById({ _id: id });

                    case 3:
                        doc = _context2.sent;
                        language = _editCourse.language, courseName = _editCourse.courseName, title = _editCourse.title, content = _editCourse.content, urlVideo = _editCourse.urlVideo, urlIcon = _editCourse.urlIcon, urlImage = _editCourse.urlImage, sections = _editCourse.sections;

                        doc.urlVideo = urlVideo;
                        doc.language = language;
                        doc.courseName = courseName;
                        doc.title = title;
                        doc.content = content;
                        doc.sections = sections;
                        if (urlImage || urlIcon) {
                            if (urlImage) {
                                try {
                                    link = 'upload/' + doc.urlImage;

                                    _fs2.default.unlinkSync(link);
                                } catch (err) {
                                    console.log(err);
                                }
                                doc.urlImage = urlImage;
                            }
                            if (urlIcon) {
                                try {
                                    _link = 'upload/' + doc.urlIcon;

                                    _fs2.default.unlinkSync(_link);
                                } catch (err) {
                                    console.log(err);
                                }
                                doc.urlIcon = urlIcon;
                            }
                        }
                        _context2.next = 14;
                        return doc.save();

                    case 14:
                        course = _context2.sent;

                        callback(null, course);
                        _context2.next = 21;
                        break;

                    case 18:
                        _context2.prev = 18;
                        _context2.t0 = _context2['catch'](0);

                        callback(_context2.t0);

                    case 21:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 18]]);
    }));

    return function editCourse(_x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
    };
}();
var getCourseById = exports.getCourseById = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, callback) {
        var doc;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return CourseModel.findById({ _id: id });

                    case 3:
                        doc = _context3.sent;

                        callback(null, doc);
                        _context3.next = 10;
                        break;

                    case 7:
                        _context3.prev = 7;
                        _context3.t0 = _context3['catch'](0);

                        callback(_context3.t0);

                    case 10:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 7]]);
    }));

    return function getCourseById(_x6, _x7) {
        return _ref3.apply(this, arguments);
    };
}();
var listCourse = exports.listCourse = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var callback = arguments[1];
        var data;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return CourseModel.find({}).sort({ start_at: -1 }).select({}).limit(limit);

                    case 3:
                        data = _context4.sent;

                        callback(null, data);
                        _context4.next = 10;
                        break;

                    case 7:
                        _context4.prev = 7;
                        _context4.t0 = _context4['catch'](0);

                        callback(_context4.t0);

                    case 10:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 7]]);
    }));

    return function listCourse() {
        return _ref4.apply(this, arguments);
    };
}();

//get all course
var _getAllCourse = exports._getAllCourse = function _getAllCourse() {
    return CourseModel.find({}).select({ courseName: 1 }).exec(function (err, data) {
        if (err) {
            throw 'Get Course Error !';
        } else {
            return data;
        }
    });
};
var searchSuggest = exports.searchSuggest = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(valueSearch, callback) {
        var data;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        _context5.next = 3;
                        return CourseModel.find({ courseName: { '$regex': valueSearch } }).limit(10);

                    case 3:
                        data = _context5.sent;

                        callback(null, data);
                        _context5.next = 10;
                        break;

                    case 7:
                        _context5.prev = 7;
                        _context5.t0 = _context5['catch'](0);

                        callback(_context5.t0);

                    case 10:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 7]]);
    }));

    return function searchSuggest(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();
var deleteCourse = exports.deleteCourse = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id, callback) {
        var data;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        _context6.next = 3;
                        return CourseModel.findOneAndRemove({ _id: id });

                    case 3:
                        data = _context6.sent;

                        callback(null, data);
                        _context6.next = 10;
                        break;

                    case 7:
                        _context6.prev = 7;
                        _context6.t0 = _context6['catch'](0);

                        callback(_context6.t0);

                    case 10:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[0, 7]]);
    }));

    return function deleteCourse(_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}();
var getInfoQuestionQuiz = exports.getInfoQuestionQuiz = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(idCourse, idSection, idLecture, callback) {
        var dataCourse, section, lecture, data;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.prev = 0;
                        _context7.next = 3;
                        return CourseModel.findById({ _id: idCourse }).select({ language: 1, courseName: 1, sections: 1 });

                    case 3:
                        dataCourse = _context7.sent;
                        _context7.next = 6;
                        return dataCourse.sections.id(idSection);

                    case 6:
                        section = _context7.sent;
                        _context7.next = 9;
                        return section.lectures.id(idLecture);

                    case 9:
                        lecture = _context7.sent;
                        data = {
                            language: dataCourse.language,
                            courseName: dataCourse.courseName,
                            sectionName: section.section,
                            infoQuiz: lecture
                        };

                        callback(null, data);
                        _context7.next = 18;
                        break;

                    case 14:
                        _context7.prev = 14;
                        _context7.t0 = _context7['catch'](0);

                        console.log('err', _context7.t0);
                        callback(_context7.t0);

                    case 18:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined, [[0, 14]]);
    }));

    return function getInfoQuestionQuiz(_x13, _x14, _x15, _x16) {
        return _ref7.apply(this, arguments);
    };
}();
//# sourceMappingURL=course.js.map