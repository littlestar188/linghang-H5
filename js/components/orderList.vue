<template>
	<div id="cart">
		<header class="cart-title"><h3>支付列表</h3></header>
		<div>
		    <ul class="order-tab">
		    	<li v-for="(item,index) in tabsParams" @click="toggleTabs(index)" :class="{active:index==nowIndex}">{{item}}</li>		    	
		    </ul>
		</div>
		<div class="content" v-show="nowIndex===0">
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
                <li class="order-option-btns">
                    <button class="option-btn btn-pay"><a href="#">确认支付</a></button>
                    <button class="option-btn btn-cancel"><a href="#">取消订单</a></button>
                </li>
			</ul>		
		</div>
		<div class="content" v-show="nowIndex===1">
			<ul class="order-content">
                <li class="con-item">
                    <label>订单名称:</label>
                    <span>意式浓缩咖啡&nbsp;<i class="order-spec">(小杯)</i></span>
                </li>
                <li class="con-item">
                    <label>订单金额:</label>
                    <span class="money">
                        <span><i class="price-flag">￥</i>12.00</span>
                    </span>
                </li>
                <li class="order-option-btns">
                    <button class="option-btn btn-pay"><a href="#">确认支付</a></button>
                    <button class="option-btn btn-cancel"><a href="#">取消订单</a></button>
                </li>
			</ul>		
		</div>
		<div class="content" v-show="nowIndex===2"></div>
	</div>
	
</template>
<script>
	module.exports = {
		data:function(){
			return {
				isActive:true,
				selectedClass:"selected",
				unselectedClass:"unselected",
				tabsParams:["未支付","待支付","已支付"],
				nowIndex:0
			}
		},
		methods:{
			
			select:function(index){
                console.log(this.isActive)

                if(this.isActive){
                    this.isActive = false;

                }else{
                    this.isActive = true;
                }

            },
            toggleTabs:function(index){
            	this.nowIndex=index;
        	}
			
			
		},
		filters:{
			//过滤器
			
		},
		created:function(){
			//在实例创建之后同步调用Ajax
			console.log(this.uId)
			
		}
	}
	
	
</script>

<style>
	.order-tab{
		display:flex;
	}
	.order-tab li{
		flex:1;
		padding:0.2rem 0;
		text-align:center;
		
	}
	.order-tab li.active{
		background-color:#D8232A;
		color:#fff;
	}
	
	.order-option-btns{
		text-align:right;
	}
	button.option-btn{
		border: none;
	    background-color: #ccc;	   
	    border-radius: 0.1rem;
	    color:#444;
	}
	button.option-btn a{
		display: block;
		padding: 0.2rem;		
		color:#444;
	}
	button.option-btn.btn-pay{
		border: 1px solid #D8232A;		
	}
	button.option-btn.btn-cancel{
		border: 1px solid #ccc;
	}
	button.option-btn.btn-pay a{
		color: #fff;
		background-color:#D8232A;
	}
	
</style>