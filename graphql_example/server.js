// Require needed packages
var express = require('express')
var mongoose = require('mongoose')
var {graphql} = require('graphql')
var { GraphQLObjectType,GraphQLNonNull,GraphQLSchema,
  GraphQLString,GraphQLList } = require('graphql/type');

// Initialize express app
const app = express()

// Connect to mongodb and setup user schema
mongoose.connect('mongodb://localhost/graphql', { useNewUrlParser: true });

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

// Setup GraphQL schema and functions
function getProjection (fieldASTs) {
  return fieldASTs.selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = 1;

    return projections;
  }, {});
}

var userType = new GraphQLObjectType({
  name: 'User',
  description: 'User creator',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the user.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the user.',
    },
    friends: {
      type: new GraphQLList(userType),
      description: 'The friends of the user, or an empty list if they have none.',
      resolve: (user, params, source, fieldASTs) => {
        var projections = getProjection(fieldASTs);
        return User.find({
          _id: {
            // to make it easily testable
            $in: user.friends.map((id) => id.toString())
          }
        }, projections);
      },
    }
  })
});

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: function() {
          return 'world';
        }
      },
      user: {
        type: userType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root, {id}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          console.log('projections', projections)
          return User.findById(id, projections);
        }
      }
    }
  })
});

// Express API Routes
// Root route for status checking
app.get('/', (req, res) => res.send('Hello World!'));

// Data route for getting data from the database
app.get('/data', function* (req, res) {
  console.log(req.query.query)

  var query = req.query.query;
  var params = req.query.params;

  var resp = yield graphql(schema, query, '', params);
  console.log(resp);

  if(resp.errors) {
    console.log(resp.errors);
    res.send('Error \(resp.errors)');
  } else {
      res.send(resp.data)
  }
});

// Turn on the server on port 3000
app.listen(3000, () => console.log('App listening on port 3000'))
