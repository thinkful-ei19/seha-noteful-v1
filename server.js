'use strict';

const express = require('express');
const data = require('./db/notes');
const morgan = require('morgan');
const { PORT } = require('./config');

const notesRouter = require('./router/notes.router');

// Create an Express application
const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use('/v1', notesRouter);


// function requestLogger(req, res, next){
//   // console.log(req, res, next);
//   const date = new Date();
//   console.log(
//     `${date.toLocaleDateString()} ${date.toLocaleTimeString()} ${req.method} ${req.url}`
//   );
//   next();
// }


// app.get('/api/notes', requestLogger, (req, res) => {
//   const searchTerm = req.query.searchTerm;
//   if(searchTerm){
//     const dataByFilter = data.filter(item => item.title.includes(searchTerm));
//     res.json(dataByFilter);
//   }
//   else{
//     res.json(data);
//   }
// });


// app.get('/api/notes/:id', (req, res, next) => {
//   const id = req.params.id;
//   notes.find(id, (err, item) => {
//     if (err) {
//       return next(err);
//     }
//     if(item)
//       res.json(item);
//     else{
//       next(); //==>404
//     }
//   });
// });

// app.put('/api/notes/:id', (req, res, next) => {
//   const id = req.params.id;

//   const updateObj = {};
//   const updateFields = ['title', 'content'];

//   updateFields.forEach(field => {
//     if (field in req.body) {
//       updateObj[field] = req.body[field];
//     }
//   });

//   notes.update(id, updateObj, (err, item) => {
//     if (err) {
//       return next(err);
//     }
//     if (item) {
//       res.json(item);
//     } else {
//       next();
//     }
//   });
// });



// app.get('/boom', (req, res, next) => {
//   throw new Error('Boom!!');
// });

// app.get('/api/notes', (req, res, next) => {
//   const { searchTerm } = req.query;

//   notes.filter(searchTerm, (err, list) => {
//     if (err) {
//       return next(err); // goes to error handler
//     }
//     res.json(list); // responds with filtered array
//   });
// });

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
