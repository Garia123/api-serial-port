const express = require('express');
const http = require('http');
const https = require('https');
const cors = require('cors');

const config = require('./config');
const { https: { key, cert }, port, isHttps, serviceName } = config;
const credentials = { key, cert };

const app = express();
app.use(cors());
const routes = require('./routes/index.route');
app.use(routes);

const httpServer = http.createServer(app);
httpServer.listen(port);
console.log(`[${serviceName}] http server listening at port ${port}`);

if (isHttps) {
    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(port + 1);
    console.log(`[${serviceName}] https server listening at port ${port + 1}`);
}

module.exports = { app };