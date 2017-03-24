var request =require("request");
var fs = require('fs');
var zlib =require('zlib');
//var s =request("https://app.pluralsight.com/library/");

//s.pipe(process.stdout);

//chaining 

//request("https://app.pluralsight.com/library/").pipe(process.stdout);

//Pipe to a file in file system

request("https://app.pluralsight.com/library/").pipe(fs.createWriteStream('pluralsight.html'));

//Readable and writable stream
request("https://app.pluralsight.com/library/")
.pipe(zlib.createGzip()).pipe(fs.createWriteStream('pluralsight.html.gz'));