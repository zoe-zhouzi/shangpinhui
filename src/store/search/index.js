import {reqGetSearchInfo} from '@/api'

const state = {
    searchList: {}
}
const mutations = {
    GET_SEARCH_LIST(state, searchList){
        state.searchList = searchList
    }
}
const actions = {
    async getSearchList(context, searchParams){
        let result = await reqGetSearchInfo(searchParams)
        // console.log(result)
        if(result.code == 200){
            context.commit('GET_SEARCH_LIST', result.data)
        }
    },
}
const getters = {
    goodsList(state){
        return state.searchList.goodsList
    },
    trademarkList(){
        return state.searchList.trademarkList
    },
    attrsList(){
        return state.searchList.attrsList
    }

}
export default {
    state,
    mutations,
    actions,
    getters
}