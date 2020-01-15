'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _index = require('./router/index');

var _index2 = _interopRequireDefault(_index);

require('./lib/mailer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
//security
app.server = _http2.default.createServer(app);
app.set('superSecret', _config2.default.secret);

// logger
app.use((0, _morgan2.default)('dev'));
app.use('/upload', _express2.default.static('upload'));
// 3rd party middleware
// app.use(cors({
// 	exposedHeaders: config.corsHeaders
// }));
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json({
	limit: _config2.default.bodyLimit
}));

// connect to db
_mongoose2.default.connect(_config2.default.database, { useMongoClient: true }, function (err, db) {
	if (err) {
		console.log('Error initializing connection to MongoDB');
		// callback(err)
		return;
	} else {
		console.log('Connect Successfully!!');
	}
});

app.use('/api', _index2.default);

//create server
app.server.listen(process.env.PORT || _config2.default.port, function () {
	console.log('Started on port ' + app.server.address().port);
});

exports.default = app;
//# sourceMappingURL=index.js.map