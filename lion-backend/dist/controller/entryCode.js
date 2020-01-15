'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.savePointEssayToDb = exports.getQuestionEssayEnglishTest = exports.countEnglishNotPoint = exports.getAllEnglishTest = exports.endEnglishTest = exports.reportTestDetail = exports.listQuestion = exports.startTest = exports.finishTest = exports.endTest = exports.showData = exports.checkCode = exports.regenerate = exports.autoCreateEntryCode = exports.createEntryCode = exports.deleteEntryCode = exports.getDataEntry = exports.getAllEntryCode = undefined;

var _entryCode = require('../models/entryCode');

var _candidate = require('../models/candidate');

var _question = require('../models/question');

var _testTemplate = require('../models/testTemplate');

var _util = require('../lib/util');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _punycode = require('punycode');

var _mailer = require('../lib/mailer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//Get EntryCode
var getAllEntryCode = exports.getAllEntryCode = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var dataEntryCode;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return (0, _entryCode._getAllEntryCode)();

                    case 3:
                        dataEntryCode = _context.sent;

                        if (!dataEntryCode) {
                            _context.next = 8;
                            break;
                        }

                        res.status(200).json({
                            success: true,
                            dataEntryCode: dataEntryCode
                        });
                        _context.next = 9;
                        break;

                    case 8:
                        throw 'Can\'t Get Entry Code !';

                    case 9:
                        _context.next = 14;
                        break;

                    case 11:
                        _context.prev = 11;
                        _context.t0 = _context['catch'](0);

                        res.status(403).json({
                            success: false,
                            message: _context.t0
                        });

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 11]]);
    }));

    return function getAllEntryCode(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
//getDataEntry
var getDataEntry = exports.getDataEntry = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var dataTemplate, dataCandidate;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return (0, _testTemplate._getAllTemplate)();

                    case 3:
                        dataTemplate = _context2.sent;

                        if (dataTemplate) {
                            _context2.next = 8;
                            break;
                        }

                        throw 'Template Not Existed Please Create Template !';

                    case 8:
                        _context2.next = 10;
                        return (0, _candidate._getAllCandidate)();

                    case 10:
                        dataCandidate = _context2.sent;

                        if (dataCandidate) {
                            _context2.next = 15;
                            break;
                        }

                        throw 'Candidate Not Existed Please Create Candidate !';

                    case 15:
                        res.status(200).json({
                            success: true,
                            dataCandidate: dataCandidate,
                            dataTemplate: dataTemplate
                        });

                    case 16:
                        _context2.next = 21;
                        break;

                    case 18:
                        _context2.prev = 18;
                        _context2.t0 = _context2['catch'](0);

                        res.status(400).json({
                            success: false,
                            message: _context2.t0
                        });

                    case 21:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 18]]);
    }));

    return function getDataEntry(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
//deleteEntryCode  
var deleteEntryCode = exports.deleteEntryCode = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var _req$params, idEntryCode, idCandidate, checkEntry, dataCandidate;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _req$params = req.params, idEntryCode = _req$params.idEntryCode, idCandidate = _req$params.idCandidate;

                        if (!(!idEntryCode || !idCandidate)) {
                            _context3.next = 6;
                            break;
                        }

                        throw 'No Date !';

                    case 6:
                        _context3.next = 8;
                        return (0, _entryCode._deleteEntryCode)(idEntryCode);

                    case 8:
                        checkEntry = _context3.sent;

                        if (checkEntry) {
                            _context3.next = 13;
                            break;
                        }

                        throw 'Can\'t Delete Entry Code !';

                    case 13:
                        _context3.next = 15;
                        return (0, _candidate._updateCandidatePull)(idCandidate, idEntryCode);

                    case 15:
                        dataCandidate = _context3.sent;

                        if (!dataCandidate) {
                            _context3.next = 20;
                            break;
                        }

                        res.status(204).end();
                        _context3.next = 21;
                        break;

                    case 20:
                        throw 'Can\'t Update Entry Code !';

                    case 21:
                        _context3.next = 26;
                        break;

                    case 23:
                        _context3.prev = 23;
                        _context3.t0 = _context3['catch'](0);

                        res.status(403).json({
                            success: false,
                            message: _context3.t0
                        });

                    case 26:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 23]]);
    }));

    return function deleteEntryCode(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();
//createEntryCode
var createEntryCode = exports.createEntryCode = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        return _context6.delegateYield( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                            var _req$body$dataEntryCo, candidateIds, deadline, testName, numberEasy, numberHard, numberMedium, language, templateId, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, idCandi, random, arrQuestion, dataQuestion, dataEntryCode, dataCandidate, payload;

                            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                while (1) {
                                    switch (_context5.prev = _context5.next) {
                                        case 0:
                                            _req$body$dataEntryCo = req.body.dataEntryCode, candidateIds = _req$body$dataEntryCo.candidateIds, deadline = _req$body$dataEntryCo.deadline, testName = _req$body$dataEntryCo.testName, numberEasy = _req$body$dataEntryCo.numberEasy, numberHard = _req$body$dataEntryCo.numberHard, numberMedium = _req$body$dataEntryCo.numberMedium, language = _req$body$dataEntryCo.language, templateId = _req$body$dataEntryCo.templateId;

                                            if (!(!candidateIds || !deadline || !testName || !language || !templateId)) {
                                                _context5.next = 5;
                                                break;
                                            }

                                            throw 'No Data !';

                                        case 5:
                                            _iteratorNormalCompletion = true;
                                            _didIteratorError = false;
                                            _iteratorError = undefined;
                                            _context5.prev = 8;
                                            _iterator = candidateIds[Symbol.iterator]();

                                        case 10:
                                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                                _context5.next = 38;
                                                break;
                                            }

                                            idCandi = _step.value;

                                            random = function () {
                                                var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_) {
                                                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                                        while (1) {
                                                            switch (_context4.prev = _context4.next) {
                                                                case 0:
                                                                    return _context4.abrupt('return', Promise.all([(0, _question._questionsRamdom)(language, 1, numberEasy), (0, _question._questionsRamdom)(language, 2, numberMedium), (0, _question._questionsRamdom)(language, 3, numberHard)]));

                                                                case 1:
                                                                case 'end':
                                                                    return _context4.stop();
                                                            }
                                                        }
                                                    }, _callee4, undefined);
                                                }));

                                                return function random(_x9) {
                                                    return _ref5.apply(this, arguments);
                                                };
                                            }();

                                            _context5.next = 15;
                                            return random();

                                        case 15:
                                            arrQuestion = _context5.sent;

                                            if (!(arrQuestion[0].length !== numberEasy || arrQuestion[1].length !== numberMedium || arrQuestion[2].length !== numberHard)) {
                                                _context5.next = 25;
                                                break;
                                            }

                                            if (!(arrQuestion[0].length !== numberEasy)) {
                                                _context5.next = 19;
                                                break;
                                            }

                                            throw 'Question Easy Not Enough !';

                                        case 19:
                                            if (!(arrQuestion[1].length !== numberMedium)) {
                                                _context5.next = 21;
                                                break;
                                            }

                                            throw 'Question Medium Not Enough !';

                                        case 21:
                                            if (!(arrQuestion[2].length !== numberHard)) {
                                                _context5.next = 23;
                                                break;
                                            }

                                            throw 'Question Hard Not Enough !';

                                        case 23:
                                            _context5.next = 35;
                                            break;

                                        case 25:
                                            dataQuestion = [].concat(_toConsumableArray(arrQuestion[0]), _toConsumableArray(arrQuestion[1]), _toConsumableArray(arrQuestion[2]));
                                            _context5.next = 28;
                                            return (0, _entryCode._createEntryCode)(dataQuestion, idCandi, templateId, deadline);

                                        case 28:
                                            dataEntryCode = _context5.sent;
                                            _context5.next = 31;
                                            return (0, _candidate._updateCandidate)(idCandi, dataEntryCode._id);

                                        case 31:
                                            dataCandidate = _context5.sent;
                                            payload = {
                                                TO: dataCandidate.email,
                                                code: dataEntryCode.code
                                            };

                                            console.log({ payload: payload });
                                            // await send(payload, (err, dataMail) => { console.log(dataMail) })
                                            res.status(204).end();

                                        case 35:
                                            _iteratorNormalCompletion = true;
                                            _context5.next = 10;
                                            break;

                                        case 38:
                                            _context5.next = 44;
                                            break;

                                        case 40:
                                            _context5.prev = 40;
                                            _context5.t0 = _context5['catch'](8);
                                            _didIteratorError = true;
                                            _iteratorError = _context5.t0;

                                        case 44:
                                            _context5.prev = 44;
                                            _context5.prev = 45;

                                            if (!_iteratorNormalCompletion && _iterator.return) {
                                                _iterator.return();
                                            }

                                        case 47:
                                            _context5.prev = 47;

                                            if (!_didIteratorError) {
                                                _context5.next = 50;
                                                break;
                                            }

                                            throw _iteratorError;

                                        case 50:
                                            return _context5.finish(47);

                                        case 51:
                                            return _context5.finish(44);

                                        case 52:
                                        case 'end':
                                            return _context5.stop();
                                    }
                                }
                            }, _callee5, undefined, [[8, 40, 44, 52], [45,, 47, 51]]);
                        })(), 't0', 2);

                    case 2:
                        _context6.next = 8;
                        break;

                    case 4:
                        _context6.prev = 4;
                        _context6.t1 = _context6['catch'](0);

                        console.log(_context6.t1);
                        res.status(203).json({
                            success: false,
                            message: _context6.t1.message
                        });

                    case 8:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[0, 4]]);
    }));

    return function createEntryCode(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

//createEntryCode
var autoCreateEntryCode = exports.autoCreateEntryCode = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        var _req$body, resCandidate, newCandidate, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop, _iterator2, _step2, _ret2;

        return regeneratorRuntime.wrap(function _callee8$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        _context9.prev = 0;
                        _req$body = req.body, resCandidate = _req$body.resCandidate, newCandidate = _req$body.newCandidate;

                        console.log('req', req.body);
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context9.prev = 6;
                        _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
                            var candidate, template, testName, easy, medium, hard, language, templateId, randQuestion, arrQuestion, dataQuestion, deadline, dataEntryCode, dataCandidate, payload;
                            return regeneratorRuntime.wrap(function _loop$(_context8) {
                                while (1) {
                                    switch (_context8.prev = _context8.next) {
                                        case 0:
                                            candidate = _step2.value;

                                            console.log('candidate', candidate);
                                            console.log('language', candidate.language);
                                            _context8.next = 5;
                                            return (0, _testTemplate.getTemplateDefaultEntry)(candidate.language);

                                        case 5:
                                            template = _context8.sent;

                                            console.log('template', template);
                                            testName = template.testName, easy = template.easy, medium = template.medium, hard = template.hard, language = template.language, templateId = template._id;

                                            randQuestion = function () {
                                                var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_) {
                                                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                                                        while (1) {
                                                            switch (_context7.prev = _context7.next) {
                                                                case 0:
                                                                    return _context7.abrupt('return', Promise.all([(0, _question._questionsRamdom)(language, 1, easy), (0, _question._questionsRamdom)(language, 2, medium), (0, _question._questionsRamdom)(language, 3, hard)]));

                                                                case 1:
                                                                case 'end':
                                                                    return _context7.stop();
                                                            }
                                                        }
                                                    }, _callee7, undefined);
                                                }));

                                                return function randQuestion(_x12) {
                                                    return _ref7.apply(this, arguments);
                                                };
                                            }();

                                            _context8.next = 11;
                                            return randQuestion();

                                        case 11:
                                            arrQuestion = _context8.sent;

                                            if (!(arrQuestion[0].length !== easy || arrQuestion[1].length !== medium || arrQuestion[2].length !== hard)) {
                                                _context8.next = 14;
                                                break;
                                            }

                                            return _context8.abrupt('return', 'continue');

                                        case 14:
                                            dataQuestion = [].concat(_toConsumableArray(arrQuestion[0]), _toConsumableArray(arrQuestion[1]), _toConsumableArray(arrQuestion[2]));

                                            console.log('arrQuestion', dataQuestion);
                                            deadline = new Date();

                                            deadline.setMonth(deadline.getMonth() + 1);
                                            _context8.next = 20;
                                            return (0, _entryCode._createEntryCode)(dataQuestion, candidate.id, templateId, deadline);

                                        case 20:
                                            dataEntryCode = _context8.sent;
                                            _context8.next = 23;
                                            return (0, _candidate._updateCandidate)(candidate.id, dataEntryCode._id);

                                        case 23:
                                            dataCandidate = _context8.sent;
                                            payload = {
                                                TO: dataCandidate.email,
                                                code: dataEntryCode.code
                                                // await send(payload, (err, dataMail) => { console.log(dataMail) })
                                            };

                                        case 25:
                                        case 'end':
                                            return _context8.stop();
                                    }
                                }
                            }, _loop, undefined);
                        });
                        _iterator2 = newCandidate[Symbol.iterator]();

                    case 9:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            _context9.next = 17;
                            break;
                        }

                        return _context9.delegateYield(_loop(), 't0', 11);

                    case 11:
                        _ret2 = _context9.t0;

                        if (!(_ret2 === 'continue')) {
                            _context9.next = 14;
                            break;
                        }

                        return _context9.abrupt('continue', 14);

                    case 14:
                        _iteratorNormalCompletion2 = true;
                        _context9.next = 9;
                        break;

                    case 17:
                        _context9.next = 23;
                        break;

                    case 19:
                        _context9.prev = 19;
                        _context9.t1 = _context9['catch'](6);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context9.t1;

                    case 23:
                        _context9.prev = 23;
                        _context9.prev = 24;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }

                    case 26:
                        _context9.prev = 26;

                        if (!_didIteratorError2) {
                            _context9.next = 29;
                            break;
                        }

                        throw _iteratorError2;

                    case 29:
                        return _context9.finish(26);

                    case 30:
                        return _context9.finish(23);

                    case 31:
                        res.status(200).json({
                            candidateImported: resCandidate.candidateImported,
                            success: resCandidate.success,
                            result: resCandidate.result,
                            CanidateImportError: resCandidate.CanidateImportError,
                            EnglishCreateError: resCandidate.EnglishCreateError,
                            CandidateUpdateError: resCandidate.CandidateUpdateError
                        });
                        _context9.next = 37;
                        break;

                    case 34:
                        _context9.prev = 34;
                        _context9.t2 = _context9['catch'](0);

                        res.status(203).json({
                            success: false,
                            message: _context9.t2.message
                        });

                    case 37:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee8, undefined, [[0, 34], [6, 19, 23, 31], [24,, 26, 30]]);
    }));

    return function autoCreateEntryCode(_x10, _x11) {
        return _ref6.apply(this, arguments);
    };
}();

//regenerate code
var regenerate = exports.regenerate = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
        var _req$body$dataEntryCo2, _id, deadline, _language, numberEasy, numberMedium, numberHard, questionEasy, questionMedium, questionHard, dataQuestion, dataEntryCode;

        return regeneratorRuntime.wrap(function _callee9$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        _context10.prev = 0;
                        _req$body$dataEntryCo2 = req.body.dataEntryCode, _id = _req$body$dataEntryCo2._id, deadline = _req$body$dataEntryCo2.deadline, _language = _req$body$dataEntryCo2.language, numberEasy = _req$body$dataEntryCo2.numberEasy, numberMedium = _req$body$dataEntryCo2.numberMedium, numberHard = _req$body$dataEntryCo2.numberHard;

                        if (!(!_id || !deadline || !_language || !numberEasy || !numberMedium || !numberHard)) {
                            _context10.next = 6;
                            break;
                        }

                        throw 'No Data';

                    case 6:
                        _context10.next = 8;
                        return (0, _question._questionsRamdom)(_language, 1, numberEasy);

                    case 8:
                        questionEasy = _context10.sent;
                        _context10.next = 11;
                        return (0, _question._questionsRamdom)(_language, 2, numberMedium);

                    case 11:
                        questionMedium = _context10.sent;
                        _context10.next = 14;
                        return (0, _question._questionsRamdom)(_language, 3, numberHard);

                    case 14:
                        questionHard = _context10.sent;

                        if (!(questionEasy.length !== numberEasy || questionMedium.length !== numberMedium || questionHard.length !== numberHard)) {
                            _context10.next = 19;
                            break;
                        }

                        throw 'Please Check Again Template !';

                    case 19:
                        dataQuestion = questionEasy.concat(questionMedium).concat(questionHard);
                        _context10.next = 22;
                        return (0, _entryCode._regenerate)(_id, dataQuestion, deadline);

                    case 22:
                        dataEntryCode = _context10.sent;

                        if (!dataEntryCode) {
                            _context10.next = 27;
                            break;
                        }

                        res.status(200).json({
                            success: true,
                            code: dataEntryCode.code
                        });
                        _context10.next = 28;
                        break;

                    case 27:
                        throw 'Can\'t Regenerate';

                    case 28:
                        _context10.next = 33;
                        break;

                    case 30:
                        _context10.prev = 30;
                        _context10.t0 = _context10['catch'](0);

                        res.status(403).json({
                            success: false,
                            message: _context10.t0
                        });

                    case 33:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _callee9, undefined, [[0, 30]]);
    }));

    return function regenerate(_x13, _x14) {
        return _ref8.apply(this, arguments);
    };
}();
//Check Code used
var checkCode = exports.checkCode = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
        var _req$body2, code, timeNow, token, data;

        return regeneratorRuntime.wrap(function _callee10$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        _context11.prev = 0;
                        _req$body2 = req.body, code = _req$body2.code, timeNow = _req$body2.timeNow;

                        if (!(!code || !timeNow)) {
                            _context11.next = 6;
                            break;
                        }

                        throw 'No Data!';

                    case 6:
                        token = void 0;
                        _context11.next = 9;
                        return (0, _entryCode.findCode)(code);

                    case 9:
                        data = _context11.sent;

                        if (data) {
                            _context11.next = 14;
                            break;
                        }

                        throw 'Code is not exist!';

                    case 14:
                        if (data.endTime) {
                            _context11.next = 22;
                            break;
                        }

                        if (!(data.deadline.getTime() - Date.parse(timeNow) <= 0)) {
                            _context11.next = 19;
                            break;
                        }

                        throw 'Code expried!!';

                    case 19:
                        res.status(200).json({
                            success: true,
                            token: (0, _util.generateToken)(code),
                            message: "Code right!"
                        });

                    case 20:
                        _context11.next = 27;
                        break;

                    case 22:
                        if (!(data.endTime.getTime() - Date.parse(timeNow) > 0)) {
                            _context11.next = 26;
                            break;
                        }

                        throw 'Code is using!';

                    case 26:
                        throw 'Code was used!';

                    case 27:
                        ;

                    case 28:
                        _context11.next = 33;
                        break;

                    case 30:
                        _context11.prev = 30;
                        _context11.t0 = _context11['catch'](0);

                        res.status(203).json({
                            success: false,
                            message: _context11.t0
                        });

                    case 33:
                    case 'end':
                        return _context11.stop();
                }
            }
        }, _callee10, undefined, [[0, 30]]);
    }));

    return function checkCode(_x15, _x16) {
        return _ref9.apply(this, arguments);
    };
}();
//get data Show to font-end
var showData = exports.showData = function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
        var code, data;
        return regeneratorRuntime.wrap(function _callee11$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        _context12.prev = 0;
                        code = req.code;
                        //find code on EntryCodeTable

                        _context12.next = 4;
                        return (0, _entryCode.findCode)(code);

                    case 4:
                        data = _context12.sent;

                        if (data) {
                            _context12.next = 9;
                            break;
                        }

                        throw 'Not Found!';

                    case 9:
                        if (data.templateId) {
                            res.status(200).json({
                                name: data.candidateId.firstName + ' ' + data.candidateId.lastName,
                                mobile: data.candidateId.mobile,
                                question: data.questionIds.length,
                                duration: data.templateId.duration,
                                passScore: data.templateId.passScore,
                                language: data.templateId.language
                            });
                        } else if (data.englishExamId) {
                            res.status(200).json({
                                name: data.candidateId.firstName + ' ' + data.candidateId.lastName,
                                mobile: data.candidateId.mobile,
                                question: data.englishExamId.questions.length,
                                duration: data.englishExamId.duration,
                                passScore: data.englishExamId.passScore,
                                language: data.englishExamId.language
                            });
                        }

                    case 10:
                        _context12.next = 15;
                        break;

                    case 12:
                        _context12.prev = 12;
                        _context12.t0 = _context12['catch'](0);

                        res.send(500).send(_context12.t0);

                    case 15:
                    case 'end':
                        return _context12.stop();
                }
            }
        }, _callee11, undefined, [[0, 12]]);
    }));

    return function showData(_x17, _x18) {
        return _ref10.apply(this, arguments);
    };
}();
// api endTest use when user click submit
var endTest = exports.endTest = function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
        var _req$body3, duration, list_answer, code;

        return regeneratorRuntime.wrap(function _callee12$(_context13) {
            while (1) {
                switch (_context13.prev = _context13.next) {
                    case 0:
                        //duration: time test,
                        _req$body3 = req.body, duration = _req$body3.duration, list_answer = _req$body3.list_answer;
                        code = req.code;
                        // create point and save answers to database

                        (0, _entryCode.endTestModel)(duration, list_answer, code, function (err, result) {
                            if (err) {
                                res.status(500).json({ success: false });
                            } else {
                                res.status(200).json({ success: true });
                            }
                        });

                    case 3:
                    case 'end':
                        return _context13.stop();
                }
            }
        }, _callee12, undefined);
    }));

    return function endTest(_x19, _x20) {
        return _ref11.apply(this, arguments);
    };
}();
var finishTest = exports.finishTest = function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(req, res) {
        var code, dataCandidate, account;
        return regeneratorRuntime.wrap(function _callee13$(_context14) {
            while (1) {
                switch (_context14.prev = _context14.next) {
                    case 0:
                        code = req.code;
                        _context14.prev = 1;
                        _context14.next = 4;
                        return (0, _entryCode.findCode)(code);

                    case 4:
                        dataCandidate = _context14.sent;

                        //get data from database by code
                        account = {
                            name: dataCandidate.candidateId.firstName + ' ' + dataCandidate.candidateId.lastName,
                            mobile: dataCandidate.candidateId.mobile,
                            language: dataCandidate.templateId ? dataCandidate.templateId.language : dataCandidate.englishExamId.language
                        };

                        (0, _entryCode.finishTestModel)(code, function (err, result) {
                            if (err) {
                                res.status(500).json({ success: false });
                            } else {
                                res.status(200).json({ success: true, data: result, account: account });
                            }
                        });
                        _context14.next = 12;
                        break;

                    case 9:
                        _context14.prev = 9;
                        _context14.t0 = _context14['catch'](1);

                        res.status(401).json({
                            success: false,
                            message: "Not Found"
                        });

                    case 12:
                    case 'end':
                        return _context14.stop();
                }
            }
        }, _callee13, undefined, [[1, 9]]);
    }));

    return function finishTest(_x21, _x22) {
        return _ref12.apply(this, arguments);
    };
}();
// api startTest when click button start 
var startTest = exports.startTest = function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(req, res) {
        var time, code, duration, data, startTime, endTime, dataUpdate;
        return regeneratorRuntime.wrap(function _callee14$(_context15) {
            while (1) {
                switch (_context15.prev = _context15.next) {
                    case 0:
                        _context15.prev = 0;
                        time = req.body.time;
                        code = req.code;
                        duration = void 0;

                        if (!(!time || !code)) {
                            _context15.next = 8;
                            break;
                        }

                        throw 'No Data';

                    case 8:
                        _context15.next = 10;
                        return (0, _entryCode.findCode)(code);

                    case 10:
                        data = _context15.sent;

                        if (data) {
                            _context15.next = 15;
                            break;
                        }

                        throw 'Not Found!';

                    case 15:
                        startTime = data.startTime, endTime = data.endTime;

                        if (data.templateId) {
                            duration = data.templateId.duration;
                        } else {
                            duration = data.englishExamId.duration;
                        }

                        if (!(!endTime || !startTime || endTime.getTime() - startTime.getTime() < duration * 1000)) {
                            _context15.next = 26;
                            break;
                        }

                        startTime = new Date();
                        endTime = (0, _moment2.default)(startTime).add(duration, 'm').toDate();
                        _context15.next = 22;
                        return (0, _entryCode.updateEntryCode)({ conditions: { code: code }, update: { startTime: startTime, endTime: endTime, point: '0', result: 'FAIL' } });

                    case 22:
                        dataUpdate = _context15.sent;

                        res.status(200).send(endTime);
                        _context15.next = 31;
                        break;

                    case 26:
                        if (!(endTime.getTime() > Date.parse(time))) {
                            _context15.next = 30;
                            break;
                        }

                        res.status(200).send(endTime);
                        _context15.next = 31;
                        break;

                    case 30:
                        throw 'Time OUT';

                    case 31:
                        _context15.next = 36;
                        break;

                    case 33:
                        _context15.prev = 33;
                        _context15.t0 = _context15['catch'](0);

                        res.status(500).send(_context15.t0);

                    case 36:
                    case 'end':
                        return _context15.stop();
                }
            }
        }, _callee14, undefined, [[0, 33]]);
    }));

    return function startTest(_x23, _x24) {
        return _ref13.apply(this, arguments);
    };
}();
//send database to font-end
var listQuestion = exports.listQuestion = function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(req, res) {
        var time, code, dataEntry, account, questionIds, listQuestions, questions, _listQuestions;

        return regeneratorRuntime.wrap(function _callee15$(_context16) {
            while (1) {
                switch (_context16.prev = _context16.next) {
                    case 0:
                        _context16.prev = 0;
                        time = req.body.time;
                        code = req.code;

                        if (!(!time || !code)) {
                            _context16.next = 7;
                            break;
                        }

                        throw 'Not Found';

                    case 7:
                        _context16.next = 9;
                        return (0, _entryCode.findCode)(code);

                    case 9:
                        dataEntry = _context16.sent;
                        account = {
                            name: dataEntry.candidateId.firstName + ' ' + dataEntry.candidateId.lastName,
                            mobile: dataEntry.candidateId.mobile
                        };

                        if (dataEntry.templateId) {
                            questionIds = dataEntry.questionIds;
                            listQuestions = questionIds.map(function (q) {
                                return {
                                    id: q.id,
                                    title: q.question,
                                    multi: q.multi,
                                    options: q.options
                                };
                            });

                            res.status(200).json({
                                time: dataEntry.endTime,
                                currentTime: Date.parse(dataEntry.endTime) - Date.parse(new Date()),
                                listQuestions: listQuestions,
                                account: account,
                                language: dataEntry.templateId.language,
                                question: dataEntry.questionIds.length,
                                duration: dataEntry.templateId.duration * 60 * 1000
                            });
                        } else if (dataEntry.englishExamId) {
                            questions = dataEntry.englishExamId.questions;
                            _listQuestions = questions.map(function (q) {
                                return {
                                    id: q._id,
                                    title: q.questions,
                                    multi: false,
                                    options: q.options,
                                    essay: q.essay,
                                    partNumber: q.partNumber
                                };
                            });

                            res.status(200).json({
                                time: dataEntry.endTime,
                                currentTime: Date.parse(dataEntry.endTime) - Date.parse(new Date()),
                                urlImg1: dataEntry.englishExamId.urlImg1,
                                urlImg2: dataEntry.englishExamId.urlImg2,
                                listQuestions: _listQuestions,
                                account: account,
                                language: dataEntry.englishExamId.language,
                                question: dataEntry.englishExamId.questions.length,
                                duration: dataEntry.englishExamId.duration * 60 * 1000
                            });
                        }

                    case 12:
                        _context16.next = 17;
                        break;

                    case 14:
                        _context16.prev = 14;
                        _context16.t0 = _context16['catch'](0);

                        res.status(404).json({
                            success: false,
                            message: _context16.t0
                        });

                    case 17:
                    case 'end':
                        return _context16.stop();
                }
            }
        }, _callee15, undefined, [[0, 14]]);
    }));

    return function listQuestion(_x25, _x26) {
        return _ref14.apply(this, arguments);
    };
}();
// report => testDetail
var reportTestDetail = exports.reportTestDetail = function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(req, res) {
        var code, data;
        return regeneratorRuntime.wrap(function _callee16$(_context17) {
            while (1) {
                switch (_context17.prev = _context17.next) {
                    case 0:
                        code = req.params.code;
                        _context17.prev = 1;
                        _context17.next = 4;
                        return (0, _entryCode.detailResultTest)(code, function (data, err) {
                            if (err) {
                                res.json({
                                    success: false
                                });
                            } else {
                                res.status(200).json({
                                    success: true,
                                    data: data
                                });
                            }
                        });

                    case 4:
                        data = _context17.sent;
                        _context17.next = 10;
                        break;

                    case 7:
                        _context17.prev = 7;
                        _context17.t0 = _context17['catch'](1);

                        res.status(500).json({
                            success: false,
                            message: "Server Error"
                        });

                    case 10:
                    case 'end':
                        return _context17.stop();
                }
            }
        }, _callee16, undefined, [[1, 7]]);
    }));

    return function reportTestDetail(_x27, _x28) {
        return _ref15.apply(this, arguments);
    };
}();

var endEnglishTest = exports.endEnglishTest = function endEnglishTest(req, res) {
    var _req$body4 = req.body,
        duration = _req$body4.duration,
        list_answer = _req$body4.list_answer;
    var code = req.code;

    (0, _entryCode.endEnglishTestModel)(duration, list_answer, code, function (err, result) {
        if (err) {
            res.status(404).json({ success: false });
        } else {
            res.status(200).json({ success: true });
        }
    });
};

var getAllEnglishTest = exports.getAllEnglishTest = function getAllEnglishTest(req, res) {
    (0, _entryCode.getAllEnglishTestModel)(function (err, data) {
        if (err) {
            res.json({
                success: false
            });
        }
        res.json({
            success: true,
            englishEntries: data
        });
    });
};
var countEnglishNotPoint = exports.countEnglishNotPoint = function countEnglishNotPoint(req, res) {
    (0, _entryCode.countEnglishNotPointModel)(function (err, count) {
        if (err) {
            res.json({
                success: false
            });
        }
        res.json({
            success: true,
            count: count
        });
    });
};

var getQuestionEssayEnglishTest = exports.getQuestionEssayEnglishTest = function getQuestionEssayEnglishTest(req, res) {
    var id = req.params.id;

    (0, _entryCode.getQuestionEssayEnglishTestModel)(id, function (err, question_essay) {
        if (err) {
            res.json({
                success: false,
                err: err
            });
        }
        res.json({
            success: true,
            question_essay: question_essay
        });
    });
};

var savePointEssayToDb = exports.savePointEssayToDb = function savePointEssayToDb(req, res) {
    var _req$body5 = req.body,
        idExam = _req$body5.idExam,
        point = _req$body5.point;

    console.log(point);
    (0, _entryCode.savePointEssayToDbModel)(idExam, point, function (err, data) {
        if (err) {
            res.json({
                success: false,
                err: err
            });
        }
        res.json({
            success: true,
            data: data
        });
    });
};
//# sourceMappingURL=entryCode.js.map