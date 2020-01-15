"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteTestimonial = exports.editTestimonial = exports.getTestimonialById = exports.listTestimonial = exports.createTestimonial = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Testimonial = new _mongoose.Schema({
    fullName: String,
    gender: Number,
    position: String,
    content: String,
    urlImage: String
});

var testimonialModel = _mongoose2.default.model('testimonial', Testimonial);

var createTestimonial = exports.createTestimonial = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(newTestimonial, callback) {
        var Testimonial, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        Testimonial = new testimonialModel(newTestimonial);
                        _context.prev = 1;
                        _context.next = 4;
                        return Testimonial.save();

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

    return function createTestimonial(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var listTestimonial = exports.listTestimonial = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(limit, callback) {
        var data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return testimonialModel.find();

                    case 3:
                        data = _context2.sent;

                        if (limit) {
                            _context2.next = 8;
                            break;
                        }

                        _context2.next = 7;
                        return testimonialModel.find().limit(limit);

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

    return function listTestimonial(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
var getTestimonialById = exports.getTestimonialById = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, callback) {
        var doc;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return testimonialModel.findById({ _id: id });

                    case 3:
                        doc = _context3.sent;

                        callback(null, doc);
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

    return function getTestimonialById(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();
var editTestimonial = exports.editTestimonial = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, data, callback) {
        var doc, fullName, gender, position, content, urlImage, post;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return testimonialModel.findById({ _id: id });

                    case 3:
                        doc = _context4.sent;
                        fullName = data.fullName, gender = data.gender, position = data.position, content = data.content, urlImage = data.urlImage;

                        doc.fullName = fullName;
                        doc.gender = gender;
                        doc.position = position;
                        doc.content = content;
                        if (urlImage) {
                            deleteImage(doc.urlImage);
                            doc.urlImage = urlImage;
                        }
                        _context4.next = 12;
                        return doc.save();

                    case 12:
                        post = _context4.sent;

                        callback(null, doc);
                        _context4.next = 19;
                        break;

                    case 16:
                        _context4.prev = 16;
                        _context4.t0 = _context4["catch"](0);

                        callback(_context4.t0);

                    case 19:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 16]]);
    }));

    return function editTestimonial(_x7, _x8, _x9) {
        return _ref4.apply(this, arguments);
    };
}();

var deleteTestimonial = exports.deleteTestimonial = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id, callback) {
        var data;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        _context5.next = 3;
                        return testimonialModel.remove({ _id: id });

                    case 3:
                        data = _context5.sent;

                        callback(null, data);
                        _context5.next = 10;
                        break;

                    case 7:
                        _context5.prev = 7;
                        _context5.t0 = _context5["catch"](0);

                        callback(_context5.t0);

                    case 10:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 7]]);
    }));

    return function deleteTestimonial(_x10, _x11) {
        return _ref5.apply(this, arguments);
    };
}();

var deleteImage = function deleteImage(urlImage) {
    if (urlImage) {
        try {
            var link = "upload/" + urlImage;
            _fs2.default.unlinkSync(link);
        } catch (err) {}
    }
};
//# sourceMappingURL=testimonial.js.map