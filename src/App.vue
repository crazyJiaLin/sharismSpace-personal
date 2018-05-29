<template>
  <div>
    <el-container :class="showHeader? '' : 'hide'">
      <el-header>
        <Header></Header>
        <div class="header-fold-btn" @click="showHeader = !showHeader">
            <i :class="showHeader? 'fa fa-angle-double-up' :  'fa fa-angle-double-down'"></i>
        </div>
      </el-header>
      <el-main>
        <div v-show="showUserBg" class="user-background-wrapper animated fadeIn">
            <img @load="backgroundLoadEnd" src="./assets/img/user-background.jpg" alt="">
        </div>
        <router-view></router-view>
      </el-main>
    </el-container>    
  </div>
</template>

<script>
  const Header = () => import('@/components/header/header.vue')
export default {
  name: 'App',
  components : {
    Header
  },
  data(){
    return {
      showHeader : true,
      showUserBg : false
    }
  },
  methods:{
    backgroundLoadEnd(){
      console.log('图片加载完成');
      this.showUserBg = true;
    }
  },
  mounted(){ 
      let that = this;
      var userNickname= decodeURI( window.location.pathname).slice(1);
      var formData=new FormData();
      formData.append("name",userNickname);
      this.$axios({
          method : 'post',
          url: window.userReqUrl + "/userInfo/getUserInfoByName",
          data : formData,
      })
      .then(function (response) {
          let data = response.data;
          console.log(data);
          if(data.code == 1){
            that.$store.state.userInfo = data.value;  //将查询的用户信息添加到vuex中
            // console.log(that.$store.state);
          }else{
              that.$message.error(data.message);
          }
      })
      .catch(function (error) {
          that.$message.error("服务器开小差了~稍后重试 ^8^");
      });
  }
}
</script>
