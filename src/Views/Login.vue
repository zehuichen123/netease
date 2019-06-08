<template>
  <el-container>
    <el-aside class="side-content">
      <sidebar></sidebar>
    </el-aside>
    <el-container>
      <el-main class="main-content">
        <div v-if="!is_login" class="login-content">
          <p style="font-weight: bold; font-size: 30px;">L O G I N</p>
          <input class="input-content" v-model="phone" placeholder="phone number">
          <input class="input-content" v-model="password" type="password" placeholder="password">
          <el-button round class="submit-button" @click="get_login">Login</el-button>
        </div>
        <div v-if="is_login" class="login-content">
          <img :src="profile.avatarUrl" height="100px" width="100px" style="margin-left: auto; margin-right: auto;">
          <div class="basic-info">
            <p style="font-size: 30px;">{{profile.nickname}}</p>
            <p><b>Signature</b>: {{basic_info.profile.signature}}</p>
            <p><b>Level</b>: {{basic_info.level}} <b> Gender</b>: {{user_gender}}</p>
            <p><b>Followers</b>: {{basic_info.profile.followeds}} <b> Following</b>: {{basic_info.profile.follows}}</p>
            <p>You've listened <b style="font-size: 20px;">{{basic_info.listenSongs}}</b> songs!</p>
          </div>
        </div>
        <aplayer class="player-style" :music="audio"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    import Sidebar from "@/components/Sidebar";
    import Aplayer from 'vue-aplayer';
    export default {
      name: "Login",
      components: {Sidebar, Aplayer},
      data() {
        return {
          audio: {
            title: "Take Care Of You",
            artist: 'Alex Brone',
            src: "https://m10.music.126.net/20190609033103/65ad4049673cbc64e079fe74f9023a11/ymusic/37e3/61db/a09c/f732af020e5c6e2b1c38601871caf4fc.mp3",
            pic: "https://p2.music.126.net/WIC6K4r8kPUV0_80B5GBfA==/7986852464676265.jpg", // prettier-ignore
          },
          phone: "",
          password: "",
          cookie: "",
          is_login: false,
          profile: {},
          basic_info: {},
          user_gender: "♂",
        }
      },
      created(){
        var uid = this.$store.state.uid;
        console.log(uid);
        if(uid !== ""){
          this.is_login = true;
          this.profile = this.$store.state.profile;
          this.get_info(uid);
        }
      },
      methods: {
        get_login(){
          let _self = this;
          this.axios.get('/login/cellphone?phone='+this.phone+'&password='+ this.password)
            .then(function (res){
              var data = res.data;
              if(data.code === 200){
                _self.$store.commit('set_profile', data.profile);
                _self.$router.push({name: 'Home'});
              }
              else{
                _self.phone = "";
                _self.password = "";
              }
            })
        },
        get_info(uid){
          let _self = this;
          this.axios.get('/user/detail', {params: {uid: uid}})
            .then(function(response){
              var data = response.data;
              _self.basic_info = data;
              if(_self.basic_info.gender === 0){
                _self.user_gender = "♀";
              }
            })
        }
      }
    }
</script>

<style scoped>
  .avatar{
    width: 100px;
    height: 100px;
  }
  .submit-button{
    margin-top: 40px;
    width: 150px;
  }
  .submit-button:hover{
    background-color: rgba(256, 256, 256, 0.5);
    color: white;
  }
  .input-content{
    background: transparent;
    border: 1px solid white;
    border-radius: 10px;
    width: 300px;
    height: 40px;
    margin-top: 40px;
    color: white;
    text-align: center;
    font-size: 18px;
  }
  .login-content{
    width: 400px;
    height: 400px;
    background-color: rgba(0, 0, 0, 0.3);
    margin-left: auto;
    margin-right: auto;
    border-radius: 40px;
    margin-top: 100px;
    margin-bottom: 130px;
    text-align: center;
    color: white;
    padding: 50px;
  }
  .player-style{
    background-color: #232323;
    color: white;
    margin: auto;
    height: 80px;

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
