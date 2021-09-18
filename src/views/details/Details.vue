<template>
  <div class="details">
    <!-- 头部 -->
    <HeadNav @to="to"></HeadNav>

    <!-- 固定到顶部 -->
    <Affix>
      <div class="w p-10 jcsb head font-s-16">
        <div class="font-w-7">{{ goods.name }}</div>
        <div class="flex">
          <div
            v-for="(t,i) in list"
            :key="i"
            class="t-item act-color"
            :class="{ 'bor-r-1': i < list.length - 1 }"
            @click="scroll(t.link)"
          >{{ t.t }}</div>
          <div>
            <Button type="warning" :disabled="true" style="background-color: #FF6A00;">立即购买</Button>
          </div>
        </div>
      </div>
    </Affix>
    <!-- 内容 -->
    <div class="w1 p-10" id="summary">
      <div class="t-a-c m-tb-10 font-s-16" v-if="isLogin">
        为方便您购买，请提前登录
        <span class="shou j-color mr-10" @click="login">立即登录</span>
        <span @click="colse">X</span>
      </div>
      <!-- 信息 -->
      <Info :goods="goods" v-if="goods" @login="login"></Info>
    </div>
    <!-- 详情 -->
    <div class="w1" id="spec">
      <div class="t-a-c m-tb-10 font-s-18">商品参数</div>
      <div
        v-if="goods.productionDesc"
        v-html="goods.productionDesc[0]"
        class="produ"
        style="line-height:0"
      ></div>
    </div>
  </div>
</template>

<script>
import Info from '../../components/detail/Info.vue'
import HeadNav from '../../components/home/HeadNav/HeadNav.vue'
export default {
  name: '',
  props: {},
  data() {
    return {
      goods: '',
      list: [
        {
          t: '概述页',
          link: 'summary'
        },
        {
          t: '参数页',
          link: 'spec'
        },
        {
          t: 'F码通道',
          link: 'bb'
        },
        {
          t: '咨询客服',
          link: 'bb'
        },
        {
          t: '用户评价',
          link: 'bb'
        },
      ],
      isLogin: true
    }
  },
  components: {
    HeadNav,
    Info
  },
  methods: {
    getData(id) {
      this.$api.goodsDetail(id).then(res => {
        if (res.code === 200) {
          this.goods = res.data
          document.title = res.data.name
          this.goods.sellDesc = this.goods.sellDesc[0].split('\n')
        }
      })
    },
    // 导航栏分发的去详情事件
    to(id) {
      this.getData(id)
    },
    scroll(e) {
      // 页面滚动事件
      // 获取dom元素
      let dom = document.getElementById(e)
      dom.scrollIntoView()
    },
    // 关闭登录提示
    colse() {
      this.isLogin = false
    },
    // 去登陆
    login() {
      this.$router.push('/Login')
    }
  },
  mounted() {
    this.getData(this.$route.query.id)
    if (JSON.parse(localStorage.getItem('pc-user'))) {
      this.isLogin = false
    } else {
      this.isLogin = true
    }
  },
  computed: {},
  watch: {
    // 监听路由变化
    $route: {
      handler(val) {
        if (val.query.id) {
          console.log(val.query.id)
          this.getData(val.query.id)
        }
      },
      deep: true
    }
  }
}
</script>

<style lang='scss' scoped>
.details {
  background-color: #fff;
  .head {
    background-color: #fff;
    box-shadow: 0 3px 10px gray;
    .t-item {
      padding: 0 15px;
    }
  }
  .produ {
    img {
      width: 100%;
      // min-width: 1250px !important;
      // max-width: 1600px !important;
    }
  }
}
</style>