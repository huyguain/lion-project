'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.remove = exports.edit = exports.getOne = exports.list = exports.importFile = exports.create = undefined;

var _university = require('../models/university');

var _csvtojson = require('csvtojson');

var _csvtojson2 = _interopRequireDefault(_csvtojson);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var create = exports.create = function create(req, res) {
    (0, _university.createUniversity)(req.body, function (err, data) {
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

var importFile = exports.importFile = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var university, fileName;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        university = [];
                        _context.prev = 1;
                        fileName = 'upload/' + req.body.fileUniversity;

                        (0, _csvtojson2.default)().fromFile(fileName).on('json', function (jsonObj) {
                            university.push(jsonObj);
                        }).on('done', function (error) {
                            (0, _university.importUniversity)(university, function (err, result) {
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

    return function importFile(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var list = exports.list = function list(req, res) {
    (0, _university.listUniversity)(function (err, data) {
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

var getOne = exports.getOne = function getOne(req, res) {
    var id = req.params.id;

    (0, _university.getOneUniversity)(id, function (err, data) {
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

    (0, _university.editUniversity)(id, req.body, function (err, data) {
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

    (0, _university.removeUniversity)(id, function (err) {
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
//# sourceMappingURL=university.js.map