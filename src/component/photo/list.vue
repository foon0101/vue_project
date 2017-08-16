<template>
    <section class="list">
        <!-- 导航栏 -->
        <div class="photonav">
            <div class="hiddenS">
                <ul>
                    <li>
                        <a href="javascript:;">全部</a>
                    </li>
                    <li v-for="item in categoryList" :key="item.id">
                        <router-link :to="'/photo/list/' + item.id">{{item.title}}</router-link>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 内容区域 -->
        <div class="mui-card" v-for="item in photoList" :key="item.id">
            <router-link :to="'/photo/details/' + item.id">
			    <div class="mui-card-header">
                    <img v-lazy="item.img_url">
                </div>
            </router-link>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>{{item.title}}</p>
					<p style="color: #333;">{{item.zhaiyao}}</p>
				</div>
			</div>
		</div>
    </section>
</template>

<script>
    import config from '../../js/config.js';
    export default{
        // 数据
        data(){
            return {
                categoryList:[],
                photoList:[]
            }
        },
        watch: {
            // 实例身上有一个$route属性，当前页面变化时，这个属性的值也会跟着变化,
            // 只要页面一变化，那么就根据新的id渲染图片列表
            $route() {
                this.getPhotoList(this.$route.params.id);
            }
        },

        methods: {
            // 获取导航栏数据
            getImgCategory(){
                let url = config.photoCategoryList;
                this.$http.get(url).then(resp => {
                    console.log(resp.body.message);
                    resp.body.status == 0 && (this.categoryList = resp.body.message);
                });
            },

            // 获取图片列表
            getPhotoList(id){
                let url = config.photoList + id;
                this.$http.get(url).then(resp => {
                    if(resp.body.status == 0){
                        this.photoList = resp.body.message.map(function(photo,i) {
                            console.log(photo);
                            photo.img_url = config.imgDomain + photo.img_url;
                            return photo;
                        });
                    }
                });
            },

            // 获取背景style
            getStyle(item){
                return 'height:40vw;background-image:url("'+ item.img_url +'")';
            }
        },

        // 周期函数
        created(){
            this.getImgCategory();
            this.getPhotoList(this.$route.params.id);
        }
    };
</script>

<style scoped lang="less">
    .photonav {
        height:38px;
        overflow: hidden;
        .hiddenS{
            overflow: scroll;
            ul {
                height: 20px;
                line-height: 20px;
                list-style: none;
                padding-left: 10px;
                width: 270%;
                li {
                    float: left;
                    a {
                        color: skyblue;
                    }
                }
                li+li {
                    margin-left: 15px;
                }
            }
        }
    }
    .mui-card-header img {
        width: 100%;
        height: 100%;
        &[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
    }

</style>