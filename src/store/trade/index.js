import {reqUserAddress, reqOrderInfo} from '@/api'

const state = {
    address: [],
    orderInfo: {}
}
const actions = {
    //获取地址信息
    async getUserAddressInfo({commit}) {
        let result = await reqUserAddress()
        // console.log(result)
        if(result.code == 200) {
            commit('GET_USER_ADDRESS', result.data)
        } else {
            return Promise.reject()
        }
    },
    async getOrderInfo({commit}){
        let result = await reqOrderInfo()
        // console.log(result)
        if(result.code == 200){
            commit("GETORDERINFO", result.data)
        }
    }
}
const mutations = {
    GET_USER_ADDRESS(state,address){
        state.address = address
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}