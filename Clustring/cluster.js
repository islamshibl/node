var cluster =require('cluster');
var http =require('http');
var numWorkers=2;

if(cluster.isMaster){
    for(var i=0; i<numWorkers; i++){
        console.log('Master : about to fork a worker');
        cluster.fork();
    }

    cluster.on('fork',function(worker){
    console.log('Master: fork event (worker '+worker.id+' )');
});

cluster.on('online',function(worker){
    console.log('Master: online event (worker '+worker.id+' )');
});

cluster.on('listening',function(worker,address){
    console.log("Master : listening to event (worker "+worker.id
    +'.pid '+worker.process.pid+','+address.address+','+','+address.port+ ')');
});

cluster.on('exit',function(worker,code,signal){
console.log('Master : exit event (Worker '+worker.id +')');
});
}
else
{

    var count =0;
    http.createServer(function(req,res){

        res.writeHead(200);
        count++;
        console.log('Worker #'+cluster.worker.id+" is incrementing count to "+
        count);
        res.end("hello world from worker #"+cluster.worker.id+" (pid"+ cluster.worker.process.pid+
") with count = "+count +"\n");
if(count===3){
    cluster.worker.destroy();
}
    }).listen(500,'127.0.0.1');
}

