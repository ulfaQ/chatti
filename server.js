//Lets require/import the HTTP module
var http = require('http');
var querystring = require('querystring');

//Lets define a port we want to listen to
const PORT=8080;

var viestit = []; // Lets define a array for messages

fs = require('fs')


//We need a function which handles requests and send response
function handleRequest(request, response){
		//console.log(request);
		if(request.url.indexOf('/api/') === -1) {
			// request.url = '/'
			// request.url = '/client.js'

			var filename = request.url.substr(1);

			// old line: if(request.url === '/') {   new line:
			if(request.url === '/' || (filename.length > 0 && filename[0] === '/') || filename.indexOf('..') !== -1) {
				filename = 'index.html';
			}

			fs.readFile(filename, 'utf8', function (err,data) {
	  		if (err) {
	  		  return console.log(err);
	  		}
	  		console.log(data);
	  		response.end(data);
			});
			return;
		}

		if(request.url.indexOf('/api/send/') > -1) {
			//viestit.push()
			var postDataString = "";
			request.on('data', function(chunk) {
	      postDataString = postDataString + chunk.toString();
	    });

	    request.on('end', function() {
	    	viestit.push(postDataString)
	      // empty 200 OK response for now
	      response.writeHead(200, "OK", {'Content-Type': 'text/html'});
	      response.end();

	    });
		}
		if(request.url.indexOf('/api/get/') > -1) {
			response.end(JSON.stringify(viestit));
		}


}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
