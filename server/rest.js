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
//    echo "file uploaded";
//        	$file = file_get_contents($_FILES['file']['tmp_name'], true);
//        	$input = explode("\n", $file); // dividing the file into lines
//			$translated = "";
//
//    		//$file = file_get_contents('./input_quest_de.txt', true); // Reading input file
//    		//$input = explode("\n", $file); // dividing the file into lines
//    		foreach ($input as $inputline) {
//    			if(!empty($inputline)){
//				//echo $inputline;
//    				//$inputt = iconv(mb_detect_encoding($inputline), 'UTF-8', $inputline);
//    				$inputt = mb_convert_encoding($inputline, 'UTF-8',mb_detect_encoding($inputline, 'UTF-8, ISO-8859-1', true));
//				$translated .= getBing($inputt);
//    				//$translated .= "$translated\r\n";
//    				//echo $translated;
//        			flush();
//        		}
//			}
//		echo "<pre>$translated</pre>";
//		session_start();
//		$_SESSION['trans'] = $translated;
//
//		echo "<br><br>"

// getBing function - https://github.com/kashifshah/QuEstClient_v1/blob/master/callQuEst.php#L6-L56
//function getBing($content){
//
//		//	echo $content;
//
//            // specify the data to pass to QuEST and load it (taking whatever is passed to this page as the data)
//				try{
//
//					$post_data = $content;
//					require_once('ripcord.php'); // function library
//					$client = ripcord::xmlrpcClient("http://143.167.8.76:35722"); // server listening at this address
//
//               	}
//               	catch (Exception $e) {
//			    	echo 'Caught exception: ',  $e->getMessage(), "\n";
//				}
//
//
//				try{
//                                    $translatedString  = $client->runQuest->getTranslation($post_data);
//                                    //$translatedString  = $client->runQuest2->Test($post_data);
//				}catch (Exception $e) {
//			    	echo 'Caught exception: ',  $e->getMessage(), "\n";
//				}
//
//               // $translatedString  = $client->runQuest->getTranslation($post_data);
//                //echo "<pre> $translatedString </pre>", "<br>" ;
//               // echo $translatedString, "<br>";
//                $output = explode("\t", "$translatedString");
//
//              //  echo "<font color=#ff0000>$output[0]</font>", "<tab>";
//              //  echo "<font color=green>$output[1]</font>", "<br>";
//
//                if (ob_get_level() == 0) ob_start();
//
//                echo "<table  border=0 width=100%>\n";
//                echo "<tr>\n"
//                ."<td width=40%> $output[0]</td>"
//                ."<td width=40%> $output[1]</td>"
//    			."</tr>\n";
//
//    			 echo '</table>';
//    			 ob_flush();
//    			 flush();
//    			 usleep(50000);
//                ob_end_flush();
//               // flush();
//                //return "$translatedString";
//                $ao = trim($output[0]). "\t" .trim($output[1]). "\n";
//                return $ao;
//
//}

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
    trans.then(function(target) {
        // get the features

        console.log("FEATURES: " + target);
        res.type('text/plain');
        res.send()
    });

  }
  // TODO: get the source and target of the segment, calculate the features and send for prediction
});


// params
//var params = {
//  text: 'How\'s it going?'
//  , from: 'en'
//  , to: 'es'
//};

// translator.translate(params, callback)


// for hosting the app using express
// app.use(gzippo.staticGzip("" + __dirname + "/dist"));

// ROUTES
// /translate
// - bing for now

// /features

// /predict (can use chained promise(?), because it uses the features from the /feature route

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
