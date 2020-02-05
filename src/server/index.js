const express = require('express');
const os = require('os');
const http = require('http');
const fs = require('fs');
const app = express();

app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => {
    res.send({ username: req.headers.host, appname: 'appname' });
});

// Get subdomain name
app.get('/api/host', (req, res) => {
    console.log(req.headers['host']);
    res.send(req.headers['host'] + '  : ' + String(Date.now()));
});

// Test endpoint.
app.get('/api/now', (req, res) => {
    res.send(Date.now().toString());
});

// ELB health check endpoint. Have to return 200, which is consistent with the ELB config.
app.get('/api/ping', (req, res) => {
    res.send(200);
});

// 'process.env.PORT' is a MUST if deployed in EB.
const httpPort = process.env.PORT || 8080;

http.createServer(app).listen(httpPort, () => {
console.log(`HTTP server is now running on port: ${httpPort}`);
});
