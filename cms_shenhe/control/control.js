var User = require('../model/config.js');//加载数据模块
var mongoose = require('mongoose');//加载mongoose模块

//注册模块接口
exports.find = function(req,res){
	mongoose.connect("mongodb://localhost/CMS");//链接数据库
	User.find({"through":0},function(err,data){			//查找数据库中through为0的所有用户
		if(err) return console.error(err);			
		res.render('index',{user:data[0].userName,name:data[0].trueName}); //将数据显示到页面
	});
};
//处理请求接口模块
exports.pass = function(req,res){
	//update更新数据
	//注意update语法
	User.update({'userName':req.body.usename,'trueName':req.body.truename},{$set:{'through':1}},function(err){
		if(err){
			console.log(err);
			res.render('error',{error:err});//显示错误项
		}
		console.log('success');
		res.redirect(303, '/success');//重定向路由，
	})
};

//成功页
exports.success = function(req,res){
	res.render('success');
}