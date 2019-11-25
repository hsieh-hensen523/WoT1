var http = require("http"),
    request = require('request'),
    fs = require('fs');

var port = 8787;
var serviceRootUrl = 'http://localhost:8686'


http.createServer(function(servreq, servres){
  console.log('New incoming client request........');

  if (servreq.url === '/log'){
    request({url:serviceRootUrl + '/temperature', json:true},
      function(err, resp, body){
        if(err) throw err;
        if(resp.statusCode == 200){
          console.log(body);
          var temperature = body.temperature;
          request({url: serviceRootUrl + '/light', json:true},
            function(err, resp, body){
              if(err) throw err;
              if(resp.statusCode === 200){
                console.log(body);
                var light = body.light;
                var logEntry = 'Temperature: ' + temperature + ' Light:' +light;
                fs.appendFile('log.txt', logEntry + '\n',
                  encoding = 'utf-8', function (err){
                    if(err) throw err;
                    servres.writeHeader(200, {"Content-Type":"test/plain"});
                    servres.write(logEntry);
                    servres.end();
                  });
              }
            });
        }
      });
  }else{
      servres.writeHeader(200, {"Conten-Type": "text/plain"});
      servres.write('Please use /log');
      servres.end();
  }
}).listen(port);

console.log('Server started on http://192.168.1.18:8787 ');


