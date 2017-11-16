var Vue = require ("vue");
var VueRouter = require ("vue-router");
var Mint = require('mint-ui');
var Resource = require('vue-resource');

//声明引用插件
Vue.use(VueRouter);
Vue.use(Mint);
Vue.use(Resource);


import { Swipe, SwipeItem } from 'mint-ui';
import { Loadmore } from 'mint-ui';

Vue.component("mt-swipe", Swipe);
Vue.component("mt-swipe-item", SwipeItem);
Vue.component("mt-loadMore", Loadmore);

//引用组件
var homeIndex = require ("../js/components/homeIndex.vue");
var result = require ("../js/components/result.vue");
var cart = require ("../js/components/cart.vue");
var order = require ("../js/components/orderList.vue");

/*创建路由*/
var router = new VueRouter({
  routes:[
  	// {path:'/',redirect:"/home"},//重定向
    {path:'/',component:homeIndex},    
  	{path:'/result',component:result},
  	{path:'/cart',component:cart},
    {path:'/order',component:order},
    {name:"router1",path:"/cart",component:cart},
    {name:"router2",path:"/result",component:result}
  ]
})

new Vue({
  router
}).$mount('#app');




