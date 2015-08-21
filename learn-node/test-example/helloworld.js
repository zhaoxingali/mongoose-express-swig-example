var http = require('http'),fs = require('fs');
//
function servestaticfile(res,path,contentType,reqCode){
	if(!reqCode) reqCode = 200;
	fs.readFile(__dirname+path,function(error,data){
		if (error) {
			res.writeHead(500,{'Content-type':'text/palin'});
			res.end('500 --internal error');
		}else{
			res.writeHead(reqCode,{'Content-type':contentType});
			res.end(data);
		}
	});
}

http.createServer(function(req,res){
	 var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
	 switch(path){
	 	case '':
	 		servestaticfile(res,'/public/index.html','text/html');
	 		break;
	 	case '/about':
	 		servestaticfile(res,'/public/about.html','text/html');
	 		break;
	 	case '/img/1.png':
	 		servestaticfile(res,'/public/img/1.png','image/jpeg');
	 		break;
	 	default:
	 		servestaticfile(res,'/public/notfind.html','text/html');
	 		break;
	 }	
}).listen(3000);