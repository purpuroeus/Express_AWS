require('dotenv').config()
var AWS = require('aws-sdk');

AWS.config.update({
    region : 'us-east-1',
    endpoint : 'http://localhost:8000'
})

var doClient = new AWS.DynamoDB.DocumentClient();

var table = 'Movies';

var year = 1998;
var title = 'The Truman Show';

var params = {
    TableName : table,
    Key : {
        'year' : year,
        'title' : title
    },
    ConditionExpression : 'info.rating > :val',
    ExpressionAttributeValues: {
        ':val' : 5.0
    }
};

function onDelete(err, data){
    if(err){
        console.error('항목 삭제 실패. 에러 JSON', JSON.stringify(err, null, 2));
    }
    else{
        console.log('항목 삭제 성공!', JSON.stringify(data, null ,2));
    }
}

doClient.delete(params, onDelete);