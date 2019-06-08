<template>
  <div class="headbar">
    <ul>
      <li v-for="(item, index) in item_list">
        <div v-if="index===choose">
          <div @click="set_choose(index)"><span class="chosen">{{item}}</span>
          </div>
        </div>
        <div v-else="index!==choose">
          <div @click="set_choose(index)"><span class="unchosen">{{item}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
      name: "Headbar",
      props: ["item_list"],
      data(){
        return{
          choose: 0,
        }
      },
      methods:{
        set_choose(index){
          this.choose = index;
          this.$emit("set_choose", index)
        }
      }
    }
</script>

<style scoped>
  .chosen{
    border-bottom: 2px solid #00a900;
    font-size:20px;
    font-weight: bold;
    margin-left: 20px;
    color: white;
  }
  .unchosen{
    font-size:18px;
    /*font-weight: bold;*/
    margin-left: 20px;
    color: #a6a5a6;
  }
  .unchosen:hover{
    font-weight: bold;
    font-size: 22px;
    color: white;
  }
  .chosen:hover{
    font-size: 22px;
  }
  li{
    list-style: none;
    display: inline-block;
  }
  .headbar{
    text-align: center;
  }
</style>
