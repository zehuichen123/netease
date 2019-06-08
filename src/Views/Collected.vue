<template>
  <div class="collected">
    <p class="title">Collected ❤️</p>
    <div class="row">
      <album-block v-for="item in albums" :title="item.name" :image="item.coverImgUrl" :url_id="item.id"></album-block>
    </div>
    <div v-if="!is_login">要先登陆才能查看您收藏的歌单哦～</div>
  </div>
</template>

<script>
  import AlbumBlock from "@/components/album-block";
  export default {
    name: "Collected",
    components: {AlbumBlock},
    data(){
      return{
        audio: {
          title: "Take Care Of You",
          artist: 'Alex Brone',
          src: "http://m10.music.126.net/20190608022044/dbcaf3df9fbe2c469d4d3e0e28f1630b/ymusic/9518/2c37/ae46/08381467f183afa5682591fa25ea9706.mp3",
          pic: "https://p2.music.126.net/WIC6K4r8kPUV0_80B5GBfA==/7986852464676265.jpg", // prettier-ignore
        },
        is_login: false,
        albums: [],
      }
    },
    created() {
      let _self = this;
      var uid = _self.$store.state.uid;
      _self.collected_album(uid);

    },
    methods: {
      collected_album(uid){
        let _self = this;
        _self.axios.get('/user/playlist',{params: {uid}})
          .then(function (response){
            var data = response.data;
            _self.albums = data.playlist.slice(0, 20);
            if(_self.albums.length() === 0){
              _self.is_login = false;
            }
          })
      },
    }
  }
</script>

<style scoped>
  .collected{

  }
  .row {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
  }
  .title{
    font-weight: bold;
    font-size: 40px;
    text-align: left;
    margin-left: 50px;
    margin-top: 10px;
  }
</style>
