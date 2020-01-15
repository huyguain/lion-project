'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._getAllEntryByTemplate = exports._deleteEntryByTemplate = exports.savePointEssayToDbModel = exports.getQuestionEssayEnglishTestModel = exports.countEnglishNotPointModel = exports.getAllEnglishTestModel = exports._createEntryEnglish = exports.endEnglishTestModel = exports._deleteEntryCodeByCandi = exports._regenerate = exports.detailResultTest = exports._updateGenByTemplateId = exports.getGenByTemplateId = exports.checkCode = exports.finishTestModel = exports.endTestModel = exports.editEntryCode = exports.updateEntryCode = exports.findCode = exports.saveEntryCodeEnglishToDB = exports.addEntryCodeEnglish = exports.addEntryCode = exports._createEntryCode = exports.deleteEntryCodeByUserId = exports.deleteEntryCodeModel = exports._deleteEntryCode = exports._getAllEntryCode = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _uid = require('uid');

var _uid2 = _interopRequireDefault(_uid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var EntryCode = new _mongoose.Schema({
    code: { type: String, required: true },
    createCode: {
        type: Date,
        default: new Date()
    },
    deadline: Date,
    startTime: Date,
    endTime: Date,
    candidateId: {
        type: _mongoose.Schema.Types.String,
        ref: 'Candidate'
    },
    questionIds: [{
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    templateId: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'TestTemplate'
    },
    englishExamId: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'EnglishTest'
    },
    answers: [],
    point: Number,
    result: String,
    status: Boolean
});
var entryCodeTable = _mongoose2.default.model('EntryCode', EntryCode);

var _getAllEntryCode = exports._getAllEntryCode = function _getAllEntryCode() {
    return entryCodeTable.find({}).select({ deadline: 1, createCode: 1, point: 1, code: 1, startTime: 1, endTime: 1, result: 1, questionIds: 1 }).populate({
        path: 'candidateId'
    }).populate({
        path: 'templateId'
    }).populate('englishExamId').populate({
        path: 'questionIds'
    }).exec(function (err, data) {
        if (err) {
            console.log(err);
            return 'Get Entry Code Error !';
        } else {
            return data;
        }
    });
};
//deleteEntryCode
var _deleteEntryCode = exports._deleteEntryCode = function _deleteEntryCode(_id) {
    return entryCodeTable.remove({ _id: _id }, function (err) {
        if (err) {
            return 'Delete Entry Code Error !';
        } else {
            return 1;
        }
    });
};
var deleteEntryCodeModel = exports.deleteEntryCodeModel = function deleteEntryCodeModel(id) {
    entryCodeTable.findOneAndRemove({ _id: id }, function (err, response) {
        if (err) return err;
    });
};
var deleteEntryCodeByUserId = exports.deleteEntryCodeByUserId = function deleteEntryCodeByUserId(userId, callback) {
    return entryCodeTable.remove({ userId: userId }, function (err) {
        if (err) return callback(err);
    });
};
//create Entry Code
var _createEntryCode = exports._createEntryCode = function _createEntryCode(dataQuestion, candidateId, templateId, deadline) {
    var _entryCodeTable = new entryCodeTable({
        code: (0, _uid2.default)(),
        questionIds: dataQuestion,
        candidateId: candidateId,
        deadline: deadline,
        templateId: templateId
    });
    return _entryCodeTable.save(function (err, data) {
        if (err) {
            throw 'Create Entry Code Error !';
        } else {
            return data;
        }
    });
};
var addEntryCode = exports.addEntryCode = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(exam, userId, templateId, deadline, callback) {
        var newEntryCode;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        newEntryCode = new entryCodeTable({
                            "code": (0, _uid2.default)(),
                            "questionIds": exam,
                            userId: userId,
                            deadline: deadline,
                            templateId: templateId
                        });
                        _context.next = 3;
                        return newEntryCode.save(function (err, data) {
                            if (err) throw err;
                        }).then(function (data) {
                            return callback(null, data);
                        }).catch(function (err) {
                            return callback(err);
                        });

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function addEntryCode(_x, _x2, _x3, _x4, _x5) {
        return _ref.apply(this, arguments);
    };
}();
var addEntryCodeEnglish = exports.addEntryCodeEnglish = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(userId, englishExamId, callback) {
        var deadline;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        deadline = new Date();

                        deadline.setMonth(deadline.getMonth() + 1);
                        _context2.next = 4;
                        return entryCodeTable.create({
                            code: (0, _uid2.default)(),
                            userId: userId,
                            englishExamId: englishExamId,
                            deadline: deadline
                        }, function (err, data) {
                            if (err) return callback(err);
                            return callback(null, data);
                        });

                    case 4:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function addEntryCodeEnglish(_x6, _x7, _x8) {
        return _ref2.apply(this, arguments);
    };
}();

var saveEntryCodeEnglishToDB = exports.saveEntryCodeEnglishToDB = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(userId, englishExamId) {
        var deadline, obj, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        deadline = new Date();

                        deadline.setMonth(deadline.getMonth() + 1);
                        obj = {
                            code: (0, _uid2.default)(),
                            userId: userId,
                            englishExamId: englishExamId,
                            deadline: deadline
                        };
                        _context3.prev = 3;
                        _context3.next = 6;
                        return entryCodeTable.create(obj);

                    case 6:
                        result = _context3.sent;
                        return _context3.abrupt('return', {
                            message: true,
                            data: result
                        });

                    case 10:
                        _context3.prev = 10;
                        _context3.t0 = _context3['catch'](3);
                        return _context3.abrupt('return', {
                            message: false,
                            data: _context3.t0
                        });

                    case 13:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[3, 10]]);
    }));

    return function saveEntryCodeEnglishToDB(_x9, _x10) {
        return _ref3.apply(this, arguments);
    };
}();

var findCode = exports.findCode = function findCode(code) {
    return entryCodeTable.findOne({ code: code }).populate('templateId').populate('candidateId').populate('englishExamId').populate('questionIds').exec(function (err, data) {
        if (err) return err;
        return data;
    });
};
var updateEntryCode = exports.updateEntryCode = function updateEntryCode(dataInput) {
    var conditions = dataInput.conditions,
        update = dataInput.update;

    return entryCodeTable.findOneAndUpdate(conditions, update, { new: true }).exec(function (err, data) {
        if (err) return err;
        return data;
    });
};
var editEntryCode = exports.editEntryCode = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_id, questionIds, deadline, callback) {
        var entryCode;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return entryCodeTable.findOne({ _id: _id }).select({ point: 1 });

                    case 2:
                        entryCode = _context4.sent;
                        _context4.prev = 3;
                        _context4.next = 6;
                        return entryCodeTable.findOneAndUpdate({ _id: _id }, { code: (0, _uid2.default)(), deadline: deadline, questionIds: questionIds }, { new: true }, function (err, data) {
                            return callback(null, data);
                        });

                    case 6:
                        _context4.next = 11;
                        break;

                    case 8:
                        _context4.prev = 8;
                        _context4.t0 = _context4['catch'](3);
                        return _context4.abrupt('return', callback(_context4.t0));

                    case 11:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[3, 8]]);
    }));

    return function editEntryCode(_x11, _x12, _x13, _x14) {
        return _ref4.apply(this, arguments);
    };
}();
var endTestModel = exports.endTestModel = function endTestModel(duration, answers, code, callback) {
    entryCodeTable.findOne({ code: code }).populate('questionIds').populate('templateId').then(function (result) {
        console.log('answers', answers);
        console.log('answers', result);
        var count = 0;
        for (var i = 0; i < answers.length; i++) {
            for (var j = 0; j < result.questionIds.length; j++) {
                if (answers[i].id == result.questionIds[j]._id) {
                    var a = void 0,
                        b = void 0;
                    //sort đáp án mà người dùng chọn rồi convert sang string
                    a = answers[i].answers.sort() + "";
                    b = result.questionIds[j].correct.sort() + "";
                    if (a === b) {
                        count++;
                    }
                    break;
                }
            }
        }
        /* save data in entry test */
        result.point = count;
        result.result = count / result.questionIds.length * 100 >= result.templateId.passScore ? 'PASS' : 'FAIL';
        if (Date.parse(result.endTime) - Date.parse(result.startTime) > duration) result.endTime = new Date();
        result.answers = answers;
        result.save(function (err, result) {
            if (err) callback(err);
            callback(null, result);
        });
    }).catch(function (err) {

        callback(err);
    });
};
/* load data vao page finish test */
var finishTestModel = exports.finishTestModel = function finishTestModel(code, callback) {
    entryCodeTable.findOne({ code: code }).populate('templateId').populate('candidateId').then(function (result) {
        var data = {
            "duration": Math.ceil((Date.parse(result.endTime) - Date.parse(result.startTime)) / 1000 / 60),
            "point": result.point,
            "totalQuestion": result.questionIds.length,
            "result": result.result
        };
        callback(null, data);
    }).catch(function (err) {
        callback(err);
    });
};
var checkCode = exports.checkCode = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(templateId, userId, callback) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        _context5.next = 3;
                        return entryCodeTable.findOne({ templateId: templateId, userId: userId }, function (err, data) {
                            return callback(null, data);
                        });

                    case 3:
                        _context5.next = 8;
                        break;

                    case 5:
                        _context5.prev = 5;
                        _context5.t0 = _context5['catch'](0);
                        return _context5.abrupt('return', callback(err));

                    case 8:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 5]]);
    }));

    return function checkCode(_x15, _x16, _x17) {
        return _ref5.apply(this, arguments);
    };
}();
var getGenByTemplateId = exports.getGenByTemplateId = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(templateId, callback) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        _context6.next = 3;
                        return entryCodeTable.find({ templateId: templateId }).exec(function (err, data) {
                            return callback(null, data);
                        });

                    case 3:
                        _context6.next = 8;
                        break;

                    case 5:
                        _context6.prev = 5;
                        _context6.t0 = _context6['catch'](0);
                        return _context6.abrupt('return', callback(_context6.t0));

                    case 8:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[0, 5]]);
    }));

    return function getGenByTemplateId(_x18, _x19) {
        return _ref6.apply(this, arguments);
    };
}();
var _updateGenByTemplateId = exports._updateGenByTemplateId = function _updateGenByTemplateId(templateId) {
    return entryCodeTable.update({ templateId: templateId, result: { $exists: true } }, { templateId: null }, { multi: true }, function (err) {
        if (err) {
            throw 'Update Data Entry Error !';
        }
    });
};
//get detail test of candidate => view result question which candidate choosed
var detailResultTest = exports.detailResultTest = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(code, callback) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.prev = 0;
                        _context7.next = 3;
                        return entryCodeTable.findOne({ code: code }).populate('questionIds').populate('englishExamId').then(function (data) {
                            // console.log(data)
                            callback(data, null);
                        }).catch(function (err) {
                            callback(null, { status: 500, message: err });
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

    return function detailResultTest(_x20, _x21) {
        return _ref7.apply(this, arguments);
    };
}();
//regenerate
var _regenerate = exports._regenerate = function _regenerate(_id, dataQuestion, deadline) {
    return entryCodeTable.findOneAndUpdate({ _id: _id }, {
        code: (0, _uid2.default)(),
        deadline: deadline,
        questionIds: dataQuestion
    }, { new: true }).exec(function (err, data) {
        if (err) {
            return 'Update Entry Code Error !';
        } else {
            return data;
        }
    });
};
//delete Entry Code By CandidateId
var _deleteEntryCodeByCandi = exports._deleteEntryCodeByCandi = function _deleteEntryCodeByCandi(candidateId) {
    return entryCodeTable.remove({ candidateId: candidateId }, function (err) {
        if (err) {
            return 'Delete EntryCode Error !';
        } else {
            return 1;
        }
    });
};

//calculator point when end english test
var endEnglishTestModel = exports.endEnglishTestModel = function endEnglishTestModel(duration, list_answer, code, callback) {
    entryCodeTable.findOne({ code: code }).populate('englishExamId').then(function (result) {
        var questions = result.englishExamId.questions;

        questions.pop();
        result.questionIds = questions;
        var point = 0;
        list_answer.forEach(function (answerElement) {
            questions.forEach(function (question) {
                if (question.essay) {
                    return;
                }
                if (answerElement.id == question._id) {
                    var correct_answer = void 0,
                        option_answer = void 0;
                    correct_answer = question.correct.sort() + "";
                    option_answer = answerElement.answers.sort() + "";
                    if (correct_answer === option_answer) {
                        point++;
                    }
                    return;
                }
            });
        });
        result.point = point;
        if (Date.parse(result.endTime) - Date.parse(result.startTime) > duration) result.endTime = new Date();
        result.answers = list_answer;
        result.save(function (err, result) {
            if (err) return callback(err);
            return callback(null, result);
        });
    }).catch(function (err) {
        callback(err);
    });
};
//create Entry English Test 
var _createEntryEnglish = exports._createEntryEnglish = function _createEntryEnglish(candidateId, englishExamId) {
    var deadline = new Date();
    deadline.setMonth(deadline.getMonth() + 1);
    var _entryCodeTable = new entryCodeTable({
        code: (0, _uid2.default)(),
        candidateId: candidateId,
        englishExamId: englishExamId,
        deadline: deadline,
        status: false
    });
    return _entryCodeTable.save(function (err, data) {
        if (err) {
            return 'Create Entry English Error!';
        }
        return data;
    });
};

var getAllEnglishTestModel = exports.getAllEnglishTestModel = function getAllEnglishTestModel(callback) {
    entryCodeTable.find({ englishExamId: { $exists: true }, endTime: { $exists: true } }).populate("candidateId", { firstName: 1, lastName: 1 }).populate("englishExamId", { questions: 1 }).select({ code: 1, candidateId: 1, endTime: 1, status: 1, point: 1 }).sort({ status: 1, endTime: 1, _id: -1 }).then(function (data) {
        var dataRs = data.filter(function (item) {
            return Object.keys(item._doc).map(function (key) {
                return item[key] !== null && item[key] !== undefined ? true : false;
            }).filter(function (item) {
                return item === false;
            }).length === 0 ? true : false;
        });
        callback(null, dataRs);
    }).catch(function (err) {
        return console.log(err);
    });
};

var countEnglishNotPointModel = exports.countEnglishNotPointModel = function countEnglishNotPointModel(callback) {
    entryCodeTable.count({ status: false, endTime: { $exists: true } }).then(function (count) {
        callback(null, count);
    }).catch(function (err) {
        callback(err);
    });
};

var getQuestionEssayEnglishTestModel = exports.getQuestionEssayEnglishTestModel = function getQuestionEssayEnglishTestModel(id, callback) {
    console.log(id);
    entryCodeTable.findOne({ _id: id }).populate({
        path: "englishExamId",
        select: "questions"
    }).then(function (entryCode) {
        var english_exam = entryCode.englishExamId;
        var question_essay = english_exam.questions.filter(function (question) {
            return question.essay;
        });
        var answer_essay = question_essay.map(function (item) {
            return entryCode.answers.filter(function (answer) {
                return answer.id == item._id;
            })[0];
        });
        var data = {
            totalQuestion: english_exam.questions.length,
            question: question_essay,
            answer: answer_essay,
            point: entryCode.point,
            status: entryCode.status
        };
        callback(null, data);
    }).catch(function (err) {
        callback(err);
    });
};
//save point into exam
var savePointEssayToDbModel = exports.savePointEssayToDbModel = function savePointEssayToDbModel(idExam, point, callback) {
    entryCodeTable.findOne({ _id: idExam }).then(function (entryTest) {
        try {
            entryTest.point += parseInt(point) || 0;
        } catch (err) {
            return callback(err);
        }
        entryTest.status = true;
        entryTest.save(function (err, data) {
            if (err) return callback(err);
            return callback(null, data);
        });
    }).catch(function (err) {
        callback(err);
    });
};
//delete Entry by Template Id and sate
var _deleteEntryByTemplate = exports._deleteEntryByTemplate = function _deleteEntryByTemplate(templateId) {
    return entryCodeTable.remove({ templateId: templateId, result: null }, function (err, data) {
        if (err) {
            return 'Delete Entry Code Error !';
        } else {
            return 1;
        }
    });
};
//get Entry by templateid
var _getAllEntryByTemplate = exports._getAllEntryByTemplate = function _getAllEntryByTemplate(templateId) {
    return entryCodeTable.find({ templateId: templateId }).exec(function (err, data) {
        if (err) {
            return 'Get Entry Error !';
        } else {
            return data;
        }
    });
};
//# sourceMappingURL=entryCode.js.map