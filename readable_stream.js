var request =require("request");

var s =request("https://app.pluralsight.com/library/");
s.on('data',function(chunk){
console.log(">>>Data>>> "+chunk);
})

s.on('end',function(){
    console.log(">>>Done!>>>");
})