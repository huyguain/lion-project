import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from './config.js';
import mongoose from 'mongoose';
import router from './router/index'
import './lib/mailer'

let app = express();
//security
app.server = http.createServer(app);
app.set('superSecret', config.secret);

// logger
app.use(morgan('dev'));
app.use('/upload', express.static('upload'));
// 3rd party middleware
// app.use(cors({
// 	exposedHeaders: config.corsHeaders
// }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({
	limit: config.bodyLimit
}));

// connect to db
mongoose.connect(config.database, { useMongoClient: true }, (err, db) => {
	if (err) {
		console.log('Error initializing connection to MongoDB')
		// callback(err)
		return;
	} else {
		console.log('Connect Successfully!!')
	}
})

app.use('/api', router);

//create server
app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
