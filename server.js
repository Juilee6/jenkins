const express = require('express');


const PORT = process.env.PORT || 3000;


const app = express();
app.get('/', function (req, res) {
  res.send('Hello world welcome to my website\n');
});

app.listen(PORT);
console.log('34.135.189.125:' + PORT);
