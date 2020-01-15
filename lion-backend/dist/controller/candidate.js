'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.importCandidate = exports.deleteCandidate = exports.editCandidate = exports.getCandidateById = exports.getAllCandidate = exports.createCanidate = undefined;

var _candidate = require('../models/candidate');

var _englishExam = require('../models/englishExam');

var _entryCode = require('../models/entryCode');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//create canidate


var createCanidate = exports.createCanidate = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var dataCandidate, dataCandi, data, dataEnglish, dataEntryEnglish, dataCandidateUpdate;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        dataCandidate = req.body.dataCandidate;

                        if (dataCandidate) {
                            _context.next = 6;
                            break;
                        }

                        throw 'No Data!';

                    case 6:
                        _context.next = 8;
                        return (0, _candidate._getCanidateByEmail)(dataCandidate.email);

                    case 8:
                        dataCandi = _context.sent;

                        if (!dataCandi) {
                            _context.next = 13;
                            break;
                        }

                        throw 'Email exited!';

                    case 13:
                        _context.next = 15;
                        return (0, _candidate._createCanidate)(dataCandidate);

                    case 15:
                        data = _context.sent;

                        if (!data) {
                            _context.next = 41;
                            break;
                        }

                        _context.next = 19;
                        return (0, _englishExam._getEnglishTest)();

                    case 19:
                        dataEnglish = _context.sent;

                        if (!(!dataEnglish || !dataEnglish._id)) {
                            _context.next = 24;
                            break;
                        }

                        throw 'Can\'t Get English Test !';

                    case 24:
                        _context.next = 26;
                        return (0, _entryCode._createEntryEnglish)(data._id, dataEnglish._id);

                    case 26:
                        dataEntryEnglish = _context.sent;

                        if (!dataEntryEnglish) {
                            _context.next = 38;
                            break;
                        }

                        _context.next = 30;
                        return (0, _candidate._updateCandidate)(data._id, dataEntryEnglish._id);

                    case 30:
                        dataCandidateUpdate = _context.sent;

                        if (!dataCandidateUpdate) {
                            _context.next = 35;
                            break;
                        }

                        res.status(204).end();
                        _context.next = 36;
                        break;

                    case 35:
                        throw 'Can\'t Update Candidate!';

                    case 36:
                        _context.next = 39;
                        break;

                    case 38:
                        throw 'Can\'t create Enrty English !';

                    case 39:
                        _context.next = 42;
                        break;

                    case 41:
                        throw 'Create Candidate Error!';

                    case 42:
                        _context.next = 48;
                        break;

                    case 44:
                        _context.prev = 44;
                        _context.t0 = _context['catch'](0);

                        console.log(_context.t0);
                        res.status(203).json({
                            success: false,
                            message: _context.t0
                        });

                    case 48:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 44]]);
    }));

    return function createCanidate(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
//get all candidate
var getAllCandidate = exports.getAllCandidate = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var dataCandidate;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return (0, _candidate._getAllCandidate)();

                    case 3:
                        dataCandidate = _context2.sent;

                        res.status(200).json({
                            success: true,
                            dataCandidate: dataCandidate
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

    return function getAllCandidate(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
//getCandidateById
var getCandidateById = exports.getCandidateById = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var id, dataCandidate;
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

                        importCandidate('No Data!');
                        _context3.next = 14;
                        break;

                    case 6:
                        _context3.next = 8;
                        return (0, _candidate._getCandidateById)(id);

                    case 8:
                        dataCandidate = _context3.sent;

                        if (!dataCandidate) {
                            _context3.next = 13;
                            break;
                        }

                        res.status(200).json({
                            success: true,
                            dataCandidate: dataCandidate
                        });
                        _context3.next = 14;
                        break;

                    case 13:
                        throw 'Can\'t Get Candidate';

                    case 14:
                        _context3.next = 19;
                        break;

                    case 16:
                        _context3.prev = 16;
                        _context3.t0 = _context3['catch'](0);

                        res.status(203).json({
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

    return function getCandidateById(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();
//editCandidate
var editCandidate = exports.editCandidate = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var id, dataUpdate, dataCandi;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        id = req.params.id;
                        dataUpdate = req.body.dataUpdate;

                        console.log('dataUpdate', dataUpdate);

                        if (!(!id || !dataUpdate)) {
                            _context4.next = 8;
                            break;
                        }

                        throw 'No Data!';

                    case 8:
                        _context4.next = 10;
                        return (0, _candidate._editCandidate)(id, dataUpdate);

                    case 10:
                        dataCandi = _context4.sent;

                        if (!dataCandi) {
                            _context4.next = 15;
                            break;
                        }

                        res.status(204).end();
                        _context4.next = 16;
                        break;

                    case 15:
                        throw 'Can\'t Update Candidate!';

                    case 16:
                        _context4.next = 21;
                        break;

                    case 18:
                        _context4.prev = 18;
                        _context4.t0 = _context4['catch'](0);

                        res.status(203).json({
                            success: false,
                            message: _context4.t0
                        });

                    case 21:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 18]]);
    }));

    return function editCandidate(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();
//deleteCandidate
var deleteCandidate = exports.deleteCandidate = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var id, check, checkEntry;
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

                        throw 'No Data!';

                    case 6:
                        _context5.next = 8;
                        return (0, _candidate._deleteCandidate)(id);

                    case 8:
                        check = _context5.sent;

                        if (!check) {
                            _context5.next = 20;
                            break;
                        }

                        _context5.next = 12;
                        return (0, _entryCode._deleteEntryCodeByCandi)(id);

                    case 12:
                        checkEntry = _context5.sent;

                        if (checkEntry) {
                            _context5.next = 17;
                            break;
                        }

                        throw 'Can\'t Delete Entry Code';

                    case 17:
                        res.status(204).end();

                    case 18:
                        _context5.next = 21;
                        break;

                    case 20:
                        throw 'Can\'t Delete Candidate!';

                    case 21:
                        _context5.next = 26;
                        break;

                    case 23:
                        _context5.prev = 23;
                        _context5.t0 = _context5['catch'](0);

                        res.status(403).json({
                            success: false,
                            message: _context5.t0
                        });

                    case 26:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 23]]);
    }));

    return function deleteCandidate(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();
//importCandidate
var importCandidate = exports.importCandidate = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
        var arrCandidate, CandidateExist, CanidateImportError, EnglishCreateError, CandidateUpdateError, count, newCandidate, dataEnglish, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, dataCandidate, checkCandidate, dataCandi, dataEntryEnglish, dataCandidateUpdate;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        arrCandidate = req.body.arrCandidate;

                        if (arrCandidate) {
                            _context6.next = 6;
                            break;
                        }

                        throw 'No Data';

                    case 6:
                        CandidateExist = 0;
                        CanidateImportError = 0;
                        EnglishCreateError = 0;
                        CandidateUpdateError = 0;
                        count = 0;
                        newCandidate = [];
                        _context6.next = 14;
                        return (0, _englishExam._getEnglishTest)();

                    case 14:
                        dataEnglish = _context6.sent;

                        if (dataEnglish) {
                            _context6.next = 19;
                            break;
                        }

                        throw 'English question is not exist !';

                    case 19:
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context6.prev = 22;
                        _iterator = arrCandidate[Symbol.iterator]();

                    case 24:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context6.next = 58;
                            break;
                        }

                        dataCandidate = _step.value;

                        console.log('dataCandidate', dataCandidate);
                        count++;
                        _context6.next = 30;
                        return (0, _candidate._getCanidateByEmail)(dataCandidate.email);

                    case 30:
                        checkCandidate = _context6.sent;

                        if (!checkCandidate) {
                            _context6.next = 35;
                            break;
                        }

                        CandidateExist++;
                        _context6.next = 53;
                        break;

                    case 35:
                        _context6.next = 37;
                        return (0, _candidate._createCanidate)(dataCandidate);

                    case 37:
                        dataCandi = _context6.sent;

                        if (dataCandi) {
                            _context6.next = 42;
                            break;
                        }

                        CanidateImportError++;
                        _context6.next = 53;
                        break;

                    case 42:
                        _context6.next = 44;
                        return (0, _entryCode._createEntryEnglish)(dataCandi._id, dataEnglish._id);

                    case 44:
                        dataEntryEnglish = _context6.sent;

                        if (dataEntryEnglish) {
                            _context6.next = 49;
                            break;
                        }

                        EnglishCreateError++;
                        _context6.next = 53;
                        break;

                    case 49:
                        _context6.next = 51;
                        return (0, _candidate._updateCandidate)(dataCandi._id, dataEntryEnglish._id);

                    case 51:
                        dataCandidateUpdate = _context6.sent;

                        if (!dataCandidateUpdate) {
                            CandidateUpdateError++;
                        } else {
                            newCandidate.push({ id: dataCandidateUpdate._id, language: dataCandidate.language });
                        }

                    case 53:
                        console.log('newCandidate', newCandidate);
                        req.body.newCandidate = newCandidate;

                    case 55:
                        _iteratorNormalCompletion = true;
                        _context6.next = 24;
                        break;

                    case 58:
                        _context6.next = 64;
                        break;

                    case 60:
                        _context6.prev = 60;
                        _context6.t0 = _context6['catch'](22);
                        _didIteratorError = true;
                        _iteratorError = _context6.t0;

                    case 64:
                        _context6.prev = 64;
                        _context6.prev = 65;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 67:
                        _context6.prev = 67;

                        if (!_didIteratorError) {
                            _context6.next = 70;
                            break;
                        }

                        throw _iteratorError;

                    case 70:
                        return _context6.finish(67);

                    case 71:
                        return _context6.finish(64);

                    case 72:
                        if (count === arrCandidate.length) {
                            req.body.resCandidate = {
                                candidateImported: newCandidate,
                                success: true,
                                result: count - CandidateExist + '/' + count,
                                CanidateImportError: CanidateImportError,
                                EnglishCreateError: EnglishCreateError,
                                CandidateUpdateError: CandidateUpdateError
                            };
                            console.log('ok');
                            next();
                        }

                    case 73:
                        _context6.next = 78;
                        break;

                    case 75:
                        _context6.prev = 75;
                        _context6.t1 = _context6['catch'](0);

                        res.status(203).json({
                            success: false,
                            message: _context6.t1
                        });

                    case 78:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[0, 75], [22, 60, 64, 72], [65,, 67, 71]]);
    }));

    return function importCandidate(_x11, _x12, _x13) {
        return _ref6.apply(this, arguments);
    };
}();
//# sourceMappingURL=candidate.js.map