<template>
    <section class="goodsDetails">
        <v-title :title="title"></v-title>
        <!-- 轮播图模块 -->
        <silder :swipeList="swipeList"></silder>
        <!-- 商品数量模块 -->
        <div class="mui-card" v-for="item in goodsInfo" :key="item.id">
            <div class="mui-card-header">{{item.title}}</div>
            <div class="mui-card-content">
                <div class="topDiv">
                    <span class="marketSpan">市场价：<del>￥{{item.market_price}}</del></span>
                    <span class="sellSpan">销售价：￥{{item.sell_price}}</span>
                </div>
                购买数量：
                <v-numbox :initVal="total" @change="upTotal"></v-numbox>
                <div class="botbtn">
                    <button type="button" class="mui-btn mui-btn-danger">
                        立即购买
                    </button>
                    <button type="button" class="mui-btn mui-btn-danger" @click="addShopcart">
                        加入购物车
                    </button>
                </div>
            </div>
            <!-- 商品参数 -->
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <p>商品货号：{{item.goods_no}}</p>
                <p>库存情况：{{item.stock_quantity}}件</p>
                <p>上架时间：{{item.add_time}}</p>
            </div>
        </div>

        <!-- 商品评论&图文介绍 -->
        <mt-navbar v-model="selected">
            <mt-tab-item id="comment">商品评论</mt-tab-item>
            <mt-tab-item id="info">商品介绍</mt-tab-item>
        </mt-navbar>

        <!-- tab-内容 -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="comment">
                <v-comment :id="id"></v-comment>     
            </mt-tab-container-item>
            <mt-tab-container-item id="info">
                <v-goodsInfo :id="id"></v-goodsInfo>
            </mt-tab-container-item>
        </mt-tab-container>
    </section>
</template>

<script>
    import config from '../../js/config.js';
    import goodsStorage from '../../js/model/goods.js';
    import Ctitle from '../common/title.vue';
    import Csilder from '../subcomm/silider.vue';
    import Ccomment from '../common/comment.vue';
    import CgoodsInfo from './goodsInfo.vue';
    import Cnumbox from '../common/numbox.vue';
    export default {
        data(){
            return {
                title:"商品详情",
                swipeList:[],
                goodsInfo:[],
                id:this.$route.params.id,
                selected:"",
                // 页面一上来就从本地读取这个商品的历史购买数量
                total:goodsStorage.get(this.$route.params.id)
            }
        },
        components:{
            "v-title":Ctitle,
            "silder":Csilder,
            "v-comment":Ccomment,
            "v-goodsInfo":CgoodsInfo,
            "v-numbox":Cnumbox
        },
        methods:{
            // 获取轮播图数据
            getThumImages(){
                let url = config.goodsGetThumImages + this.id;
                this.$http.get(url).then(resp => {
                    if(resp.body.status==0){
                        // 遍历图片列表，修改每一个图片对象的img_url地址
                        this.swipeList = resp.body.message.map(function(photo,i) {
                            console.log(photo);
                            photo.src = config.imgDomain + photo.src;
                            return photo;
                        });
                    }
                });
            },

            // 获取商品价格及参数
            getGoodsInfo(){
                let url = config.goodsGetInfo + this.id;
                this.$http.get(url).then(resp => {
                    if(resp.body.status==0){
                        this.goodsInfo = resp.body.message;
                    }
                })
            },

            // 更新商品的选择数量值；
            upTotal(value){
                this.total = value;
            },

            // 加入购物车
            addShopcart(){
                // 点击购物车，就把这个商品的购买数量持久化记录下来
                goodsStorage.set(this.id,this.total);
                // 点击购物车后，把商品的总数挂载上去
                document.querySelector(".mui-badge").innerHTML = goodsStorage.get();
            }
        },
        created() {
            this.getThumImages();
            this.getGoodsInfo();
        },

        
    };
</script>

<style scoped lang="less">
   

    .mui-card-content{
        margin-left:10px;
    }


    .mui-card {
        margin: 10px 0px;
        border:1px solid #ccc;
        border-radius:10px,
    }

    .topDiv{
        margin:10px 0px;
    }

   .botbtn{
       margin:20px 0px 5px 0px;
   }

    mt-navbar{
        margin-bottom:20px;
    }

   mt-tab-container{
       margin-bottom:20px;
   }
</style>