var express = require('express');   // node_modules폴더의 라우팅 모듈 가져오기
var app = express();                // 라우터 객체 생성

function defaultFunction(req, res){
    res.send("hello world");        // hello wolrd 출력
}

app.get('/', defaultFunction);  // '/'로 들어오는 요청은 defaultFunction을 실행

app.listen(1000);       // 1000번 포트로 들어오는 요청만 처리