var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://Svbeck:Gullf1sk3n@ds157521.mlab.com:57521/blackscreen'
var db

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
//app.set('view-engine','ejs')
app.set('views', __dirname + '/views');

app.post('/quotes',function(req,res){
	db.collection('quotes').save(req.body, function(err,result){
		if(err) return console.log(err)
			
		console.log("Saved to DB")
		res.redirect('/')
	})
})

MongoClient.connect(url, function(err,client){	
	if (err) return console.log(err)
		 db = client.db('blackscreen') // whatever your database name is
		app.listen(3000, function(){
		console.log('listening on 3000')
  })
})

app.get('/', function(req,res){

	db.collection('quotes').find().toArray(function(err,result){
		if(err) return console.log(err)
		res.render('index.ejs', {quotes: result} )
	})
})

//app.listen(1337,function(){
//	console.log("listening on 1337")
//})