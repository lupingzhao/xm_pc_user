<template>
  <div class="flex jcsb good-info a-i-fs">
    <div class="left flex jcc">
      <div v-if="goods.pic.length">
        <Carousel v-model="value1" arrow="never" loop class="carouser">
          <CarouselItem v-for="(t,i) in goods.pic" :key="i" v-show="t">
            <img :src="t" alt class="img" />
          </CarouselItem>
        </Carousel>
      </div>
      <div v-else>
        <img :src="goods.cover" alt class="img" />
      </div>
    </div>
    <div class="rigth p-10">
      <div class="m-tb-10 font-s-20 font-w-7">{{ goods.name }}</div>
      <div class="m-tb-10">
        <span class="j-color">{{ goods.introduction }}</span>
        <span>
          <span v-for="(t,i) in goods.sellDesc" :key="i">
            {{ t }}
            <span v-if="i < goods.sellDesc.length - 1">|</span>
          </span>
        </span>
      </div>
      <!-- 价格 -->
      <div class="m-tb-10 price">
        <span class="mr-5 font-s-18 j-color">{{ goods.presentPrice }}元</span>
        <span class="del-line">{{ goods.originalPrice }}元</span>
      </div>
      <!-- 定位 -->
      <div class="adress mb-10">
        <CLocation></CLocation>
      </div>

      <!-- 规格 -->
      <div class="m-t-10">
        <div v-for="(t,i) in goods.spec" :key="i">
          <div class="font-s-18 m-tb-10">选择{{ t.name }}</div>
          <div class="flex flex-wrap jcsb">
            <div
              class="spec-item font-s-16 mb-10 t-a-c p-10"
              :class="{ 'act-spec ': specI[i] === i1 }"
              @click="specItem(i, i1, t1)"
              v-for="(t1,i1) in t.checklist"
              :key="i1"
            >{{ t1 }}</div>
          </div>
        </div>
      </div>
      <div class="flex m-tb-10">
        <div class="mr-10">选择数量:</div>
        <InputNumber
          class="t-a-c"
          style="width: 120px;"
          :controls-outside="true"
          :max="10"
          :min="1"
          size="large"
          :step="1"
          v-model="count"
        ></InputNumber>
      </div>
      <div class="flex jcsb">
        <Button
          type="warning"
          class="width-49"
          style="height:40px; background-color: #FF6A00;"
          @click="addcar"
        >加入购物车</Button>
        <Button type="primary" class="width-49" style="height:40px; ">立即购买</Button>
      </div>
    </div>
  </div>
</template>

<script>
import CLocation from '../currentLocation/CLocation.vue'
export default {
  name: '',
  props: {
    goods: {
      type: Object,
      require: true,

    }
  },
  data() {
    return {
      value1: 0,
      specI: [],
      spec: [],
      count: 1,
      user: JSON.parse(localStorage.getItem('pc-user'))
    }
  },
  components: { CLocation },
  methods: {
    // 切换规格
    specItem(i, i1, t) {
      this.$set(this.specI, i, i1);
      this.spec[i] = t
      localStorage.setItem('pc-spec', this.spec)
    },
    // 检查是否登录
    addcar() {
      if (this.user) {
        this.$api.addCart({
          // 用户id
          user_id: this.user._id,
          // 购物车数量
          count: this.count,
          // 商品
          goods: this.goods,
          // 商品规格
          spec: this.spec
        }).then(res => {
          if (res.code === 200) {
            this.$Message.success(res.msg);
            // 调获取购物车的请求
            this.$parent.$parent.getCat()
          }
        })
      } else {
        this.$emit('login');
      }
    }
  },
  mounted() {
    this.goods.spec.map(i => {
      this.specI.push(0)
      this.spec.push(i.checklist[0])
      localStorage.setItem('pc-spec', this.spec)
    })
  },
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>
.good-info {
  .img {
    width: 600px;
    height: 600px;
  }
  .carouser {
    width: 500px !important;
  }
  .left {
    width: 50%;
  }
  .rigth {
    width: 50%;
  }
  .price {
    padding: 25px 0;
    border-bottom: 1px solid #f5f5f5;
  }
  .adress {
    background-color: #fafafa;
    height: 100px;
    padding: 15px;
    border: gray 1px solid;
  }
  .spec-item {
    width: 49%;
    border: 1px solid #e0e0e0;
    &:hover {
      border: 1px solid #ff6700;
      color: #ff6700;
      cursor: pointer;
    }
  }
  .act-spec {
    border: 1px solid #ff6700;
    color: #ff6700;
  }
  .b {
    border: 1px solid #ff6700;
  }
}
</style>