import {reqCategoryList, reqBannerList, reqFloorList} from '@/api'


const state = {
    categoryList: [],
    bannerList: [],
    floorList: [],
}
const mutations = {
    CATEGORY_LIST(state, categoryList){
        state.categoryList = categoryList
        // console.log(state.categoryList)
    },
    GET_BANNER_LIST(state, bannerList){
        state.bannerList = bannerList
        // console.log(state.bannerList)
    },
    GET_FLOOR_LIST(state, floorList){
        state.floorList = floorList
        // console.log(state.floorList)
    },
}
const actions = {
    // 通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
    async categoryList(context){
        let result = await reqCategoryList()
        if(result.code == 200){
            context.commit('CATEGORY_LIST', result.data)
        }
    },
    async getBannerList(context){
        // 通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
        let result = await reqBannerList()
        if(result.code == 200){
            context.commit("GET_BANNER_LIST",  result.data)
        }
    },
    //有两个Floor组件，后台传过来的数据是个数组，数组里面有两个Floor的数据
    //我们需要在Floor中遍历这个数组，因此不能在Floor组件中触发这个数据
    async getFloorList(context){
        // 通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
        let result = await reqFloorList()
        if(result.code == 200){
            context.commit("GET_FLOOR_LIST",  result.data)
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}