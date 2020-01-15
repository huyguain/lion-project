'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkTemplate = undefined;

var _testTemplate = require('../models/testTemplate');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var checkTemplate = exports.checkTemplate = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var _req$body, language, testName;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _req$body = req.body, language = _req$body.language, testName = _req$body.testName;
                        _context.prev = 1;
                        _context.next = 4;
                        return (0, _testTemplate.getTemplate)(language, testName, function (err, data) {
                            if (!data || data === []) {
                                next();
                            } else {
                                res.status(201).json({
                                    success: false,
                                    message: 'Template exsited!!'
                                });
                            }
                        });

                    case 4:
                        _context.next = 9;
                        break;

                    case 6:
                        _context.prev = 6;
                        _context.t0 = _context['catch'](1);

                        res.status(500).send('Error!');

                    case 9:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 6]]);
    }));

    return function checkTemplate(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();
//# sourceMappingURL=checkTemplate.js.map