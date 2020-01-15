'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._getEnglishTest = exports.getEnglishTest = exports.getEnglishTestAsAw = exports.createEnglishTest = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var questionSchema = new _mongoose.Schema({
    questions: String,
    options: {
        a: String,
        b: String,
        c: String,
        d: String
    },
    correct: [],
    essay: Boolean,
    partNumber: Number
});

var englishTestSchema = new _mongoose.Schema({

    testCode: String,

    urlImg1: String,

    urlImg2: String,
    language: { type: String, default: 'English' },
    duration: { type: Number, default: 40 },
    passScore: { type: Number, default: 80 },
    questions: [questionSchema]
});

var EnglishTest = _mongoose2.default.model('EnglishTest', englishTestSchema);

var createEnglishTest = exports.createEnglishTest = function createEnglishTest(testCode, urlImg1, urlImg2, questions, callback) {
    var englishTest = new EnglishTest();
    englishTest.testCode = testCode;
    englishTest.urlImg1 = urlImg1;
    englishTest.urlImg2 = urlImg2;
    questions.forEach(function (element) {
        var optionChoice = element['options[d]'] ? { a: element['options[a]'], b: element['options[b]'], c: element['options[c]'], d: element['options[d]'] } : { a: element['options[a]'], b: element['options[b]'], c: element['options[c]'] };

        englishTest.questions.push({
            questions: element.question,
            options: optionChoice,
            correct: element.correct.split(','),
            essay: element.essay === 'TRUE' ? true : false,
            partNumber: element.partNumber
        });
    });
    englishTest.save(function (err, result) {
        if (err) return callback(err);
        return callback(null, result);
    });
};

var getEnglishTestAsAw = exports.getEnglishTestAsAw = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return EnglishTest.find({});

                    case 3:
                        result = _context.sent;
                        return _context.abrupt('return', { message: true, data: result });

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](0);
                        return _context.abrupt('return', {
                            message: false, data: _context.t0
                        });

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 7]]);
    }));

    return function getEnglishTestAsAw() {
        return _ref.apply(this, arguments);
    };
}();

var getEnglishTest = exports.getEnglishTest = function getEnglishTest(callback) {
    EnglishTest.find({}, function (err, data) {
        if (err) return callback(err);
        callback(null, data);
    });
};
//get English Test
var _getEnglishTest = exports._getEnglishTest = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        result = void 0;
                        _context2.next = 3;
                        return EnglishTest.find({}).sort({ _id: -1 }).limit(1).exec(function (err, data) {
                            if (err) {
                                result = 'Get English Test Error !';
                            } else {
                                result = data[0];
                            }
                        });

                    case 3:
                        return _context2.abrupt('return', result);

                    case 4:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function _getEnglishTest() {
        return _ref2.apply(this, arguments);
    };
}();
//# sourceMappingURL=englishExam.js.map