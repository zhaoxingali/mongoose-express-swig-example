var express = require('express');
var swig = require('swig');//加载模块expres,swig
var control = require('./control/control.js');//加载控制器模块
var app = express();//加载express模块

app.engine('html', swig.renderFile);//设置swig模板引擎

app.set('view engine', 'html');//
app.set('views', __dirname + '/views'); //设置模版引用目录

app.set('port', process.env.PORT || 3000); // 设置端口号

//加载表单中间件
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));//设置extended 为true (防止_id出现undefined错误
app.use(bodyParser.json());//设置数据表单数据

//设置路由

//主页面显示
app.get('/',control.find);//设置路由，调用控制器find模块

//审核页面
app.post('/shenhe',control.pass);//设置路由，调用控制器的pass模块

app.get('/success',control.success);//设置路由，调用success模块

//定制404和500页面

//404 未找到页面(use 定义中间件)
app.use(function(req,res,next){
	res.status(404);//请求状态码
	res.render('404');
});
//500 服务器错误页面（中间键）
app.use(function(err,req,res,next){
	res.status(500);//请求状态码
    res.render('500');
});

//监听
app.listen(app.get('port'),function(){
	console.log('start');//监听接口
});
