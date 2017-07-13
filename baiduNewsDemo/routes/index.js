var express = require('express');
var router = express.Router();
var con = require('../models/db');
/* */
router.get('/', function(req, res, next) {
	console.log("新闻首页");
  res.render('index', { });
});

//
router.post('/getTagNews', function(req, res, next) {
	console.log("正在获取tagnews");
	con.query("SELECT * FROM `newslist` WHERE ntag=?",[req.body.tagname],function(error,results,f){
		if (error) throw error;
		console.log("得到tagnews");
		console.log(results);
		res.send({state:'0',message:results});
	})
 //  var sql = "SELECT * FROM `newslist` WHERE ntag='${req.body.tagname}'";
	// con.query(sql,function(error,results,fields){
	// 	if (error) throw error;
	// 	console.log("得到tagnews");
	// 	console.log(results);
	// 	res.send({state:'0',message:results});
	// })
});

module.exports = router;
