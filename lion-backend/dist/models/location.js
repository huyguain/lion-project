'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeLocation = exports.editLocation = exports.getOneLocation = exports.listLocation = exports.createLocaiton = exports.LocationTable = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var locationSchema = new _mongoose.Schema({
    zone: String
});

var LocationTable = exports.LocationTable = _mongoose2.default.model('Location', locationSchema);

var createLocaiton = exports.createLocaiton = function createLocaiton(body, callback) {
    var zone = body.zone;

    LocationTable.create({
        zone: zone
    }, function (err, data) {
        if (err) return callback(err);
        return callback(null, data);
    });
};

var listLocation = exports.listLocation = function listLocation(callback) {
    LocationTable.find({}, function (err, data) {
        if (err) return callback(err);
        return callback(null, data);
    });
};

var getOneLocation = exports.getOneLocation = function getOneLocation(_id, callback) {
    console.log('clgt');
    LocationTable.find({ _id: _id }, function (err, data) {
        if (err) return callback(err);
        return callback(null, data);
    });
};

var editLocation = exports.editLocation = function editLocation(_id, body, callback) {
    var zone = body.zone;

    console.log('body', zone);
    LocationTable.findByIdAndUpdate(_id, { zone: zone }, { new: true }, function (err, data) {
        if (err) return callback(err);
        return callback(null, data);
    });
};

var removeLocation = exports.removeLocation = function removeLocation(_id, callback) {
    LocationTable.remove({ _id: _id }, function (err) {
        if (err) return callback(err);else return callback(null);
    });
};
//# sourceMappingURL=location.js.map