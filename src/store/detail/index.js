import {reqGetDetailInfo, reqAddOrUpdateCart} from '@/api'
//封装游客身份模块uuid，生成一个随机字符串
import {getUUID} from '@/utils/USER_ID'

const state = {
    detailInfo: {},
    uuid_token: getUUID(),
}
const actions = {
    async getDetailInfo(context, skuId){
        let result = await reqGetDetailInfo(skuId)
        // console.log('detailInfo',result)
        if(result.code == 200){
            context.commit('GET_DETAIL_INFO' ,result.data)
        }
    },
    // 加入购物车｜将来修改商品个数的地方，右侧是载荷对象【两个K，两个V】
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
        //思考问题:目的是前端把商品的ID、商品个数传递给服务器【人家服务器，兄弟我收到了,没有额外的给你传递其余的数据】
        //想的问题:豪哥不对，咱们以前经常commit条件mutation存储数据【没有返回数据，没有数据可存储】,没有需要提交mutation让仓库
        //存储数据
        //第一种解决方案code,完全可以！！！！
    }

}
const mutations = {
    GET_DETAIL_INFO(state, detailInfo){
        state.detailInfo = detailInfo
    }
}
const getters = {
    //当服务器上的数据还没有返回的额时候，detailInfo是空对象，空对象的属性也是空对象，这是
    //控制台会报undefined的错，因此要｜｜一个{}
    categoryView(state){
        return state.detailInfo.categoryView || {};
    },
    //简化产品信息的数据
    skuInfo(state){
        return state.detailInfo.skuInfo || {};
    },
    //产品售卖属性的简化
    spuSaleAttrList(state){
        return state.detailInfo.spuSaleAttrList || [];
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}