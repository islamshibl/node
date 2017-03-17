const http = require('http');
var os = require('os');
const hostname = '127.0.0.1';
const port = 3000;

var toMb = function (f) {
  return (Math.round((f / 1024 / 1024) * 100) / 100);
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write('Host:' + os.hostname()+'\n');
  res.write("15 Min. load average: " + os.loadavg()[2]+'\n');
  res.write(toMb(os.freemem())+' of '+ toMb(os.totalmem())+' Mb free \n');
  res.end('Hello World\n');

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

