require('dotenv').config();
var AWS = require('aws-sdk');

AWS.config.update({
    region : 'us-east-1',
    endpoint : 'http://localhost:8000'
});

var start_yr = 1988; var end_yr = 1998

console.log('1988-1998사이 개봉한 영화 스캔중...')

var params = {
    TableName : 'Movies',
    ProjectionExpression : '#yr, title, info.rating',
    FilterExpression : '#yr between :start_yr and :end_yr',
    ExpressionAttributeNames : {
        '#yr' : 'year'
    },
    ExpressionAttributeValues : {
        ':start_yr' : start_yr,
        ':end_yr' : end_yr
    }
};

var doClient = new AWS.DynamoDB.DocumentClient();

function onScan(err, data){
    if(err){
        console.error('스캔 실패. 에러 JSON', JSON.stringify(err, null, 2));
    }
    else{
        console.log('스캔 성공');
        data.Items.forEach((movie) => 
            console.log(movie.year, '  -  ', movie.title, '  -  ', movie.rating)
        );
        if(typeof data.LastEvaluatedKey != 'undefined'){
            console.log('추가 스캔중...');
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            doClient.scan(params, onScan);
        }
    }
}

doClient.scan(params, onScan);