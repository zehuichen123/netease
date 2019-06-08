<template>
  <div class="sidebar">
    <div class="title">
      <img src="/static/icon/icon-music-note.png" style="height: 100%; float: left;">
    </div>
    <hr>
    <div class="search">
      <router-link style="color: #1bb04a; font-weight: bold; padding-left: 10px;" :to="{name: 'MySearch'}">Search</router-link><i class="el-icon-search"></i>
    </div>
    <hr>
    <div class="functions">
      <router-link style="padding-left: 10px; font-weight: bold; color: #939493;" :to="{name: 'Home'}">Browse</router-link>
      <br>
      <br>
      <router-link style="padding-left: 10px; color: #939493; font-weight: bold;" :to="{name: 'Login'}">Account</router-link>
    </div>
    <hr>
    <div class="intro">
      <p>Music Player</p>
      <p style="font-size: 15px;">This is a spotify-like music application powered by Vue.js</p>
      <p style="font-size: 13px; font-weight: bold;">@ CopyRight ZehuiChen</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Sidebar",
      methods:{
      }
    }
</script>

<style scoped>
  .intro{
    margin-top: 330px;
    margin-bottom: 10px;
  }
  .search{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .sidebar{
    padding-top: 20px;
    padding-left: 15px;
    padding-right: 15px;
    text-align: left;
    font-size: 20px;
    position: fixed;
    height: 100vh;
    background-color: #252525;
    width: 270px;
  }
  .title{
    height: 50px;
    width: 50px;
  }
</style>
