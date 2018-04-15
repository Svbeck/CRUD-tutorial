var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://Svbeck:Gullf1sk3n@ds157521.mlab.com:57521/blackscreen'
var db




app.use(bodyParser.urlencoded({extended: true}))
app.use('/public', express.static(__dirname+'/public'))
app.use(bodyParser.json())
//app.set('view-engine','ejs')
app.set('views', __dirname + '/views');

app.post('/quotes',function(req,res){
	db.collection('quotes').save(req.body, function(err,result){	//save data to quotes from post
		if(err) return console.log(err)								//return errors to console
		console.log("Saved to DB")									//log success
		res.redirect('/')											//return to main
	})
})

MongoClient.connect(url, function(err,client){	//connects ti db-url
	if (err) return console.log(err)	//picks up and write errors to console
		 db = client.db('blackscreen') 	// whatever your database name is
		app.listen(3000, function(){	//listen to port 300
		console.log('listening on 3000')
  })
})

app.get('/', function(req,res){
	db.collection('quotes').find().toArray(function(err,result){ 	//get data and turn to string from quotes in db
		if(err) return console.log(err)								//return errors to console
		res.render('index.ejs', {quotes: result} )					//write data to index.ejs
	})
})

app.put('/quotes', function(req,res){
	db.collections('quotes').findOneAndUpdate({name: 'Yoda'},	//query
		{$set: 	{name: req.body.name,							//update
				quote: req.body.quote}
				},
				{ 	sort: {__id:-1}, 
					upsert: true
				}, (err, result) => {
				if (err) return res.send(err)
					console.log(req.body)
					res.send(result)})
})


