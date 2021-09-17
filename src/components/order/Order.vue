<template>
  <div class="w1 o-list">
    <div class="m-tb-10 font-s-20 font-s-14">商品及优惠券</div>
    <div class="p-10 bor-b">
      <div v-for="(t,i) in list" :key="i" class="flex jcsa">
        <div class="mr-10">
          <img :src="t.goods.cover" alt class="img" />
        </div>
        <div class="name t-a-l">
          {{ t.goods.name }} &nbsp;
          <span v-for="(t1,i1) in t.spec" :key="i1">{{ t1 }}&nbsp;</span>
        </div>
        <div class="pice">{{ t.goods.presentPrice }}元 X {{ t.count }}</div>
        <div class="j-color m-lr-10">{{ t.goods.presentPrice * t.count }}元</div>
      </div>
    </div>
    <div class="m-tb-10 p-10">运费：包邮</div>

    <!-- 底部 -->
    <div class="flex jcsb p-10">
      <div>
        <Dropdown @on-click="cupousc">
          <div class="j-color">
            <i class="iconfont icon-jia3-copy-copy font-s-20"></i>
            优惠券 &nbsp;{{ - cupous }}元
          </div>
          <DropdownMenu slot="list">
            <DropdownItem
              :disabled="Number(t.threshold) >= sum"
              v-for="(t,i) in clist"
              :key="i"
              :name="t.amount"
            >{{ t.name }}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div class="p-10 t-a-r">
        <div class="flex">
          <div class="t">商品件数:</div>
          <div class="v j-color">{{ js }}件</div>
        </div>
        <div class="flex">
          <div class="t">商品总价:</div>
          <div class="v j-color">{{ sum }}元</div>
        </div>
        <div class="flex">
          <div class="t">优惠券抵扣:</div>
          <div class="v j-color">-{{ cupous }}元</div>
        </div>
        <div class="flex">
          <div class="t">运费:</div>
          <div class="v j-color">0元</div>
        </div>
        <div class="flex">
          <div class="t">应付总额:</div>
          <div class="v j-color font-s-20">{{ sum - cupous }}元</div>
        </div>
      </div>
    </div>
    <div class="t-a-r">
      <Button class="mr-10" @click="$router.push('/Car')">返回购物车</Button>
      <Button type="warning" @click="order">立即结算</Button>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: '',
  props: {

  },
  data() {
    return {
      list: JSON.parse(localStorage.getItem('order')),
      // 优惠券
      cupous: 0,
      clist: [],
      address: '',
      mobile: ''
    }
  },
  components: {},
  methods: {
    // 点击优惠券
    cupousc(e) {
      this.cupous = Number(e)
    },
    // 获取优惠券
    getCou() {
      this.$api.getCoupon().then(res => {
        if (res.code === 200) {
          this.clist = res.data.filter(i => {
            return i.isShow
          })
        }
      })
    },
    // 提交订单
    order() {
      this.$api.addOrder({
        // 用户id
        user_id: this.$store.state.user._id,
        // 订单总价
        price: this.sum - this.cupous,
        // 用户地址
        address: this.address,
        // 订单商品数量
        count: this.js,
        // 支付时间
        pay_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        // 商品列表
        goods_list: this.list,
        // 用户电话
        mobile: this.mobile,
      }).then(res => {
        if (res.code === 200) {
          this.$Message.success(res.msg);
          this.$router.back()
        }
      })
    }
  },
  mounted() {
    this.getCou()
  },
  computed: {
    sum() {
      let sum = 0
      this.list.map(i => {
        sum += i.count * i.goods.presentPrice
      })
      return sum
    },
    js() {
      let sum = 0
      this.list.map(i => {
        sum += i.count
      })
      return sum
    },

  },
  watch: {}
}
</script>

<style lang='scss' scoped>
.o-list {
  .img {
    width: 50px;
    height: 50px;
  }
  .name {
    width: 60%;
  }
  .pice {
    width: 10%;
  }
  .t {
    width: 120px;
  }
  .v {
    width: 100px;
  }
}
</style>