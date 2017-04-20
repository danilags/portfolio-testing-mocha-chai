var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name      : String,
  username  : String,
  email     : String,
  password  : String,
  article   : [{type: Schema.Types.ObjectId, ref: 'Article'}]
})

var User = mongoose.model('User', userSchema);

module.exports = User
