'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.remove = exports.edit = exports.getOne = exports.list = exports.create = undefined;

var _applier = require('../models/applier');

var _mailer = require('../lib/mailer');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var nodemailer = require('nodemailer');
var create = exports.create = function create(req, res) {
    console.log('req.body', req.body);
    (0, _applier.createApplier)(req.body, function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, data) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!err) {
                                _context.next = 4;
                                break;
                            }

                            res.json({
                                success: false,
                                message: err
                            });
                            _context.next = 8;
                            break;

                        case 4:
                            console.log('data-payload', data);
                            // let payload = {
                            //     TO: dataCandidate.email,
                            //     code: dataEntryCode.code
                            // }
                            // console.log({payload})
                            _context.next = 7;
                            return (0, _applier.getOneApplier)(data._id, function (err, applier) {
                                if (err) {
                                    res.json({
                                        success: false,
                                        message: err
                                    });
                                } else {
                                    (0, _mailer.sendApply)(applier[0], function (err, dataMail) {
                                        console.log(dataMail);
                                    });
                                }
                            });

                        case 7:
                            res.json({
                                success: true,
                                message: 'success'
                            });

                        case 8:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());
};

var list = exports.list = function list(req, res) {
    (0, _applier.listApplier)(function (err, data) {
        if (err) {
            res.json({
                success: false,
                message: err
            });
        } else {
            console.log('data', data);
            res.json({
                success: true,
                message: 'success',
                data: data
            });
        }
    });
};

var getOne = exports.getOne = function getOne(req, res) {
    var id = req.params.id;

    (0, _applier.getOneApplier)(id, function (err, data) {
        if (err) {
            res.json({
                success: false,
                message: err
            });
        } else {
            res.json({
                success: true,
                message: 'success',
                data: data
            });
        }
    });
};

var edit = exports.edit = function edit(req, res) {
    var id = req.params.id;

    (0, _applier.editApplier)(id, req.body, function (err, data) {
        if (err) {
            res.json({
                success: false,
                message: err
            });
        } else {
            res.json({
                success: true,
                message: 'success',
                data: data
            });
        }
    });
};

var remove = exports.remove = function remove(req, res) {
    var id = req.params.id;

    (0, _applier.removeApplier)(id, function (err) {
        if (err) {
            res.json({
                success: false,
                message: err
            });
        } else {
            res.json({
                success: true,
                message: 'success'
            });
        }
    });
};
//# sourceMappingURL=applier.js.map