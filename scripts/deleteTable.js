require('dotenv').config()
var AWS = require('aws-sdk');

AWS.config.update({
    region : 'us-east-1',
    endpoint : 'http://localhost:8000'
})

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : 'Movies'
};

dynamodb.deleteTable(params, test);

function test(err, data){
    if(err){
        console.error('테이블 삭제 실패', JSON.stringify(err, null, 2));
    }
    else{
        console.log('테이블 삭제 성공', JSON.stringify(data, null, 2));
    }
};