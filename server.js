// var DEBUG = true;
var http = require('http');
const PORT = 3000

function handleRequest(request, response) {}
var server = http.createServer(handleRequest);
server.listen(PORT, function() {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
var dispatcher = require('httpdispatcher');

function handleRequest(request, response) {
    try {
        //log the request on console
        console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch (err) {
        console.error(err);
        request.connection.destroy()
    }
}
var couchbase = require('couchbase');
var myCluster = new couchbase.Cluster('localhost:8091')
var myBucket = myCluster.openBucket('account');
var gAccNum = 0; // number of Account in DB [global]
var formidable = require("formidable");
dispatcher.onPost("/signUp.js", function(req, res) {
    var success = true
    var form = new formidable.IncomingForm()
    form.encoding = 'utf-8';
    form.parse(req, function(err, fields, files) {
        if (err) {
            // Check for and handle any errors here.
            console.error(err.message);
            return;
        }
        myBucket.insert(gAccNum + '', {
            username: fields['username'],
            password: fields['password']
        }, function(err, res) {
            if (err) {
                console.error(err)
                success = false
            } else {
                gAccNum++
                // console.log('Success!');
            }
        });
    });
    res.writeHead(200, {
        'content-type': 'text/plain'
    });
    if (success) {
        res.end('success')
    }
    else {
        res.end('failed');
    }
});