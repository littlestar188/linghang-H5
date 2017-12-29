<template>

	<div id="home" class="modal-bg">
		<div class="deviceBaseInfo">
		    <div class="info-header"><span>设备基础信息<span><i v-bind:class="[show? dropUpClass:dropDownClass]" @click="show = !show"></i></div>
		    <transition name="slide">
                <ul v-if="show" class="info-content">
                    <li>
                        <span class="tle">SN码</span>
                        <span class="con">{{sn}}</span>
                    </li>
                    <li>
                        <span class="tle">是否在线</span>
                        <span class="con">{{online|onlineFilter}}</span>
                    </li>
                    <li>
                        <span class="tle">当天出杯数量</span>
                        <span class="con">{{dailyCupsNumber}}</span>
                    </li>
                    <li>
                        <span class="tle">历史出杯数量</span>
                        <span class="con">{{historyCupsNumber}}</span>
                    </li>
                </ul>
			</transition>
			<div class="clear"></div>
		</div>
		<div class="content">
			
			<!--<mt-loadmore :bottom-method="loadMore" :top-method="refresh" topPullText="" topDropText="↓" bottomPullText="" bottomDropText="↑" bottomLoadingText="加载中..." topLoadingText="加载中..." class="goodsCon">-->
			<div class="goodsCon">
				<div class="tip">请选择您的饮料</div>
				<ul>
					<li v-for="(o,index) in goods" class="goods-item">
						<!--<img v-bind:src="o.goodsListImg" class="goods-picture"/>-->
						<img src="/drinkOrder/img/coffe.png" class="goods-picture">
						<div class="goods-desc">
							<h3 class="goods-name">{{o.drinkName}}</h3>
							
							<div  class="goods-spec">
								<div v-for="(d,eq) in JSON.parse(o.cups)">
								<button type="button" class="spec-item"  v-bind:style="{right:eq*right+'rem',top:0}" v-bind:class="[(index == linum && eq == buttonnum) ? 'active' : '']" @click="choseone(d,o,index,eq)" >{{d.name}}</button>
								<span class="money" v-show="(eq==JSON.parse(o.cups).length-1 && index !== linum)"><i class="price-flag">￥</i><span class="single-price">{{d.price}}</span></span>
								<span class="money" v-show="(index == linum && eq == buttonnum)"><i class="price-flag">￥</i><span class="single-price">{{d.price}}</span></span>
								</div>
							</div>
						</div>
						<div class="clear"></div>

					</li>
				</ul>
            </div>
			<!--</mt-loadmore>-->
		</div>
		<div id="buy" v-bind:class="{active:isActive}">
			<div class="totalPrice"><i class="price-flag">￥</i>{{totalPriceNum}}</div><!--  | priceJudge -->
			<!--<router-link v-bind:to="{name:'router1',params:{deviceUId:uId}}">

			</router-link>-->
			<a class="cart"  @click="createOrder(isActive)">确认购买</a><!-- v-bind:href="url"-->
		</div>
	</div>

</template>
<script type="text/javascript">
	module.exports = {
		data:function(){

			return {
				show:false,
				isActive:false,
				url:"javascript:void(0)",
				dropDownClass:"drop-down",
                dropUpClass:"drop-up",
                right:3,
                top:0,

                sn:"",
                online:"",
                asked_false:false,
                asked_true:false,
                asked_error:false,
                asked_error_false:false,
                asked_used:false,
                asked_used_false:false,
                dailyCupsNumber:"",
                historyCupsNumber:"",
                drinkListData:"",
				goods:{},
				drinkList:{},
                drinkCups:[],
                cupSpecFlag:"",
                cupSpecActiveFlag:"",
                listinit:0,
                linum:-1,
                buttonnum:-1,
				activeButton:[],
				preNum:0,

				totalPriceNum:parseFloat(0).toFixed(2),

               deviceUId:"",
               drinkCode:"",
               drinkId:""

			}
		},
		/*computed:{
			buttonState:function(index){
				console.log(index)
				return {
					active:false
				}
			}
		},*/
		methods:{			
			getSN:function(){
			   var href = location.href.split("?");
			   var condition = href.slice(1,href.length);
			   //console.log(condition,href)		  
			   if(condition.length==0){
			   	  alert("SN码不存在！");
			   	  return;
			   }else{
			   		
			   	 	this.sn = condition[0].split("=")[1];
			   		console.log(href,condition,this.sn);

				    this.getCupNumer();
				   
					//localStorage.removeItem("drinkListData");
					/*var orignalSetItem = localStorage.setItem;
				    localStorage.setItem = function(key,newValue){
				        var setItemEvent = new Event("setItemEvent");
				        setItemEvent.newValue = newValue;
				        window.dispatchEvent(setItemEvent);
				        orignalSetItem.apply(this,arguments);
				    }*/
				  this.judgeStorage("generateCode");
		         // this.judgeStorage("drinkListData");

			   };
			   
			},
			onlineJudge:function(){
				var that = this;
				this.$http.get("/capital-controller/external/device/getDeviceOnlineStatus?sn="+this.sn+"&generateCode="+this.deviceUId)
                    .then(function(response){
	                    console.log(response.data.data)
	                    that.online = response.data.data.online;
	                    that.lock =  response.data.data.lock;
	                    that.error = response.data.data.error;
	                    if(that.online == false){
	                    	alert("该设备处于离线状态，不可操作！");
	                    	that.asked_false=true;
	                     	that.isActive = false;
	                     	return;	
	                    }else{
	                    	if(that.error == true){
	                    		alert("该设备处于故障状态，不可操作！");
		                    	that.asked_error=true;
		                    	that.asked_error_false=false;
		                     	that.isActive = false;
		                     	return;	
	                    	}else{
	                    		if(that.lock == true){
	                    			alert("该设备处于占用状态，不可操作！");
			                    	that.asked_used=false;
			                    	that.asked_used_false = true;
			                     	that.isActive = false;
			                     	return;	
	                    		}else{
	                    			that.asked_true = true;
	                    		}
	                    	}
	                    };
                                        
                });
			},
			onlineJudge_ask:function(){
				var that = this;
				this.$http.get("/capital-controller/external/device/getDeviceOnlineStatus?sn="+this.sn+"&generateCode="+this.deviceUId)
                    .then(function(response){
	                    console.log(response.data.data)
	                    that.online = response.data.data.online;
	                    that.lock =  response.data.data.lock;
	                    that.error = response.data.data.error; 
	                    
	                    if(that.online == true){

	                    	if(that.error == true && that.asked_error == true){
	                    		return;
	                    	}
	                    	if(that.lock == true && that.asked_used_false == true){
	                    		return;
	                    	}
	                    	if(that.error == true && that.asked_error == false){
	                    		alert('设备故障，不可操作！');
	                    		
	                    		that.asked_error = true;
	                    		that.isActive = false;
	                    		that.asked_false = true;
	                    		that.asked_error_false = false;
	                    		that.asked_true = false;
	                    		return;
	                    	}

	                    	if(that.error == false && that.asked_error_false == false && that.asked_error == true){
	                    		alert('设备正常，可操作！');
	                    		that.asked_error = false;
	                    		that.isActive = false;
	                    		that.asked_false = false;
	                    		that.asked_error = false;
	                    		that.asked_error_false = true;
	                    		that.asked_true = true;
	                    		that.asked_false = false;
	                    		return;
	                    	}
	                    	
	                    	if(that.lock == true && that.asked_used_false == false && that.asked_used == false){
	                    		alert('设备被占用，不可操作！');
	                    		that.asked_used = false;
	                    		that.isActive = false;
	                    		that.asked_used_false = true;
	                    		that.asked_true = false;
	                    		return;
	                    	}

	                    	if(that.lock == false && that.asked_used == false && that.asked_true == false){
	                    		alert('设备正常，可操作！');
	                    		that.asked_used = true;
	                    		that.isActive = true;
	                    		that.asked_used_false = false;
	                    		that.asked_true = true;
	                    		return;
	                    	}
	                    	
	                    	if(that.asked_true == false){
	                    		alert('设备已上线，可操作！');
	                    		that.asked_true = true;
	                    		that.asked_false = false;
	                    		that.asked_error = false;
	                    		that.asked_used = false;
	                    		//that.isActive = true;
	                    		return;
	                    	}
	                    }else{
	                    	if(that.asked_false == false){
	                    		alert('设备已离线，不可操作！');
	                    		that.asked_false = true;
	                    		that.isActive = false;
	                    		that.asked_true = false;
	                    		that.asked_error = false;                    		
	                    		return;
	                    	}
	                    }
	                                       	
	                                    
                });
			},
			createUID:function(){	
				var that = this;		
                this.$http.get("/drinkOrder-controller/external/drinkOrder/generateCode")
                    .then(function(response){
                     that.deviceUId = response.data.data;
                     that.setStorage("generateCode",response.data.data);
                     that.judgeStorage("generateCode");                     
                });
            },
            getCupNumer:function(){
            	var that = this;
            	this.$http.get("/drinkOrder-controller/external/drinkOrder/getDrinksOrdersNumberBySN?deviceSN="+this.sn
                ).then(function(response){
                   //console.log(response.data);
                   if(response.data.success == true){
                   		that.dailyCupsNumber = response.data.data.daily;
                   		that.historyCupsNumber =  response.data.data.total;
                   		//console.log(this.dailyCupsNumber,this.historyCupsNumber)                   		
                   }else{
                   		alert(response.data.msg);
                   		return;
                   };
                   
             	})
            },			
			getDataGood:function() {
			   var that = this;				   
               this.$http.get("/capital-controller/external/device/getDeviceDrinkList?sn="+this.sn
               ).then(function(response){
                   console.log(response.data);
                   if(response.data.success == true){
                   		that.goods = response.data.data.drinks;
                   		that.online =  response.data.data.online;
                   		//this.setStorage("drinkListData",response.data.data.drinks);
                  	 	that.goodsHandle(that.goods);
                   		console.log(that.goods);
                   }else{
                   		alert(response.data.msg);
                   		return;
                   }
                   
             	})
			},
			goodsHandle:function(){
				var self = this;

                this.drinkCups = [];
              	console.log(this.goods)
              	if(this.goods){
              		this.goods.forEach(function(item){
	                    self.drinkCups = JSON.parse(item.cups)
	                    //console.log(self.drinkCups)
	                    self.activeButton.push({
	                    	smallActive:false,
	                    	bigActive:false
	                    })
	                })  
              	}else{
              		alert("该设备不存在商品！");
              		return;
              	}
                  
			},
			choseone:function(obj,drinkObj,index,eq){
				if(this.online && !this.error && !this.lock){
					this.listinit=1;
					//console.log(obj,drinkObj)
					this.linum=index;
					this.buttonnum=eq;
					
					this.totalPriceNum = parseFloat(obj.price).toFixed(2);
					this.drinkCode = obj.code;
					this.drinkId = drinkObj.id;
					this.isActive = true;	
				}			
			},			
            createOrder:function(isActive){
            	console.log("createOrder"+this.deviceUId,this.deviceUId)
            	var that = this;
                if(this.online&&isActive){
	                this.$http.post("/drinkOrder-controller/external/drinkOrder/order",{},{headers:{'Content-Type': 'application/x-www-form-urlencoded'}, params:{
						"sn":that.sn,
						"uid":that.deviceUId,
						"drinkId":that.drinkId,
						"drinkCode":that.drinkCode}}
					
					).then(function(response){
						console.log(response.data.data)
						var orderOne = response.data.data;
	                    that.$router.push({
	                    	name:'router1',
	                    	params:{
		                    	deviceUId:orderOne.uId,
		                    	sn:orderOne.deviceSN,
		                    	drinkId:orderOne.drinkId,
		                    	drinkCode:orderOne.drinkCode,
		                    	drinkName:orderOne.drinkName,
		                    	payOrderNo:orderOne.payOrderNo,
		                    	orderTime:orderOne.orderTime,
		                    	drinkCup:JSON.parse(orderOne.drinkInfo).name,
		                    	drinkPrice:orderOne.drinkPrice
	                    	},
	                    	query:{
	                    		sn:that.sn
	                    	}
	                    }) ;                  
	                });	
                
             	}
            },
            allow:function(){
            	alert("该设备处于在线状态，可操作！");
            	this.asked_true = true;
            	this.asked_false = false;
            	this.listinit=0;
            	this.linum=-1;
    			this.buttonnum=-1;
            },
            /*forbid:function(){
            	alert("该设备处于离线状态，不可操作！");
            	this.asked_false = true;
            	this.asked_true = false;
            	this.isActive = false;
            },*/
            setStorage:function(name,data,event){
                var value = typeof(data) == "object" ? JSON.stringify(data):data;
            	console.log('set localStorage----')
            	if(window.localStorage){
            		localStorage.setItem(name,value);
            	}else{
            		alert('浏览器不支持localStorage');
            		return
            	}
            },
            getStorage:function(name){
                if(! window.localStorage){
                    alert('浏览器不支持localStorage');
                    return;
                }
                if(localStorage.length>0 && localStorage.getItem(name) ){
                    var value = localStorage.getItem(name);
                    //console.log(value)
                    return value;
                }
            },
            judgeStorage:function(name){

            	//console.log(this.getStorage("drinkListData"))
            	console.log("code-----"+this.getStorage("generateCode"));

               // var data =  this.getStorage("drinkListData");
                var code =  this.getStorage("generateCode");

              /*if(data && data!== undefined && data !=null){
                	  if (window.addEventListener) {  
					  window.addEventListener("storage",function(e){
					  	console.log(e.key)
					  }, false);  
					} else {  
					  window.attachEvent("onstorage",function(e){
					  	console.log(e.key)
					  });  
					};
                    this.goods = JSON.parse(data);
                    this.goodsHandle();
                    return;
                }else{
                    this.getDataGood();
                    return;               
                };*/

                if(code && code != undefined && code !=null){
                	
                	this.deviceUId = code;               	
		            this.onlineJudge();
		            this.getDataGood();
            	 	//轮询 判断设备状态
			    	//setInterval(this.onlineJudge_ask,5000);
			    	return;	
		                         	
                }else{
                	this.createUID();
                	return;                
                };
            
            },	
			refresh:function(){
				location.reload();
			}
			
		},
		filters:{
			//过滤器 
            onlineFilter:function(value){

            	switch(value){
            		case true:
            			return "在线";
            			break;
            		case false:
            			return "离线";
            			break;
            	};
            }
		},
		created:function(){
			//在实例创建之后同步调用Ajax

			//this.getDataGood();
			this.getSN();
			
		}
	}
	
	
</script>

<style>
    .modal-bg{
        position:absolute;
        top:0;
        z-index:99;
        height:100%;
        width:100%;
        -background-color:#000;
        -opacity:0.8;
    }
	.deviceBaseInfo {
		position:fixed;
		z-index:9999;
		top:0;
		width: 100%;
	    -height:7rem;
	    padding:0 1rem;
	    font-weight: lighter;
	    text-align: left;
	    background: rgb(71,71,71);   
	    color: #fff;
	    box-sizing: border-box;
	}
	.deviceBaseInfo .info-header{
	    height: 1.95rem;
        line-height: 1.95rem;
	}
	.deviceBaseInfo .info-content{
        overflow:hidden;
	   - height:6rem;
	    font-size:0.6rem;
	    padding-bottom:0.5rem;
	}
	.deviceBaseInfo .info-content li{
	    width: 100%;
	    overflow: hidden;
        margin-right: 1rem;
        padding:0.3rem 0;
     }

	.deviceBaseInfo .info-content .tle{
	    float:left;
	}
	.deviceBaseInfo .info-content .con{
        float:right;
	}
	.deviceBaseInfo .drop-down{
		position: absolute;
	    top: 0.5rem;
	    right: 1rem;
	    width: 0.8rem;
	    height: 0.8rem;
	    background: url(/drinkOrder/img/drop_down.png) no-repeat center;
	    background-size: 100% 100%;
	}
	.deviceBaseInfo .drop-up{
    		position: absolute;
    	    top: 0.5rem;
    	    right: 1rem;
    	    width: 0.8rem;
    	    height: 0.8rem;
    	    background: url(/drinkOrder/img/drop_up.png) no-repeat center;
    	    background-size: 100% 100%;
    	}
	.content{
		padding-top: 2.5rem;
    	-background-color: #eee;
	}
	.tip{
		height: 1.5rem;
    	line-height: 1.5rem;
    	padding:0.2rem 0;
    	color:#444;
		text-align:center;
		background-color: #fff;
		border-top: 1px solid #eee; 
		border-bottom: 1px solid #eee;
	}
	.goodsCon {
		text-align:center;
		padding-bottom:2.5rem;
		background-color: #fff;
	}
	.goods-item {		
		border-bottom: 1px solid #eee;
	    padding: 0 0.75rem;
	    display: flex;
	}
	.goods-item .goods-picture {
		float: left;
	    width: 2.8rem;
	    height: 2.8rem;
	    margin: 0.55rem 0.75rem 0.55rem 0;
	    flex: 1;
	}
	.goods-item .goods-desc{
		float: left;
	    height: 100%;
	    padding-top: 0.2rem;
	    flex: 4;
	    position: relative;
	}
	
	.goods-item .goods-desc .goods-name {
		font-size: 0.685rem;   
    	font-weight: normal;
		-line-height:1.1rem;
		text-align: left;
		padding:0.55rem 0;
        width: 10.8rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
		
	}
	.goods-item .goods-spec>div{
		height:100%;
	}
	.goods-item .goods-spec .money{
		position:absolute;
		left:0;
		top:0.3rem;
	}
	/* .goods-item .goods-spec .single-price{
		display:flex;
		justify-content: space-between;
	} */
	/* .goods-item .goods-spec .price-flag{
		font-size:0.5rem;
	} */
	.goods-item .goods-desc .goods-spec{
		position: absolute;
	    top: 2rem;
	    right: 0;
	    width:100%;
	    height:100%;
	}
	
	.goods-item .goods-desc .goods-spec .spec-item{
		position: absolute;
    	right: 0;
		font-size: 0.55rem;
	    background-color: #fff;
	    border: 1px solid #ddd;
	    border-radius: 2px;
	    display: inline-block;
	    padding: 0.25rem 0.65rem;
	    margin:0 0.1rem;
	   
	}
	.goods-item .goods-desc .goods-spec .spec-item:active{
		-background-color:#eee;
		-color:#fff;
	}
	/*.goods-item .goods-desc .goods-spec .spec-item:hover,*/
	.goods-item .goods-desc .goods-spec .spec-item.active{
		background-color:#D8232A;
		color:#fff;
	}
	#buy .totalPrice{
        justify-content: space-between;
        color: /* #D8232A */#000;
        font-size: 0.85rem;
        width: 18%;
        float: left;
        height: 2.2rem;
        line-height: 2.2rem;
        margin-left: 0.3rem;
    }
    #buy.active .totalPrice{
        color:#D8232A;
    }
    #buy a.cart{
    	float: right;
        width: 4.25rem;
        height: 2.2rem;
        line-height: 2.2rem;
        padding: 0 0.2rem;
        text-align: center;
        text-decoration: none;
        color: #fff;
        background-color: #ccc;
    }
    #buy.active a.cart{
        background-color:#D8232A
    }

</style>