<template>
  <div class="index">
    <HeadNav></HeadNav>
    <!--轮播图  -->
    <div class="p-10">
      <Carouse></Carouse>
      <!-- 轮播图下导航栏 -->
      <Nav></Nav>
      <div class="w1 p-10">
        <img src="../assets/banner.webp" class="b-img" alt />
      </div>
    </div>

    <div class="content p-10">
      <!-- 各分类商品 -->
      <GoodBox v-if="cate.length" :titles="cate[0].name" :list="cate[0].list"></GoodBox>
      <!-- 家电 -->
      <Electrical v-if="cate.length" :titles="cate[1].name" :list="cate[1].list"></Electrical>
      <Electrical v-for="(t,i) in cate" :key="i" :titles="t.name" :list="t.list"></Electrical>
    </div>
  </div>
</template>

<script>
import Carouse from '../components/home/carouse/Carouse.vue'
import GoodBox from '../components/home/goodsBox/GoodBox.vue'
import Nav from '../components/home/nav/Nav.vue'
import Electrical from '../components/home/electrical/Electrical.vue'
import HeadNav from '../components/home/HeadNav/HeadNav.vue'



export default {
  name: '',
  props: {},
  data() {
    return {
      cate: []
    }
  },
  components: {
    Carouse,
    Nav,
    GoodBox,
    Electrical,
    HeadNav
  },
  methods: {
    // 获取分类数据
    getCate() {
      this.$api.getCategory().then(res => {
        if (res.code === 200) {
          this.cate = res.data.filter(i => {
            return i.isShow
          })
        }
      })
    }
  },
  mounted() {
    this.getCate()
  },
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>
.index {
  width: 100%;
  background-color: #fff;
  .content {
    background-color: #f5f5f5;
  }
  .b-img {
    width: 100%;
    margin-top: 25px;
    height: 200px;
    margin-bottom: 25px;
  }
}
</style>