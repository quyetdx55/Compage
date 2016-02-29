// var DEBUG = true;
var couchbase = require('C:\\Users\\dxquy\\AppData\\Roaming\\npm\\node_modules\\couchbase');
var http = require('http')
var url = require('url');
var fs = require('fs')
http.createServer(function(req, res) {
    if (req.url.indexOf('?') !== -1) {
    	console.log(req.url)
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        // if (DEBUG) {
            // console.log(query)
        // }
        var myCluster = new couchbase.Cluster('http://localhost:8091');
        var myBucket = myCluster.openBucket('account');
        myBucket.insert('', {
            'username': query.username,
            'password': query.password
        }, function(err, res) {
            console.log(err + '\n' + res);
        });
    }
    // if (DEBUG) {
        // console.log(req.url)
    // }
    fs.readFile('./CompageClient/www/index.html', function(err, html) {
        if (err) {
            throw err;
        }
        res.writeHeader(200, {
            "Content-Type": "text/html"
        });
        res.write(html);
        res.end();
    })
}).listen(2201, '127.0.0.1');
console.log('Server running.');
// myBucket.get('account', function(err, res) {
//     console.log('Value: ', res.value);
// });