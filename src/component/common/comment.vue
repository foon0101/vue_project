<template>
    <section class="comment">
        <!-- 提交评论模块 -->
         <div class="mui-card">
			<div class="mui-card-header">
                <h3>提交评论</h3>
            </div>
			<div class="mui-card-content">
                <textarea v-model="content" id="textarea" rows="5" placeholder="请发表你的评论..."></textarea>
				<button @click="submitComment" type="button" class="mui-btn mui-btn-primary mui-btn-block">发表</button>
			</div>   
		</div>

        <!-- 评论列表模块 -->
        <div class="mui-card">
			<div class="mui-card-header">
                <h3>评论列表</h3>
            </div>
			<div class="mui-card-content">
                <ul class="mui-table-view">
                    <li v-for="(item,i) in list" :key="i"  class="mui-table-view-cell">
                        <div>
                            <span>第{{i + 1}}楼</span>
                            <span>用户：{{item.user_name}}</span>
                            <span>发表时间：{{item.add_time | formatDate("YYYY-MM-DD")}}</span>
                        </div>
                        <p> {{ item.content }}</p>
                    </li>
                </ul>
				<button ref="loadMoreBtn" id="btngreen" @click="getComment" type="button" class="mui-btn mui-btn-primary mui-btn-block">加载更多</button>
			</div>   
		</div>
    </section>
</template>

<script>

    import config from '../../js/config.js';
    import { Toast } from 'mint-ui';
    
    export default {
        data(){
            return {
                content:"",
                pageindex:1,
                list:[]
            };
        },
        // 接收来自父指定的id数据
        props:["id"],
        methods:{
            // 发布评论
            submitComment(){
                let url = config.commentPut + this.id;
                let data = {content: this.content};
                this.$http.post(url,data,{emulateJSON:true}).then(resp => {
                    // 发布成功后给出提示，并清空输入框
                    if(resp.body.status == 0){
                        
                        // 加入一个mint-ui插件内的操作成功提示
                        Toast({
                            message: '操作成功',
                            iconClass: 'icon icon-success'
                        });
                        // 把数据添加到评论列表的最前面
                        this.list.unshift({
                            user_name:"佚名",
                            add_time:Date.now(),
                            content:this.content
                        })
                        // 将输入框清空
                        this.content = "";
                    }
                });
            },

            // 评论列表
            getComment(){
                let url = `${config.commentList + this.id}?pageindex=${this.pageindex}`;
                this.$http.get(url).then(resp => {
                    if(resp.body.status==0 && resp.body.message.length>0){
                        this.list.push(...resp.body.message);
                        this.pageindex++;
                    }else {
                        this.$refs.loadMoreBtn.disabled = true;
                    }
                });
            }
        },

        // 添加周期函数
        created(){
            this.getComment();
        }
    };
</script>

<style lang="less">
    .comment {
        .mui-card-content p {
            background-color: #9fccc5;
        }

        .mui-card{
            #btngreen{
                color: #fff;
                border: 1px solid #00b8ff;
                background-color: #00b8ff;
            }
        }
    }
        
</style>