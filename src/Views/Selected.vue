<template>
  <div class="selected">
    <p class="title">Selected 😎</p>
    <div class="row">
      <album-block v-for="item in albums" :title="item.name" :image="item.coverImgUrl" :url_id="item.id"></album-block>
    </div>
  </div>
</template>

<script>
  import AlbumBlock from "@/components/album-block";
  export default {
    name: "Selected",
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
      // var uid = _self.$store.state.uid;
      // console.log(uid);
      // if(uid === ""){
      //   _self.is_login = false;
      //   return;
      // }
      // else{
      //   _self.is_login = true;
      // }
      _self.feature_album();
    },
    methods: {
      feature_album(){
        let _self = this;
        // _self.axios.get('/user/playlist',{params: {uid}})
        _self.axios.get('/top/playlist/highquality',{params: {limit: 20}})
          .then(function (response){
            var data = response.data;
            _self.albums = data.playlists.slice(0, 20);
            console.log(_self.albums);
          })
      },
    }
  }
</script>

<style scoped>
  .featured{

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
