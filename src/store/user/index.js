import { reqGetCode, reqRegister, reqUserLogin, reqUserInfo, reqUserLogout } from "@/api"
import { setToken, getToken, removeToken } from "@/utils/USER_TOKEN"

const actions = {
    //获取验证码的actions
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        // console.log(result)
        if(result.code == 200){
            commit('GET_CODE', result.data)
        } else {
            return Promise.reject()
        }
    },
    async registerUser({commit},userObj){
        let result = await reqRegister(userObj)
        if(result.code == 200){
            commit('REGISTER_USER',userObj)      
        } else {
            return Promise.reject()
        }
    },
    async userLogin({commit}, data){
        let result = await reqUserLogin(data)
        console.log(result)
        if(result.code == 200){
            commit('USER_LOGIN', result.data.token)
            setToken(result.data.token)
        } else {
            return Promise.reject()
        }
    },
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        // console.log(result)
        if(result.code == 200){
            console.log('成功进入if了')
            commit('GET_USER_INFO', result.data)
            return 'ok'
        } 
        else {
            console.log('成功进入else了')
            return Promise.reject(new Error('faile'))
        }
    },
    //用户退出登录
    async userLogout({commit}){
        let result = await reqUserLogout()
        if(result.code == 200) {
            commit('CLEAR')
        } else {
            return Promise.reject()
        }
    }
    
}
const mutations = {
    GET_CODE(state, code){
        state.code = code
    },
    REGISTER_USER(state, userObj){
        state.phone = userObj.phone,
        state.password = userObj.password
    },
    USER_LOGIN(state, token){
        state.token = token
    },
    GET_USER_INFO(state, data) {
        state.name = data.name
    },
    CLEAR(){
        state.name = ''
        state.token = '' 
        removeToken()
    }

}
const state = {
    code: '',
    phone: '',
    password: '',
    token: getToken(),
    name: ''
}
const getters = {}

export default {
    actions, 
    mutations,
    state,
    getters
}