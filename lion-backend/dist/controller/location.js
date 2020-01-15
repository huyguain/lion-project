'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.remove = exports.edit = exports.getOne = exports.list = exports.create = undefined;

var _location = require('../models/location');

var create = exports.create = function create(req, res) {
    (0, _location.createLocaiton)(req.body, function (err, data) {
        if (err) {
            res.json({
                success: false,
                message: err
            });
        } else {
            res.json({
                success: true,
                message: 'success'
            });
        }
    });
};

var list = exports.list = function list(req, res) {
    (0, _location.listLocation)(function (err, data) {
        if (err) {
            res.json({
                success: false,
                message: err
            });
        } else {
            res.json({
                success: true,
                message: 'success',
                data: data
            });
        }
    });
};

var getOne = exports.getOne = function getOne(req, res) {
    var id = req.params.id;

    console.log(id);
    (0, _location.getOneLocation)(id, function (err, data) {
        if (err) {
            res.json({
                success: false,
                message: err
            });
        } else {
            res.json({
                success: true,
                message: 'success',
                data: data
            });
        }
    });
};

var edit = exports.edit = function edit(req, res) {
    var id = req.params.id;

    (0, _location.editLocation)(id, req.body, function (err, data) {
        if (err) {
            res.json({
                success: false,
                message: err
            });
        } else {
            res.json({
                success: true,
                message: 'success',
                data: data
            });
        }
    });
};

var remove = exports.remove = function remove(req, res) {
    var id = req.params.id;

    (0, _location.removeLocation)(id, function (err) {
        if (err) {
            res.json({
                success: false,
                message: 'error'
            });
        } else {
            res.json({
                success: true,
                message: 'success'
            });
        }
    });
};
//# sourceMappingURL=location.js.map