const express=require('express');//引入第三方模块 express
const pool=require('../pool.js');//引入连接池模块
var router=express.Router();//创建路由器对象
//添加路由
//1.登录接口
router.get('/api/v1/login/:phone&:upwd',(req,res)=>{
  //1.获取参数
		var $phone=req.params.phone;
		var $upwd=req.params.upwd;
	//2.操作数据库
	var sql="select * from user where phone=? and upwd=?";
	pool.query(sql,[$phone,$upwd],function(err,result){
		console.log(result);
	 if(result.length>0){
	   res.send("1");//这是一个响应，优化时字符要短，因此不用登录成功
	 }else{
	   res.send("0")
	 };
	});
});
//4.注册用户
router.post('/api/v1/register',(req,res)=>{
  //1.获取数据
  var obj=req.body;
	//2.执行数据库
	var sql2="insert into user set ?";
	pool.query(sql2,[obj],function(err,result){
		if(err) throw err;
		if(result.affectedRows>0){
		  res.send('1');
		}else{
		  res.send('0');
		};
	});
})
//4.1用户名重复验证
router.get('/api/v1/checkphone/:phone',(req,res)=>{
	//1.获取数据
	var phone=req.params.phone;
	var sql="select * from user where phone=?"
	pool.query(sql,[$uname],function(err,result){
	  if(err) throw err;
		if(result.length>0){
		 res.send('0');
		}else{
		 res.send('1');
		 };
	})
});
//导出路由器对象
module.exports=router;

