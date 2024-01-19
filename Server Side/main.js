//This is used for listing and creating the product
///multiple entity


var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');
const { Console } = require("console");
const cors = require('cors');
//cors

app.use(cors({
  origin: 'http://localhost:8000'
}));

//start mysql connection
var connection = mysql.createConnection({
  host     : 'localhost', //mysql database host name
  user     : 'root', //mysql database user name
  password : '', //mysql database password
  database : 'product' //mysql database name
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})
//end mysql connection

//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

//create app server
var server = app.listen(8000,  "127.0.0.1", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Server listening at http://%s:%s", host, port)

});

//rest api to get all results
app.get('/users', function (req, res) {
       var sql='select * from users';
    connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
    //console.log(results);
  });
});

//rest api to get all results
app.get('/users/:id', function (req, res) {
  var x=req.params.id;
  console.log("getid");
  console.log(x);
  var sql='select * from users where `id`=?';
  connection.query(sql, [req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
    //console.log(results);
  });
});



//rest api to get all results
app.get('/product', function (req, res) {
       var sql='select * from product';
    connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
    //console.log(results);
  });
});

//rest api to get all results
app.get('/product/:id', function (req, res) {
  var x=req.params.id;
  console.log("getid");
  console.log(x);
  var sql='select * from product where `id`=?';
  connection.query(sql, [req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
    //console.log(results);
  });
});









//rest api to delete record from mysql database
app.delete('/users/:id', function (req, res) {
  //console.log(req);
  connection.query('DELETE FROM `users` WHERE `id`=?', [req.params.id], function (error, results, fields) {
   if (error) throw error;
   //res.end('Record has been deleted!');
   res.end(JSON.stringify(results));
 });
});


//rest api to delete record from mysql database
app.delete('/product/:id', function (req, res) {
  //console.log(req);
  connection.query('DELETE FROM `product` WHERE `id`=?', [req.params.id], function (error, results, fields) {
   if (error) throw error;
   //res.end('Record has been deleted!');
   res.end(JSON.stringify(results));
 });
});





//rest api to update record into mysql database
app.put('/users/:id', function (req, res) {
  console.log(req.params.id);
  console.log("putid");
  connection.query('UPDATE `users` SET `address`=?,`city`=?,`country`=?,`mobile`=?,`payment`=? where `id`=?', [req.body.address,req.body.city,req.body.country, req.body.mobile,req.body.payment, req.params.id], function (error, results, fields) {
   console.log("update query executed");
    if (error) throw error;
   res.end(JSON.stringify(results));
    
 });
});



//rest api to update record into mysql database
app.put('/product/:id', function (req, res) {
  console.log(req.params.id);
  console.log("putid");
  connection.query('UPDATE `product` SET `name`=?,`made`=?,`dept`=?,`price`=?  where `id`=?', [req.body.name,req.body.made, req.body.dept, req.body.price, req.params.id], function (error, results, fields) {
   console.log("update query executed");
    if (error) throw error;
   res.end(JSON.stringify(results));
    
 });
});






//rest api to create a new record into mysql database
app.post('/users', function (req, res) {
  var postData  = req.body;
  //console.log(postData);
  var sql = "INSERT INTO `users`(`address`,`city`, `country`, `mobile`, `payment`) VALUES('"+req.body.address+"','"+req.body.city+"','"+req.body.country+"','"+req.body.mobile+"','"+req.body.payment+"')";
  connection.query(sql, function (error, results, fields) {
     if (error) throw error;
   res.end(JSON.stringify(results));
 });
});





//rest api to create a new record into mysql database
app.post('/product', function (req, res) {
  var postData  = req.body;
  //console.log(postData);
  var sql = "INSERT INTO `product`(`name`,`made`, `dept`, `price`) VALUES ('"+req.body.name+"','"+req.body.made+"','"+req.body.dept+"','"+req.body.price+"')";
  connection.query(sql, function (error, results, fields) {
     if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
