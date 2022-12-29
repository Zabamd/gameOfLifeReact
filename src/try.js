const fs = require('fs');

fs.readFile('board.json', (err, data) => {
    let student = JSON.parse(data);
    console.log(student['boardLayout']);
});

console.log('This is after the read call');
