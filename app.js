const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');

var locals = {
  title: 'An Example',
  people: [{ name: 'Gandalf' }, { name: 'Frodo' }, { name: 'Hermione' }],
};

app.set('view engine', 'html'); // hace que res.render funcione con archivos html
app.engine('html', nunjucks.render); // cuando le den archivos html a res.render, va a usar nunjucks
nunjucks.configure('views', { noCache: true });
nunjucks.render('index.html', locals, function(err, output) {
  console.log(output);
});

app.use(morgan('tiny'));

app.use('/special', (req, res, next) => {
  console.log('Entraste a un area especial');
  next();
});

app.get('/', (req, res) => {
  res.render('index', { title: locals.title, people: locals.people });
});

app.listen(3001, () => {
  console.log('Listening in port 3001');
});
