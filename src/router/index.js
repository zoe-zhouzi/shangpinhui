import Vue from 'vue'
import VueRouter from "vue-router"
Vue.use(VueRouter)
//引入路由相关配置
import routes from './routes'
import store from '@/store'

//先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;

// //重写push｜replace
// //第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
VueRouter.prototype.push = function (location, resolve, reject){
    if (resolve && reject){
        //call|apply区别
        //相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点：call与apply传递参数： call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, ()=>{}, ()=>{});
    }
}

const router = new VueRouter({
    mode: 'history',
    //配置路由
    routes,
    //设置跳转到新页面滚动条的位置在最上面
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

export default router;

router.beforeEach(async (to,from,next) => {
    // to：获取到要跳转的路由信息
    // from： 获取到从哪个路由跳转过来来的信息
    // next：next()放行  next(path)放行
    // 方便测试，统一放行
    next()
    // 获取仓库中的token，可以确定用户是登录了
    let token = store.state.user.token
    let name = store.state.user.name
    // 用户登录了
    if(token) {
        // 已经登录还想去登录
       if(to.path == "/login" || to.path == '/register') { 
        console.log(1111)    
        next("/home")
       } else {
            // 已经登录访问是非登录与注册页
            // 存在的问题：左上角的用户信息在刷新的时候会丢失，因此跳转到search的话要保证有用户信息
            // 之前只在home主页中getUserInfo，其他组件中没有
            if(name){
                next()
            } else {
                //登录了且没有用户信息
                //在路由跳转之前获取用户信息
                try {
                    //有信息就放行
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    //token失效了需要重新登录
                    await store.dispatch('userLogout');
                    next('/login')
                }     
            }
       }
    } else {
      // 用户未登录暂时全部放行，将来回首再处理
        // console.log(to.path)
        let toPath = to.path
        // console.log(toPath)
        if( toPath.indexOf('trade')!=-1 || toPath.indexOf('/pay')!=-1  || toPath.indexOf('/center')!=-1) {
            next('/login?redirect='+toPath)
        } else {
            next()
        }
    }
})