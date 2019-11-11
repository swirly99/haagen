//引入第三方模块 express
const express=require('express');
//引入body-parser中间件
const bodyParser=require('body-parser');
//引入路由器
const proRouter=require('./routes/pro.js');
var app=express();
app.listen(8080);
//使用body-parser中间件，将post请求的数据解析为对象
app.use( bodyParser.urlencoded({
  extended:false
}) );
//托管静态资源到pro目录  
app.use( express.static('./pro') );
//使用路由器，挂载到/pro下
app.use( '/pro',proRouter );


