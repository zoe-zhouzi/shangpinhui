//vee-validate插件：表单验证区域

import Vue from 'vue';
import VeeValidate from 'vee-validate';
//中文的提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN'   // 引入中文 message
Vue.use(VeeValidate);

//表单验证
//表示信息提示用简体中文   ...zh_CN.messages,
VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
    },
    attributes: { // 给校验的 field 属性名映射中文名称
        //如果不写这个字段，假设是手机号输入格式不对，那么显示错误信息会默认显示“phone格式无效”
        //设置这个字段好会显示“手机号格式无效”
        phone: '手机号',
        code: '验证码',
        password: '密码',
        password1: '确认密码',
        agree: '协议'
    }
});


//自定义校验规则
//定义协议必须打勾同意
//第一个参数是自定义校验规则的名字
VeeValidate.Validator.extend('tongyi', {
    validate: value => {
        return value
    },
    getMessage: field => field + '必须同意'
})
