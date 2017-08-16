<template >
    <div class="phpotolist">
        <div class="photonav">
            <ul>
                <li>
                    <a href="javascript:;">今天天气</a>
                </li>
            </ul>
        </div>
    
        <ul class="lagpic">
            <li :key="i" v-for="(item,i) in list">
                <img v-lazy="'http://ofv795nmp.bkt.clouddn.com/'+item.img_url">
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [],
            sort: []
        }
    },
    methods: {
        getpic() {


            let url = "http://139.199.192.48:8888/api/getimages/0";
            this.$http.get(url).then(function (resp) {
                if (resp.body.status == 0) {
                    this.list = resp.body.message
                }
            })
        },
        getsort() {
            let url = "http://139.199.192.48:8888/api/getimgcategory";
            this.$http.get(url).then(function (resp) {
                if (resp.body.status == 0) {
                    // this = resp.body.message


                }
            })


        }
    },
    created() {
        this.getpic();
        this.getsort()
    }
}
</script>
<style lang="less">
.phpotolist {
    .photonav {
        overflow: scroll;
        ul {
            height: 20px;
            line-height: 20px;
            list-style: none;
            padding-left: 10px;
            width: 1100%;
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
    .lagpic {
        list-style: none;
        image[lazy=loading] {
            width: 100%;
            height: 300px;
            margin: 0;
        }
    }
}
</style>