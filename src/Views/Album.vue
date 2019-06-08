<template>
  <el-container>
    <el-aside>
      <sidebar></sidebar>
    </el-aside>
    <el-container>
      <div class="main-content">
        <el-container>

          <el-side class="song-info">
            <img :src="album.coverImgUrl" class="album-cover">
            <p style="font-size: 20px; font-weight: bold;">{{album.name}}</p>
            <p>{{album.creator.nickname}}</p>
            <el-button round class='play-button' @click="play_music(album.tracks[0].id)">P L A Y</el-button>
            <br><br>
            <img src="/static/icon/love.png" style="width: 30px; float: left; margin-left: 100px;" @click="love_it(url_id)"></img>
            <img src="/static/icon/remove.png" style="width: 30px; float: left; margin-left: 40px;" @click="move_it(url_id)"></img>
          </el-side>

          <el-main style="margin-top: 40px;">
            <div class="song-container">
              <ul>
                <li v-for="song in album.tracks">
                  <div class="song-item" @click="play_music(song.id)">
                    <div style="text-align: left; padding-left: 20px;">
                      <img src="/static/icon/music.png" style="height: 20px; float: left;">
                      <span style="float: left; "> {{song.name}}</span>
                    </div>
                    <div style="text-align: right; padding-right: 100px;">
                      <span>{{song.ar[0].name}}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </el-main>
        </el-container>
        <aplayer autoplay class="player-style" :music="audio" v-if="reset"/>
      </div>
    </el-container>
  </el-container>
</template>

<script>
    import Sidebar from "@/components/Sidebar";
    import Aplayer from 'vue-aplayer';
    export default {
      name: "Album",
      components: {Sidebar, Aplayer},
      data(){
        return {
          album: {},
          url_id: "",
          reset: true,
          audio: {
              title: "Take Care Of You",
              artist: 'Alex Brone',
              src: "http://m10.music.126.net/20190608022044/dbcaf3df9fbe2c469d4d3e0e28f1630b/ymusic/9518/2c37/ae46/08381467f183afa5682591fa25ea9706.mp3",
              pic: "https://p2.music.126.net/WIC6K4r8kPUV0_80B5GBfA==/7986852464676265.jpg", // prettier-ignore
          },
        }
      },
      methods: {
        love_it(url_id){
          let _self = this;
          _self.axios.get('/playlist/subscribe', {params: {t: 1, id: url_id}})
            .then(function (res){
            });
        },
        move_it(url_id){
          let _self = this;
          _self.axios.get('/playlist/subscribe', {params: {t: 2, id: url_id}})
            .then(function (res){
            });
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
              _self.reset = false;
            }).finally(function(){
              _self.reset = true;
          });
        }
      },
      created() {
        let _self = this;
        _self.url_id = _self.$route.params.url_id;
        _self.axios.get('/playlist/detail', {params: {id: _self.url_id}})
          .then(function (res){
            var data = res.data;
            console.log(data);
            _self.album = data.playlist;
          })
      }
    }
</script>

<style scoped>
  .song-container{
    width: 600px;
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
  .play-button{
    width: 150px;
    background-color: #1bb04a;
    color: white;
    border-width: 0px;
  }
  .song-info{
    padding-left: 100px;
    padding-right: 50px;
    padding-top: 50px;
    color: white;
    width: 300px;
  }
  .album-cover{
    height: 300px;
    width: 300px;
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

  .main-content{
    background: linear-gradient(to bottom right, #7e52a3, #140e1c);
    width: 100%;
    min-height: 100vh;
    display: inline;
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
