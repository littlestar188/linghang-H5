<template>
	<div id="result">
	<header class="result-title"><h3>等待支付</h3></header>
		<div class="content">
			<div>
				<!-- <img src="/drinkOrder/img/success.png" class="success-img"> -->
			</div>
			<p class="success"></p>
			<p class="success-tip">等待支付...</p>
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
				console.log(this.sn,this.url)
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
	
	
</style>