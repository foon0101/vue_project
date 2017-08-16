<template>
    <section class="silider">
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in swipeList" :key="item.id">
                <img :src="item.src" />
            </mt-swipe-item>
        </mt-swipe>
    </section>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        props:['swipeList']
    }
</script>


<style scoped lang="less">
     .silider {
        height:300px;
        img{
            width:100%;
            height:100%;
        }
    }
</style>