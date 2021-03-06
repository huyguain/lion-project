'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPostActive = exports.getById = exports.edit = exports.remove = exports.search = exports.listOrder = exports.list = exports.create = undefined;

var _post = require('../models/post');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _slug = require('slug');

var _slug2 = _interopRequireDefault(_slug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

                        req.body.urlImageSlider = req.files.filter(function (item) {
                            return item.fieldname === 'slider';
                        }).map(function (item) {
                            return item.filename;
                        });
                        req.body.link_url = req.body.link_url ? req.body.link_url : (0, _slug2.default)(req.body.title.trim().toLowerCase());
                        (0, _post.createPost)(req.body, function (err, data) {
                            if (err) {
                                if (err.code = 11000) {
                                    req.body.link_url = (0, _slug2.default)(req.body.title.trim().toLowerCase()) + "-" + (err.index + Math.round(Math.random() * 100));
                                    create(req, res);
                                } else {
                                    res.status(500).json({
                                        success: false,
                                        massage: "error upload image"
                                    });
                                }
                            } else {
                                res.status(200).json({
                                    success: true,
                                    massage: "upload image success"
                                });
                            }
                        });

                    case 6:
                    case 'end':
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

    (0, _post.listPost)({}, limit, function (err, data) {
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
var listOrder = exports.listOrder = function listOrder(req, res) {
    var _req$body = req.body,
        order = _req$body.order,
        limit = _req$body.limit;

    (0, _post.listPost)(order, limit, function (err, data) {
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
var search = exports.search = function search(req, res) {
    var _req$body2 = req.body,
        order = _req$body2.order,
        limit = _req$body2.limit;

    try {
        (0, _post.searchSuggest)(order.value, function (err, data) {
            console.log(err);
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
    } catch (err) {
        res.json({
            success: false
        });
    }
};
var remove = exports.remove = function remove(req, res) {
    var id = req.params.id;

    (0, _post.deletePost)(id, function (err, data) {
        if (err) {
            res.status(500).json({
                success: false
            });
        } else {
            try {
                var link = 'upload/' + data.urlImage;
                console.log("link", link);
                _fs2.default.unlinkSync(link);
            } catch (err) {
                console.log(err);
            }
            res.status(200).json({
                success: true,
                id: id
            });
        }
    });
};
var edit = exports.edit = function edit(req, res) {
    var id = req.params.id;

    var imageURL = req.files.filter(function (item) {
        return item.fieldname === 'image';
    });
    req.body.urlImage = imageURL.length === 1 ? imageURL[0].filename : undefined;
    req.body.urlImageSlider = req.files.filter(function (item) {
        return item.fieldname === 'slider';
    }).map(function (item) {
        return item.filename;
    });
    var data = req.body;
    (0, _post.editPost)(id, data, function (err, postEdit) {
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

var getById = exports.getById = function getById(req, res) {
    var id = req.params.id;

    (0, _post.getPostById)(id, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({
                data: data
            });
        }
    });
};
var getPostActive = exports.getPostActive = function getPostActive(req, res) {
    (0, _post.getAllPostActive)(4, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({
                data: data
            });
        }
    });
};
//# sourceMappingURL=post.js.map