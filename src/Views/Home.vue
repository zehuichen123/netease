<template>
  <el-container>
    <el-aside>
      <sidebar></sidebar>
    </el-aside>
    <el-container>
      <div class="main-content">
        <el-header>
          <headbar :item_list="item_list" v-on:set_choose="check_choose"></headbar>
        </el-header>
        <el-main>
          <featured v-if="choose===0"></featured>
          <selected v-if="choose===1"></selected>
          <collected v-if="choose===2"></collected>
          <mysearch></mysearch>
        </el-main>
        <aplayer class="player-style" :music="audio"/>
      </div>
    </el-container>
  </el-container>
</template>

<script>
    import Sidebar from "@/components/Sidebar";
    import Headbar from "@/components/Headbar";
    import AlbumBlock from "@/components/album-block";
    import Featured from "@/Views/Featured";
    import Selected from "@/Views/Selected";
    import Collected from "@/Views/Collected";
    import Aplayer from 'vue-aplayer'
    import MySearch from "@/Views/MySearch";

    export default {
      name: "Home",
      components: {MySearch, Selected, Collected, Featured, AlbumBlock, Headbar, Sidebar,Aplayer},
      data(){
        return {
          audio: {
            title: "Take Care Of You",
            artist: 'Alex Brone',
            src: "http://m10.music.126.net/20190608022044/dbcaf3df9fbe2c469d4d3e0e28f1630b/ymusic/9518/2c37/ae46/08381467f183afa5682591fa25ea9706.mp3",
            pic: "https://p2.music.126.net/WIC6K4r8kPUV0_80B5GBfA==/7986852464676265.jpg", // prettier-ignore
          },
          item_list: ['FEATURED', 'SELECTED', 'COLLECTED'],
          choose: 0,
          is_login: false,
        }
      },
      created(){
      },
      methods: {
        check_choose(param){
          this.choose = param;
        }
      }
    }
</script>

<style scoped>
  .main-content{
    background: linear-gradient(to bottom right, #7e52a3, #140e1c);
    width: 100%;
    min-height: calc(100vh - 100px);
    display: inline;
  }
  .player-style{
    background-color: #232323;
    margin: 0px;
    color: white;
    height: 90px;
    position: fixed;
    bottom: 0;
    width: calc(100vw - 300px);
  }
  .el-header, .el-footer {
    color: #ffffff;
    text-align: center;
  }

  .el-aside {
    background-color: #16181b;
    color: #959495;
    height: 100%;
  }
  .el-main {
    color: #ffffff;
    padding: 10px;
  }
</style>
