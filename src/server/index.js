const express = require('express');
const os = require('os');
const http = require('http');
const https = require('https');
const fs = require('fs');
const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => {
    res.send({ username: req.headers.host, appname: 'appname' });
});

app.get('/api/subdomain', (req, res) => {
    console.log(req.headers['x-forwarded-host']);
    res.send(req.headers['x-forwarded-host'] + '  : ' + String(Date.now()));
});
app.get('/api/host', (req, res) => {
    console.log(req.headers['host']);
    res.send(req.headers['host'] + '  : ' + String(Date.now()));
});

http.createServer(app).listen(process.env.PORT || 8080, () => {
    console.log(`HTTP server is now running on port: ${process.env.PORT || 8080}`);
  });