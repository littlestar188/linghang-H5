<template>
	<div id="result">
	<header class="result-title"><h3>等待出杯</h3></header>
		<div class="content">
			<div>
				<!-- <img src="/drinkOrder/img/success.png" class="success-img"> -->
			</div>
			<p class="success"></p>
			<p class="success-tip">{{stateContent}}</p>
		</div>		
		<div id="version">
			<p>领航制造&nbsp;品质保障</p>
			<p>Copyright&nbsp;&nbsp;2001-2017&nbsp;linghang</p>
		</div>	
	</div>
	
</template>
<script>
	module.exports = {
		data:function(){
			return {				
				sn:"",
				url:"",
				openId:"",
				drinkOrderNo:"",
				stateContent:""

			}
		},
		methods:{			
			ready:function(){
				// this.sn = this.$route.params.sn;
				// this.url = "#/?sn="+this.sn;
				var href = location.href.split("?");      
		        var condition = href.slice(1,href.length);
		        this.drinkOrderNo= condition[0].split("&")[2].split("=")[1];	
				console.log(href,condition,this.drinkOrderNo)
				this.order_ask();
				//setInterval(this.order_ask,5000);
			},
			order_ask:function(){
				var that = this;
				this.$http.get("/drinkOrder-controller/external/drinkOrder/getDrinkOrderResult?orderNo="+this.drinkOrderNo)
                    .then(function(response){
	                    console.log(response.data.data);
	                    that.stateContent = this.stateFilter(response.data.data);
	                    
                                        
                });
			},
			stateFilter:function(value){
				var filterValue = "";
				    if(value != "" || value != undefined){
				        switch(value){
				            case 1:
				                filterValue ="订单已创建";
				                break;
				            case  2:
				                filterValue = "订单已支付";
				                break;
				            case 3:
				                filterValue ="正在出杯中...";
				                break;
				            case  4:
				                filterValue = "订单已完成";
				                this.$router.push({
				                      name:'router2',
				                      query:{
				                        sn:this.sn,
				                        openId:decodeURIComponent(this.encodeOenId),
				                        drinkOrderNo:this.drinkOrderNo
				                      }/*,
				                      params:{
				                          sn:this.sn,
				                          status:unifyStatus,
				                          handleOpenId:this.openId
				                      }*/
				                  });
				                break;
				            case 9:
				                filterValue ="订单已取消";
				                break;
				            case  99:
				                filterValue = "出杯错误";
				                break;

				        };
				    };
				    return filterValue;
			},
			refresh:function(){
				
			}			
		},
		reload:function(){
			//this.getOpenId = decodeURIComponent(this.$route.params.handleOpenId)||decodeURIComponent(this.decode(decodeURIComponent(this.openId)));
		},
		created:function(){
			//在实例创建之后同步调用Ajax
			//this.ready();
		}
	}
	
	
</script>

<style>
	
	
</style>