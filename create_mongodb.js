var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:1337/mydb"

MongoClient.connect(url,function(err,db){ //connects to url and creates to db if it doesn't exists
	if(err) throw err;
	console.lsog("DB created!")
	db.close();
});