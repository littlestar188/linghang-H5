<template>
	<div id="cart">
		<header class="cart-title"><h3>支付订单</h3></header>
		<div  class="content">
			<ul class="order-content">
			<li class="con-item">
				<label>订单名称:</label>
				<span>意式浓缩咖啡&nbsp;<i class="order-spec">(大杯)</i></span>
			</li>
			<li class="con-item">
				<label>订单金额:</label>
				<span class="money">
					<span><i class="price-flag">￥</i>12.00</span>
				</span>
			</li>
			</ul>
			<div class="triangle"></div>
			<div class="payment">
				<p class="payment-tip">请选择支付方式</p>				
				<ul>
					<li class="ali payment-item">
						<div class="left-con">
							<div class="left-con-img zhifubao"></div>
							<div class="left-con-txt">
								<p class="txt-title">支付宝</p>
								<p class="txt-con">数亿用户都在用，安全可托付</p>
							</div>
						</div>
						<div class="right-con" v-bind:class="[isActive?selectedClass :unselectedClass]" v-on:click="select()"></div>
					</li>
					<li class="weixin payment-item">
						<div class="left-con">
							<div class="left-con-img weixin"></div>
							<div class="left-con-txt">
								<p class="txt-title">微信</p>
								<p class="txt-con">微信安全支付</p>
							</div>
						</div>
						<div class="right-con" v-bind:class="[!isActive?selectedClass :unselectedClass]" v-on:click="select()"></div>
					</li>
				</ul>
			</div>	
		</div>
		<div id="pay">
			<a href="#/result">确认支付</a>
		</div>	
	</div>
	
</template>
<script>
	module.exports = {
		data:function(){
			return {
				isActive:true,
				selectedClass:"selected",
				unselectedClass:"unselected",

				deviceUId:"",
				sn:""	
			}
		},

		methods:{
			ready:function(){
				console.log('deviceUId:'+this.$route.params.deviceUId);
                this.deviceUId=this.$route.params.deviceUId;
                this.sn = this.$route.params.sn;
			},
			select:function(index){
                console.log(this.isActive)

                if(this.isActive){
                    this.isActive = false;

                }else{
                    this.isActive = true;
                }

            }

            
            			
		},
		filters:{
			//过滤器
			
		},
		created:function(){
			//在实例创建之后同步调用Ajax
			this.ready();
			
		}
	}
	
	
</script>

<style>
	#pay{
		text-align:center;
		background-color:#D8232A;
	}
	#cart .cart-title{
		background-color:#fff;
		padding:0.5rem 0;
		text-align:center;
	}
	#cart .cart-title h3{
		display:inline;
	}
	#cart .content{
		padding-top:0;
		padding-bottom:1rem;
	}
	#cart .content .triangle{
		position: relative;
	    top: 0rem;
	    height: 0.47rem;
	    background: #F4F4F4 url(/vue-demo/img/triangle.png);
	    /* background-size: 50%; */
	}
	#cart .content .order-content{
		background-color:#fff;
		border-top:1px solid #eee;
		padding: 0.6rem 0.8rem;
	}
	#cart .content .order-content .con-item{
		padding: 0.2rem 0;
	}
	#cart .content .order-content .con-item label{
		margin-right:0.2rem;
	}
	#cart .content .order-content .order-spec{
		color:#999;
	}
	#cart .payment{
		-margin-top: 0.5rem;
		background-color:#fff;
	}
	#cart .payment-tip{
		height: 1.5rem;
	    line-height: 1.5rem;		
		color:#666;
		text-align:left;
		padding:0.2rem 0.6rem;
		background-color: #F4F4F4;
	}
	#cart .payment-item{
		display:flex;
		padding: 0.4rem;
	}
	#cart .payment-item .left-con{
		display:flex;
		flex:7;
	}
	#cart .payment-item .left-con .left-con-img{
		flex:1;
	    height: 2.4rem;	       
	}
	#cart .payment-item .left-con .left-con-img.zhifubao{
		background: url(/vue-demo/img/zhifubao.png) no-repeat center; 
		background-size: 100%;	   	   
	}
	#cart .payment-item .left-con .left-con-img.weixin{
		background: url(/vue-demo/img/weixin.png) no-repeat center;
		background-size: 100%;		   
	}
	#cart .payment-item .left-con .left-con-txt{
		flex:5;
		margin-left:0.4rem;
	}
	#cart .payment-item .left-con .left-con-txt p{
    	padding: 0.1rem;
	}
	#cart .payment-item .left-con .left-con-txt .txt-title{
		font-size:0.6rem;
	}
	#cart .payment-item .left-con .left-con-txt .txt-con{
		font-size: 0.5rem;
    	color: #999;
	}
	#cart .payment-item .right-con{
		flex:1;	
		height:2rem;		    	
	}
	#cart .payment-item .right-con.selected{
		background: url(/vue-demo/img/selected.png) no-repeat center;
		background-size: 60%;
	}
	#cart .payment-item .right-con.unselected{
		background: url(/vue-demo/img/unselected.png) no-repeat center;
		background-size: 60%;
	}
</style>