'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeUniversity = exports.editUniversity = exports.getOneUniversity = exports.listUniversity = exports.importUniversity = exports.createUniversity = exports.University = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// import { LocationTable } from './location'

var universitySchema = new _mongoose.Schema({
    name: String,
    location: String
});

var University = exports.University = _mongoose2.default.model('University', universitySchema);

var createUniversity = exports.createUniversity = function createUniversity(body, callback) {
    console.log('body', body);
    var name = body.name,
        location = body.location;

    University.create({
        name: name,
        location: location
    }, function (err, data) {
        if (err) return callback(err);
        return callback(null, data);
    });
};

var importUniversity = exports.importUniversity = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(university, callback) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return University.remove();

                    case 3:
                        University.create(university, function (err, data) {
                            if (err) return callback(err);
                            return callback(null, data);
                        });
                        _context.next = 9;
                        break;

                    case 6:
                        _context.prev = 6;
                        _context.t0 = _context['catch'](0);
                        return _context.abrupt('return', callback(_context.t0));

                    case 9:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 6]]);
    }));

    return function importUniversity(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var listUniversity = exports.listUniversity = function listUniversity(callback) {
    University.find({}).sort({ _id: -1 }).then(function (data) {
        return callback(null, data);
    }).catch(function (err) {
        return callback(err);
    });
};

var getOneUniversity = exports.getOneUniversity = function getOneUniversity(_id, callback) {
    console.log(_id);
    University.find({ _id: _id }).then(function (data) {
        return callback(null, data);
    }).catch(function (err) {
        return callback(err);
    });
};

var editUniversity = exports.editUniversity = function editUniversity(_id, body, callback) {
    var name = body.name,
        location = body.location;

    University.findByIdAndUpdate(_id, {
        name: name, location: location
    }, { new: true }, function (err, data) {
        if (err) return callback(err);
        return callback(null, data);
    });
};

var removeUniversity = exports.removeUniversity = function removeUniversity(_id, callback) {
    University.remove({ _id: _id }, function (err) {
        if (err) return callback(err);
        return callback(null);
    });
};
//# sourceMappingURL=university.js.map