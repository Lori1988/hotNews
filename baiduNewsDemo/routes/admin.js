var express = require('express');
var router = express.Router();
var con = require('../models/db');

/* GET */
router.get('/', function(req, res, next) {
	// console.log(con);
	console.log("后台管理界面");
	res.render('admin');

});

// 
router.post('/getNewsListByPage',function(req,res,next){
	console.log('你想获取第p页的数据吗',req.body);
});

//
router.post('/getNewsList', function(req, res, next) {

	// con.connect();
	var sql = "SELECT * FROM `newslist`";	
	con.query(sql,function(error,results,fields){
		if (error) throw error;
		console.log("查询数据");
		console.log(results);
		res.send({state:'0',message:results});
	})
	// con.end();
});
// 
router.post('/submitNews',function(req,res,next){

	// title:title,content:content,newslink:newslink,source:source,date:date,newsTag:newsTag
		var title = req.body.title;
		var content = req.body.content;
		var newslink = req.body.newslink;
		var source = req.body.source;
		var date = req.body.date;
		var newsTag = req.body.newsTag;
		// console.log(title,content,newslink,source,date,newsTag);
		//
		// con.connect();
		// INSERT INTO `newslist`(`nid`, `ntitle`, `ncontent`, `nimg`, `nfrom`, `ndate`, `ntag`, `uid`, `author`) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5],[value-6],[value-7],[value-8],[value-9])
		var sql = `INSERT INTO newslist (ntitle,ncontent,nimg,nfrom,ndate,ntag) VALUES ("${title}","${content}","${newslink}","${source}","${date}","${newsTag}")`;
		con.query(sql,function(error,results,f){
			if (error) throw error;
			res.send({state:'0',message:'恭喜你插入成功'});
		});
		// var sql = "INSERT INTO `user`( `name`, `age`, `fav`) VALUES (?,?,?)"
		// console.log(sql);
		// con.query("INSERT INTO user ( `name`, `age`, `fav`) VALUES (?,?,?)",[name,age,fav],function(err,results,f){
		// 		res.send({state:'ok',message:'恭喜你插入成功'})
		// })
		// con.end();


})

//
router.post('/deleteNews', function(req, res, next) {

	// DELETE FROM `newslist` WHERE 1
	console.log("正在删除", req.body.nid);
	// var sql = "DELETE FROM `newslist` WHERE nid='${req.body.nid}'";
	// con.query(sql,function(error,results,fields){
	// 	if (error) throw error;
	// 	res.send({state:'0',message:'恭喜你删除成功'});
	// })
	con.query("DELETE FROM newslist WHERE nid=?",[req.body.nid],function(error,results,f){
		if (error) throw error;
		res.send({state:'0',message:'恭喜你删除成功'});
	})
	
});

//
router.post('/updateNewsInfo', function(req, res, next) {

	console.log("正在更新数据");
	var title = req.body.title;
	var content = req.body.content;
	var newslink = req.body.newslink;
	var source = req.body.source;
	var date = req.body.date;
	var newsTag = req.body.newsTag;
	// console.log(title,content,newslink,source,date,newsTag);
	// UPDATE `newslist` SET `ntitle`=${},`ncontent`=${},`nimg`=${},`nfrom`=${},`ndate`=${},`ntag`=${} WHERE 1
	// var sql = "UPDATE `newslist` SET `ntitle`=${title},`ncontent`=${content},`nimg`=${newslink},`nfrom`=${source},`ndate`=${date},`ntag`=${newsTag} WHERE nid='${req.body.nid}'";
	// con.query(sql,function(error,results,fields){
	// 	if (error) throw error;
	// 	res.send({state:'0',message:'恭喜你更新成功'});
	// })
	con.query("UPDATE `newslist` SET `ntitle`=?,`ncontent`=?,`nimg`=?,`nfrom`=?,`ndate`=?,`ntag`=? WHERE nid=?",[title,content,newslink,source,date,newsTag,req.body.nid],function(error,results,f){
		if (error) throw error;
		// console.log(results,results.changedRows,results.affectedRows);
		if (results.changedRows && results.changedRows === 0) {
			res.send({state:'0',message:'更新err'});
		}else{
			res.send({state:'0',message:'恭喜你更新成功'});
		}
	})
});

//
router.post('/getNewsInfo', function(req, res, next) {

	console.log("正在获取评论详情");
	// SELECT `nid`, `ntitle`, `ncontent`, `nimg`, `nfrom`, `ndate`, `ntag`, `uid`, `author` FROM `newslist` WHERE 1
	// var sql = "SELECT `ntitle`, `ncontent`, `nimg`, `nfrom`, `ndate`, `ntag` FROM `newslist` WHERE `nid`='${req.body.nid}'";
	// con.query(sql,function(error,results,fields){
	// 	if (error) throw error;
	// 	console.log("获取评论详情");
	// 	console.log(results);
	// 	res.send({state:'0',message:results});
	// })
	// var nidInt = parseInt(req.body.nid);
	con.query("SELECT * FROM newslist WHERE nid=?",[req.body.nid],function(error,results,f){
		if (error) throw error;
		console.log("获取评论详情");
		console.log(results[0]);
		res.send({state:'0',message:results[0]});
	})
});




module.exports = router;




