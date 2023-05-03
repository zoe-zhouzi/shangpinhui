//如果把所有信息都写在index.js中，会导致信息过多，因此新建一个文件专门当路由配置信息
/* import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
 */
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'
//配置路由
const routes = [
    {
        path: '/center',
        component: Center,
        // component: ()=>import('@/pages/Center'),
        mate: {show:false},
        children: [
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            },
        ]
    },
    {
        path: '/paysuccess',
        component:  ()=>import('@/pages/PaySuccess'),
        meta: {show:false}
    },
    {
        path: '/pay',
        component: ()=>import('@/pages/Pay'),
        meta: {show:false},
        //beforeEnter 守卫 只在进入路由时触发，不会在 params、query 或 hash 改变时触发。
        // 例如，从 /users/2 进入到 /users/3 或者从 /users/2#info 进入到 /users/2#projects。
        // 它们只有在 从一个不同的 路由导航时，才会被触发。
        beforeEnter: (to, from, next) => {
            if(from.path=='/trade') {
                next()
            } else {
                next(false)
            }
        },
    },
    {
        path: '/trade',
        component: ()=>import('@/pages/Trade'),
        meta: {show:false},
        beforeEnter: (to, from, next) => {
            if(from.path=='/shopcart') {
                next()
            } else {
                next(false)
            }
        },

    },
    {
        path: '/shopcart',
        component: ()=>import('@/pages/ShopCart'),
        meta: {show:true}
    },
    {
        path:'/addcartsuccess',
        component: ()=>import('@/pages/AddCartSuccess'),
        meta:{show:true}
    },
    {
        path: '/home',
        component: ()=>import('@/pages/Home'),
        meta:{show:true}
    },
    {   
        name: 'search',
        //在注册路由的时候,如果这里占位，切记务必要传递params
        path: '/search/:keyword?',
        component: ()=>import('@/pages/Search'),
        meta:{show:true}
    },
    {
        path: '/login',
        component: ()=>import('@/pages/Login'),
        meta:{show:false}
    },
    {
        path: '/register',
        component: ()=>import('@/pages/Register'),
        meta:{show:false}
    },
    {
        path: '/detail/:skuId',
        component: ()=>import('@/pages/Detail'),
        meta:{show:true}
    },
    {
        path: '*',
        redirect: '/home'
    }
]

export default routes;
