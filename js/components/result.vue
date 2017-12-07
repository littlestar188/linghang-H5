<template>
	<div id="result">
	<header class="result-title"><h3>支付结果</h3><a :href="url" class="result-finish">完成</a></header>
		<div class="content">
			<div>
				<img src="/drinkOrder/img/success.png" class="success-img">
			</div>
			<p class="success">购买成功</p>
			<p class="success-tip">请点击饮料机上您刚购买的饮料，祝您享用愉快!</p>
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
				url:""
			}
		},
		methods:{			
			ready:function(){
				this.sn = this.$route.params.sn;
				this.url = "#/?sn="+this.sn;
			},
			refresh:function(){
				
			}			
		},
		created:function(){
			//在实例创建之后同步调用Ajax
			this.ready();
		}
	}
	
	
</script>

<style>
	#result{
		text-align:center;
	}
	#result .result-title{
		height:1rem;
		background-color:#fff;
		padding:0.5rem 0;
		text-align:center;
	}
	#result .result-title h3{
		display:inline;
	}
	#result .result-title .result-finish{
		color:#0E8DE9;
		position: absolute;
    	right: 0.7rem;
    	top: 0.5rem;
	}
	#result .success-img{
		height:4.5rem;
	}
	#result .success,#result .success-tip{
		letter-spacing:0.04rem;
	}
	#result .success{
		font-size: 0.8rem;
		font-weight:bold;
		color:#000;
		padding-bottom: 0.6rem;
	}
	#result .success-tip{
		width: 68%;
		color:#666;
    	margin: 0 auto;
	}
	#version{
		position: fixed;
	    bottom: 0.5rem;
	    width: 100%;
	    z-index: 10;	    
	}
	#version p{
		position:relative;
		padding:0.1rem 0;
		text-align:center;
		font-size:0.5rem;
		color:#999;
	}
	
</style>