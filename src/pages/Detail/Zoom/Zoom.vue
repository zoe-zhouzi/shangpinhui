<template>
  <div class="spec-preview">
    <img :src="bigObj.imgUrl" />
    <!-- 绑定鼠标移动事件 -->
    <div class="event" @mousemove="changeMask($event)"></div>
    <div class="big">
      <img :src="bigObj.imgUrl" ref="big"/>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "Zoom",
    // props:['skuImageList'],
    data(){
      return {
        imgUrl:'',
        index:0
      }
    },
    computed:{
      imgObj(){
        //为什么这里有取空的时候就不会{}.imgUrl报错了
        return this.skuImageList[0] || {}
      },
      ...mapGetters(["skuInfo"]),
      //比如:服务器的数据没有回来,skuInfo空对象,如果空对象.skuImageList->undefined
      skuImageList() {
        return this.skuInfo.skuImageList || [];
      },
      bigObj() {
        return this.skuImageList[this.index] || {};
      },
    },
    mounted(){
      // this.$bus.$on('getImg',(imgUrl)=>{
      //   this.imgUrl = imgUrl;
      // })
      //接受兄弟组件传递过来的索引值
      this.$bus.$on('sendIndex',(index)=>{
          this.index = index;
      })
    },
    methods:{
      changeMask(e){
        let mask = this.$refs.mask;
        let big = this.$refs.big;
        let left = e.offsetX - mask.offsetWidth /2 ;
        let top = e.offsetY - mask.offsetHeight /2 ;
        if(left < 0) left = 0;
        if(left > mask.offsetWidth) left = mask.offsetWidth;
        if(top < 0) top = 0;
        if(top > mask.offsetHeight ) top = mask.offsetHeight;
        mask.style.left = left + 'px';
        mask.style.top = top + 'px';
        big.style.left = -2 * left + 'px';
        big.style.top = -2 * top + 'px';
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>