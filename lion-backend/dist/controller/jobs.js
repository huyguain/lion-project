'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.remove = exports.edit = exports.getOne = exports.listCategoryLocation = exports.listHashtag = exports.listLocation = exports.listCategory = exports.list = exports.create = undefined;

var _jobs = require('../models/jobs');

var create = exports.create = function create(req, res) {
    (0, _jobs.createJob)(req.body, function (err, data) {
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
    console.log('ok baby');
    (0, _jobs.listJob)(function (err, data) {
        if (err) {
            res.json({
                success: false,
                message: err
            });
        } else {
            console.log('data', data);
            res.json({
                success: true,
                message: 'success',
                data: data
            });
        }
    });
};

var listCategory = exports.listCategory = function listCategory(req, res) {
    var category = req.params.category;

    (0, _jobs.listJobCategory)(category, function (err, data) {
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

var listLocation = exports.listLocation = function listLocation(req, res) {
    var location = req.params.location;

    console.log('location', location);
    (0, _jobs.listJobLocation)(location, function (err, data) {
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

var listHashtag = exports.listHashtag = function listHashtag(req, res) {
    var hashtag = req.params.hashtag;

    (0, _jobs.listJobHashtag)(hashtag, function (err, data) {
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

var listCategoryLocation = exports.listCategoryLocation = function listCategoryLocation(req, res) {
    var _req$params = req.params,
        category = _req$params.category,
        location = _req$params.location;

    (0, _jobs.listJobCategoryLocation)(category, location, function (err, data) {
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

    (0, _jobs.getOneJob)(id, function (err, data) {
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

    (0, _jobs.editJob)(id, req.body, function (err, data) {
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

    (0, _jobs.removeJob)(id, function (err) {
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
//# sourceMappingURL=jobs.js.map