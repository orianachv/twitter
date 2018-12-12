const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const routes = require('./routes');

// ...
const server = app.listen(3001);
const io = socketio.listen(server);

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set('view engine', 'html'); // hace que res.render funcione con archivos html
app.engine('html', nunjucks.render); // cuando le den archivos html a res.render, va a usar nunjucks
nunjucks.configure('views', { noCache: true });
nunjucks.render('index.html', function(err, output) {
  console.log(output);
});

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', routes(io));
// app.use('/', routes);

app.use('/', function(req, res, next) {
  next();
});

// app.listen(3001, () => {
//   console.log('Listening in port 3001');
// });
