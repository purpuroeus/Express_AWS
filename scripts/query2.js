require('dotenv').config();
var AWS = require('aws-sdk');

AWS.config.update({
    region : 'us-east-1',
    endpoint : 'http://localhost:8000'
});

console.log('1998년 개봉 영화 중 제목이 A-L인 영화의 개봉 연도, 제목, 장르, 배우 쿼리중...');

var letter1 = 'A'; var letter2 = 'L';

var params = {
    TableName : 'Movies',
    ProjectionExpression : '#yr, title, info.genres, info.actors[0]',           //Projection 연산을 할 칼럼을 지정. RDB의 'Select Colums'와 동일
    KeyConditionExpression : '#yr = :yyyy and title between :letter1 and :letter2', // 쿼리 조건을 명시하는 부분. yr이 yyyy이며 제목이 letter1 ~ letter2
    ExpressionAttributeNames : {            // 표현식의 속성명을 지정하는 부분
        '#yr' : 'year'
    },
    ExpressionAttributeValues : {           // 표현식의 속성값을 지정하는 부분
        ':yyyy' : 1998,
        ':letter1' : letter1,
        ':letter2' : letter2
    }
};

var doClient = new AWS.DynamoDB.DocumentClient();

function onQuery(err, data){
    if(err){
        console.error('쿼리 실패. 에러 JSON', JSON.stringify(err, null, 2));
    }
    else{
        console.log('쿼리 성공');
        data.Items.forEach((item) =>
            console.log('----', item.year, '  :  ', item.title, '  -  ', item.info.genres, '  -  ', item.info.actors[0])
        )
    }
}

doClient.query(params, onQuery);