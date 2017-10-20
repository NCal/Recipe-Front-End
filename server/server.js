// PACKAGES //
let deps = require('./misc/deps.js');
var path = deps.path;
var fs = deps.fs;
var express = deps.express;
var logger = deps.logger;
var bodyParser = deps.bodyParser;

// IMPORTS //
var indexRoutes = require('./routes/index');

// CREATE APP //
var app = express();

// VIEW ENGINE //
app.set('view engine', 'html');
app.engine('html', function (path, options, callbacks) {
  fs.readFile(path, 'utf-8', callback);
});
app.set('json spaces', 0);

// MIDDLEWARE //
app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// ROUTES //
app.use('/', indexRoutes);

// ERROR HANDLER //
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(err.status || 500).send('something broke');
});

var port = 3000;
app.listen(port, function(){
   console.log('running at localhost:' + port);
});
