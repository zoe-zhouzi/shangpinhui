<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div class="address clearFix" v-for="(add,index) in address" :key="add.id" @click="changeDefault(add, address)">
        <span class="username" :class="{selected:add.isDefault == 1}">{{ add.consignee }}</span>
        <p >
          <span class="s1">{{ add.userAddress }}</span>
          <span class="s2">{{ add.phoneNum }}</span>
          <span class="s3" v-show="add.isDefault == 1">默认地址</span>
        </p>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left:5px;">货到付款</span>

      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul class="list clearFix" v-for="(cart,index) in detailArrayList" :key="index">
          <li>
            <img :src="cart.imgUrl" alt="" style="width:120px;height:120px;">
          </li>
          <li>
            <p>{{ cart.skuName }}</p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{ cart.orderPrice }}.00</h3>
          </li>
          <li>X{{ cart.skuNum }}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea placeholder="建议留言前先与商家沟通确认" class="remarks-cont" v-model="msg"></textarea>

      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <!-- {{ itemNum }} -->
          <b><i>{{ totalNum }}</i>件商品，总商品金额</b>  
          <!-- {{ cartPriceSum }} -->
          <span>¥{{ originalTotalAmount}}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">应付金额:　<span>¥{{ totalAmount }}.00</span></div>
      <div class="receiveInfo">
        寄送至:
        <span>{{ addressChecked.userAddress }}</span>
        收货人：<span>{{ addressChecked.consignee }}</span>
        <span>{{ addressChecked.phoneNum }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <a class="subBtn" @click="submitOrder">提交订单</a>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: 'Trade',
    data(){
      return {
        msg:'',
        orderId: '',
      }
    },
    mounted() {
      this.$store.dispatch('getUserAddressInfo')
      this.$store.dispatch('getOrderInfo')
      // console.log(this.$store)
    },
    computed: {
      ...mapState({address: (state)=>{
         return state.trade.address
      }}),
      ...mapState({orderInfo: (state)=> {
        return state.trade.orderInfo
      }}),
      detailArrayList(){
        return this.orderInfo.detailArrayList
      },
      originalTotalAmount(){
        this.orderInfo.originalTotalAmount
      },
      totalAmount(){
        return this.orderInfo.totalAmount
      },
      totalNum(){
        return this.orderInfo.totalNum
      },
      //提交订单最终选中的地址
      addressChecked(){
         /* this.address.forEach((add)=>{
            if(add.isDefault == 1) {
              return add
            }
         }) */
         // find 查找数组当中符合条件的元素返回作为最终结果
         //刚开始没有数据的时候，如果不   || {}  会有undefined的报错
         return this.address.find(item=>item.isDefault==1) || {}
      }
    },
    methods:{
      // 方法一
      /* changeDefault(id) {
        this.address.forEach((add)=>{
          console.log(add.consignee,add.isDefault)
          this.address.forEach((add)=>{
            add.isDefault = add.id == id ? 1 : 0
          })
        })
      } */
      // 方法二
      changeDefault(address, addressInfo){
        addressInfo.forEach(item=>item.isDefault=0)
        address.isDefault = 1
      },
      async submitOrder() {
        let tradeNo = this.orderInfo.tradeNo;
        let data = {
          consignee: this.addressChecked.consignee,
          consigneeTel: this.addressChecked.phoneNum,
          deliveryAddress: this.addressChecked.fullAddress,
          paymentWay: 'ONLINE',
          orderComment: this.msg,
          orderDetailList: this.detailArrayList,
        }
        let result = await this.$API.reqSubmitOrder(tradeNo, data)
        console.log(result)
        // 提交订单成功
        if(result.code == 200) {
            this.orderId = result.data
            // 路由跳转 + 路由传递参数
            //提交订单失败
            this.$router.push('/pay?orderId='+this.orderId)
        } else {
          alert(result.datas)
        }

      }
    }
    /* computed: {
        cartInfoList() {
            return this.$store.shopcart.cartList.cartInfoList
        },
        itemNum() {
            let num = 0
            this.cartInfoList.forEach(item => {
                num += item.skuNum
            });
            return num
        },
        cartPriceSum() {
            let sum =  0;
            this.cartInfoList.forEach(e => {
                sum += e.skuPrice * e.skuNum;
            });
            return sum
        }
    } */
}
</script>

<style lang="less" scoped>
  .trade-container {
    .title {
      width: 1200px;
      margin: 0 auto;
      font-size: 14px;
      line-height: 21px;
    }

    .content {
      width: 1200px;
      margin: 10px auto 0;
      border: 1px solid rgb(221, 221, 221);
      padding: 25px;
      box-sizing: border-box;

      .receive,
      .pay {
        line-height: 36px;
        margin: 18px 0;
      }

      .address {
        padding-left: 20px;
        margin-bottom: 15px;

        .username {
          float: left;
          width: 100px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border: 1px solid #ddd;
          position: relative;
        }

        .username::after {
          content: "";
          display: none;
          width: 13px;
          height: 13px;
          position: absolute;
          right: 0;
          bottom: 0;
          background: url(./images/choosed.png) no-repeat;
        }

        .username.selected {
          border-color: #e1251b;
        }

        .username.selected::after {
          display: block;
        }

        p {
          width: 610px;
          float: left;
          line-height: 30px;
          margin-left: 10px;
          padding-left: 5px;
          cursor: pointer;

          .s1 {
            float: left;

          }

          .s2 {
            float: left;
            margin: 0 5px;
          }

          .s3 {
            float: left;
            width: 56px;
            height: 24px;
            line-height: 24px;
            margin-left: 10px;
            background-color: #878787;
            color: #fff;
            margin-top: 3px;
            text-align: center;
          }
        }

        p:hover {
          background-color: #ddd;
        }
      }

      .line {
        height: 1px;
        background-color: #ddd;
      }

      .way {
        width: 1080px;
        height: 110px;
        background: #f4f4f4;
        padding: 15px;
        margin: 0 auto;

        h5 {
          line-height: 50px;
        }

        .info {
          margin-top: 20px;

          .s1 {
            float: left;
            border: 1px solid #ddd;
            width: 120px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin-right: 10px;
          }

          p {
            line-height: 30px;
          }
        }
      }

      .detail {
        width: 1080px;

        background: #feedef;
        padding: 15px;
        margin: 2px auto 0;

        h5 {
          line-height: 50px;
        }

        .list {
          display: flex;
          justify-content: space-between;

          li {
            line-height: 30px;

            p {

              margin-bottom: 20px;
            }

            h4 {
              color: #c81623;
              font-weight: 400;
            }

            h3 {

              color: #e12228;
            }
          }
        }
      }

      .bbs {
        margin-bottom: 15px;

        h5 {
          line-height: 50px;
        }

        textarea {
          width: 100%;
          border-color: #e4e2e2;
          line-height: 1.8;
          outline: none;
          resize: none;
        }
      }

      .bill {
        h5 {
          line-height: 50px;
        }

        div {
          padding-left: 15px;
        }
      }
    }

    .money {
      width: 1200px;
      margin: 20px auto;

      ul {
        width: 220px;
        float: right;

        li {
          line-height: 30px;
          display: flex;
          justify-content: space-between;

          i {
            color: red;
          }
        }
      }
    }

    .trade {
      box-sizing: border-box;
      width: 1200px;
      padding: 10px;
      margin: 10px auto;
      text-align: right;
      background-color: #f4f4f4;
      border: 1px solid #ddd;

      div {
        line-height: 30px;
      }

      .price span {
        color: #e12228;
        font-weight: 700;
        font-size: 14px;
      }

      .receiveInfo {
        color: #999;
      }
    }

    .sub {
      width: 1200px;
      margin: 0 auto 10px;

      .subBtn {
        float: right;
        width: 164px;
        height: 56px;
        font: 700 18px "微软雅黑";
        line-height: 56px;
        text-align: center;
        color: #fff;
        background-color: #e1251b;

      }
    }

  }
</style>