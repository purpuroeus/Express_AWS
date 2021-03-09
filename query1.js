require('dotenv').config();
var AWS = require('aws-sdk');

AWS.config.update({
    region : 'us-east-1',
    endpoint : 'http://localhost:8000'
});

console.log('1988년도 개봉 영화 쿼리 요청중...');

var params = {
    TableName : 'Movies',
    KeyConditionExpression : '#yr = :yyyy',     // 키를 이용한 검색 조건. #yr이 yyyy와 일치하는 것만 가져옴
    ExpressionAttributeNames : {                // 표현식의 속성명을 지정하는 부분. #yr은 Movies 칼럼의 year을 의미
        '#yr' : 'year'
    },
    ExpressionAttributeValues : {               // :yyyy에 들어갈 값을 지정하는 부분
        ':yyyy' : 1998
    }
};

var doClient = new AWS.DynamoDB.DocumentClient();

function onQuery(err, data){
    if(err){
        console.error('쿼리 실패. 에러 JSON', JSON.stringify(err, null, 2));
    }
    else{
        console.log('쿼리 성공');
        data.Items.forEach(function(item){
            console.log('-----', item.year, '  :  ', item.title);
        });
    }
}

doClient.query(params, onQuery);