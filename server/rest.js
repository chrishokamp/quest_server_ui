var gzippo = require('gzippo')
  , express = require('express')
  , params = require('express-params')
  , http = require('http')
  , cors = require('cors')
  , fs = require('fs')
  , bodyParser = require('body-parser')
  , logger = require('express-logger')
  , connectTimeout = require('connect-timeout')
  , formidable = require('formidable')
  , msTranslator = require('./translate')
  , questClient = require('./questConnector')
  , app = express();


app.use(bodyParser());
app.use(cors());
app.set('port', 3333);
params.extend(app);

app.use(logger({path: "logfile.txt"}));

// set a global timeout
//var timeout = connectTimeout({ time: 10000 });
//app.use(timeout);
//var longTimeout = connectTimeout({ time: 45000 });


// APPLICATION ROUTES

//app.param('lang', /^\w{2}$/);
app.post('/upload', function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files){
    if(err) return res.redirect(302, '/error');

    // Working - do validation to confirm that this is a txt file
    fs.readFile(files.file.path, 'utf8', function (err, data) {
      if (err) throw err;
      console.log('file upload');
      console.log(data);
    });


    // to send a multipart http response
//    res.write(target);
//    setTimeout(function(){
//      res.write(target);
//      res.end();
//    }, 5000);

//    res.type('text/plain');
//    res.send('Meadowlark Travel');
  });
});

// story
// user types text in source language, gets back translation, features, and text

// current quest XMLRPC endpoint
// http://143.167.8.76:35722

// methods - test that all of these actually work
// one problem is that they all return strings so would need to be reparsed -- switch to json(?)
// public Object getAllPredictions(String sent) throws Exception - returns string
// public Object getTranslation(String sent) throws Exception
// public Object getFeatures(String sent)
// public Object getPredictions(String sent)
// public Object callQuest_wth_line(String sent)
// public Object getRank(String sent) - this one ranks different mt systems
// public Object callQuest(String id, String src, String moses, String google, String lucy)

// the XMLRPC server exposes the name 'runQuest', and all java functions can be called from there

// from https://github.com/kashifshah/QuEstClient_v1/blob/master/callQuEst.php#L110-L132
//    				//$inputt = iconv(mb_detect_encoding($inputline), 'UTF-8', $inputline);

// in kashif's code, the $_SESSION['trans'] is expected to be set from the previous call
// php uses session_start(); for this, then you have $SESSION
//$_SESSION['trans'] = $translated;


//		<?php
//			session_start();
//			if (isset($_SESSION['trans'])){
//				$minput = trim($_SESSION['trans']);
//				//echo "trans value is = " . $minput;
//				//}
//			//$input = explode("\n", trim($_GET['trans']));
//				$inputq = explode("\n", $minput); // dividing the String into lines
//				foreach ($inputq as $inputlineq) {
//    			if(!empty($inputlineq)){
//    				$inputq = iconv(mb_detect_encoding($inputlineq), 'UTF-8', $inputlineq);
//    				$pred = getQuEst($inputq);
//    				//echo $inputq;
//    				//echo "<pre> $inputq </pre>";
//    				flush();
//
//					}
//				}
//			}
//
//		?>


// working notes
// callQuEst.php - the normal flow
// send_to_quest.php - getting the rankings

app.param('lang', /^\w{2}$/);
app.get('/segment/:lang', function(req, res){
  console.log(req.query);
  var lang = req.params.lang.toString();
  console.log('lang: ' + lang);
  // TODO: get the source and target of the segment, calculate the features and send for prediction

  res.type('text/plain');
  res.send('Meadowlark Travel');
});

//var params = {
//  text: 'How\'s it going?'
//  , from: 'en'
//  , to: 'es'
//};
//req.query.color
// http://localhost:3333/translate?from=en&to=de&text=I%20want%20to%20go%20home
// working - return a promise
app.get('/translate', function(req, res){
  var params = {
    from: req.query.from,
    to: req.query.to,
    text: req.query.text
  }
  console.log(params);
  // TODO: get the source and target of the segment, calculate the features and send for prediction

  var transResult = msTranslator.translate(params);
  transResult.then(
    function(data) {
      console.log('data: ' + data);
      res.type('text/plain');
      res.send(data);
    }
  );
});

// paths which require chained calls
app.get('/features', function(req, res){
  // only get the translation if we don't have the target
  var from = req.query.from
    , to = req.query.to
    , source = req.query.source
    , target = req.query.target;

  if (target) {
    res.type('text/plain');
    res.send('TARGET SUPPLIED');

  } else {
    var params = {
      to: to,
      from: from,
      text: source
    };
    var trans = msTranslator.translate(params)
    trans
      .then(function(target) {
        // get the features
        return questClient.features(to, from, source, target);
      })
     .then(function(features) {
        console.log("FEATURES: " + features);
        res.type('text/plain');
        res.send(features)
     })
  }
  // TODO: get the source and target of the segment, calculate the features and send for prediction
});

// for hosting the app using express
// app.use(gzippo.staticGzip("" + __dirname + "/dist"));

// /predict (can use chained promise(?), because it uses the features from the /feature route
// paths which require chained calls
app.get('/predict', function(req, res){
  // only get the translation if we don't have the target
  var from = req.query.from
    , to = req.query.to
    , source = req.query.source
    , target = req.query.target;

  if (target) {
    res.type('text/plain');
    res.send('TARGET SUPPLIED');

  } else {
    var params = {
      to: to,
      from: from,
      text: source
    };
    var trans = msTranslator.translate(params)
    trans
      .then(function(target) {
        // get the prediction directly
        // TODO: change the signature so that the backend exposes the ml component directly
        return questClient.features(to, from, source, target);
      })
     .then(function(features) {
        console.log("FEATURES: " + features);

        res.type('text/plain');
        res.send(features)
     })
  }
  // TODO: get the source and target of the segment, calculate the features and send for prediction
});

//     String l_src = getsrcLanguage();
//
//        ClientQuEst client = null;
//        ClientLearn learn = null;
//        int qcp = Integer.parseInt(resourceManager.getString("quest.port"));
//        int qlp = Integer.parseInt(resourceManager.getString("learn.port"));
//
//
//        if (l_src.equals("de")){
//             client = new ClientQuEst("localhost", 7773, false);
//             learn = new ClientLearn("localhost", 7774, false);
//        }else if (l_src.equals(Language.FRENCH)) {
//            client = new ClientQuEst("localhost", 8883, false);
//            learn = new ClientLearn("localhost", 8884, false);
//        }else{
//            System.out.println("Language not supported");
//            return 0;
//        }
//
//
//        //ClientQuEst client = new ClientQuEst("localhost", 7773, false);
//        String m = client.getFeatures(src, tgt);
//
//        double pred = learn.getPredictions(m);
//
//        String all_pred =  src + "\t" + tgt + "\t" + pred;
//
//    return all_pred;

// UTILS
// get a bing translation

app.use(function(req, res, next) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate');
});
