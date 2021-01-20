const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialmedia', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}); 

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

module.exports = mongoose.connection;