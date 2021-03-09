require('dotenv').config();
var AWS = require('aws-sdk');

AWS.config.update({
    region : 'us-west-1',
    endpoint : 'http://localhost:8000'
});

var doClient = new AWS.DynamoDB.DocumentClient();

var table = 'Movies';

var year = 1998;
var title = "The Truman Show"

var params = {
    TableName : table,
    Key : {
        'year' : year,
        'title' : title
    },
    UpdateExpression : 'remove info.actors[0]',
    ConditionExpression: 'size(info.actors) >= :num',
    ExpressionAttributeValues:{
        ":num" : 3
    },
    ReturnValues:'UPDATED_NEW'
}

console.log('조건문 항목 업데이트 시작...');

doClient.update(params, function(err, data){
    if(err){
        console.error('항목 업데이트 실패', JSON.stringify(err, null ,2));
    }
    else{
        console.log('항목 업데이트 성공', JSON.stringify(data, null, 2));
    }
});