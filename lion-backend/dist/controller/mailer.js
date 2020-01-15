'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mailer = require('../lib/mailer');

var _mailer2 = _interopRequireDefault(_mailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res) {
    var payload = req.body;
    (0, _mailer2.default)(payload, function (err, data) {
        if (err) {
            console.log(err);
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
//# sourceMappingURL=mailer.js.map