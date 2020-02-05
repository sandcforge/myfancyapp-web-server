const express = require('express');
const os = require('os');
const http = require('http');
const fs = require('fs');
const app = express();

app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => {
    res.send({ username: req.headers.host, appname: 'appname' });
});

// Get the address typed in browser.
app.get('/api/host', (req, res) => {
    console.log(req.headers['host']);
    res.send(req.headers['host']);
});

// Test endpoint.
app.get('/api/now', (req, res) => {
    res.send(Date.now().toString());
});

// ELB health check endpoint. Have to return status of 200, which is consistent with the ELB config.
app.get('/api/ebhealthcheck', (req, res) => {
    res.sendStatus(200);
});

// 'process.env.PORT' is a MUST if deployed in EB.
const httpPort = process.env.PORT || 8080;

http.createServer(app).listen(httpPort, () => {
console.log(`HTTP server is now running on port: ${httpPort}`);
});
