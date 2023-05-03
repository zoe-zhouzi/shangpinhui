<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide,index) in skuImageList" :key="index">
        <img :src="slide.imgUrl"  
          @click="handler(index)"
          :class="{active: currentIndex == index}">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    props:['skuImageList'],
    data(){
      return {
        //控制小图类名的索引值
        currentIndex: 0,
      }
    },
    watch:{
      skuImageList:{
            //为什么监听不到list，因为这个数据从来没有发生变化（数据是父亲给的，父亲给的时候就是一个对象，对象里面该有的数据都是有的）
            immediate:true,
            handler(){
                this.$nextTick(() => {
                    var mySwiper = new Swiper (this.$refs.cur, {
                        //设置水平方向切换
                        direction: "horizontal",
                        // loop: true, // 循环模式选项
                
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        //展示区域同时展示三张图片
                          slidesPerView: 3,
                    })
                })

            }
        }
    },
    methods:{
      //小图的点击事件
      handler(index) {
         //修改响应式数据存储当前用户点击的索引值
        this.currentIndex = index;
        //全局事件总线，通知兄弟当前图片的索引值
        this.$bus.$emit("sendIndex", index);
      }
    }
    
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>