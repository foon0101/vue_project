// 引入storage
import storage from '../commom/storage.js';

// 因为商品购买数量的数据格式为：{ id1: total, id2: total, id3: total }
// key 为商品的id ， value为商品的选择数量。
const storageKey = 'goodsTotal';
let goodsTotal = storage.get(storageKey) || {};
export default {
    // 根据id存储选择数量
    set(id,total){
        goodsTotal[id] = total;
        storage.set(storageKey,goodsTotal);
    },

    // 根据id获取选择数量，没有id则获取全部商品的选择数量总和
    get(id){
        if(id){
            return goodsTotal[id] || 0;
        }else{

            let totals = this.getTotalList();
            // 如果数组length为0，reduce会报错，所以做个判断处理
            return totals.length && totals.reduce((v1,v2) => (+v1) + (+v2));
        }
    },

    // 获取所有id组成的数组
    getIDList(){
        return Object.keys(goodsTotal);
    },

    // 获取所有total组成的数组
    getTotalList(){
        return Object.values(goodsTotal);
    }
};
/**
 * 目前完成的商品选购存取，操作的是内存，关闭页面数据丢失；
 * 需要和localStorage做一个关联：
 * 1.1、在初始化goodsTotal的值的时候，应该先尝试着从localStorage里面取值；
 * 1.2、在set的时候，需要把goodsTotal的值存储到localStorage里。
 */