//当前这个模块：API
import requests from './request';

import mockRequests from './mockRequest';


//三级联动接口
// /api/product/getBaseCategoryList get 无参数
//发请求：axios发请求返回结果Promise对象
export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList'})

//获取banner数据
export const reqBannerList = ()=>mockRequests({url:'/banner'})

//#获取floor数据,这是get请求然后不需要带参因此箭头函数中不需要传入任何参数
export const reqFloorList = ()=>mockRequests({url:'/floor'})

//搜索模块的请求接口函数:
//将来根据不同的搜索条件,需要给服务器携带不同的参数
//请求体携带搜索的参数
//搜索的条件:它应该是一个对象10K,可有可无，但是data至少是一个空对象
//没有发现:
//第一步:整理搜索的参数
//第二步：根据最新的搜索参数，获取最新的数据展示!!
export const reqGetSearchInfo = (data)=>requests({url:'/list', method:'post', data})

// 获取产品详情信息的接口   URI：/api/item/{ skuId }   接口方式：get
export const reqGetDetailInfo = (skuId)=>requests({url:`/item/${skuId}`})

// 添加或修改购物车   URI：/api/item/{ skuId }   接口方式：get
export const reqAddOrUpdateCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

//获取购物车的数据,要存入一个
export const reqShopCart = ()=>requests({url:'/cart/cartList', method:'get'})

//删除购物车商品请求
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`, method:'delete'})

//切换商品选中的状态
export const reqUpdateCheckedById = (skuId, isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取验证码
// /user/passport/sendCode/{phone} get
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`})

// 用户注册
// /user/passport/code get
export const reqRegister = (data) => requests({url: '/user/passport/register', method: 'post', data})

// 用户登录
// /user/passport/login  method：post
export const reqUserLogin = (data) => requests({url: '/user/passport/login', method: 'post', data})

//获取用户信息
// /user/passport/auth/getUserInfo method:post
export const reqUserInfo = () => requests({url: '/user/passport/auth/getUserInfo', method: 'get'})

//用户退出登录
// /user/passport/logout method：get
export const reqUserLogout = () => requests({url: '/user/passport/logout', method: 'get'})

// 获取用户地址信息
// /user/userAddress/auth/findUserAddressList
export const reqUserAddress = () => requests({url: '/user/userAddress/auth/findUserAddressList', method: 'get'})

//获取商品清单
// /order/auth/trade
export const reqOrderInfo = () => requests({url: '/order/auth/trade', method: 'get'})

//提交订单
// /order/auth/submitOrder?tradeNo={tradeNo} method:post  
export const reqSubmitOrder = (tradeNo, data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`, method:'post', data})

// 获取支付信息接口
// /payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`, method:'get'})

// 查询支付结果
// /payment/weixin/queryPayStatus/{orderId} method：get
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`, method: 'get'})

// 获取我的订单列表
// /api/order/auth/{page}/{limit}
export const reqMyOrderList = (page, limit) => requests({url:`/order/auth/${page}/${limit}`, method: 'get'})
