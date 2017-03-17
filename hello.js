const http = require('http');
var os = require('os');
var helper = require('./helpers/helperclass');
var request = require('request');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  //Using Helper helperclass "Export another module"
  res.setHeader('Content-Type', 'text/plain');
  res.write(helper.helperVar + '\n');
  res.write('Host:' + os.hostname() + '\n');
  res.write("15 Min. load average: " + os.loadavg()[2] + '\n');
  res.write(helper.toMb(os.freemem()) + ' of ' + helper.toMb(os.totalmem()) + ' Mb free \n');
  //using request "External npm module"
  request('http://www.pluralsight.com/', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      //console.log(body);
      res.end('Hello World\n');
    }
  })
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

