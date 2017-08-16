<template>
    <section class="goodsList">
        <v-title :title="title"></v-title>
        <ul class="mui-table-view mui-grid-view">
            <li v-for="item in goodsList" :key="item.id" class="mui-table-view-cell mui-media mui-col-xs-6">
                <router-link :to="'/goods/goodsDetails/' + item.id">
                    <img class="mui-media-object" :src="item.img_url">
                    <div class="mui-media-body">{{item.title}}</div>
                    <div class="goodsInfo">
                        <p class="ptopline"><strong>￥{{item.sell_price}}</strong>&nbsp;&nbsp;&nbsp;&nbsp;<del>￥{{item.market_price}}</del></p>
                        <p class="pbotline"> 
                            <span class="leftspan">热卖中</span>
                            <span class="rightspan">剩 {{item.stock_quantity}} 件</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
         <!-- 加载更多 -->
        <button class="mui-btn mui-btn-success mui-btn-block mui-btn-outlined" ref="loadMoreBtn" @click="getGoodsList">加载更多</button>
    </section>
</template>

<script>
import config from '../../js/config.js';
import Ctitle from '../common/title.vue';
export default {
    data(){
        return {
            title:"商品列表",
            goodsList:[],
            pageindex:1
        }
    },
    methods:{
        // 获取数据
        getGoodsList(){
            let url = config.goodsList + "?pageindex=" + this.pageindex;
            this.$http.get(url).then( resp => {
                // 加载更多按钮，一页一页请求
                if(resp.body.status==0 && resp.body.message.length>0) {
                    this.goodsList.push(...resp.body.message);
                    this.pageindex++;
                } 
                // 如果已经是最后一页，那么把按钮disabled；
                else if(resp.body.message.length == 0){
                    this.$refs.loadMoreBtn.disabled = true;
                }
            });
        }
    },
    created(){
         this.getGoodsList();
    },

    components:{
        "v-title":Ctitle
    }
};
</script>

<style scoped lang="less">
    .mui-table-view.mui-grid-view .mui-table-view-cell {
        text-align: left;
    }
    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
        line-height:20px;
        height:40px;
        white-space: normal;
    }
    .goodsInfo{
        margin-top:5px;
        background-color:#eae9e9;
        p{
            padding-top:10px;
            strong{
                color:red;
                font-size:20px;
            }
        }
        .pbotline{
            position:relative;
            font-size:12px;
            .rightspan{
                position:absolute;
                right:10px;
            }
        }
    }
</style>