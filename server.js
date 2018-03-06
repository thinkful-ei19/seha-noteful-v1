'use strict';

const { PORT } = require('./config');

const express = require('express');
const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data);

const app = express();
app.use(express.static('public'));

function requestLogger(req, res, next){
  // console.log(req, res, next);
  const date = new Date();
  console.log(
    `${date.toLocaleDateString()} ${date.toLocaleTimeString()} ${req.method} ${req.url}`
  );
  next();
}


app.get('/api/notes', requestLogger, (req, res) => {
  const searchTerm = req.query.searchTerm;
  if(searchTerm){
    const dataByFilter = data.filter(item => item.title.includes(searchTerm));
    res.json(dataByFilter);
  }
  else{
    res.json(data);
  }
});


app.get('/api/notes/:Id', (req, res) => {
  const Id = req.params.Id;
  const noteById = data.find(item => item.id === Number(Id));
  res.json(noteById);
});

// app.get('/boom', (req, res, next) => {
//   throw new Error('Boom!!');
// });

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

// Listen for incoming connections
app.listen(PORT, function(){
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

