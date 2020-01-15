'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeMultiple = exports.getLimitPanel = exports.getById = exports.edit = exports.remove = exports.list = exports.create = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _panel = require('../models/panel');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = exports.create = function create(req, res) {
    req.body.urlImage = req.file.filename;
    (0, _panel.createPanel)(req.body, function (err, data) {
        if (err) {
            res.json({
                success: false,
                massage: "error upload image"
            });
        } else {
            res.json({
                success: true,
                massage: "upload image success"
            });
        }
    });
};
var list = exports.list = function list(req, res) {
    var limit = "";
    (0, _panel.listPanel)(limit, function (err, data) {
        if (err) {
            res.json({
                success: false
            });
        } else {
            res.json({
                success: true,
                data: data
            });
        }
    });
};
var remove = exports.remove = function remove(req, res) {
    var id = req.params.id;

    (0, _panel.deletePanel)(id, function (err, data) {
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

    var data = req.body;
    // console.log("req.file", req.file);
    console.log("req.file", req.file);
    console.log("data", data);
    //check new file upload
    if (req.file) {
        data.urlImage = req.file.filename;
    }
    (0, _panel.editPanel)(id, data, function (err, panelEdit) {
        if (err) {
            res.json({
                success: false
            });
        } else {
            console.log("panelEdit", panelEdit);
            console.log("req.file", req.file);
            res.json({
                success: true
            });
        }
    });
};
var getById = exports.getById = function getById(req, res) {
    var id = req.params.id;

    (0, _panel.getPanelById)(id, function (err, data) {
        if (err) {
            res.status(500).send();
        } else {
            res.status(200).json({
                data: data
            });
        }
    });
};
var getLimitPanel = exports.getLimitPanel = function getLimitPanel(req, res) {
    var limit = 3;
    (0, _panel.listPanel)(limit, function (err, data) {
        if (err) {
            res.json({
                success: false
            });
        } else {
            res.json({
                success: true,
                data: data
            });
        }
    });
};

var removeMultiple = exports.removeMultiple = function removeMultiple(req, res) {
    var ids = req.params.ids;

    var arrId = ids.split(',');
    console.log("dsd", arrId);
    console.log(typeof arrId === 'undefined' ? 'undefined' : _typeof(arrId));
    (0, _panel.deleteMultiplePanel)(arrId, function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                success: false
            });
        } else {
            res.json({
                success: true
            });
        }
    });
};
//# sourceMappingURL=panel.js.map