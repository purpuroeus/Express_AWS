require('dotenv').config()      //Node.js에서 환경변수 불러오기
var AWS = require('aws-sdk');

AWS.config.update({
    region : 'us-east-1',
    endpoint : 'http://localhost:8000'
});

var doClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";               // 데이터 추가를 위한 테이블 명, key값들

var year = 1998;
var title = 'The Truman Show';

var params = {
    TableName : table,
    Item:{
        'year' : year,
        'title' : title,
        'info' : {
            'plot' : 'Good Afternoon, Good Evening and Good night',
            'rating' : 0,
            'actors' : 'Jim Carrey'
        }
    }
};

console.log('새 항목 추가중...');
doClient.put(params, function(err, data){
    if(err){
        console.error('항목 추가 오류 JSON', JSON.stringify(err,null,2));
    }
    else{
        console.log('항목 추가 완료', JSON.stringify(params, null, 2));
    }
});