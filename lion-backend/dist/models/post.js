"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAllPostActive = exports.getPostById = exports.editPost = exports.searchSuggest = exports.deletePost = exports.listPost = exports.createPost = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Post = new _mongoose.Schema({
    urlImage: String,
    title: String,
    content: String,
    description: String,
    category: String,
    status: { type: Boolean, default: false },
    link_url: { type: String, unique: true, require: true },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    urlImageSlider: [{
        type: String
    }],
    hashTag: [{
        type: String
    }]
});

var postModel = _mongoose2.default.model('post', Post);

var createPost = exports.createPost = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(newPost, callback) {
        var Post, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        Post = new postModel(newPost);
                        _context.prev = 1;
                        _context.next = 4;
                        return Post.save();

                    case 4:
                        data = _context.sent;

                        callback(null, data);
                        _context.next = 11;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context["catch"](1);

                        callback(_context.t0);

                    case 11:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 8]]);
    }));

    return function createPost(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
var listPost = exports.listPost = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(order, limit, callback) {
        var data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return postModel.find(order).sort({ 'update_at': -1 });

                    case 3:
                        data = _context2.sent;

                        if (limit) {
                            _context2.next = 8;
                            break;
                        }

                        _context2.next = 7;
                        return postModel.find(order).sort({ 'update_at': -1 }).limit(limit);

                    case 7:
                        data = _context2.sent;

                    case 8:
                        callback(null, data);
                        _context2.next = 14;
                        break;

                    case 11:
                        _context2.prev = 11;
                        _context2.t0 = _context2["catch"](0);

                        callback(_context2.t0);

                    case 14:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 11]]);
    }));

    return function listPost(_x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
    };
}();

var deletePost = exports.deletePost = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, callback) {
        var data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return postModel.remove({ _id: id });

                    case 3:
                        data = _context3.sent;

                        callback(null, data);
                        _context3.next = 10;
                        break;

                    case 7:
                        _context3.prev = 7;
                        _context3.t0 = _context3["catch"](0);

                        callback(_context3.t0);

                    case 10:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 7]]);
    }));

    return function deletePost(_x6, _x7) {
        return _ref3.apply(this, arguments);
    };
}();
var searchSuggest = exports.searchSuggest = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(valueSearch, callback) {
        var data;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return postModel.find({
                            $or: [{ title: { '$regex': new RegExp(valueSearch, 'i') } }, { description: { '$regex': new RegExp(valueSearch, 'i') } }, { category: { '$regex': new RegExp(valueSearch, 'i') } }],
                            category: { $ne: 'Page' }
                        });

                    case 3:
                        data = _context4.sent;

                        callback(null, data);
                        _context4.next = 10;
                        break;

                    case 7:
                        _context4.prev = 7;
                        _context4.t0 = _context4["catch"](0);

                        callback(_context4.t0);

                    case 10:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 7]]);
    }));

    return function searchSuggest(_x8, _x9) {
        return _ref4.apply(this, arguments);
    };
}();
var editPost = exports.editPost = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id, data, callback) {
        var doc, title, description, status, urlImageSlider, urlImage, content, hashTag, category, listDelete, listHashTag, listImageSlider, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, post;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        _context5.next = 3;
                        return postModel.findById({ _id: id });

                    case 3:
                        doc = _context5.sent;
                        title = data.title, description = data.description, status = data.status, urlImageSlider = data.urlImageSlider, urlImage = data.urlImage, content = data.content, hashTag = data.hashTag, category = data.category, listDelete = data.listDelete;

                        doc.title = title;
                        doc.description = description;
                        doc.status = status;
                        doc.update_at = new Date();
                        doc.content = content;
                        doc.category = category;
                        listHashTag = hashTag.split(',');

                        doc.hashTag = listHashTag[0] !== '' ? listHashTag : [];
                        if (urlImage) {
                            deleteImage(doc.urlImage);
                            doc.urlImage = urlImage;
                        }
                        listImageSlider = [].concat(_toConsumableArray(doc.urlImageSlider), _toConsumableArray(urlImageSlider));
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context5.prev = 18;

                        _loop = function _loop() {
                            var i = _step.value;

                            deleteImage(i);
                            listImageSlider = listImageSlider.filter(function (item) {
                                return item !== i;
                            });
                        };

                        for (_iterator = listDelete.split(',')[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            _loop();
                        }
                        _context5.next = 27;
                        break;

                    case 23:
                        _context5.prev = 23;
                        _context5.t0 = _context5["catch"](18);
                        _didIteratorError = true;
                        _iteratorError = _context5.t0;

                    case 27:
                        _context5.prev = 27;
                        _context5.prev = 28;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 30:
                        _context5.prev = 30;

                        if (!_didIteratorError) {
                            _context5.next = 33;
                            break;
                        }

                        throw _iteratorError;

                    case 33:
                        return _context5.finish(30);

                    case 34:
                        return _context5.finish(27);

                    case 35:
                        doc.urlImageSlider = listImageSlider;
                        _context5.next = 38;
                        return doc.save();

                    case 38:
                        post = _context5.sent;

                        callback(null, post);
                        _context5.next = 45;
                        break;

                    case 42:
                        _context5.prev = 42;
                        _context5.t1 = _context5["catch"](0);

                        callback(_context5.t1);

                    case 45:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 42], [18, 23, 27, 35], [28,, 30, 34]]);
    }));

    return function editPost(_x10, _x11, _x12) {
        return _ref5.apply(this, arguments);
    };
}();
var deleteImage = function deleteImage(urlImage) {
    if (urlImage) {
        try {
            var link = "upload/" + urlImage;
            console.log('xoa anh', urlImage);
            _fs2.default.unlinkSync(link);
        } catch (err) {}
    }
};
var getPostById = exports.getPostById = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id, callback) {
        var doc;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        _context6.next = 3;
                        return postModel.findById({ _id: id });

                    case 3:
                        doc = _context6.sent;

                        callback(null, doc);
                        _context6.next = 10;
                        break;

                    case 7:
                        _context6.prev = 7;
                        _context6.t0 = _context6["catch"](0);

                        callback(_context6.t0);

                    case 10:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[0, 7]]);
    }));

    return function getPostById(_x13, _x14) {
        return _ref6.apply(this, arguments);
    };
}();
var getAllPostActive = exports.getAllPostActive = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(limit, callback) {
        var data;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.prev = 0;
                        _context7.next = 3;
                        return postModel.find({ status: true }).sort({ 'update_at': -1 }).limit(limit);

                    case 3:
                        data = _context7.sent;
                        ;
                        callback(null, data);
                        _context7.next = 11;
                        break;

                    case 8:
                        _context7.prev = 8;
                        _context7.t0 = _context7["catch"](0);

                        callback(_context7.t0);

                    case 11:
                    case "end":
                        return _context7.stop();
                }
            }
        }, _callee7, undefined, [[0, 8]]);
    }));

    return function getAllPostActive(_x15, _x16) {
        return _ref7.apply(this, arguments);
    };
}();
//# sourceMappingURL=post.js.map