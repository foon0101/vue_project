<template>
  <section class="list">
    <v-title :title="title"></v-title>
    <div class="mui-card">
      <div class="mui-card-header">{{ news.title }}</div>
      <div class="mui-card-footer" >
        <span>创建时间：{{ news.add_time | formatDate('YYYY-MM-DD') }}</span>
        <span>浏览量：{{ news.click }}</span>
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner" v-html="news.content"></div>
      </div>
    </div>
  </section>
</template>

<script>
import config from '../../js/config.js';
import Ctitle from '../common/title.vue';
export default {
  data(){
    return {
      // 注意：这里要写成一个空对象，如果写成null会报错；
      news:{},
      title:"新闻详情"
    }
  },
  methods:{
    // 通过id获取对应的新闻详情
    getDetails(){
      let url = config.newsDetails + this.$route.params.id;
      this.$http.get(url).then(resp =>{
        console.log(resp.body.message);
        resp.body.status == 0 && (this.news = resp.body.message[0]);
      });
    }
  },
  created(){
    this.getDetails();
  },
  components:{
    "v-title":Ctitle
  }
};
</script>

<style lang="less">

</style>