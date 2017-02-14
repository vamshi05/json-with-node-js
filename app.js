var http = require('http')
var fs = require('fs')
var url = require('url')
var port=8081


var s = http.createServer();
s.on('request', function(request, response) {
     response.writeHead(200, {'Content-Type': 'text/plain'});
     response.write(request.method + " method requested");
     //response.write("\n"+request.headers);
     //response.write("\n"+request.url);
    // response.write("\n"+response.statusCode);
     var obj={};
     var val;
     
     queryData=url.parse(request.url, true).query;
     fs.readFile('input.json', 'utf8', function readFileCallback(err, data){
                 
                 if (err){
                 console.log(err);
                        }
                 
                 
                 else {
                    var obj = JSON.parse(data);
                    var userid=queryData.id;
                    var weight=queryData.weight;
                    var date=queryData.date;
                 
                 
                 if (request.method==='POST'){
                    if (!obj[userid]){
                        obj[userid]=[{"date" : date, "weight" : weight}];
                                     }
                    else {
                        console.log("reached")
                        obj[userid].push({"date" : date, "weight" : weight});
                                     }
                    var json = JSON.stringify(obj);
                    console.log("\n"+json);
                    fs.writeFile('input.json', json, 'utf8');
                    }
                 
                 
                 else if (request.method==='GET'){
                 var val=obj[userid]
                 var total=parseInt(0)
                 for (i in val){
                 total+=parseInt(val[i].weight);
                 if(val[i].date==date){
                      console.log("Weight of "+userid+" on "+date+" is "+val[i].weight);
                    }
                 
                 }
                 console.log("Average weight of "+userid+" is "+(total/(val.length)));
                        }
                 
                 else if (request.method==='DELETE'){
                    obj.id.pop();
                    var json = JSON.stringify(obj);
                    console.log("\n"+json);
                    fs.writeFile('input.json', json, 'utf8');
                   }
                 
                 else{
                    console.log("\n"+request.method);
                    }
                 }});
     
    
     var data = '';
     request.on('data', function(chunk) {
                data += chunk.toString();
                response.write("\n"+data)
                });
     request.on('end', function() {
               response.write(data);
                response.end();
                });
     
     }).listen(port);

console.log('Browse to http://127.0.0.1:' + port);
