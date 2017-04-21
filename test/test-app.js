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

describe('Updated Article /:id', function() {
  it('Updated single article', function(done) {
    let article = new Article({
      title : 'Ini adalah title article',
      content: 'ini content dari article',
      updateAt: new Date()
    })

    article.save(function(err, article) {
      chai.request('http://localhost:3000')
      .put('/articles/' + article._id)
      .send({title : 'Ini updatean terbaru title article', content: 'Ini adalah updatean dari content', updateAt: new Date()})
      .end(function(err, response) {
        console.log(response);
        response.should.have.status(200);
        response.body.should.be.a('object')
        response.body.should.have.property('n').eql(1)
        response.body.should.have.property('message').eql('Data Updated')
        // response.body.should.have.property('ok').eql(1);
        done()
      })
    })
  })
})

describe('Delete Single Article', function() {
  this.timeout(5000)
  it('Delete single Article', function(done) {
    let article = new Article({
      title : 'Ini adalah title article 2',
      content: 'ini content dari article 2',
      updateAt: new Date()
    })
    article.save(function(err, article) {
      chai.request('http://localhost:3000')
      .delete('/articles/' + article._id)
      .end(function(err, response) {
        response.should.have.status(200)
        response.body.be.a('object')
        res.body.should.have.property('msg').eql('Article berhasil di hapus !')
        done()
      })
    })
  })
})
