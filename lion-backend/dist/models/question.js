'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getQuizModel = exports.delete_question = exports.edit_question = exports.add_question = exports.getQuestionBy_Id = exports.getQuestionByCouse = exports.getAllQuestion = exports._questionsRamdom = exports.questionsRamdom = exports.importToDb = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseRandom = require('mongoose-random');

var _mongooseRandom2 = _interopRequireDefault(_mongooseRandom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var QuestionSchema = new _mongoose.Schema({
    type: {
        type: String,
        default: "Entry Test"
    },
    language: {
        type: String,
        required: true
    },
    course: String,
    section: String,
    multi: { type: Boolean, default: false },
    level: { type: Number, min: 0, max: 3 }, //1 easy, 2.medium, 3.hard
    question: {
        type: String,
        required: true
    },
    options: {
        a: {
            type: String,
            required: true
        },
        b: {
            type: String,
            required: true
        },
        c: String,
        d: String
    },
    correct: []
});
QuestionSchema.pre('save', function (next) {
    if (!this.options.d) {
        this.options.d = undefined;
    }
    next();
});

QuestionSchema.plugin(_mongooseRandom2.default, { path: 'r' });
var questionTable = _mongoose2.default.model('Question', QuestionSchema);

var importToDb = exports.importToDb = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data, callback) {
        var options, _table;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;

                        if (!(data.multi && data.question && data.type)) {
                            _context.next = 10;
                            break;
                        }

                        data.correct = data.correct.split(",");
                        console.log('data-question', data);
                        options = data["options[d]"] ? { a: data["options[a]"], b: data["options[b]"], c: data["options[c]"], d: data["options[d]"] } : { a: data["options[a]"], b: data["options[b]"], c: data["options[c]"] };
                        _table = new questionTable({
                            type: data.type,
                            language: data.language,
                            course: data.course,
                            section: data.section,
                            question: data.question,
                            multi: data.multi === 'TRUE' ? true : false,
                            level: data.level,
                            correct: data.correct,
                            options: options,
                            essay: data.essay === 'TRUE' ? true : false,
                            testCode: data.testCode,
                            partNumber: data.partNumber,
                            partTitle: data.partTitle
                        });
                        _context.next = 8;
                        return _table.save(function (err, datas) {
                            return callback(null, datas);
                        });

                    case 8:
                        _context.next = 11;
                        break;

                    case 10:
                        throw new _mongoose.Error('Error!');

                    case 11:
                        _context.next = 16;
                        break;

                    case 13:
                        _context.prev = 13;
                        _context.t0 = _context['catch'](0);
                        return _context.abrupt('return', callback(_context.t0));

                    case 16:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 13]]);
    }));

    return function importToDb(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
var questionsRamdom = exports.questionsRamdom = function questionsRamdom(language, type, level, number) {
    if (number === 0) {
        return [];
    }
    return new Promise(function (resolve, reject) {
        questionTable.findRandom({ language: language, type: type, level: level }, { _id: 1 }, { limit: number }, function (err, questions) {
            if (err) throw reject(err);
            resolve(questions);
        });
    });
};
//question random
var _questionsRamdom = exports._questionsRamdom = function _questionsRamdom(language, level, number) {
    if (number === 0) {
        return [];
    } else {
        return questionTable.findRandom({ language: language, type: 'Entry Test', level: level }, { _id: 1 }, { limit: number }, function (err, data) {
            if (err) {
                return 'Get Data Question Error';
            } else {
                return data;
            }
        });
    }
};
var getAllQuestion = exports.getAllQuestion = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(callback) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return questionTable.find({}).exec(function (err, data) {
                            return callback(null, data);
                        });

                    case 3:
                        _context2.next = 8;
                        break;

                    case 5:
                        _context2.prev = 5;
                        _context2.t0 = _context2['catch'](0);
                        return _context2.abrupt('return', callback(_context2.t0));

                    case 8:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 5]]);
    }));

    return function getAllQuestion(_x3) {
        return _ref2.apply(this, arguments);
    };
}();
var getQuestionByCouse = exports.getQuestionByCouse = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(language, type, callback) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return questionTable.find({ language: language, type: type }).exec(function (err, data) {
                            return callback(null, data);
                        });

                    case 3:
                        _context3.next = 8;
                        break;

                    case 5:
                        _context3.prev = 5;
                        _context3.t0 = _context3['catch'](0);
                        return _context3.abrupt('return', callback(_context3.t0));

                    case 8:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 5]]);
    }));

    return function getQuestionByCouse(_x4, _x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();
var getQuestionBy_Id = exports.getQuestionBy_Id = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_id, callback) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return questionTable.findOne({ _id: _id }).exec(function (err, data) {
                            return callback(null, data);
                        });

                    case 3:
                        _context4.next = 8;
                        break;

                    case 5:
                        _context4.prev = 5;
                        _context4.t0 = _context4['catch'](0);
                        return _context4.abrupt('return', callback(_context4.t0));

                    case 8:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 5]]);
    }));

    return function getQuestionBy_Id(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();
var add_question = exports.add_question = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(newQuestion, callback) {
        var Question, data;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        Question = new questionTable(newQuestion);
                        _context5.prev = 1;
                        _context5.next = 4;
                        return Question.save();

                    case 4:
                        data = _context5.sent;

                        callback(null, data);
                        _context5.next = 11;
                        break;

                    case 8:
                        _context5.prev = 8;
                        _context5.t0 = _context5['catch'](1);

                        callback(_context5.t0);

                    case 11:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[1, 8]]);
    }));

    return function add_question(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();
var edit_question = exports.edit_question = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_id, data, callback) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        if (!data.options.c) {
                            data.options.c = undefined;
                        }
                        if (!data.options.d) {
                            data.options.d = undefined;
                        }
                        _context6.prev = 2;
                        _context6.next = 5;
                        return questionTable.findOneAndUpdate({ _id: _id }, {
                            type: data.type,
                            language: data.language,
                            question: data.question,
                            multi: data.multi,
                            course: data.course,
                            section: data.section,
                            level: data.level,
                            options: {
                                a: data.options.a,
                                b: data.options.b,
                                c: data.options.c,
                                d: data.options.d
                            },
                            correct: data.correct
                        }).exec(function (err, _data) {
                            return callback(null, _data);
                        });

                    case 5:
                        _context6.next = 10;
                        break;

                    case 7:
                        _context6.prev = 7;
                        _context6.t0 = _context6['catch'](2);
                        return _context6.abrupt('return', callback(_context6.t0));

                    case 10:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[2, 7]]);
    }));

    return function edit_question(_x11, _x12, _x13) {
        return _ref6.apply(this, arguments);
    };
}();
var delete_question = exports.delete_question = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_id, callback) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.prev = 0;
                        _context7.next = 3;
                        return questionTable.findOneAndRemove({ _id: _id }, function (err, data) {
                            return callback(null, data);
                        });

                    case 3:
                        _context7.next = 8;
                        break;

                    case 5:
                        _context7.prev = 5;
                        _context7.t0 = _context7['catch'](0);
                        return _context7.abrupt('return', callback(_context7.t0));

                    case 8:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined, [[0, 5]]);
    }));

    return function delete_question(_x14, _x15) {
        return _ref7.apply(this, arguments);
    };
}();

var getQuizModel = exports.getQuizModel = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(language, course, section, limit, callback) {
        var questions;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        _context8.prev = 0;
                        _context8.next = 3;
                        return questionTable.find({ type: "Quiz", language: language, course: course, section: section });

                    case 3:
                        questions = _context8.sent;
                        return _context8.abrupt('return', callback(null, questions));

                    case 7:
                        _context8.prev = 7;
                        _context8.t0 = _context8['catch'](0);
                        return _context8.abrupt('return', callback(_context8.t0));

                    case 10:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, undefined, [[0, 7]]);
    }));

    return function getQuizModel(_x16, _x17, _x18, _x19, _x20) {
        return _ref8.apply(this, arguments);
    };
}();
//# sourceMappingURL=question.js.map