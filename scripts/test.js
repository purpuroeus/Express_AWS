var fs = require('fs');

var moviedata = JSON.parse(fs.readFileSync('moviedata.json', 'utf-8'));

var count = 0;

moviedata.forEach(element => {
    count++;
});

console.log(count);