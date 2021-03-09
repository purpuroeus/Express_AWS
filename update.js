require('dotenv').config();
var AWS = require('aws-sdk');

AWS.config.update({
    region : 'us-east-1',
    endpoint : "http://localhost:8000"
});

var doClient = new AWS.DynamoDB.DocumentClient();

var table = 'Movies'

var year = 1998;
var title = 'The Truman Show';

var params={                            //update할 항목에 대한 파라미터
    TableName : table,
    Key : {                             //먼저 key값을 지정한 다음
        'year' : year,
        'title' : title
    },
    UpdateExpression : 'set info.rating = info.rating + :val, info.plot = :p, info.actors = :a',     // UpdateExpression에서 바꿀 항목에 대해 지정 rating은 :val에 지정한 값과 더한 값으로, plot은 :p로, actors는 :a로
    ExpressionAttributeValues: {        //UpdateExpression에서 지정한 속성 값에 대해 적용할 값과 매칭 시키는 부분
        ":val" : 8.8,
        ":p" : "An insurance salesman/adjuster discovers his entire life is actually a TV show.",
        ":a" : ["Jim Carrey", "Ed Harris", "Laura Linney"]
    },
    ReturnValues : "UPDATED_NEW"
};

console.log('항목 업데이트중...',);
doClient.update(params, function(err,data){
    if(err){
        console.error('항목 업데이트 에러 발생. 에러 JSON', JSON.stringify(err, null, 2));
    }
    else{
        console.log('항목 업데이트 성공! 성공 JSON', JSON.stringify(data, null, 2));
    }
})