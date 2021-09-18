<template>
  <div class="w1 p-10 recom">
    <Divider>
      <span class="font-s-16">猜你喜欢</span>
    </Divider>
    <div class="m-tb-10">
      <Carousel
        v-model="value1"
        loop
        arrow="never"
        radius-dot
        dots="outside"
        :autoplay="true"
        :autoplay-speed="6000"
      >
        <CarouselItem v-show="goods.length" v-for="(t,i) in goods" :key="i">
          <div class="c-box flex">
            <div class="t-a-c item jcc" v-for="(t1,i1) in t" :key="i1" @click="goto(t1._id)">
              <img :src="t1.cover" alt />
              <div class="m-tb-10">{{ t1.name }}</div>
              <div class="mb-10">{{ t1.presentPrice }}元</div>
              <div class="j-color pj">35.5万人好评</div>
              <div class="flex jcc" @click.stop="addcar(t1, t1.spec)">
                <div class="addcar">加入购物车</div>
              </div>
            </div>
          </div>
        </CarouselItem>
      </Carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  data() {
    return {
      value1: 0,
      goods: []
    }
  },
  components: {},
  methods: {
    getData() {
      // 获取推荐
      this.$api.getRecommend().then(res => {
        if (res.code === 200) {
          for (let i = 0; i < res.data.length; i += 5) {
            this.goods.push(res.data.slice(i, i + 5));
          }
          // this.goods = this.goods.slice(0, 2)
        }
      })
    },
    // 登录状态下的加入购物车
    add({ t1, spec }) {

      let s = []
      spec.map(i => {
        s.push(i.checklist[0])
      })
      this.$api.addCart({
        // 用户id
        user_id: this.$store.state.user._id,
        // 购物车数量
        count: 1,
        // 商品
        goods: t1,
        // 商品规格
        spec: s
      }).then(res => {
        if (res.code === 200) {
          this.$Notice.success({
            title: '加入购物车成功',
            desc: ''
          });
          this.$parent.$parent.getCat()
        }
      })
    },
    // 加入购物车
    addcar(t1, spec) {
      this.$parent.$parent.checkLogin(this.add, { t1, spec })
    },
    // 去详情
    goto(id) {
      this.$router.push({
        path: "/Details",
        query: {
          id: id
        }
      })
    }
  },
  mounted() {
    this.getData()
  },
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>
.recom {
  .c-box {
    .item {
      width: 19%;
      margin-right: 1%;
      padding: 20px;
      height: 250px;
      background-color: #fff;

      img {
        width: 45%;
        height: 100px;
      }
      &:hover {
        .addcar {
          display: block;
        }
        .pj {
          display: none !important;
        }
      }
      // 添加购物车
      .addcar {
        display: none;
        width: 100px;
        padding: 5px 10px;
        border: 1px #ff6700 solid;
        &:hover {
          background-color: #ff6700;
          color: #fff;
        }
      }
    }
  }
}
</style>