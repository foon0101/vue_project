<template>
    <section class="numbox">
        <div class="mui-numbox">
            <button class="mui-btn mui-btn-numbox-minus" type="button" @click="subtract">-</button>
            <input class="mui-input-numbox" type="number" v-model="value">
            <button class="mui-btn mui-btn-numbox-plus" type="button" @click="add">+</button>
        </div>
    </section>
</template>

<script>
    export default {
        data(){
            return {
                value:this.initVal || 0  // value最初的值由父来指定
            };
        },
        props:["initVal"],
        methods:{
            // 加
            add(){
                this.value++;
            },

            // 减    
            subtract(){
                this.value && this.value--;
            }
        },

          // 当值变化时，通过事件的方式传给父
        watch:{
            value(){
                this.$emit("change",this.value);
            }
        }
    };
</script>

<style lang="less">
    
</style>