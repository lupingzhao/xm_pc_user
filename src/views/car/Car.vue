<template>
  <div class="car">
    <div class="w1">
      <!-- 头部 -->
      <div class="flex jcsb p-10 bor-b">
        <div class="flex">
          <a href="/">
            <img src="../../assets/icon1/logo-mi2.png" class="img" alt />
          </a>
          <div class="font-s-20 m-lr-10">我的购物车</div>
          <div>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</div>
        </div>
        <div class="flex j-color" v-if="!user">
          <div @click="$router.push('/Login')">登录</div>
          <div class="m-lr-10" @click="$router.push('/Login')">注册</div>
        </div>
      </div>

      <!-- 商品 -->
      <div id="goods" ref="goods">
        <div class="m-tb-25" v-show="carData.length > 0">
          <Card class="width-100 p-10">
            <!-- \全选 -->
            <div class="flex goods-box">
              <Checkbox v-model="checkAll" @on-change="handleCheckAll">
                <span class="font-s-16 m-lr-10">全选</span>
              </Checkbox>
              <div class="box-img"></div>
              <div class="spec1"></div>
              <div class="price t-a-c">价格</div>
              <div class="step">数量</div>
              <div class="t-price j-color">总价</div>
            </div>

            <div v-for="(t,i) in carData" :key="i" class="flex p-tb-10 goods-box bor-b">
              <Checkbox v-model="t.check" @on-change="sigel"></Checkbox>
              <img :src="t.goods.cover" alt @click="go(t.goods._id)" />
              <div class="spec">
                <span>{{ t.goods.name }}</span>
                <span class="m-l-10" v-for="(t1,i1) in t.spec" :key="i1">{{ t1 }}</span>
              </div>
              <div class="price t-a-c">{{ t.goods.presentPrice }}元</div>
              <div class="step">
                <InputNumber :max="10" :min="1" :step="1" v-model="t.count"></InputNumber>
              </div>
              <div class="t-price j-color">{{ t.goods.presentPrice * t.count }}元</div>
              <div class="shou" @click="del(t._id, i)">X</div>
            </div>

            <Affix :offset-bottom="20">
              <div class="order flex bgc-low-gray p-10 jcsb m-tb-25" ref="botomm">
                <div class="flex">
                  <div class="m-lr-10 act-color" @click="$router.push('/')">继续购物</div>
                  <div>
                    共计
                    <span class="j-color">{{ total }}</span>
                    件商品，已选择
                    <span class="j-color">{{ checkAllGroup.length }}</span>
                    件
                  </div>
                </div>
                <div class="flex">
                  <div class="m-lr-10">
                    合计：
                    <span class="font-s-18 j-color">{{ sum }}</span>
                    元
                  </div>
                  <div class="m-lr-10">
                    <Button
                      type="warning"
                      @click="order"
                      style="background-color: #FF6A00;"
                      class="btn"
                    >去结算</Button>
                  </div>
                </div>
              </div>
            </Affix>
          </Card>
        </div>
      </div>
      <!-- 没有商品时 -->
      <div class="flex jcc" v-if="carData.length < 0 || !user" style="margin-top: 10%;">
        <img src="https://cdn.cnbj1.fds.api.mi-img.com/staticsfile/cart/cart-empty.png" alt />
        <div class="m-lr-10">
          <div class="font-s-20 mb-10">您的购物车还是空的！</div>
          <div v-if="!user" class="m-tb-25">登录后将显示您之前加入的商品</div>
          <div>
            <Button type="warning" @click="$router.push('/')">立即去选购</Button>
          </div>
        </div>
      </div>
    </div>

    <Modal v-model="modal1" width="250" @on-ok="ok">
      <div class="t-a-c m-tb-10">是否删除该商品？</div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  data() {
    return {
      user: this.$store.state.user,
      carData: [],
      total: 0,
      checkAll: true,
      checkAllGroup: [],
      modal1: false,
      delid: '',
      delindex: -1
    }
  },
  components: {},
  methods: {
    // 获取购物车数据
    getCat() {
      this.$api.getCart(this.user._id).then(res => {
        if (res.code === 200) {
          res.data.map(i => {
            this.$set(i, 'check', true);
          })
          this.carData = res.data
          this.total = res.total
          this.$store.commit('setCarSum', res.total)
        }
      })
    },
    // 全选
    handleCheckAll(e) {
      this.carData.map(i => {
        i.check = this.checkAll
      })
      this.checkAllGroup = this.carData.filter(i => {
        return i.check
      })
    },
    // 单选
    sigel() {
      this.checkAllGroup = this.carData.filter(i => {
        return i.check
      })
      if (this.checkAllGroup.length === this.carData.length) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
    },
    //删除
    del(id, i) {
      this.delid = id
      this.delindex = i
      this.modal1 = true
    },
    // /确认删除
    ok() {
      this.$api.delCart({
        // 用户id
        user_id: this.$store.state.user._id,
        // 商品id
        id: this.delid
      }).then(res => {
        if (res.code === 200) {
          this.$Message.success(res.msg);
          this.carData.splice(this.delindex, 1)
        }
      })
    },
    // 购买
    order() {
      if (this.checkAllGroup.length) {
        // 添加订单
        localStorage.setItem('order', JSON.stringify(this.checkAllGroup))
        this.$router.push('/Order')
      } else {
        this.$Message.error('没有选择要购买的商品')
      }
    },
    // 滚动时固定底部
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // console.log(scrollTop)
      // console.log(document.body.clientHeight)
      let a = this.$refs.goods.getBoundingClientRect()
      // let h = a.height + a.top
      // console.log(a)
      // console.log(a.top)s
    },
    // 去详情
    go(id) {
      this.$router.push({
        path: "/Details",
        query: {
          id: id
        }
      })
    }
  },
  mounted() {
    if (user) {
      this.getCat()
    }
    // window.addEventListener('scroll', this.handleScroll)
  },
  computed: {
    sum() {
      let sum = 0
      this.checkAllGroup = this.carData.filter(i => {
        return i.check
      })
      this.carData.map(i => {
        if (i.check) {
          sum += i.goods.presentPrice * i.count
        }
      })
      return sum
    }
  },
  watch: {}
}
</script>

<style lang='scss' scoped>
.car {
  .img {
    width: 80px;
    height: 80px;
  }
  .goods-box {
    img {
      width: 120px;
      height: 120px;
      margin-right: 10px;
    }
    .box-img {
      width: 75px;
    }
    .spec {
      width: 40%;
      margin-left: 10px;
    }
    .spec1 {
      width: 40%;
      margin-left: 10px;
    }
    .price {
      width: 10%;
    }
    .step {
      width: 150px;
    }
    .t-price {
      width: 10%;
      margin-right: 20px;
    }
  }
  .btn {
    height: 40px;
    margin-left: 10px;
    width: 200px;
  }
}
</style>