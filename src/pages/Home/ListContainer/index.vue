<template>
    <div class="list-container">
        <div class="sortList clearfix">
            <div class="center">
                <!--banner轮播-->
                <Carousel :list="bannerList"/>
            </div>
            <div class="right">
                <div class="news">
                    <h4>
                        <em class="fl">尚品汇快报</em>
                        <span class="fr tip">更多 ></span>
                    </h4>
                    <div class="clearix"></div>
                    <ul class="news-list unstyled">
                        <li>
                            <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[公告]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[公告]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                        </li>
                    </ul>
                </div>
                <ul class="lifeservices">
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">话费</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">机票</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">电影票</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">游戏</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">彩票</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">加油站</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">酒店</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">火车票</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">众筹</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">理财</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">礼品卡</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">白条</span>
                    </li>
                </ul>
                <div class="ads">
                    <img src="./images/ad1.png" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Swiper from 'swiper'
    export default {
        name:'',
        computed:{
            ...mapState({bannerList:store=>store.home.bannerList})
        },
        //mounted：组件挂载完毕，正常说组件结构（DOM）应该已经有了
        //为什么swiper实例在mounted当中直接书写不行，因为结构还没有完整
        mounted(){
            this.$store.dispatch('getBannerList')
            //可以使轮播图有效果，但是分页的那个功能图标会有延迟
            // setTimeout(()=>{
            //     var mySwiper = new Swiper ('.swiper-container', {
            //         // direction: 'vertical', // 垂直切换选项
            //         loop: true, // 循环模式选项
                    
            //         // 如果需要分页器
            //         pagination: {
            //             el: '.swiper-pagination',
            //             clickable :true,
            //         },
                
            //         // 如果需要前进后退按钮
            //         navigation: {
            //             nextEl: '.swiper-button-next',
            //             prevEl: '.swiper-button-prev',
            //         },
                
            //         // 如果需要滚动条
            //         scrollbar: {
            //             el: '.swiper-scrollbar',
            //         },
            //     })
            // },2000)
                    
        },
        watch:{
            bannerList:{
                immediate:true,
                //虽然监听到了数据变化，但轮播图不能执行成功，原因就是页面上还没有轮播图需要结构
                // 如果执行了handler方法，代表组件实例身上这个属性的属性已经有了【数组：四个元素】
                //当前这个函数执行：只能保证bannerList数据已经有了，但是没办法保证v-for已经执行结束了
                //v-for执行完毕，才有结构【现在在watch中没办法保证的】
                handler(newValue, oldValue) {
                    //使用watch+$nextTick可以成功
                    //vm.$nextTick:将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
                    this.$nextTick(function () {
                        // 当你执行这个回调的时候：保证服务器数据回来了，v-for执行完毕了【轮播图的结构一定已经有了】
                        // Swiper的第一个参数除了可以是一个类选择器也可以是一个标签,document.querySelector('.swiper-container')
                        //在vue中不直接操作dom元素，需要用到dom标签使用ref
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
                    })
                    
                }
            }
        }
        //#region
        //可以放在updated里面可以实现轮播图的效果但是，如果我还有其他响应式的数据，然后一修改每次swiper实例
        //就得重new，这个方法不可取
        // updated(){
        //     var mySwiper = new Swiper ('.swiper-container', {
        //         // direction: 'vertical', // 垂直切换选项
        //         loop: true, // 循环模式选项
                
        //         // 如果需要分页器
        //         pagination: {
        //             el: '.swiper-pagination',
        //             clickable :true,
        //         },
            
        //         // 如果需要前进后退按钮
        //         navigation: {
        //             nextEl: '.swiper-button-next',
        //             prevEl: '.swiper-button-prev',
        //         },
            
        //         // 如果需要滚动条
        //         scrollbar: {
        //             el: '.swiper-scrollbar',
        //         },
        //     })
        // }
        //#endregion

    }
</script>

<style lang="less">
.list-container {
    width: 1200px;
    margin: 0 auto;

    .sortList {
        height: 464px;
        padding-left: 210px;

        .center {
            box-sizing: border-box;
            width: 740px;
            height: 100%;
            padding: 5px;
            float: left;
        }

        .right {
            float: left;
            width: 250px;

            .news {
                border: 1px solid #e4e4e4;
                margin-top: 5px;

                h4 {
                    border-bottom: 1px solid #e4e4e4;
                    padding: 5px 10px;
                    margin: 5px 5px 0;
                    line-height: 22px;
                    overflow: hidden;
                    font-size: 14px;

                    .fl {
                        float: left;
                    }

                    .fr {
                        float: right;
                        font-size: 12px;
                        font-weight: 400;
                    }
                }

                .news-list {
                    padding: 5px 15px;
                    line-height: 26px;

                    .bold {
                        font-weight: 700;
                    }
                }
            }

            .lifeservices {
                border-right: 1px solid #e4e4e4;
                overflow: hidden;
                display: flex;
                flex-wrap: wrap;

                .life-item {
                    border-left: 1px solid #e4e4e4;
                    border-bottom: 1px solid #e4e4e4;
                    margin-right: -1px;
                    height: 64px;
                    text-align: center;
                    position: relative;
                    cursor: pointer;
                    width: 25%;

                    .list-item {
                        background-image: url(~@/assets/images/icons.png);
                        width: 61px;
                        height: 40px;
                        display: block;
                    }

                    .service-intro {
                        line-height: 22px;
                        width: 60px;
                        display: block;
                    }

                    &:nth-child(1) {
                        .list-item {
                            background-position: 0px -5px;
                        }
                    }

                    &:nth-child(2) {
                        .list-item {
                            background-position: -62px -5px;
                        }
                    }

                    &:nth-child(3) {
                        .list-item {
                            background-position: -126px -5px;
                        }
                    }

                    &:nth-child(4) {
                        .list-item {
                            background-position: -190px -5px;
                        }
                    }

                    &:nth-child(5) {
                        .list-item {
                            background-position: 0px -76px;
                        }
                    }

                    &:nth-child(6) {
                        .list-item {
                            background-position: -62px -76px;
                        }
                    }

                    &:nth-child(7) {
                        .list-item {
                            background-position: -126px -76px;
                        }
                    }

                    &:nth-child(8) {
                        .list-item {
                            background-position: -190px -76px;
                        }
                    }

                    &:nth-child(9) {
                        .list-item {
                            background-position: 0px -146px;
                        }
                    }

                    &:nth-child(10) {
                        .list-item {
                            background-position: -62px -146px;
                        }
                    }

                    &:nth-child(11) {
                        .list-item {
                            background-position: -126px -146px;
                        }
                    }

                    &:nth-child(12) {
                        .list-item {
                            background-position: -190px -146px;
                        }
                    }
                }
            }

            .ads {
                margin-top: 5px;

                img {
                    opacity: 0.8;
                    transition: all 400ms;

                    &:hover {
                        opacity: 1;
                    }
                }
            }
        }
    }
}
</style>