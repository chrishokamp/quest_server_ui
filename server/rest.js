var gzippo = require('gzippo')
  , express = require('express')
  , params = require('express-params')
  , http = require('http')
  , cors = require('cors')
  , fs = require('fs')
  , bodyParser = require('body-parser')
  , logger = require('express-logger')
  , formidable = require('formidable')
  , app = express();


app.use(bodyParser());
app.use(cors());
app.set('port', 3333);
params.extend(app);

// TODO: the logger middleware must be installed separately in new express versions
app.use(logger({path: "logfile.txt"}));

//app.param('lang', /^\w{2}$/);
app.post('/upload', function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files){
    if(err) return res.redirect(302, '/error');
    fs.readFile(files.file.path, 'utf8', function (err, data) {
      if (err) throw err;
      console.log('file upload');
      console.log(data);
    });
  });
});

// for hosting the app using express
// app.use(gzippo.staticGzip("" + __dirname + "/dist"));

// ROUTES
// /translate
// - bing for now

// /features

// predict (can use chained promise(?), because it uses the features from the /feature route
//      - depends upon th


app.use(function(req, res, next) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate');
});
