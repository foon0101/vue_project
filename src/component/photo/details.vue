<template>
    <section class="details">
        <v-title :title="title"></v-title>
        <div class="mui-card">
			<div class="mui-card-header">
                <h4>{{ info.title }}</h4>
                <p>
                    <span>发布时间：{{ info.add_time | formatDate('YYYY-MM-DD')}}</span>
                    <span>浏览量：{{ info.click }}</span>
                </p>
            </div>
			<div class="mui-card-content">
				<ul class="mui-table-view mui-grid-view">
                    <li class="mui-table-view-cell mui-media mui-col-xs-4" v-for="item in hums" :key="item.src">
                        <img :src="item.src"/>
                    </li>
                </ul>
			</div>
			<div class="mui-card-footer" v-html="info.content"></div>
		</div>
    </section>
</template>

<script>
    import config from '../../js/config.js';
    import Ctitle from '../common/title.vue';

    export default{
        data(){
            return {
                title:"图片详情",
                info:{},
                hums:[]
            };
        },

        methods:{
            // 获取数据
            getInfo(){
                let url = config.photoInfo + this.$route.params.id;
                this.$http.get(url).then(resp => {
                    resp.body.status ==0 && (this.info = resp.body.message[0])

                });
            },

            // 获取缩略图
            getHums(){
                let url = config.photoHums + this.$route.params.id;
                this.$http.get(url).then(resp => {
                    if(resp.body.status==0){
                        // 遍历图片列表，修改每一个图片对象的img_url地址
                        this.hums = resp.body.message.map(function(photo,i) {
                            // console.log(photo);
                            photo.src = config.imgDomain + photo.src;
                            return photo;
                        });
                    }
                });
            }
        },

        created() {
            this.getInfo();
            this.getHums();
        },

        components:{
            "v-title":Ctitle,
        }
    };
</script>

<style scoped lang="less">
    .mui-card-header, .mui-card-footer {
        display: block
    }
    .mui-card-content img {
        width: 100%;
    }
</style>