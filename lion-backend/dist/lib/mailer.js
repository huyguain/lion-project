'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendApply = exports.send = undefined;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodemailer = require('nodemailer');

// Create the transporter with the required configuration for Outlook
// change the user and pass !
var transporter = nodemailer.createTransport({
    host: "mail.fsoft.com.vn", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: 'HuyNT16@fsoft.com.vn',
        pass: 'Repay$4bank3'
    }
});
/**
 * Send reset password link
 */
var send = exports.send = function send(payload, callback) {
    // setup e-mail data, even with unicode symbols
    var mailOptions = {
        from: 'HuyNT16@fsoft.com.vn', // sender address (who sends)vl day ne
        to: payload.TO, // list of receivers (who receives)
        subject: 'Send code entry test', // Subject line        
        html: '<div>Your code is: ' + payload.code + '</div>\n            <div>\n                Thank you apply Fpt Software<br/> Best Regards, <br/>Nodejs Team \n            </div>\n        ' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, callback);
};

var sendApply = exports.sendApply = function sendApply(payload, callback) {
    // setup e-mail data, even with unicode symbols
    var mailOptions = {
        from: 'HuyNT16@fsoft.com.vn', // sender address (who sends)vl day ne
        to: 'AnhNT101@fsoft.com.vn', // list of receivers (who receives)
        subject: 'Send code entry test', // Subject line
        html: '<div>Ch\xE0o qu\u1EA3n tr\u1ECB vi\xEAn:</div>\n            <div>\n                B\u1EA1n nh\u1EADn \u0111\u01B0\u1EE3c m\u1ED9t CV \u1EE8ng vi\xEAn t\u1EF1 do m\u1EDBi t\u1EEB chi\u1EBFn d\u1ECBch Marketing: \u201C1500 Freshers\u201D<br/> \n                H\u1ECD v\xE0 t\xEAn \u1EE9ng vi\xEAn: ' + payload.fullName + '<br/> \n                Email : ' + payload.email + '<br/> \n                \u0110i\u1EC7n tho\u1EA1i: ' + payload.phoneNumber + '<br/> \n                K\u1EF9 n\u0103ng : ' + payload.jobApply.title + '<br/> \n                \u0110\u1ECBa \u0111i\u1EC3m: ' + payload.location.zone + '<br/> \n                N\u0103m t\u1ED1t nghi\u1EC7p: ' + payload.graduationYear + '<br/> \n                Kinh nghi\u1EC7m l\xE0m vi\u1EC7c:' + payload.wordExperience + '<br/> \n                \u0110i\u1EC3m trung b\xECnh : ' + payload.cpa + '<br/> \n                T\xEAn tr\u01B0\u1EDDng: ' + payload.university.name + '<br/> \n                T\xEAn khoa: ' + payload.major + '<br/> \n                \u1EE8ng tuy\u1EC3n t\u1EEB m\u1EE5c : ' + payload.category.title + '<br/> \n                Source : direct<br/> \n                CV \u0111\xEDnh k\xE8m : ' + payload.cv + '<br/> \n            </div>\n        ' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, callback);
};
/**
 * Send welcome email to new users
 */
var sendWelcomeLink = function sendWelcomeLink() {}
// TODO

// export default send;
;
//# sourceMappingURL=mailer.js.map