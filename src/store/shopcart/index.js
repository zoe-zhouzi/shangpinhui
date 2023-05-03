import {reqShopCart, reqAddOrUpdateCart, reqDeleteCartById, reqUpdateCheckedById} from '@/api'

const state = {
    //一定要注意先去控制台看这个数是什么类型再定义
     cartList: []
}
const mutations = {
    GET_CART_LIST(state, cartList){
        state.cartList = cartList
    }
}
const actions = {
    async getCartList({commit}){
        let result = await reqShopCart();
        console.log('getCartList',result)
        if(result.code == 200){
            commit('GET_CART_LIST', result.data)
        }
    },
    async addOrUpdateCart(context, {skuId,skuNum}){
        // 底下即为：加入购物车（修改商品个数）的请求，参数顺序不能瞎写
        let result = await reqAddOrUpdateCart(skuId, skuNum);

        if(result.code == 200){
            //不用mutitations数据，因为actions返回结果没有没有数据的
            //这个action只是通知服务器要修改数据
            //如果加入购物车成功，返回promise即为成功
            return "ok";
        } else {
            //如果加入购物车失败，返回失败的Promise
            return Promise.reject(new Error('fail'));
        }
    },
    async deleteCartById({commit}, skuId){
        let result = await reqDeleteCartById(skuId);
        if(result.code == 200){
            return 'ok'
        } else {
            return Promise.reject()
        }
    },
    async UpdateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if(result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject();
        }
    },
    deleteAllcheckedCart(context){
        // 考虑一种这样的情况，这里删除多个产品，但是可能其中某一次删除失败了，那么这次删除就算失败
        // 即要全部删除成功才算这次删除成功
        let promiseAll = []
        context.getters.cartList.cartInfoList.forEach(item => {
            // 这是调用上面的async修饰的函数，因此返回的结果是Promise对象
            // 有Promise.all([p1,p2,p3])，只有当p1,p2,p3都成功时，这个方法才成功，否则返回失败的结果
            let promise = item.isChecked==1?context.dispatch('deleteCartById', item.skuId):'';
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll)
    },
    updateAllCartIsChecked(context,isChecked){
        let promiseAll = []
        context.getters.cartList.cartInfoList.forEach(item=>{
            let promise = context.dispatch('UpdateCheckedById',{skuId:item.skuId,isChecked:isChecked})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}
const getters = {
    cartList(state){
        return state.cartList[0] || {}
    },
}
export default {
    state,
    mutations,
    actions,
    getters
}