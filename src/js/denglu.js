var login_btn = document.getElementById("loginff");
		//登陆按钮实现
		login_btn.addEventListener("click",function(){
			var user_name = document.getElementById("user_name").value;
			var user_password = document.getElementById("user_password").value;
			var user_nameArr = new Array(localStorage.length);
			//将储存的记录存入数组中
			for(i=0;i<localStorage.length;i++){
				user_nameArr[i] = localStorage.key(i);
			}
			if(user_nameArr.includes(user_name)){
				var store_password = localStorage.getItem(user_name);
				 if(user_password == store_password){
					document.getElementById("login_sucss").innerHTML = "登录成功!点击这里回到首页";
					 
				 } else{
					 document.getElementById("login_sucss").innerHTML = "密码错误！";
				 }
			}
			else{
				document.getElementById("login_sucss").innerHTML = "用户名不存在!";
			}
		})
		//注册按钮实现		
var register_btn = document.getElementById("register_btn");
		//点击注册触发事件
		register_btn.addEventListener("click",function(){
			var user_name = document.getElementById("user_name").value;
			var user_password = document.getElementById("user_password").value;
			if(user_name.length == 0||user_password.length ==0){
				alert("请输入需要注册的用户名或密码！");
			}
			//注册成功存入localStorage,并且弹回登录界面
			else{
				localStorage.setItem(user_name,user_password);
				alert("注册成功!");
				//注册完成实现延时跳转登录 
				
			}
		})