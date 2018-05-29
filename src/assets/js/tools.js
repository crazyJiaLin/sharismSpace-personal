/**
 * 自封装工具js方法，挂载到$上，并绑定到window对象上
 * author:cjl
 * last-Modify:2018.5.28
 */

window.$ = function(selector){
   function Tools(){
       this.el = null;
       this.length = 0;
       this.init();
   }
   Tools.prototype = {
        init(){
            if(!selector){
                return;
            }
            let type = typeof(selector);
            if(type == 'string'){
              this.el =  document.querySelector(selector);
            }else if(type == 'object'){
                this.el = selector;
            }
        },
        find(findSelector){
            if(!this.el){
                return;
            }
            // console.log(document.getElementById('app').getElementsByClassName('.el-header'));
            // console.log(this.el.getElementsByClassName('.el-header'));
            return new Tools(this.el.querySelector('.el-header')) 
        }
   };

   return new Tools;
};

// console.log($('#app').find('div'));