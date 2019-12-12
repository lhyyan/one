window.onload = function(){
	//需求分析:
	//1 鼠标移入small盒子,mask盒子和big盒子显示
	//2 鼠标移出small盒子,mask盒子和big盒子隐藏
	//3 鼠标在small盒子中移动,mask跟着鼠标移动,并且鼠标位于mask中间
	//4 mask不能超出small
	//5 鼠标在small盒子中移动时,big中的图片会显示相应部分

	//技术点:
	//事件类型:mouseenter, mouseleave ,mousemove
	//显示和隐藏:display:none/block;
	//事件对象中鼠标相关
	//big中的图片会显示相应部分:top/margin-top,  left/margin-left


	var small = $id('small');//小盒子
	var mask = $id('mask');//遮罩层
	var big = $id('big');//大盒子
	var bigImg = $id('bigImg');//大盒子中的图片

	//1 鼠标移入small盒子,mask盒子和big盒子显示
	small.onmouseenter = function(){
		mask.style.display = "block";
		big.style.display = "block";
	}
	//2 鼠标移出small盒子,mask盒子和big盒子隐藏
	small.onmouseleave = function(){
		mask.style.display = "none";
		big.style.display = "none";
	}
	//3 鼠标在small盒子中移动,mask跟着鼠标移动,并且鼠标位于mask中间
	small.onmousemove = function(e){
		var event = window.event || e;
		//计算鼠标在small中的位置 
		var pageX = event.clientX + scroll().left;
		var pageY = event.clientY + scroll().top;
		var x = pageX - box.offsetLeft - mask.offsetWidth/2;
		//为了让鼠标在mask中间,x要减去mask盒子的一半宽度
		var y = pageY - box.offsetTop - mask.offsetHeight/2;
		//为了让鼠标在mask中间,y要减去mask盒子的一半高度

		//4 mask不能超出small
		var maxX = small.offsetWidth - mask.offsetWidth;
		var maxY = small.offsetHeight - mask.offsetHeight;
		if(x<0){
			x = 0;
		}
		if(y<0){
			y = 0;
		}
		if(x>maxX){
			x = maxX;
		}
		if(y>maxY){
			y = maxY;
		}
		//mask要定位
		mask.style.left = x+"px";
		mask.style.top = y + "px";
		//5 鼠标在small盒子中移动时,big中的图片会显示相应部分
		//x/small盒子的宽度 = 大图水平移动的距离/大图的宽度
		//y/small盒子的高度 = 大图垂直移动的距离/大图的高度

		bigImg.style.marginLeft = -x/small.offsetWidth*bigImg.offsetWidth + "px";
		bigImg.style.marginTop = -y/small.offsetHeight*bigImg.offsetHeight + "px";

	}
	
}
