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
var waiting = require ("../js/components/waiting.vue");

/*创建路由*/
var router = new VueRouter({
  routes:[
  	// {path:'/',redirect:"/home"},//重定向
    {path:'/',component:homeIndex},    
  	{path:'/result',component:result},
  	{name:"router1",path:'/cart',component:cart},
    {path:'/order',component:order},
    {path:'/waiting',component:waiting}
    /*{name:"router1",path:"/",component:result}*/
    //{name:"router2",path:"/result",component:result}
  ]
})

new Vue({
  /*methods:{
      handleHrefPart:function(){
        var href = location.href.split("?");
          var condition = href.slice(1,href.length);

          var cond = condition[0].split("&");
          console.log(cond)

          var arr = []; 
          for(var i=0;i<cond.length;i++){
            var name = cond[i].split("=")[0];
            var value = cond[i].split("=")[1];
            arr.push(value)         
          }
          return arr; 
      },
      decode:function(input){
           // private property
           console.log("parent component ----" +input)
        _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    
        var output = "";
          var chr1, chr2, chr3;
          var enc1, enc2, enc3, enc4;
          var i = 0;
          input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
          while (i < input.length) {
              enc1 = _keyStr.indexOf(input.charAt(i++));
              enc2 = _keyStr.indexOf(input.charAt(i++));
              enc3 = _keyStr.indexOf(input.charAt(i++));
              enc4 = _keyStr.indexOf(input.charAt(i++));
              chr1 = (enc1 << 2) | (enc2 >> 4);
              chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
              chr3 = ((enc3 & 3) << 6) | enc4;
              output = output + String.fromCharCode(chr1);
              if (enc3 != 64) {
                  output = output + String.fromCharCode(chr2);
              }
              if (enc4 != 64) {
                  output = output + String.fromCharCode(chr3);
              }
          }
          output = this._utf8_decode(output);
          return output;

      },
      _utf8_decode:function(utftext){
        var string = "";
          var i = 0;
          var c = c1 = c2 = 0;
          while ( i < utftext.length ) {
              c = utftext.charCodeAt(i);
              if (c < 128) {
                  string += String.fromCharCode(c);
                  i++;
              } else if((c > 191) && (c < 224)) {
                  c2 = utftext.charCodeAt(i+1);
                  string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                  i += 2;
              } else {
                  c2 = utftext.charCodeAt(i+1);
                  c3 = utftext.charCodeAt(i+2);
                  string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                  i += 3;
              }
          }
          return string;
      }
  },
  
  // components:{
  //   "app-header":header
  // },*/
  router
}).$mount('#app');




