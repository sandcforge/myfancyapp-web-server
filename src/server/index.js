const express = require('express');
const http = require('http');
const winston = require('winston');
const mysql = require('mysql');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD|HH:mm:ss'
    }),
    winston.format.printf(info => `${info.timestamp}|${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
  ]
});

const app = express();
app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => {
  res.send({ username: req.headers.host, appname: 'appname' });
});

// Get the address typed in browser.
app.get('/api/host', (req, res) => {
  logger.info(req.headers.host);
  res.send(req.headers.host);
});

// Test endpoint.
app.get('/api/now', (req, res) => {
  res.send(Date.now().toString());
});

// ELB health check endpoint. Have to return status of 200, which is consistent with the ELB config.
app.get('/api/ebhealthcheck', (req, res) => {
  res.sendStatus(200);
});

// ELB health check endpoint. Have to return status of 200, which is consistent with the ELB config.
app.get('/api/db', (req, res) => {
  dbConnection.query('SELECT * FROM users WHERE createAt > 202023423', (err, result, fields) => {
    if (err) throw err;
    res.send(result);
  });
});

// 'process.env.PORT' is a MUST if deployed in EB.
const httpPort = process.env.PORT || 8080;
http.createServer(app).listen(httpPort, () => {
  logger.info(`HTTP server is now running on port: ${httpPort}`);
});

const dbConnection = mysql.createConnection({
  host: 'test-database.cjn9z9zzyyxs.us-east-1.rds.amazonaws.com',
  user: 'myfancyapp',
  password: 'myfancyapp',
  database: 'myfancyapp',
  port: 3306,
});

dbConnection.connect((err) => {
  if (err) {
    logger.error(`Database connection failed: ${err.stack}`);
    return;
  }
  logger.info('Connected to database.');
});
