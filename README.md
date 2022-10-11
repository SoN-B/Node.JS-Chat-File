# nodejs-chatting

[출처 - 설명 포스팅1 ](https://juhi.tistory.com/8)

[출처 - 설명 포스팅2 ](https://juhi.tistory.com/9)

---

## Project Introduce

Node.js의 socket.io모듈을 이용하여 채팅 기능을 구현함

-   채팅방 생성
-   그룹, 일대일 채팅 기능
-   사진 전송

![p1](./readme/p1.PNG)
![p2](./readme/p2.PNG)
![p3](./readme/p3.PNG)

## Code Description

[기본]

1. 클라이언트 : join에 방이름과 함께 socket.emit()
2. 서버 : io.sockets.on연결 & 클라이언트 해당 방에 socket.on(join, ) & socket.join(방이름)
3. 클라이언트 : #name.val()에 닉네임 작성후 /#chatpage로 넘어감 (그값은 계속 저장돼 있음)

[메세지 전송]

1. 클라이언트 : #button.click()시 name, message, date값 서버로 socket.emit(message)
2. 서버 : socket.on(message)로 받고, 해당 방이름에(roomName)에 재전달
3. 클라이언트 : socket.on(message)로 받고, 해당 값들 html에 재구성(추가)

[사진 전송]

1. 클라이언트 : #uploadbtn.on('click', ~)시 uploadFile()함수(해당API로 POST요청) 실행
2. 서버 : image받고 s3에 업로드 및 해당 객체주소 클라이언트에 리턴
3. 클라이언트 : 성공했을때, name, message(s3 객체 주소), date 뿌려줌

## Dependency Module

```
"dependencies": {
    "aws-sdk": "^2.1230.0",
    "express": "^4.18.1",
    "multer": "^1.4.5-lts.1",
    "multer-s3": "^2.10.0",
    "mysql2": "^2.3.3",
    "sequelize": "^6.24.0",
    "socket.io": "^4.5.2"
},
```
