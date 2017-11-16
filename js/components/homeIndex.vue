<template>

	<div id="home" class="modal-bg">
		<div class="deviceBaseInfo">
		    <div class="info-header"><span>设备基础信息<span><i v-bind:class="[show? dropUpClass:dropDownClass]" @click="show = !show"></i></div>
		    <transition name="slide">
                <ul v-if="show" class="info-content">
                    <li>
                        <span class="tle">SN码</span>
                        <span class="con">10398034355676793889XXXX</span>
                    </li>
                    <li>
                        <span class="tle">SN码</span>
                        <span class="con">10398034355676793889XXXX</span>
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
						<img src="http://192.168.1.98/vue-demo/img/coffe.png" class="goods-picture">
						<div class="goods-desc">
							<h3 class="goods-name">{{o.drinkName}}</h3>
							<div class="goods-price money">
								<span v-for="d in JSON.parse(o.cups)" v-show="d.name =='小'"><i class="price-flag">￥</i><span class="single-price">{{d.price}}<span></span>

							</div>
							<div class="goods-spec">
								<!-- <button v-for="(d,eq) in JSON.parse(o.cups)" type="button" class="spec-item" v-bind:class="[{active:activeButton[index][cupSpecActiveFlag]}]" @click="select(index,eq,d.name)">{{d.name | smallCupFilter}}</button> -->
								
								<button type="button" v-for="(d,eq) in JSON.parse(o.cups)" class="spec-item" v-bind:class="buttonState" @click="choseone(d.index)">{{d.name|cupFilter}}</button>
							</div>
						</div>
						<div class="clear"></div>

					</li>
				</ul>
            </div>
			<!--</mt-loadmore>-->
		</div>
		<div id="buy" v-bind:class="{active:isActive}">
			<div class="totalPrice"><i class="price-flag">￥</i>{{totalPriceNum | priceJudge}}</div>
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

                sn:"ff556yyuidde",
                drinkListData:"",
				goods:{},
				drinkList:{},
                drinkCups:[],
                cupSpecFlag:"",
                cupSpecActiveFlag:"",

				activeButton:[],
				preNum:0,

				totalPriceNum:0,

               deviceUId:"",
               drinkCode:"",
               drinkId:""

			}
		},
		computed:{
			buttonState:function(index){
				console.log(index)
				return {
					active:false
				}
			}
		},
		methods:{
			createUID:function(){
                this.$http.get("/drinkOrder-controller/api/drinkOrder/generateCode")
                    .then(function(response){
                     this.deviceUId = response.data.data;                    
                })
            },			
			getDataGood:function() {
               this.$http.get("/capital-controller/api/device/getDeviceDrinkList?sn="+this.sn
               ).then(function(response){
                   console.log(response.data);
                   this.goods = response.data.data;
                   this.setStorage("drinkListData",response.data.data);
                   this.goodsHandle(this.goods);
                   // console.log(this.goods)

                   /*var self = this;

                   this.drinkCups = [];
                   this.activeButton = [];
                   this.cupSpecIs =[];
                   this.cupSpecActiveFlag="";

                   this.goods.forEach(function(item){
                        self.drinkCups = JSON.parse(item.cups)
                        console.log(self.drinkCups)
                        self.activeButton.push({
                        	smallActive:false,
                        	bigActive:false
                        })
                        //饮品规格初始化定义class



                        self.cupSpecFlag ="";
                        self.drinkCups.forEach(function(cupItem){
                            if(cupItem.name == "小"){
                                self.cupSpecActiveFlag = "smallActive";
                                self.cupSpecFlag = 'small';
                            }
                            if(cupItem.name == "大"){
                                 self.cupSpecActiveFlag = "bigActive";
                                 self.cupSpecFlag = 'big';
                            }


                           // console.log(self.cupSpecActiveFlag, self.cupSpecIs)
                        })

                    })*/
             })
			},
			goodsHandle:function(){
				var self = this;

                this.drinkCups = [];
              
               this.goods.forEach(function(item){
                    self.drinkCups = JSON.parse(item.cups)
                    console.log(self.drinkCups)
                    self.activeButton.push({
                    	smallActive:false,
                    	bigActive:false
                    })
                })    
			},
			choseone:function(index){
				this.buttonState(index,index)
			},
			select:function(index,eq,type){
                //console.log(type)
                console.log(index,eq)
			    this.isActive = true;

				this.activeButton[this.preNum].smallActive = false;
				this.activeButton[this.preNum].bigActive = false;
				if(type == 'small'){
					this.activeButton[index].smallActive = true;
					this.activeButton[index].bigActive = false;
				}else{
					this.activeButton[index].smallActive = false;
					this.activeButton[index].bigActive = true;
				}
				this.preNum = index;
				this.url = "#/cart";
			},
            createOrder:function(isActive){
            	console.log("createOrder"+this.deviceUId)
                //if(isActive){
                 this.$http.post("/drinkOrder-controller/api/drinkOrder/order",{},{headers:{'Content-Type': 'application/x-www-form-urlencoded'}, params:{
					"sn":this.sn,
					"uid":this.deviceUId,
					"drinkId":"1ef27034f9394930b43b810a0ba2286d",
					"drinkCode":"leee"}}
				
				).then(function(response){

                    this.$router.push({name:'router1',params:{deviceUId:this.deviceUId,sn:this.sn}}) ;                  
                });	
                
               // }
            },
            setStorage:function(name,data){
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
                 
                if(this.getStorage("drinkListData")){
                    this.goods = JSON.parse(this.getStorage("drinkListData"));
                    this.goodsHandle();
                }else{
                    this.getDataGood();
                };
            
            },	
			refresh:function(){
				location.reload();
			}
			
		},
		filters:{
			//过滤器
			priceJudge:function(value){
                if(!value){
                    return parseFloat(0).toFixed(2);
                }
            },
            cupFilter:function(value){
                if(value == "小"){
                    return "小杯";
                };
                if(value == "大"){
                    return "大杯";
                };
                if(value =="中"){
                    return "中杯";
                }


            }
		},
		created:function(){
			//在实例创建之后同步调用Ajax

			//this.getDataGood();
			this.createUID();
            this.judgeStorage("drinkListData");
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
       - background-color:#000;
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
	    background: url(/vue-demo/img/drop_down.png) no-repeat center;
	    background-size: 100% 100%;
	}
	.deviceBaseInfo .drop-up{
    		position: absolute;
    	    top: 0.5rem;
    	    right: 1rem;
    	    width: 0.8rem;
    	    height: 0.8rem;
    	    background: url(/vue-demo/img/drop_up.png) no-repeat center;
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
	.goods-item .goods-desc .goods-price{
		display:flex;
		justify-content: space-between;
		-color: #D8232A;
    	-font-size: 0.75rem;
	}
	.goods-item .goods-desc .goods-price .price-flag{
		-font-size:0.5rem;
	}
	.goods-item .goods-desc .goods-spec{
		position: absolute;
	    top: 2rem;
	    right: 0;
	}
	.goods-item .goods-desc .goods-spec .spec-item{
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