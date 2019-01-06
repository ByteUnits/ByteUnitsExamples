// add.js (API)
'use strict';
var util = require('util');
module.exports = {
  add:add
};

function add(req, res) {
  var numA = req.swagger.params.numA.value || 0;
  var numB = req.swagger.params.numB.value || 0;
  var sum = numA + numB;
  var response = util.format('Result: %d', sum);
  res.json(response);
}
