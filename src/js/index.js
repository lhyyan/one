$(function(){
	$("div.rightMenu span").mouseenter(function(){
		var left = $(this).position().left;
		var top = $(this).position().top;
		var width = $(this).css("width");
		var destLeft = parseInt(left) + parseInt(width)/2;
		$("img#catear").css("left",destLeft);
		$("img#catear").css("top",top-20);
		$("img#catear").fadeIn(500);
	});
	$("div.rightMenu span").mouseleave(function(){
		$("img#catear").hide();
	});
});

function showProductsAsideCategorys(cid){
	$("div.eachCategory[cid="+cid+"]").css("background-color","white");
	$("div.eachCategory[cid="+cid+"] a").css("color","#87CEFA");
	$("div.productsAsideCategorys[cid="+cid+"]").show();
}

function hideProductsAsideCategorys(cid){
	$("div.eachCategory[cid="+cid+"]").css("background-color","#e2e2e3");
	$("div.eachCategory[cid="+cid+"] a").css("color","#000");
	$("div.productsAsideCategorys[cid="+cid+"]").hide();
}

$(function(){
    $("div.eachCategory").mouseenter(function(){
        var cid = $(this).attr("cid");
        showProductsAsideCategorys(cid);
    });
    $("div.eachCategory").mouseleave(function(){
        var cid = $(this).attr("cid");
        hideProductsAsideCategorys(cid);
    });
    $("div.productsAsideCategorys").mouseenter(function(){
    	var cid = $(this).attr("cid");
    	showProductsAsideCategorys(cid);
    });
    $("div.productsAsideCategorys").mouseleave(function(){
    	var cid = $(this).attr("cid");
    	hideProductsAsideCategorys(cid);
    });
});




// 产品列表
$(function(){
    $("input.sortBarPrice").keyup(function(){
        var num= $(this).val();
        if(num.length==0){
            $("div.productUnit").show();
            return;
        }
             
        num = parseInt(num);
        if(isNaN(num))
            num= 1;
        if(num<=0)
            num = 1;
        $(this).val(num);       
         
        var begin = $("input.beginPrice").val();
        var end = $("input.endPrice").val();
        if(!isNaN(begin) && !isNaN(end)){
            $("div.productUnit").hide();
            $("div.productUnit").each(function(){
                var price = $(this).attr("price");
                price = new Number(price);
                if(price<=end && price>=begin)
                    $(this).show();
            });
        }
         
    });
});



//滚动到固定导航栏
$(function(){
		$(window).scroll(function(){
			if($(window).scrollTop()>150){
				$('.daoHang').css({"marginTop":"0","z-index":"999","position":"fixed","top":"0"});
			}else{
				$('.daoHang').css({"marginTop":"-70px"});
			}
			
		})
});




//关键词联想
var input = document.getElementsByClassName('keyword')[0];
var ul = document.getElementsByClassName('list')[0];

var flag = true
input.addEventListener('compositionstart',function(){
    flag = false;
})

input.addEventListener('compositionend',function(){
    flag = true;
})

input.oninput = function(){
    setTimeout(function(){
        if(flag){
            var keyword = input.value;
            ajax({
                dataType:'jsonp',
                url:'https://suggest.taobao.com/sug',
                data:{
                    code:"utf-8",
                    q:keyword,
                    _ksTS:"1563970517892_385",
                    k:1,
                    area:"c2c",
                    bucketid:10

                },
                success:function(data){
                    var result = data.result;//是一个数组
                    var str = "";
                    result.forEach(function(value){
                        str+="<li>"+value[0]+"</li>"
                    })
                    ul.innerHTML = str;
                }
            })

        }
    },0)
}



















