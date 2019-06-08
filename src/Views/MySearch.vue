<template>
  <el-container>
    <el-aside class="side-content">
      <sidebar></sidebar>
    </el-aside>
    <el-container>
      <el-main class="main-content">
        <div class="search-content">
          <input v-model="search_word" class="search-box" placeholder="Find your Song!" @keyup.enter="search">
          <div class="search-result">
            <div class="song-container">
              <ul>
                <li v-for="song in search_list">
                  <div class="song-item" @click="play_music(song.id)">
                    <div style="text-align: left; padding-left: 20px;">
                      <img src="/static/icon/music.png" style="height: 20px; float: left;">
                      <span style="float: left; "> {{song.name}}</span>
                    </div>
                    <div style="text-align: right; padding-right: 100px;">
                      <span>{{song.artists[0].name}}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <aplayer autoplay class="player-style" :music="audio" ref="player" v-if="hackReset"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Sidebar from "@/components/Sidebar";
  import Aplayer from 'vue-aplayer';
  export default {
    name: "MySearch",
    components: {Sidebar, Aplayer},
    data() {
      return {
        audio: {
          title: "Take Care Of You",
          artist: 'Alex Brone',
          src: "https://m10.music.126.net/20190609040104/c877a415af0a8e095ffd53df67596013/ymusic/d2c5/3ee2/3b07/ea51a9f9d2abe204c8ff42b6b6881dc0.mp3",
          pic: "https://p2.music.126.net/WIC6K4r8kPUV0_80B5GBfA==/7986852464676265.jpg", // prettier-ignore
        },
        search_list: [],
        search_word: "",
        hackReset: true,
      }
    },
    methods: {
      search(){
        let _self = this;
        _self.axios.get('search', {params: {keywords: _self.search_word}})
        .then(function(response){
          var data = response.data;
          _self.search_list = data.result.songs;
        })
      },
      play_music(music_id){
        let _self = this;
        _self.axios.get('/song/detail', {params: {ids: music_id}})
          .then(function (res){
            var song_info = res.data;
            _self.audio.title = song_info.songs[0].name;
            _self.audio.artist = song_info.songs[0].ar[0].name;
            _self.audio.pic = song_info.songs[0].al.picUrl;
          });
        _self.axios.get('/song/url', {params: {id: music_id}})
          .then(function (res){
            var url_data = res.data;
            // _self.audio.src = url_data.data[0].url;
            _self.audio.src="https://music.163.com/song/media/outer/url?id="+ music_id +".mp3";
            console.log(_self.audio.src);
            _self.hackReset = false;
          }).finally(function(){
          _self.hackReset = true;
        });
      }
    }
  }
</script>

<style scoped>
  .song-container{
    width: 1000px;
    height: 80vh;
    overflow:hidden;
    overflow-y:scroll;
  }
  .song-item{
    width: 100%;
    height: 40px;
    background-color: transparent;
    padding-top: 20px;
  }
  .song-item:hover{
    background-color: rgba(0, 0, 0, 0.3);
  }
  li{
    list-style: none;
  }
  .search-box{
    width: 100%;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    font-size: 40px;
    color: white;
    padding-left: 50px;
  }
  .search-content{
    width: 100%;
    height: 100%;
  }
  .player-style{
    background-color: #232323;
    margin: 0px;
    color: white;
    height: 90px;
    position: fixed;
    bottom: 0;
    width: calc(100vw - 280px);
  }
  .side-content {
    background-color: #16181b;
    color: #959495;
    height: 100%;
    width: 15%;
  }

  .main-content {
    color: #ffffff;
    padding: 0px;
    min-height: calc(100vh - 100px);
    background: linear-gradient(to bottom right, #7e52a3, #140e1c);
  }
</style>
