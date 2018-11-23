var mongoose = require('mongoose')

// Connect to mongodb
mongoose.connect('mongodb://localhost/graphql', { useNewUrlParser: true });

// Setup user schema
var UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

var User = mongoose.model('User', UserSchema);

// seed users
var users = [
  {
    _id: '559645cd1a38532d14349240',
    name: 'Han Solo',
    friends: []
  },

  {
    _id: '559645cd1a38532d14349241',
    name: 'Chewbacca',
    friends: ['559645cd1a38532d14349240']
  },

  {
    _id: '559645cd1a38532d14349242',
    name: 'R2D2',
    friends: ['559645cd1a38532d14349246']
  },

  {
    _id: '559645cd1a38532d14349246',
    name: 'Luke Skywalker',
    friends: ['559645cd1a38532d14349240', '559645cd1a38532d14349242']
  }
];

// drop collection to make sure seed starting from a blank slate then insert the record
mongoose.connection.collections['users'].drop( function (err) {
  User.create(users, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log('seed data created.');
    }

    process.exit();
  });
});
