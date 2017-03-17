const http = require('http');
var os = require('os');
var helper = require('./helpers/helperclass');
var request = require('request');
var EventEmitter=require('events').EventEmitter;
const hostname = '127.0.0.1';
const port = 3000;


var getResource =function(c){
  var e =new EventEmitter();
  process.nextTick(function(){
    var count =0;
    e.emit('start');
    var t =setInterval(function(){
      e.emit('data', ++count);
        if(count ===c){
          e.emit('end',count);
          clearInterval(t);
        }
    },10);
  });
  return(e);
}
var resource =getResource(5);

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

  //Using EventEmitter
  resource.on('start',function(){
    console.log("I've Started!");
  });

  resource.on('data',function(data){
    console.log("I've Received data  -> "+ data);
  });

  resource.on('end',function(t){
    console.log("I'm done  with "+t +" data events");
  });