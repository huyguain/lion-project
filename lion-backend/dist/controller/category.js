"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.edit = exports.getById = exports.getByTitle = exports.list = exports.create = undefined;

var _category = require("../models/category");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var create = exports.create = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return req.files[0].filename;

                    case 2:
                        req.body.urlImage = _context.sent;

                        (0, _category.createCategory)(req.body, function (err, data) {
                            if (err) {
                                res.status(500).json({
                                    success: false,
                                    massage: "error upload image"
                                });
                            } else {
                                res.status(200).json({
                                    success: true,
                                    massage: "upload image success"
                                });
                            }
                        });

                    case 4:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function create(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
var list = exports.list = function list(req, res) {
    var limit = req.body.limit;

    (0, _category.listCategories)(limit, function (err, data) {
        if (err) {
            res.status(500).json({
                success: false,
                err: err
            });
        } else {
            res.status(200).json({
                success: true,
                data: data
            });
        }
    });
};
var getByTitle = exports.getByTitle = function getByTitle(req, res) {
    var title = req.params.title;

    (0, _category.getCategoriesTitle)(title.toLowerCase(), function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json({
                data: data
            });
        }
    });
};
var getById = exports.getById = function getById(req, res) {
    var id = req.params.id;

    (0, _category.getCategoriesId)(id, function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json({
                data: data
            });
        }
    });
};
var edit = exports.edit = function edit(req, res) {
    var id = req.params.id;

    req.body.urlImage = req.files[0] ? req.files[0].filename : undefined;
    var data = req.body;
    (0, _category.editCategory)(id, data, function (err, categoryEdit) {
        if (err) {
            res.status(500).json({
                success: false
            });
        } else {
            res.status(200).json({
                success: true
            });
        }
    });
};
//# sourceMappingURL=category.js.map