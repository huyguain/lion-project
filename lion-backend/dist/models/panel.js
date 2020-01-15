'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteMultiplePanel = exports.getPanelById = exports.editPanel = exports.deletePanel = exports.listPanel = exports.createPanel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var panel = new _mongoose.Schema({
    urlImage: String,
    title: String,
    description: String,
    linkto: String,
    status: { type: Boolean, default: false },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});
var panelModel = _mongoose2.default.model('Panel', panel);
var createPanel = exports.createPanel = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(newPanel, callback) {
        var Panel, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log(newPanel);
                        Panel = new panelModel(newPanel);
                        _context.prev = 2;
                        _context.next = 5;
                        return Panel.save();

                    case 5:
                        data = _context.sent;

                        callback(null, data);
                        _context.next = 12;
                        break;

                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context['catch'](2);

                        callback(_context.t0);

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[2, 9]]);
    }));

    return function createPanel(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
var listPanel = exports.listPanel = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var callback = arguments[1];
        var data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return panelModel.find().sort({ create_at: -1 }).limit(limit);

                    case 3:
                        data = _context2.sent;

                        callback(null, data);
                        _context2.next = 10;
                        break;

                    case 7:
                        _context2.prev = 7;
                        _context2.t0 = _context2['catch'](0);

                        callback(_context2.t0);

                    case 10:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 7]]);
    }));

    return function listPanel() {
        return _ref2.apply(this, arguments);
    };
}();
var deletePanel = exports.deletePanel = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, callback) {
        var data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return panelModel.findOneAndRemove({ _id: id });

                    case 3:
                        data = _context3.sent;

                        callback(null, data);
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

    return function deletePanel(_x4, _x5) {
        return _ref3.apply(this, arguments);
    };
}();
var editPanel = exports.editPanel = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, data, callback) {
        var doc, title, description, status, urlImage, linkto, link, _panel;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return panelModel.findById({ _id: id });

                    case 3:
                        doc = _context4.sent;
                        title = data.title, description = data.description, status = data.status, urlImage = data.urlImage, linkto = data.linkto;

                        doc.title = title;
                        doc.description = description;
                        doc.status = status;
                        doc.linkto = linkto;
                        //check have choosed new image
                        //=>true=> save new image , unlink old
                        if (urlImage) {
                            try {
                                link = 'upload/' + doc.urlImage;

                                _fs2.default.unlinkSync(link);
                            } catch (err) {
                                console.log(err);
                            }
                            doc.urlImage = urlImage;
                        }
                        _context4.next = 12;
                        return doc.save();

                    case 12:
                        _panel = _context4.sent;

                        callback(null, _panel);
                        _context4.next = 19;
                        break;

                    case 16:
                        _context4.prev = 16;
                        _context4.t0 = _context4['catch'](0);

                        callback(_context4.t0);

                    case 19:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 16]]);
    }));

    return function editPanel(_x6, _x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

var getPanelById = exports.getPanelById = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id, callback) {
        var doc;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        _context5.next = 3;
                        return panelModel.findById({ _id: id });

                    case 3:
                        doc = _context5.sent;

                        callback(null, doc);
                        _context5.next = 10;
                        break;

                    case 7:
                        _context5.prev = 7;
                        _context5.t0 = _context5['catch'](0);

                        callback(_context5.t0);

                    case 10:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 7]]);
    }));

    return function getPanelById(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();

var deleteMultiplePanel = exports.deleteMultiplePanel = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(ids, callback) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        _context6.next = 3;
                        return panelModel.remove({ _id: { $in: ids } });

                    case 3:
                        callback(null);
                        _context6.next = 9;
                        break;

                    case 6:
                        _context6.prev = 6;
                        _context6.t0 = _context6['catch'](0);

                        callback(_context6.t0);

                    case 9:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[0, 6]]);
    }));

    return function deleteMultiplePanel(_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}();
//# sourceMappingURL=panel.js.map