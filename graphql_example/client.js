var request = require('superagent');

var userId = '559645cd1a38532d14349246';

request
  .get('http://localhost:3000/data')
  .query({
    query:
`{
    hello,
    user(id: "${userId}") {
      name
      friends {
        name
      }
    }
}`
  })
  .end(function (err, res) {
    console.log(err || res.body);
  })
