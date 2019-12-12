(function(){
	var products = [
		{
			name:"莲子",
			pic:"https://img.alicdn.com/imgextra/i2/725677994/O1CN011B7m3z28vIj5YCkwN_!!0-item_pic.jpg_430x430q90.jpg",
			price:19.90,
			id:38290
		},
		{
			name:"清口含片",
			pic:"https://img.alicdn.com/imgextra/i2/725677994/O1CN01RkP2KZ28vIiZlyrtb_!!725677994.jpg_430x430q90.jpg",
			price:9.90,
			id:91302
		},
		{
			name:"卤味",
			pic:"https://img.alicdn.com/imgextra/i3/3596655476/O1CN01Syt5BZ1qK3QkiYi9A_!!3596655476-0-scmitem6000.jpg_430x430q90.jpg",
			price:24.80,
			id:29208
		},
		{
			name:"红枣片",
			pic:"https://img.alicdn.com/imgextra/i2/1769010046/O1CN01BwVTmk1CD6iNS7fK5_!!1769010046.jpg_430x430q90.jpg",
			price:39.90,
			id:36567
		}
	]
	
	
	class ShoppingCart{
		constructor(containerId,products){
			this.containerDivf = document.getElementById(containerId);
			this.shopList = document.createElement("table");
			this.cartList = document.createElement("table");
			this.products =products;
			this.containerDivf.appendChild(this.shopList);
			this.containerDivf.appendChild(this.cartList);
		}
		setStorage(json){
			localStorage.setItem('cart',JSON.stringify(json));
		}
		getStorage(){
			return JSON.parse(localStorage.getItem('cart'))||[];
		}
		init(){
			this.initShopList();
			if(this.getStorage().length>0){
				this.renderCartList()
			}
		}
		initShopList(){
			var str = `<thead>
						<tr>
							<th>商品ID</th>
							<th>商品名称</th>
							<th>商品图片</th>
							<th>商品价格</th>
							<th>操作</th>
						</tr>
					   </thead>`;
			str+="<tbody>";
			this.products.forEach((value)=>{
				str+=`<tr>
					<td>${value.id}</td>
					<td>${value.name}</td>
					<td><img src="${value.pic}"></td>
					<td>${value.price}</td>
					<td>
						<a href="javascript:;" class="addCart">加入购物车</a>
					</td>
				</tr>`
			})
			str+="</tbody>";
			this.shopList.innerHTML = str;
			this.addCartListEvent();
		}
		addCartListEvent(){
			var that = this;
			var addCartBtnArr = this.containerDivf.querySelectorAll('.addCart');
			addCartBtnArr.forEach((addCartBtn)=>{
				addCartBtn.onclick = function(){
					var tr = this.parentNode.parentNode;
					var currentPraduct = {
						name:tr.children[1].innerHTML,
						price:tr.children[3].innerHTML,
						pic:tr.children[2].children[0].src,
						id:tr.children[0].innerHTML,
					}
					that.addToCartProducts(currentPraduct);
					that.renderCartList();
				}
			})
		}
		addToCartProducts(currentPraduct){
			this.carProducts = this.getStorage();
			for(var i=0;i<this.carProducts.length;i++){
				if(this.carProducts[i].id==currentPraduct.id){
					this.carProducts[i].num++;
					this.setStorage(this.carProducts);
					return;
				}
			}
			currentPraduct.num = 1;
			this.carProducts.push(currentPraduct);
			this.setStorage(this.carProducts)
		}
		renderCartList(){
			var str = `<thead>
				<tr>
					<th>商品ID</th>
					<th>商品名称</th>
					<th>商品图片</th>
					<th>商品价格</th>
					<th>商品数量</th>
					<th>操作</th>
				</tr>
			</thead>`;
			str+="<tbody>";
			this.getStorage().forEach((product)=>{
				str+=`<tr>
					<td>${product.id}</td>
					<td>${product.name}</td>
					<td>
						<img src="${product.pic}">
					</td>
					<td>${product.price}</td>
					<td class="change">
						<span class="jian">-</span>
						${product.num}
						<span class="jia">+</span>
					</td>
					<td>
						<a href="javascript:;" class="del">删除</a>
					</td>
				</tr>`
			});
			
			str+="</tbody>";
			this.cartList.innerHTML = str;
			this.deleteProductEvent();
			this.changeNumEvent();
			
		}
		changeNumEvent(){
			var that = this;
			var changeNumTdArr = this.containerDivf.querySelectorAll('.change');
			changeNumTdArr.forEach((changeNumTd)=>{
				changeNumTd.onclick = function(e){
					var target = e.target;
					var id = this.parentNode.children[0].innerHTML;
					if(e.target.className=='jian'){
						that.jianNum(id);
					}
					if(e.target.className=='jia'){
						that.jiaNum(id);
						that.renderCartList();
					}
				}
			})
		}
		jianNum(id){
			var arr = this.getStorage();
			for(var i=0;i<arr.length;i++){
				if(arr[i].id==id){
					arr[i].num--;
					this.setStorage(arr);
					this.renderCartList();
					if(arr[i].num<=0){
						this.deleteFromCartProducts(id);
						return;
					}
					return;
				}
			}
		}
		jiaNum(id){
			var arr = this.getStorage();
			for(var i=0;i<arr.length;i++){
				if(arr[i].id==id){
					arr[i].num++;
					this.setStorage(arr);
					return;
				}
			}
		}
		deleteProductEvent(){
			var that =this;
			var delBtnArr = this.containerDivf.querySelectorAll('.del');
			delBtnArr.forEach((delBtn)=>{
				delBtn.onclick = function(){
					var id = this.parentNode.parentNode.children[0].innerHTML;
					that.deleteFromCartProducts(id);
				}
			})
		}
		deleteFromCartProducts(id){
			this.carProducts = this.getStorage();
			this.carProducts = this.carProducts.filter((products)=>{
				if(products.id==id){
					return false;
				}else{
					return true;
				}
			});
			this.setStorage(this.carProducts);
			this.renderCartList();
			if(this.getStorage().length<1){
				this.cartList.innerHTML =""
			}
		}
		
		
	}
	var car = new ShoppingCart("containerDivf",products);
	car.init()
})()