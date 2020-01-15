"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var requireRole = exports.requireRole = function requireRole(role) {
    return function (req, res, next) {
        if (req.role && role.indexOf(req.role) !== -1) {
            next();
        } else {
            res.send(403);
        }
    };
};
//# sourceMappingURL=requireRole.js.map