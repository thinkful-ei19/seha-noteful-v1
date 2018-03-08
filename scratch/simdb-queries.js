'use strict';

const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

// GET Notes with search
notes.filter('cats')
  .then(list => {
    console.log(list);
  })
  .catch(err => {
    console.error(err);
  });

// GET Notes by ID
notes.find(1005)
  .then(item => {
    if(item) {
      res.json(item);
    } else {
      next();
    }
  })
  .catch(err => {
    next(err);
  });


notes.update(1005, updateObj, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});
