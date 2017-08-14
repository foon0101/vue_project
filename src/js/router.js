
// 导入包
import VueRouter from 'vue-router';

// 导入index组件
import Cindex from '../component/index/index.vue';
// 导入news相关组件
import CnewsList from '../component/news/list.vue';
import CnewsDetails from '../component/news/details.vue';

// 导入photo相关组件
import CphotoList from '../component/photo/list.vue';
import CphotoDetails from '../component/photo/details.vue';

// 这个文件对外到处一个路由实例
export default new VueRouter({
    routes:[
        {path:"/",redirect:"/index"},
        {path:"/index",component:Cindex},
        // 配置新闻相关路由
        {path:"/news/list",component:CnewsList},
        {path:"/news/details/:id",component:CnewsDetails},
        // 配置图片相关路由
        {path:"/photo/list/:id",component:CphotoList},
        {path:"/photo/details/:id",component:CphotoDetails}
    ]
});