'use strict';

const express = require('express');
const data = require('./db/notes');

const app = express();
app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
  const searchTerm = req.query.searchTerm;
  const dataByFilter = data.filter(item => item.title.includes(searchTerm));
  res.json(dataByFilter);

});


app.get('/api/notes/:Id', (req, res) => {
  const Id = req.params.Id;
  const noteById = data.find(item => item.id === Number(Id));
  res.json(noteById);
});

// Listen for incoming connections
app.listen(8080, function(){
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

