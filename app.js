// 모듈 선언
var http = require("http");
var fs = require("fs");
var socketio = require("socket.io");
var express = require("express");
var app = express();

const upload = require("./config/multer");
// upload는 s3를 통한 이미지 저장을 위해 선언한 것

// 웹서버 생성
var server = http.createServer(app);
app.get("/", (req, res) => {
    fs.readFile("HTMLPage.html", (error, data) => {
        res.writeHead(200, { "Content-Type": "text/html" }); // 응답 헤더에 대한 정보를 기록하는 메서드, 응답의 콘텐츠 형식이 HTML
        res.end(data); // 주로 서버가 작동을 안하거나 오류가 있을 경우, 특정 문구를 나타내고 응답을 종료하고자 할 때 사용
    });
});

server.listen(52273, () => {
    console.log("Server Running at http://127.0.0.1:52273");
});

var io = socketio(server);
io.sockets.on("connection", (socket) => {
    // message
    var roomName = null;

    socket.on("join", (data) => {
        roomName = data;
        socket.join(data);
    });

    socket.on("message", (data) => {
        io.sockets.in(roomName).emit("message", data);
        console.log(data);
    });

    socket.on("image", (data) => {
        io.sockets.in(roomName).emit("image", data);
        console.log(data);
    });
});

app.post("/image", upload.single("image"), function (req, res, next) {
    try {
        console.log(req.file);
        // 클라이언트에서 넘어온 파일에 대한 정보가 req.file에 FILE 객체로 저장되어 있습니다.

        var data = req.file;
        res.send(data.location);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
