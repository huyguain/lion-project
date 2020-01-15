'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getQuiz = exports.deleteQuestion = exports.editQuestion = exports.addQuestion = exports.getQuestionById = exports.uploadFile = exports.uploadEnglishExam = exports.exportQuestionFromDB = undefined;

var _question = require('../models/question');

var _course = require('../models/course');

var _englishExam = require('../models/englishExam');

var _excelUtil = require('../lib/excelUtil');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _domain = require('domain');

var _csvtojson = require('csvtojson');

var _csvtojson2 = _interopRequireDefault(_csvtojson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var exportQuestionFromDB = exports.exportQuestionFromDB = function exportQuestionFromDB(req, res) {
    (0, _question.getAllQuestion)(function (err, data) {
        if (err) res.status(400).send('Bad Request');else res.status(200).send(data);
    });
};
//upload data to server and save  to Database
var uploadEnglishExam = exports.uploadEnglishExam = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var questions, fileName;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        questions = [];
                        _context.prev = 1;
                        fileName = 'upload/' + req.body.uidEnglish + '-' + req.body.testCode + '-' + req.body.data;

                        (0, _csvtojson2.default)().fromFile(fileName).on('json', function (jsonObj) {
                            questions.push(jsonObj);
                        }).on('done', function (error) {
                            var testCode = req.body.testCode;

                            var urlImage1 = '' + req.files[0].filename;
                            var urlImage2 = '' + req.files[1].filename;
                            (0, _englishExam.createEnglishTest)(testCode, urlImage1, urlImage2, questions, function (err, result) {
                                if (err) throw err;
                            });
                            _fs2.default.unlink(fileName, function (err) {});
                        });
                        _context.next = 6;
                        return res.end();

                    case 6:
                        _context.next = 11;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](1);

                        res.status(500).send('Upload Error!');

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 8]]);
    }));

    return function uploadEnglishExam(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
var uploadFile = exports.uploadFile = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var fileName;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;

                        console.log('den-roi', req.body.data, req.body.fileNameStore);
                        fileName = 'upload/' + req.body.fileNameStore;

                        console.log('fileName', fileName);
                        _context4.next = 6;
                        return (0, _excelUtil.readFileCsv)(fileName, function () {
                            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(err, data) {
                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                if (!err) {
                                                    _context3.next = 2;
                                                    break;
                                                }

                                                throw err;

                                            case 2:
                                                _context3.prev = 2;
                                                _context3.next = 5;
                                                return (0, _question.importToDb)(data, function () {
                                                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_err, _data) {
                                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                            while (1) {
                                                                switch (_context2.prev = _context2.next) {
                                                                    case 0:
                                                                        if (!_err) {
                                                                            _context2.next = 2;
                                                                            break;
                                                                        }

                                                                        throw _err;

                                                                    case 2:
                                                                    case 'end':
                                                                        return _context2.stop();
                                                                }
                                                            }
                                                        }, _callee2, undefined);
                                                    }));

                                                    return function (_x7, _x8) {
                                                        return _ref4.apply(this, arguments);
                                                    };
                                                }());

                                            case 5:
                                                _context3.next = 7;
                                                return _fs2.default.unlink(fileName, function (err) {});

                                            case 7:
                                                _context3.next = 9;
                                                return res.end();

                                            case 9:
                                                _context3.next = 14;
                                                break;

                                            case 11:
                                                _context3.prev = 11;
                                                _context3.t0 = _context3['catch'](2);

                                                res.status(201).json({
                                                    success: false,
                                                    message: "Format File Error!"
                                                });

                                            case 14:
                                            case 'end':
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, undefined, [[2, 11]]);
                            }));

                            return function (_x5, _x6) {
                                return _ref3.apply(this, arguments);
                            };
                        }());

                    case 6:
                        _context4.next = 12;
                        break;

                    case 8:
                        _context4.prev = 8;
                        _context4.t0 = _context4['catch'](0);

                        console.log('err', _context4.t0);
                        res.status(500).send('Upload Error!');

                    case 12:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 8]]);
    }));

    return function uploadFile(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
var getQuestionById = exports.getQuestionById = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var id;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        id = req.params.id;
                        _context5.next = 4;
                        return (0, _question.getQuestionBy_Id)(id, function (err, data) {
                            res.status(200).send(data);
                        });

                    case 4:
                        _context5.next = 9;
                        break;

                    case 6:
                        _context5.prev = 6;
                        _context5.t0 = _context5['catch'](0);

                        res.status(500).send('Error!');

                    case 9:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 6]]);
    }));

    return function getQuestionById(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();

var addQuestion = exports.addQuestion = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        _context6.next = 3;
                        return (0, _question.add_question)(req.body, function (err, data) {
                            res.status(200).send('Create question success');
                        });

                    case 3:
                        _context6.next = 8;
                        break;

                    case 5:
                        _context6.prev = 5;
                        _context6.t0 = _context6['catch'](0);

                        res.status(500).send('Create question error!');

                    case 8:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[0, 5]]);
    }));

    return function addQuestion(_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}();
var editQuestion = exports.editQuestion = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var id;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.prev = 0;
                        id = req.params.id;
                        _context7.next = 4;
                        return (0, _question.edit_question)(id, req.body, function (err, data) {
                            res.status(200).send('Edit success!');
                        });

                    case 4:
                        _context7.next = 9;
                        break;

                    case 6:
                        _context7.prev = 6;
                        _context7.t0 = _context7['catch'](0);

                        res.status(500).send('Edit Error!');

                    case 9:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined, [[0, 6]]);
    }));

    return function editQuestion(_x13, _x14) {
        return _ref7.apply(this, arguments);
    };
}();
var deleteQuestion = exports.deleteQuestion = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        var id;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        _context8.prev = 0;
                        id = req.params.id;
                        _context8.next = 4;
                        return (0, _question.delete_question)(id, function (err, data) {
                            res.status(200).send('Delete success!');
                        });

                    case 4:
                        _context8.next = 9;
                        break;

                    case 6:
                        _context8.prev = 6;
                        _context8.t0 = _context8['catch'](0);

                        res.status(500).send('Delete Error!');

                    case 9:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, undefined, [[0, 6]]);
    }));

    return function deleteQuestion(_x15, _x16) {
        return _ref8.apply(this, arguments);
    };
}();
var getQuiz = exports.getQuiz = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
        var _req$params, idCourse, idSection, idLecture;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        _req$params = req.params, idCourse = _req$params.idCourse, idSection = _req$params.idSection, idLecture = _req$params.idLecture;

                        (0, _course.getInfoQuestionQuiz)(idCourse, idSection, idLecture, function (err, data) {
                            if (err) {
                                res.status(500).json({
                                    success: false
                                });
                            } else {
                                var limit = data.infoQuiz.numberQuestion;
                                (0, _question.getQuizModel)(data.language, data.courseName, data.sectionName, limit, function (err, questions) {
                                    if (err) {
                                        res.json({
                                            success: false
                                        });
                                    } else {
                                        res.json({
                                            success: true,
                                            data: {
                                                questions: questions,
                                                infoQuiz: data.infoQuiz,
                                                sectionName: data.sectionName
                                            }
                                        });
                                    }
                                });
                            }
                        });

                    case 2:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, undefined);
    }));

    return function getQuiz(_x17, _x18) {
        return _ref9.apply(this, arguments);
    };
}();
//# sourceMappingURL=question.js.map