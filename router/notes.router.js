'use strict';
const express = require('express');
const router = express.Router();

const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);


// Get All (and search by query)
router.get('/notes', (req, res, next) => {
  const { searchTerm } = req.query;
  
  notes.filter(searchTerm)
    .then(list => {
      res.json(list);
    })
    .catch(err => {
      console.log(err);
      next(err);
    }); 
});


   
// Get a single item
router.get('/notes/:id', (req, res, next) => {
  const id = req.params.id;
  notes.find(id)
    .then(item => {
      if (item) {
        res.json(item);
      }
      else{
        next(); 
      }
    })
    .catch(err => {
      next(err);
    });
});
   
// Put update an item
router.put('/notes/:id', (req, res, next) => {
  const id = req.params.id;
      
  const updateObj = {};
  const updateFields = ['title', 'content'];
      
  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });
  notes.update(id, updateObj)
    .then(item => {
      if (item) {
        res.json(item);
      }
      else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

router.post('/notes', (req, res, next) => {
  const { title, content } = req.body;
  const newItem = { title, content };
  
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  notes.create(newItem)
    .then(item => {
      if (item) {
        res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
      }
      else{
        next();
      }
    })
    .catch(err => {
      next(err);
    });
}); 

router.delete('/notes/:id', (req, res, next) => {
  const id  = req.params.id;

  notes.delete(id)
    .then(item => {
      if (item) {
        res.sendStatus(204);
      }
      else {
        const err = new Error('Delete Id  not matching an id in DB');
        err.status = 400;
      }
    })
    .catch(err => {
      next(err);
    });
});


module.exports = router;
