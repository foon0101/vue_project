<template>
    <section class="swipe">
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="(item,i) in list" :key="i">
                <a :href="item.url">
                    <img :src="item.img" />
                </a>
            </mt-swipe-item>
        </mt-swipe>
    </section>
</template>

<script>
    export default {

        // 定义该组件所有的数据
        data(){
            return{
                // 轮播图列表数据
                list:[]
            };
        },

        // 定义该组件所有的逻辑方法
        methods:{
            // 互殴轮播图数据的方法
            getLunbo(){
                let url = "http://139.199.192.48:8888/api/getlunbo";
                this.$http.get(url).then(resp => {
                    if(resp.body.status == 0){
                        this.list = resp.body.message;
                    }
                });
            }
        },
        // 当组件初始化完毕，数据和事件都绑定好之后自动执行
        created(){
            this.getLunbo();
        }
    }
</script>

<style scoped lang="less">
    .swipe {
        height:300px;
        img{
            width:100%;
            height:100%;
        }
    }
</style>