let myPlugins = {};
myPlugins.install = function (Vue, options) {
    // console.log(options);
    // Vue.protptype.$bus:任何组件都能使用
    // Vue.directive
    // Vue.component
    // Vue,filter
    Vue.directive(options.name, (element,params)=>{
        element.innerHTML = params.value.toUpperCase();
    })

}

export default myPlugins;