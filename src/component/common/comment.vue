<template>
    <section class="comment">
         <div class="mui-card">
			<div class="mui-card-header">提交评论</div>
				<div class="mui-card-content">
                    <textarea v-model="content" id="textarea" rows="5" placeholder="请发表你的评论..."></textarea>
					<button @click="submitComment" type="button" class="mui-btn mui-btn-primary mui-btn-block">发表</button>
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
                content:""
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
                        // 将输入框清空
                        this.content = "";
                        // 加入一个mint-ui插件内的操作成功提示
                        Toast({
                            message: '操作成功',
                            iconClass: 'icon icon-success'
                        });
                    }
                });
            }
        }
    };
</script>

<style lang="less">
 
</style>