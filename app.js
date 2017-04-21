const express = require('express')
const bodyPars = require('body-parser')
const monggo = require('mongoose')
const morgan = require('morgan')
const index = require('./routes/index')
const user = require('./routes/user')
const article = require('./routes/article')
const configDB = require('./config/config')
const app = express()


app.use(morgan('dev'))
app.use(bodyPars.json())
app.use(bodyPars.urlencoded({extended:false}))
// mongoose.Promise = global.Promise
monggo.connect(configDB.mongoURL[app.settings.env],(err,res) => {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Using Database: ' + configDB.mongoURL[app.settings.env]);
  }
})


app.use('/', index)
app.use('/users', user)
app.use('/articles', article)


app.listen(3000, () => {
  console.log('Server is running');
})
