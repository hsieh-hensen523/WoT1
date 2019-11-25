var request = require('request')
request('http//webofthings.org',function(error,resrponse,body){
    if (!error && response.statusCode === 200){
        console.log(body)
    }
});
