var express = require('express');
var app = express();
var cors = require('cors')
var path = require('path');

app.use(cors())

app.options('*', cors())

app.listen(3000, function () {
  console.log(__dirname);
  console.log('Example app listening on port 3000!');
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + 'index.html'));
});

app.get('/testers', function (req, res) {
    console.log({ "firstName": "John",
    "lastName" : "Doe",
    "test": "Passed"
     });
    res.status(200).send({ "firstName": "John",
    "lastName" : "Doe",
    "test": "Passed"
     });
  });

app.get('/students', function (req, res) {
    console.log({ "firstName": "Bill",
    "lastName" : "Smith",
    "studentID": 1
     });
    res.status(200).send({ "firstName": "Bill",
    "lastName" : "Smith",
    "studentID": 1
     });
});