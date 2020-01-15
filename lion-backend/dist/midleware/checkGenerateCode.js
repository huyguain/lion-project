'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkCreateCode = undefined;

var _question = require('../models/question');

var _entryCode = require('../models/entryCode');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var checkCreateCode = exports.checkCreateCode = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var _req$body, numberEasy, numberHard, numberMedium, TemplateId, UserId, language, type, easy, medium, hard;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _req$body = req.body, numberEasy = _req$body.numberEasy, numberHard = _req$body.numberHard, numberMedium = _req$body.numberMedium, TemplateId = _req$body.TemplateId, UserId = _req$body.UserId, language = _req$body.language, type = _req$body.type;
                        easy = 0, medium = 0, hard = 0;
                        _context.prev = 2;
                        _context.next = 5;
                        return (0, _question.getQuestionByCouse)(language, type, function (err, data) {
                            var arr = data.map(function (v) {
                                return v.level;
                            });
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;

                            try {
                                for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    var i = _step.value;

                                    if (i === 1) {
                                        easy++;
                                    }if (i === 2) {
                                        medium++;
                                    }if (i === 3) {
                                        hard++;
                                    }
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return) {
                                        _iterator.return();
                                    }
                                } finally {
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }

                            console.log(easy, medium, hard);
                            if (0 <= numberEasy && numberEasy <= easy && 0 <= numberMedium && numberHard <= medium && 0 <= numberHard && numberHard <= hard) {
                                next();
                                // checkCode(TemplateId, UserId, (err, _data) => {
                                //     if (!_data || data === []) {
                                //         next()
                                //     } else {
                                //         return res.status(201).json({
                                //             success: false,
                                //             message: 'You can not update! '
                                //         })
                                //     }
                                // })
                            } else {
                                res.status(201).json({
                                    success: false,
                                    message: 'Not enough quantity!!'
                                });
                            }
                        });

                    case 5:
                        _context.next = 10;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](2);

                        res.status(500).send('Error');

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[2, 7]]);
    }));

    return function checkCreateCode(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();
//# sourceMappingURL=checkGenerateCode.js.map