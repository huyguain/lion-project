'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeOffer = exports.editOffer = exports.getOneOffer = exports.listOffer = exports.createOffer = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var offerSchema = new _mongoose.Schema({
    icon: String,
    content: String
});

var Offer = _mongoose2.default.model('Offer', offerSchema);

var createOffer = exports.createOffer = function createOffer(body, callback) {
    var icon = body.icon,
        content = body.content;

    Offer.create({
        icon: icon,
        content: content
    }, function (err, data) {
        if (err) return callback(err);
        return callback(null, data);
    });
};

var listOffer = exports.listOffer = function listOffer(callback) {
    Offer.find({}).sort({ _id: -1 }).then(function (data) {
        return callback(null, data);
    }).catch(function (err) {
        return callback(err);
    });
};

var getOneOffer = exports.getOneOffer = function getOneOffer(_id, callback) {
    console.log(_id);
    Offer.find({ _id: _id }, function (err, data) {
        if (err) return callback(err);
        return callback(null, data);
    });
};

var editOffer = exports.editOffer = function editOffer(_id, body, callback) {
    var icon = body.icon,
        content = body.content;

    Offer.findByIdAndUpdate(_id, { icon: icon, content: content }, { new: true }, function (err, data) {
        if (err) return callback(err);
        return callback(null, data);
    });
};

var removeOffer = exports.removeOffer = function removeOffer(_id, callback) {
    Offer.remove({ _id: _id }, function (err) {
        if (err) return callback(err);
        return callback(null);
    });
};
//# sourceMappingURL=offer.js.map