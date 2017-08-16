<template>
    <section>
        <div class="mui-card">
            <div class="mui-card-header">{{ info.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner" v-html="info.content"></div>
            </div>
        </div>
    </section>
</template>

<script>
import config from '../../js/config.js';
export default {
    // 接收父传来的id
    props:["id"],
    data(){
        return {
            info:{}
        }
    },
    methods:{
        // 获取商品图文介绍
        getGoodsDesc(){
            let url = config.goodsGetDesc + this.id;
            this.$http.get(url).then( resp => {
                resp.body.status == 0 && (this.info = resp.body.message[0])
            });
        }
    },
    created(){
        this.getGoodsDesc();
    }
}    
</script>

<style lang="less">
    .mui-card-content-inner{
       img{
            width:100%;
       }
    }
</style>