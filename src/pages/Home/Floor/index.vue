<template>
     <div class="floor">
        <div class="py-container">
            <div class="title clearfix">
                <h3 class="fl">{{ floorInfo.name }}</h3>
                <div class="fr">
                    <ul class="nav-tabs clearfix">
                        <li class="active" v-for="(nav,index) in floorInfo.navList" :key="index">
                            <a :href="nav.url" data-toggle="tab">{{ nav.text }}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="tab-content">
                <div class="tab-pane">
                    <div class="floor-1">
                        <div class="blockgary">
                            <ul class="jd-list">
                                <li v-for="(kw,index) in floorInfo.keywords" :key="index">{{kw}}</li>
                            </ul>
                            <img :src="floorInfo.imgUrl" />
                        </div>
                        <div class="floorBanner">
                            <Carousel :list="floorInfo.carouselList"/>
                            
                        </div>
                        <div class="split">
                            <span class="floor-x-line"></span>
                            <div class="floor-conver-pit">
                                <img :src="floorInfo.recommendList[0]" />
                            </div>
                            <div class="floor-conver-pit">
                                <img :src="floorInfo.recommendList[1]" />
                            </div>
                        </div>
                        <div class="split center">
                            <img :src="floorInfo.bigImg" />
                        </div>
                        <div class="split">
                            <span class="floor-x-line"></span>
                            <div class="floor-conver-pit">
                                <img :src="floorInfo.recommendList[2]" />
                            </div>
                            <div class="floor-conver-pit">
                                <img :src="floorInfo.recommendList[3]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    export default {
        name:'',
        props:['floorInfo'],
        // 第一次书写swiper时候，在mounted当中书写是不可以的，为什么现在可以
        //第一次书写轮播图的时候，是在当前组件的内部发请求的，动态渲染结构【前台至少服务器数据需要回来】，因此当时这里不行
       /*  mounted(){
            var mySwiper = new Swiper (this.$refs.cur, {
                // direction: 'vertical', // 垂直切换选项
                loop: true, // 循环模式选项
                
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                    clickable :true,
                },
            
                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            
                // 如果需要滚动条
                scrollbar: {
                    el: '.swiper-scrollbar',
                },
            })
        }, */
        /* watch:{
            list:{
                //为什么监听不到list，因为这个数据从来没有发生变化（数据是父亲给的，父亲给的时候就是一个对象，对象里面该有的数据都是有的）
                immediate:true,
                handler(newValue,oldValue){
                    var mySwiper = new Swiper (this.$refs.swiper, {
                        // direction: 'vertical', // 垂直切换选项
                        loop: true, // 循环模式选项
                        
                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                            clickable :true,
                        },
                    
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    
                        // 如果需要滚动条
                        scrollbar: {
                            el: '.swiper-scrollbar',
                        },
                    })

                }
            }
        } */

    }
</script>

<style lang="less">
    .floor {
        margin-top: 15px;

        .py-container {
            width: 1200px;
            margin: 0 auto;

            .title {
                .fl {
                    float: left;
                    color: #c81623;
                    font-size: 20px;
                    line-height: 30px;
                    margin: 9px 0;
                    font-weight: 700;
                }

                .fr {
                    float: right;

                    .nav-tabs {
                        margin: 10px 0 0;
                        display: inline-block;

                        li {
                            float: left;
                            line-height: 18px;

                            a {
                                padding-top: 1px;
                                font-weight: 400;
                                background-color: #fff;

                                &::after {
                                    content: "|";
                                    padding: 0 10px;
                                }
                            }

                            &:nth-child(7) {
                                a {
                                    &::after {
                                        content: "";
                                    }
                                }
                            }

                            &.active {
                                a {
                                    color: #e1251b;
                                }
                            }
                        }
                    }
                }
            }

            .tab-content {
                border-top: 2px solid #c81623;
                border-bottom: 1px solid #e4e4e4;

                .tab-pane {
                    .floor-1 {
                        height: 360px;
                        display: flex;

                        .blockgary {
                            width: 210px;
                            height: 100%;
                            background: #f7f7f7;

                            .jd-list {
                                padding: 15px 0;
                                overflow: hidden;

                                li {
                                    list-style-type: none;
                                    float: left;
                                    width: 40%;
                                    margin: 0 10px;
                                    border-bottom: 1px solid #e4e4e4;
                                    text-align: center;
                                    line-height: 26px;
                                }
                            }

                            img {
                                width: 100%;
                            }
                        }

                        .floorBanner {
                            width: 330px;
                            height: 100%;
                        }

                        .split {
                            width: 220px;
                            height: 100%;
                            position: relative;

                            .floor-x-line {
                                position: absolute;
                                background: #e4e4e4;
                                width: 220px;
                                height: 1px;
                                top: 180px;
                            }

                            .floor-conver-pit {
                                width: 100%;
                                height: 50%;

                                img {
                                    width: 100%;
                                    height: 100%;
                                    transition: all 400ms;

                                    &:hover {
                                        opacity: 0.8;
                                    }
                                }
                            }
                        }

                        .center {
                            border: 1px solid #e4e4e4;
                        }
                    }
                }
            }
        }
    }
</style>