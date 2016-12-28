/**
 * Created by Administrator on 2016/11/17.
 */



var args = process.argv.splice(2);

var PORT = 5369;

try {
    PORT = args.length && args[0];
} catch (e) {
}
PORT = PORT || 5369;


var WebSocketServer = require('websocket').server;
var express = require('express');
var app = express();
var server = app.listen(PORT);
var wsServer = new WebSocketServer({httpServer: server, autoAcceptConnections: false});

// this will make Express serve your static files
app.use(express.static(__dirname + '/../build'));

//代理
var request_m = require('request');

app.use('/v1/restserver/ting', function (req, res) {
    var url = "http://tingapi.ting.baidu.com" + req.originalUrl;
    req.pipe(request_m(url)).pipe(res);
});

app.use('/info/suggestion', function (req, res) {
    var url = "http://sug.music.baidu.com" + req.originalUrl;
    // console.log("url:",url)
    req.header["host"] = "sug.music.baidu.com"
    req.header["Upgrade-Insecure-Requests"] = "1"
    req.pipe(request_m(url)).pipe(res);
});


function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

var connections = []
var song;
// the rest of your code
wsServer.on('request', function (request) {
    if (!originIsAllowed(request.origin)) {
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }
    var connection = request.accept('echo-protocol', request.origin);
    if (connections.indexOf(connection) == -1) {
        connections.push(connection)
    }

    if (song) {
        connection.send(JSON.stringify(song))
    }

    //console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            //console.log('Received Message: ' + message.utf8Data);
            var data = JSON.parse(message.utf8Data);
            if (data) {
                song = data
                var t_conns = connections.slice();
                t_conns.splice(t_conns.indexOf(connection), 1);
                t_conns.forEach(function (t_conn) {
                    t_conn.send(JSON.stringify(data))
                })
            }
            connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            //console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }

    });
    connection.on('close', function (reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        var id = connections.indexOf(connection);
        if (id != -1) {
            connections.splice(id, 1)
        }
    });
})