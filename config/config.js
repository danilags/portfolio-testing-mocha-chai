const monggo = require('mongoose');

module.exports = {
  mongoURL: {
    development:'mongodb://localhost/bloger',
    test:'mongodb://localhost/article-test'
  }
};
