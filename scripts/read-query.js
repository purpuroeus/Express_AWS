require('dotenv').config();
var AWS = require('aws-sdk');

AWS.config.update({
    region : 'us-east-1',
    endpoint : 'http://localhost:8000'
});

var doClient = new AWS.DynamoDB.DocumentClient();

console.log('1998년도 개봉 영화 검색중...');

var table = 'Movies';

var year = 1998;

var params = {
    TableName : table,
    // KeyConditionExpression : '#yr = :yyyy',
    // ExpressionAttributeNames :{
    //     '#yr' : 'year'
    // },
    // ExpressionAttributeValues:{
    //     ':yyyy' : year
    // }
};

function onQuery(err, data){
    if(err){
        console.error('쿼리 처리 실패. 에러 JSON', JSON.stringify(err, null, 2));
    }
    else{
        console.log('쿼리 처리 성공');
        data.Items.forEach((item) => console.log(' -', item.year, ': ', item.title));
    }
};

doClient.query(params, onQuery);