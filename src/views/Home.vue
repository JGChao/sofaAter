<template>
  <div class="box">
    <el-container>
      <el-aside width="200px">
        <div class="img">
          furniture销售管理系统
        </div>
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="#2B3647"
                text-color="#A0ABBF"
                :router="true"
        >
          <el-menu-item  index="/" >
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>首页</span>
            </template>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-paperclip"></i>
              <span>分类管理</span>
            </template>
            <el-menu-item index="/Category"><i class="el-icon-s-data"></i>栏目管理</el-menu-item>
            <el-menu-item index="/goods"><i class="el-icon-s-custom"></i>商品管理</el-menu-item>
<!--            <el-menu-item index="/menu"><i class="el-icon-s-custom"></i>菜单</el-menu-item>-->
<!--            <el-menu-item index="/demo1"><i class="el-icon-s-custom"></i>测试案例1</el-menu-item>-->
<!--            <el-menu-item index="/demo2"><i class="el-icon-s-custom"></i>测试案例2</el-menu-item>-->
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>团队管理</span>
            </template>
            <el-menu-item index="/team"><i class="el-icon-s-promotion"></i>团队管理</el-menu-item>

          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/orders"><i class="el-icon-s-promotion"></i>订单管理</el-menu-item>

          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="logo">
            FURNITURE
          </div>
          <ul class="signout">
            <li class="tou">
              <img src="../assets/tou.jpg" alt="">
            </li>
            <li class="out" @click="signout">退出</li>
          </ul>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  methods:{
    signout(){
      this.$router.push({name:'login'})
      sessionStorage.removeItem('token')
    }
  }

}
</script>
<style>

</style>

<style scoped>
  .box{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .img{
    width:100%;
    height: 60px;
    box-sizing: border-box;
    text-align: center;
    line-height: 60px;
    color:#5E99F0;
  }
  .logo{
    width: 300px;
    height: 60px;
    font-size: 36px;
    line-height: 60px;
    text-align: center;
    float: left;
    margin-left: 350px;
  }
  .el-aside {
    background-color: #2B3647;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }

  body > .el-container {
    margin-bottom: 40px;
    height: 100%;
  }
  .el-container{
    height: 100%;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .el-menu{
    width: 100%;
    box-sizing: border-box;
  }
  .el-submenu .el-menu-item{

    background: #222B3A !important;

  }
  .el-menu-item{
    width: 200px !important;
  }
  .el-submenu{
    width: 200px !important;
  }
  .signout{
    width: auto;
    height: 60px;
    float: right;
    cursor: pointer;
  }
  .signout .tou{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    float: left;
    margin-top: 5px;
  }
  .signout .tou img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .signout .out{
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    color: #333333;
    margin-left: 10px;
    float: right;
  }

</style>


