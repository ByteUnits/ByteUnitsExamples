/****
 hbexample.js
 A simple express server that renders a handlebar template
****/

// Load Node.js Packages
const handlebars = require('handlebars');
const express = require('express');
const fs = require('fs');

// Setup Express server
const port = process.env.PORT || 3000
const app = express()

// Example data set to populate template with
var data = {
	title: 'practical node.js',
	body: 'This is an example of rendering a handlebar template!',
	twitter: '@byteunits',
	tags: ['express', 'node', 'javascript']
}

// Handlebars template (NOTE: This typically would be in a separate .html file)
var source = `
<div class="header">
  <h1>{{custom_title title}}</h1>
</div>
<div class="body">
  <p>{{body}}</p>
</div>
<div class="footer">
  <div><a href="http://twitter.com/{{author.twitter}}">{{author.name}}</a></div>
  <ul>
    {{#each tags}}
      <li>{{this}}</li>
    {{/each}}
  <ul>
</div>
`

// Setup a custom handlebar helper that properly capitalizes a title
handlebars.registerHelper('custom_title', function(title){
	var words = title.split(' ');
	for (var i = 0; i < words.length; i++) {
		if (words[i].length > 4) {
			words[i] = words[i][0].toUpperCase() + words[i].substr(1);
		}
	}
	title = words.join(' ');
	return title;
})

var template = handlebars.compile(source);
var html = template(data);
console.log(html)

app.get('/', (req, res) => {
	res.send(html);
	res.end();
});

app.listen(port, err => { 
	if (err) throw err; 
	console.log(`> Ready On Server http://localhost:${port}`)
});


