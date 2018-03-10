'use strict';
const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);


describe('GET /v1/notes', function() {
  it('should return 10 notes', function() {
    return chai.request(app)
      .get('/v1/notes')
      .then(function(res) {
      
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.length(10);
      
      });
  });
});
it('should return list of correct id, title, content fields', function() {
  return chai.request(app)
    .get('/v1/notes')
    .then(function(res) {
        
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('array');
      expect(res.body).to.have.length(10);

      const expectedKeys = ['id', 'title', 'content'];
      res.body.forEach(function(item) {
        expect(item).to.be.a('object');
        expect(item).to.include.keys(expectedKeys);
      });
    });
});
describe('GET /v1/notes/:id', function() {
  it('should return the right note', function() {
    return chai.request(app)
      .get('/v1/notes/1005')
      .then(function(res) { 
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys('id', 'title', 'content');
        expect(res.body.title).to.equal('10 ways cats can help you live to 100');
        expect(res.body.id).to.equal(1005);
      });
  });
  it('should give a 404 error if the id is invalid', function() {
    return chai.request(app)
      .get('/bad/url')
      .catch(err => err.response)
      .then(res => { 
        expect(res).to.have.status(404);
      });
  });
});

describe('PUT /v1/notes', function() {
  it('should update the note', function() {
    const updateNote = {
      'title' : 'A cats purr begins in its brain',
      'content':'A repetitive neural oscillator sends messages to the laryngeal muscles, causing them to twitch at a rate of 25 to 150 vibrations per second.'
    };
    return chai.request(app)
      .put('/v1/notes/1001')
      .send(updateNote) 
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('id', 'title', 'content');
        expect(res.body.title).to.equal(updateNote.title);
        expect(res.body.id).to.equal(1001);
        expect(res.body.content).to.equal(updateNote.content);
      });
  });  
  it('Should give a 404 error if the id is invalid', function() {
    const updateNote = {
      'title' : 'A cats purr begins in its brain',
      'content':'A repetitive neural oscillator sends messages to the laryngeal muscles, causing them to twitch at a rate of 25 to 150 vibrations per second.'
    };
    return chai.request(app)
      .put('/v1/notes/5400')
      .send(updateNote)
      .catch(err => err.response)
      .then(function(res) { 
        expect(res).to.have.status(404);
      });
  });
});
describe('POST /v1/notes', function() {
  it('should create and return new data', function(){
    const createNote = {
      title : 'Myths About Cats and Babies',
      content : 'Myths about the coexistence of cats and babies have abounded for centuries.'
    };
    return chai.request(app)
      .post('/v1/notes')
      .send(createNote) 
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('id', 'title', 'content');
        expect(res.body.title).to.equal(createNote.title);
        expect(res.body.id).to.equal(1010);
        expect(res.body.content).to.equal(createNote.content);
      });
  });  
  it('should give an error when missing title/content field', function(){
    const createNote = {
      lets: 'dance'
    };
    return chai.request(app)
      .post('/v1/notes')
      .send(createNote)
      .catch(err=> err.response)
      .then(function(res) {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.be.equal('Missing `title` in request body');
      });
  });
});

describe('DELETE /v1/notes/:id', function(){
  it('should delete item by id', function(){
    return chai.request(app)
      .delete('/v1/notes/1003')
      .then(function(res) {
        expect(res).to.have.status(204);
      });
  });
  
//   it('should respond with a 404 for invalid id', function(){
    
//     return chai.request(app)
//       .delete('/v1/notes/1023')
//       .catch(err => err.response)
//       .then(function(res) {
//         expect(res).to.have.status(404);
//       });
//   });
});






