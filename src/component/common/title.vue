<template>
    <section class="mint-header title">
          <div @click="rollback" class="mint-header-button is-left">
              <button class="mint-button mint-button--default mint-button--normal">
                <span class="mint-button-icon"><i class="mintui mintui-back"></i></span> 
                <label class="mint-button-text">返回</label>
              </button>
          </div> 
          <h1 class="mint-header-title">{{title}}</h1> 
          <div class="mint-header-button is-right"></div>
    </section>
</template>

<script>
    export default {
      // 接收来自父指定的title数据
      props:["title"],
      methods:{
        // 调用返回上一页
        rollback(){
          this.$router.go(-1);
        }
      }
    };
</script>

<style lang="less">
    .title{
      background-color:#d9d9d9;
      border-bottom:1px solid #ccc;
      color:#292a2b;
    }
</style>