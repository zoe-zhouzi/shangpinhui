<template>
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveIndex"  @click="goSearch">
                <h2 class="all" @click="showTypeNav">全部商品分类</h2>
                <!-- 三级联动菜单 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                    <!-- 利用事件委派和编程式导航 -->
                        <div class="all-sort-list2">
                            <!-- 一级菜单 -->
                            <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId">
                                <h3 @mouseenter="enterIndex(index)" :class="{cur:currentIndex == index}">
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                                </h3>
                                <!-- 二、三级菜单 -->
                                <div class="item-list clearfix" :style="{display: currentIndex == index ? 'block': 'none'}">
                                    <div class="subitem"  v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
                      
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            
        </div> 
    </div>
</template>

<script>
    import throttle from 'lodash/throttle'
    import {mapState} from 'vuex'
    export default {
        name:'TypeNav',
        data(){
            return {
                currentIndex: -1,
                show:true
            }
        },
        computed:{
            // ...mapState(['categoryList'])
            ...mapState({
                categoryList:state=>state.home.categoryList
            })
        },
        methods:{
            enterIndex(index){
                this.currentIndex = index
                console.log(this.currentIndex)
            },
            /* enterIndex:throttle(function (index){
                this.currentIndex = index
                console.log(this.currentIndex)
            },10), */
            leaveIndex(){
                this.currentIndex = -1
            },
            // 进行路由跳转的方法
            goSearch(event){
                //最好的解决方法：编程式导航 + 事件委派
                //存在一些问题：事件委派，是把全部的子节点【h3、dt、dl、em】的事件委派给父亲节点
                //点击a标签的时候才会进行路由跳转【怎么能确定点击的一定是a标签呢】
                
                //第一个问题：把子节点当中a标签，加上自定义属性data-categoryName，其余的子节点是没有的
                let Element = event.target
                // console.log(Element)

                //获取到当前触发这个事件的节点【h3、a、dt、dl】，需要带有data-categoryname这样节点的【一定是a标签】
                // 节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
                let {categoryname, category1id, category2id, category3id} = Element.dataset;

                if(categoryname){
                    //整理路由跳转到的参数
                    var locations = {
                        name: "search",
                        query: { categoryName: categoryname },
                        params: this.$route.params
                    };
                    //一级分类、二级分类、三级分类的
                    if(category1id){
                        locations.query.category1Id = category1id;
                    }else if(category2id){
                        locations.query.category2Id = category2id;
                    }else if(category3id){
                        locations.query.category3Id = category3id;
                    }

                    if (this.$route.params.keyword) {
                        locations.params = this.$route.params;
                    }

                    this.$router.push(locations);
                }
            },
            //点击全部商品分类显示三级联动
            showTypeNav(){
                this.show = !this.show
            }
        },
        mounted(){
            // 如果是search页默认不显示三级联动
            if(this.$route.path != '/home'){
                this.show = false
            }
        }
        //组件挂载完毕：可以向服务器发送请求
        // mounted(){
        //     //通知Vuex发请求，获取数据，存储于仓库当中
        //     //因为TypeNav不仅home用了，search也用了，如果home和search里面都写了的话
        //     //那么每次跳转到时候可能都要请求一次数据，浪费资源。因此把下面这句请求放到app的mounted里面去
        //     // this.$store.dispatch('categoryList')
        // },
        
    }
</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }

                .cur {
                    background: skyblue;
                }

                // .item:hover {
                //     background: skyblue;
                // }
            }
        }

         /*过渡动画:商品分类 进入阶段*/
        .sort-enter {
            height: 0px;
        }

        .sort-enter-active {
            transition: all 0.3s;
        }
        .sort-enter-to {
             height: 461px;
        }
    }
}
</style>