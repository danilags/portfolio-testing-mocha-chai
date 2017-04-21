const chai = require('chai')
const chaiHttp = require('chai-http');
const should = chai.should()
const Article = require('../models/article');

chai.use(chaiHttp)

describe('Create new Article', function() {
  Article.collection.drop()

  let newArticle = {
    title : 'Cara belajar Java',
    content : 'Ini contoh content',
    author : '58f985805cfb1504a634cbff',
    updateAt : new Date,
    createdAt: new Date
  }

  it('Should create new Article', function(done) {
    chai.request('http://localhost:3000')
        .post('/articles')
        .send(newArticle)
        .end(function(err, response) {
          response.should.have.status(200)
          response.body.should.have.property('_id')
          response.body.should.have.property('name')
          response.body.should.have.property('username')
          response.body.should.have.property('article')
          response.should.be.json
          done()
        })
  })
})

describe('Getting all article', function() {
  it('Getting all articles', function(done) {
    chai.request('http://localhost:3000')
    .get('/articles')
    .end(function(err, response) {
      response.should.have.status(200)
      response.body.should.be.a('array')
      // response.body.should.have.lengthOf(1)
      response.should.be.json
      done()
    })
  })
})
