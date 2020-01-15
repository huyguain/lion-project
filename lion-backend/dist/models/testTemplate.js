'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._deleteTemplateById = exports.getTemplateById = exports.getTemplate = exports._getAllTemplate = exports.getTestTemplate = exports.getTemplateDefaultEntry = exports.updateTestTemplate = exports.createTestTemplate = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _os = require('os');

var _moment = require('moment');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var TestTemplateModel = new _mongoose.Schema({
    language: { type: String, required: true },
    testName: { type: String, required: true },
    easy: {
        type: Number,
        min: 0
    },
    medium: {
        type: Number,
        min: 0
    },
    hard: {
        type: Number,
        min: 0
    },
    passScore: Number,
    duration: {
        type: Number,
        min: 0
    },
    deleteVisible: {
        type: Boolean,
        default: false
    },
    defaultEntryTest: {
        type: Boolean,
        default: false
    }
});
var testTemplateTable = _mongoose2.default.model('TestTemplate', TestTemplateModel);

//createTemplate
var createTestTemplate = exports.createTestTemplate = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dataTemplate) {
        var _testTemplateTable, dataRef;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _testTemplateTable = new testTemplateTable({
                            language: dataTemplate.language,
                            testName: dataTemplate.testName,
                            easy: dataTemplate.easy,
                            medium: dataTemplate.medium,
                            hard: dataTemplate.hard,
                            passScore: dataTemplate.passScore,
                            duration: dataTemplate.duration,
                            defaultEntryTest: dataTemplate.defaultEntryTest,
                            deleteVisible: dataTemplate.deleteVisible
                        });

                        if (!(dataTemplate.defaultEntryTest === true)) {
                            _context.next = 5;
                            break;
                        }

                        dataRef = {
                            language: dataTemplate.language,
                            defaultEntryTest: true
                        };
                        _context.next = 5;
                        return updateTestTemplate(dataRef, { defaultEntryTest: false });

                    case 5:
                        return _context.abrupt('return', _testTemplateTable.save(function (err, data) {
                            if (err) {
                                return 'Create Template Error!';
                            } else {
                                return data;
                            }
                        }));

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function createTestTemplate(_x) {
        return _ref.apply(this, arguments);
    };
}();
var updateTestTemplate = exports.updateTestTemplate = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dataRef, dataUpdate) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        return _context2.abrupt('return', testTemplateTable.update(dataRef, dataUpdate, { multi: true }).exec(function (err, data) {
                            if (err) return err;
                            return data;
                        }));

                    case 1:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function updateTestTemplate(_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}();
var getTemplateDefaultEntry = exports.getTemplateDefaultEntry = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(language) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        return _context3.abrupt('return', testTemplateTable.findOne({
                            language: language, defaultEntryTest: true
                        }).exec(function (err, data) {
                            if (err) throw 'Get Template Default Entry Test ' + err;else return data;
                        }));

                    case 1:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function getTemplateDefaultEntry(_x4) {
        return _ref3.apply(this, arguments);
    };
}();
//////////////////////////////////////////////////////////////////////////////////////
var getTestTemplate = exports.getTestTemplate = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(course, testName, callback) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return testTemplateTable.findOne({
                            language: course, testName: testName
                        }).exec(function (err, datas) {
                            return callback(null, datas);
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

    return function getTestTemplate(_x5, _x6, _x7) {
        return _ref4.apply(this, arguments);
    };
}();
var _getAllTemplate = exports._getAllTemplate = function _getAllTemplate() {
    return testTemplateTable.find({ deleteVisible: false }, function (err, data) {
        if (err) {
            return 'Get Template Error!';
        } else {
            return data;
        }
    });
};
var getTemplate = exports.getTemplate = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(language, testName, callback) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        _context5.next = 3;
                        return testTemplateTable.findOne({
                            language: language,
                            testName: testName
                        }).exec(function (err, _data) {
                            return callback(null, _data);
                        });

                    case 3:
                        _context5.next = 8;
                        break;

                    case 5:
                        _context5.prev = 5;
                        _context5.t0 = _context5['catch'](0);
                        return _context5.abrupt('return', callback(_context5.t0));

                    case 8:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 5]]);
    }));

    return function getTemplate(_x8, _x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();
var getTemplateById = exports.getTemplateById = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_id, callback) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;

                        testTemplateTable.findOne({ _id: _id }, function (err, data) {
                            return callback(null, data);
                        });
                        _context6.next = 7;
                        break;

                    case 4:
                        _context6.prev = 4;
                        _context6.t0 = _context6['catch'](0);
                        return _context6.abrupt('return', callback(_context6.t0));

                    case 7:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[0, 4]]);
    }));

    return function getTemplateById(_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}();
var _deleteTemplateById = exports._deleteTemplateById = function _deleteTemplateById(_id) {
    return testTemplateTable.remove({ _id: _id }, function (err) {
        if (err) {
            return err;
        } else {
            return 1;
        }
    });
};
//# sourceMappingURL=testTemplate.js.map