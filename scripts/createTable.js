require('dotenv').config()      //Node.js에서 환경변수 불러오기

var AWS = require("aws-sdk");   // aws-sdk 객체 생성

AWS.config.update({             // aws 설정 정보
  region: "us-east-1",          // 접속 위치
  endpoint: "http://localhost:8000"      // endpoint     프로토콜://서비스명.지역코드.amazonaws.com
//endpoint: "localhot:8000"     // 바로 DynamoDB를 갱신하지 않고 로컬에 설치한 DB로 테스트하기 위한 endpoint
});

var dynamodb = new AWS.DynamoDB();  //DynamoDB 객체 생성

var params = {      // 테이블 정보   이름, 키 스키마, 속성 정의, throughput 설정
    TableName : "Movies",
    KeySchema: [       
        { AttributeName: "year", KeyType: "HASH"},  //Partition key
        { AttributeName: "title", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "year", AttributeType: "N" },
        { AttributeName: "title", AttributeType: "S" }
    ],
    ProvisionedThroughput: {        //On-Demand모드 대신 Provisioned 모드 사용, 이를 통해 초당 최대 읽기/쓰기 수를 제한
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("테이블 생성 실패. 오류 JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("테이블 생성 성공. 테이블 정보 JSON:", JSON.stringify(data, null, 2));
    }
});