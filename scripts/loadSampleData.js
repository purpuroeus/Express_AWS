require('dotenv').config()      //Node.js에서 환경변수 불러오기
var AWS = require('aws-sdk');
var fs = require('fs');     //file system 모듈, 로컬의 파일 입출력에 사용

AWS.config.update({
    region : 'us-west-2',
    endpoint : 'http://localhost:8000'
});

var doClient = new AWS.DynamoDB.DocumentClient();   //dynamoDB의 테이블 조작을 위한 클래스 속성 값의 개념을 추상화

console.log('데이터 로드중...');


var allMovies = JSON.parse(fs.readFileSync('moviedata.json', 'utf-8'));     //읽어온 영화 데이터를 allMovies에 저장
var count = 0;


allMovies.forEach(function(movie){          // 각 영화에 대해서
    var params = {                          // 테이블에 추가할 파라미터를 생성
        TableName: "Movies",
        Item:{
            "year":movie.year,
            "title":movie.title,
            "info":movie.info
        }
    };
    doClient.put(params, function(err, data){       // documentClient의 put 메소드를 이용해 데이터를 추가
        if(err){
            count++;
            console.error('항목 번호', count, "  영화 추가 실패", movie.title, "오류 JSON", JSON.stringify(err, null, 2));
        }
        else{
            count++;
            console.log('항목 번호', count,'  영화 추가 성공', movie.title);
        }
    })
});