<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 三级联动面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i @click="removeCategoryName">×</i></li>
            <!-- header中的搜索框传参形成的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeyword">×</i></li>
            <!-- 品牌选择形成的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1]}}<i @click="removeTrademark">×</i></li>
            <!-- 品牌属性选择形成的面包屑 -->
            <li class="with-x" v-for="(prop,index) in searchParams.props" :key="index">{{ prop.split(':')[1]}}<i @click="removeProp(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector 
          :trademarkList="trademarkList" 
          :attrsList="attrsList" 
          @trademarkInfo="trademarkInfo"
          @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}">
                  <a @click="changeOrder(1)">综合<span v-show="isOne" class="iconfont" :class="{'icon-up': isAsc, 'icon-down': isDesc}"></span></a>
                </li>
                <li :class="{active:isTwo}">
                  <a @click="changeOrder(2)">价格<span v-show="isTwo" class="iconfont" :class="{'icon-up': isAsc, 'icon-down': isDesc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品展示列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good,index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <!-- <img :src="good.defaultImg" /> -->
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>{{ good.hotScore }}</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <h1>{{ searchList }}</h1>
          <Pagination 
            :pageNo="searchParams.pageNo" 
            :pageSize="searchParams.pageSize" 
            :total="total" 
            :continues="5"
            @getPage="getPage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState,mapGetters} from 'vuex'
  import SearchSelector from './SearchSelector/SearchSelector'
  export default {
    name: 'Search',
    data(){
      return {
        searchParams:{
          //一级分类id
          category1Id: "",
          //二级分类id
          category2Id: "",
          //三级分类id
          category3Id: "", //61
          //分类名字
          categoryName: "", // 手机
          keyword: "", // 小米
          //排序
          order: "1:desc", //1:desc
          //分页器，代表是第几页
          pageNo: 1,
          pageSize: 10,
          //平台售卖属性带的参数
          props: [], //"1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"
          //品牌
          trademark: "" //4:小米
        },
        isShow:true,
      }
    },
    watch:{
      $route:{
        handler(newValue, oldValue){
          //再次发送请求之前整理给服务器的参数
          Object.assign(this.searchParams, this.$route.query, this.$route.params);
          //再次发起ajax请求
          this.getData();
          //分类名字不需要置为undefined,因为每次某个categoryId发生变化时，相应的categoryName也会随之变化
          this.searchParams.category1Id = undefined;
          this.searchParams.category2Id = undefined;
          this.searchParams.category3Id = undefined;
        }
      }
    },
    components: {
      SearchSelector
    },
    computed:{
      ...mapState({searchList:(state)=>state.searchList}),
      ...mapGetters(['goodsList','trademarkList','attrsList']),
      //获取搜索的数据总条数
      ...mapState({total:(state)=>state.search.searchList.total}),
      isOne(){
        return this.searchParams.order.split(':')[0] != 2
      },
      isTwo(){
        return this.searchParams.order.split(':')[0] != 1
      },
      isAsc(){
        return this.searchParams.order.split(':')[1] != 'desc'
      },
      isDesc(){
        return this.searchParams.order.split(':')[1] != 'asc'
      }
    },
    beforeMount(){
      /* this.searchParams.category1Id = this.$route.query.category1Id
      this.searchParams.category2Id = this.$route.query.category2Id
      this.searchParams.category3Id = this.$route.query.category3Id
      this.searchParams.categoryName = this.$route.query.categoryName
      this.searchParams.keyword = this.$route.params.keyword */
      //ES6的新语法，作用相当于上面四行
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
    },
    //组件挂载完毕仅仅执行一次
    mounted(){
      //搜索页应该根据不同参数传回不同的数据，但如果在mounted中的话只能请求一次，因此定义在methods里
      //可以对不同的参数进行不同的请求
      // this.$store.dispatch('getSearchList',{})
      // console.log(this.searchParams)
      this.getData();
      // console.log(this.searchParams.order.split(':')[0])
    },
    methods:{
      getData(){
        this.$store.dispatch('getSearchList',this.searchParams)
      },
      //移除query参数面包屑回调
      removeCategoryName(){
        this.searchParams.category1Id = undefined
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined
        this.searchParams.categoryName = undefined
        //搜索框那里是params参数，面包屑那里是query参数，然后删除面包屑的时候不应该把params参数也删掉
        //因此这里要进行一个判断
        if (this.$route.params) {
            this.$router.push({name:'search',params: this.$route.params})
        }
        
      },
      //移除params参数面包屑回调
      removeKeyword(){
        this.searchParams.keyword = undefined
        //js中空对象和空数组的判断为true
        if (this.$route.query) {
            this.$router.push({name:'search',query: this.$route.query})
            this.$bus.$emit('clear')
        }
      },
      //品牌自定义事件的回调
      trademarkInfo(trademark){
        // console.log('我是父组件Search',trademark)
        this.searchParams.trademark = trademark
        this.getData();
      },
      //移除品牌面包屑回调
      removeTrademark(){
        //选择品牌时不会发生路由的跳转，路径不会有任何变化，因此用不到push
        this.searchParams.trademark = undefined
        //上面有路由变化的几个面包屑当它在使用push方法的时候有传递参数给$route
        //而watch又监测着$route，发现$route一变化就会在handler里面调用请求参数的方法
        this.getData()
      },
      //品牌属性自定义事件的回调
      attrInfo(prop){
        if(this.searchParams.props.indexOf(prop) === -1) this.searchParams.props.push(prop);
        // console.log(this.searchParams.props)
      },
      //移除品牌属性面包屑回调
      removeProp(index){
        this.searchParams.props.splice(index,1)
        this.getData()
      },
      //点击排序相关操作
      changeOrder(flag){
        //上一次的排序属性
        let originFlag = this.searchParams.order.split(':')[0];
        //上一次的排序方式
        let originSortType = this.searchParams.order.split(':')[1];
        //如果是对同一个属性排序，则只需要更换排序的方式
        if(flag == originFlag){
          this.searchParams.order = `${flag}:${'desc' == originSortType ? 'asc':'desc'}`
          // console.log(this.searchParams.order)
          //如果换另外一种排序，默认刚开始排序都是降序
        }else{
          this.searchParams.order = `${flag}:desc`
          // console.log(this.searchParams.order)
        }
        this.getData()
      },
      //得到当前页的自定义事件回调方法
      getPage(pageNo){
        this.searchParams.pageNo = pageNo
        this.getData();
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

      }
      
    }
  }
  
</style>