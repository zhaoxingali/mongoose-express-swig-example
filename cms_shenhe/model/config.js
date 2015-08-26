var mongoose = require('mongoose');   //加载mongoose模块


//创建数据模式
var userSchema = mongoose.Schema({
 	trueName: String,
 	userName: String,
 	password: String,
 	email: String,
 	group: [
 		String
 	],
 	phone: String,
 	control: {
 		sign: String,
 		userClass: String,
 	},
 	through: Number,
});
//声明User模型
var User = mongoose.model('user',userSchema); //绑定数据集合user
module.exports = User;//注册模块