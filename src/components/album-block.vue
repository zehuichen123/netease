<template>
  <div class='wrapper'>
    <div class='playlist-container'>
      <div class='playlist-hoverable'>
        <!-- ADD PLAY BUTTON LATER -->
        <div class='album-wrapper'>
          <a class='playlist-detail-link' @click="get_detail(url_id)">
            <div class='playlist-image' v-bind:style="{'background-image': 'url(' + image + ')'}" >
            </div>
            <play-button class='album-play'></play-button>
          </a>
        </div>
        <div class='more-info'><a href="">{{title}}</a></div>
      </div>
    </div>

  </div>

</template>

<script>
  import PlayButton from "@/components/play-button";
  export default {
    name: 'album-block',
    components: {PlayButton},
    props: ['title', 'image', 'url_id'],
    data(){
      return {
      }
    },
    methods: {
      get_detail(url_id){
        this.$router.push({
          path: `/song/${url_id}`,
        });
      },
    },
    created: function(){
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    text-decoration: none;
    color: white;
  }
  img {
    width: 200px;
  }

  .playlist-image {
    background-repeat: no-repeat;
    width: 100%;
    position: absolute;
    top: 0;
    height: 100%;
    background-size: cover!important;
    background-position: 50%;
    transition: .3s all;

    /*  padding-top: 100%;
    */}
  .playlist-detail-link {
    padding-top: 100%;
    display: block;
    position: relative;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    width: 180px;
    height: 240px;
    margin-left: 35px;
  }

  .playlist-container {
    padding-bottom: 2.5em;
  }

  .more-info {
    margin: 12px 0 4px;
    /*font-weight: bold;*/
    font-size: 15px;
  }

  .playlist-image a {
    width: 100%;
    padding-top: 100%;

  }

  .playlist-hoverable {
    cursor: pointer;
  }

  .playlist-hoverable:hover > div a .playlist-image {
    filter: brightness(.3);
  }

  .album-play {
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    visibility: hidden;
    transition: .3s all;
    width: 60px;
    height: 60px;
    /*need to make play button accept width and height later*/
  }

  .playlist-hoverable:hover .album-play {
    visibility: visible;

  }
</style>
