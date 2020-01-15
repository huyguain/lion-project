'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteCategory = exports.editCategory = exports.getCategoriesTitle = exports.getCategoriesId = exports.listCategories = exports.createCategory = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_mongoose2.default.Promise = global.Promise;
var categoriesSchema = new _mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    urlImage: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

var categoryModel = _mongoose2.default.model('category', categoriesSchema);
var createCategory = exports.createCategory = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(newCategory, callback) {
        var Category, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        Category = new categoryModel(newCategory);
                        _context.prev = 1;
                        _context.next = 4;
                        return Category.save();

                    case 4:
                        data = _context.sent;

                        callback(null, data);
                        _context.next = 12;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](1);

                        console.log(_context.t0);
                        callback(_context.t0);

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 8]]);
    }));

    return function createCategory(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var listCategories = exports.listCategories = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(limit, callback) {
        var data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return categoryModel.find();

                    case 3:
                        data = _context2.sent;

                        if (limit) {
                            _context2.next = 8;
                            break;
                        }

                        _context2.next = 7;
                        return categoryModel.find().limit(limit);

                    case 7:
                        data = _context2.sent;

                    case 8:
                        callback(null, data);
                        _context2.next = 14;
                        break;

                    case 11:
                        _context2.prev = 11;
                        _context2.t0 = _context2['catch'](0);

                        callback(_context2.t0);

                    case 14:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 11]]);
    }));

    return function listCategories(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var getCategoriesId = exports.getCategoriesId = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, callback) {
        var doc;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return categoryModel.findById({ _id: id });

                    case 3:
                        doc = _context3.sent;

                        callback(null, doc);
                        _context3.next = 10;
                        break;

                    case 7:
                        _context3.prev = 7;
                        _context3.t0 = _context3['catch'](0);

                        callback(_context3.t0);

                    case 10:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 7]]);
    }));

    return function getCategoriesId(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var getCategoriesTitle = exports.getCategoriesTitle = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(title, callback) {
        var doc;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return categoryModel.find({ title: title });

                    case 3:
                        doc = _context4.sent;

                        callback(null, doc);
                        _context4.next = 10;
                        break;

                    case 7:
                        _context4.prev = 7;
                        _context4.t0 = _context4['catch'](0);

                        callback(_context4.t0);

                    case 10:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 7]]);
    }));

    return function getCategoriesTitle(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

var editCategory = exports.editCategory = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id, data, callback) {
        var doc, title, description, urlImage, category;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        _context5.next = 3;
                        return categoryModel.findById({ _id: id });

                    case 3:
                        doc = _context5.sent;
                        title = data.title, description = data.description, urlImage = data.urlImage;

                        doc.title = title;
                        doc.description = description;
                        if (urlImage) {
                            deleteImage(doc.urlImage);
                            doc.urlImage = urlImage;
                        }
                        _context5.next = 10;
                        return doc.save();

                    case 10:
                        category = _context5.sent;

                        callback(null, doc);
                        _context5.next = 17;
                        break;

                    case 14:
                        _context5.prev = 14;
                        _context5.t0 = _context5['catch'](0);

                        callback(_context5.t0);

                    case 17:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 14]]);
    }));

    return function editCategory(_x9, _x10, _x11) {
        return _ref5.apply(this, arguments);
    };
}();

var deleteCategory = exports.deleteCategory = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id, callback) {
        var data;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        _context6.next = 3;
                        return categoryModel.remove({ _id: id });

                    case 3:
                        data = _context6.sent;

                        callback(null, data);
                        _context6.next = 10;
                        break;

                    case 7:
                        _context6.prev = 7;
                        _context6.t0 = _context6['catch'](0);

                        callback(_context6.t0);

                    case 10:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[0, 7]]);
    }));

    return function deleteCategory(_x12, _x13) {
        return _ref6.apply(this, arguments);
    };
}();
var deleteImage = function deleteImage(urlImage) {
    if (urlImage) {
        try {
            var link = 'upload/' + urlImage;
            fs.unlinkSync(link);
        } catch (err) {}
    }
};
//# sourceMappingURL=category.js.map