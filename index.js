#!/usr/bin/env node

const express = require('express');
const http = require('http');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 80;
const coxEMSurl = 'https://www.coxhealth.com/services/emergency/ems/';
const moment = require('moment');

const writeIP = (ip) => {
	const log = ip + " - " + moment().toDate();
	fs.writeFile('./ip_list.txt', log, { flag: 'w+'}, (err) => {
		if (err) return console.error(err);
		return console.log(log);
	}
};

app.get  ('/', (req, res, next) => {
	console.log(req.ip);
	//307 is a "NO-CACHE" redirect unlike a 301
	res.redirect(307, coxEMSurl);
	next();
});

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
	console.log('Listening on ' + port);
};


