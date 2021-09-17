<template>
  <div class="navhead">
    <div @mouseleave="leave" class="p-10">
      <div class="flex jcsb p-10 w1">
        <!-- 顶部导航栏 -->
        <div>
          <img src="../../../assets/icon1/logo-mi2.png" class="logo" alt @click="home" />
        </div>
        <div class="flex">
          <div class="p-10 font-s-16 act-color" v-if="ishome" @mouseenter="enter1">全部商品分类</div>
          <div
            @mouseenter="enter(t._id)"
            v-for="(t,i) in nav"
            :key="i"
            class="act-color nav-item p-10 font-s-16"
          >{{ t.name }}</div>
          <div class="ml-25 headinput pos-rel">
            <Input
              v-model="value1"
              @on-focus="focus"
              clearable
              search
              enter-button
              @on-blur="blur"
              @on-search="seach(value1)"
              :placeholder="placeholder"
            />
            <div class="hot-box p-10" v-show="ishot">
              <div class="p-b-10 hot-item" @click="seach('', 1)">全部商品</div>
              <div
                v-for="(t,i) in hotWord"
                @click="seach(t.name)"
                class="p-b-10 hot-item"
                :key="i"
              >{{ t.name }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- hover商品盒子 -->
      <div class="goods-box bgc-white" v-if="hAll">
        <div class="w1">
          <AllCategory @to="go"></AllCategory>
        </div>
      </div>

      <!-- 推荐导航下属商品 -->
      <div class="goods-box p-10 bgc-white" @mouseleave="leave" v-if="recmGoods.length">
        <div class="w box flex-wrap">
          <div
            v-for="(t,i) in recmGoods"
            :key="i"
            class="t-a-c p-tb-10 box-item"
            @click="go(t._id)"
          >
            <div class="border-r">
              <img :src="t.cover" alt class="img m-tb-10" />
            </div>
            <div>{{ t.name }}</div>
            <div class="j-color">{{ t.presentPrice }}元起</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AllCategory from "../../allCategory/AllCategory.vue"
export default {
  name: '',
  props: {},
  data() {
    return {
      nav: [],
      value1: '',
      recmGoods: [],
      ishome: false,
      hAll: false,
      hotWord: [],
      ishot: false,
      placeholder: '请输入关键字',
      timer: null
    }
  },
  components: {
    AllCategory
  },
  methods: {
    getData() {
      this.$api.getRecommendNav().then(res => {
        if (res.code === 200) {
          this.nav = res.data
        }
      })
    },
    // 输入框获取焦点时
    focus() {
      this.recmGoods = []
      this.hAll = false
      this.ishot = true
      clearInterval(this.timer)
    },
    blur() {
      setTimeout(() => {
        this.ishot = false
      }, 300)
      this.hotqh()
    },
    // 输入框搜索
    seach(val, isall) {
      this.ishot = true
      val ? this.value1 = val : this.value1 = "全部商品"
      if (!val && !isall) {
        // 是否搜索的placeholder的值
        val = this.placeholder
      }
      // if (this.$route.path === '/Seach') {
      //   // 当前在搜索页时分发事件
      //   this.$emit('seach', val);
      // } else {
      this.$router.push({
        path: "/Seach",
        query: {
          keyWord: val
        }
      })
      // }
    },
    // 去详情页
    go(id) {
      // if (this.$route.path === '/Details') {
      //   // 分发事件
      //   this.$emit('to', id);
      // } else {
      this.$router.push({
        path: "/Details",
        query: {
          id: id
        }
      })

      // }
      this.recmGoods = []
    },
    // 去首页
    home() {
      if (this.$route.path !== '/') {
        // 去首页
        this.$router.push('/')
      }
    },
    // 鼠标移入
    enter(id) {
      this.getData1(id)
      this.hAll = false
      this.blur()
    },
    // 鼠标移入
    enter1(id) {
      this.hAll = true
      this.recmGoods = []
    },
    // 获取推荐商品
    getData1(id) {
      this.$api.getNavGoods(id).then(res => {
        if (res.code === 200) {
          this.recmGoods = res.data
        }
      })
    },
    // 移除
    leave(i) {
      this.recmGoods = []
      this.hAll = false
    },
    // 推荐商品盒子的移除效果

    // 搜索热词
    hot() {
      this.$api.getSearchWords().then(res => {
        if (res.code === 200) {
          this.hotWord = res.data
          this.placeholder = this.hotWord[0].name
        }
      })
    },
    // 定时随机切换
    hotqh() {
      let a = Math.floor(Math.random() * this.hotWord.length);
      this.timer = setInterval(() => {
        a = Math.floor(Math.random() * this.hotWord.length);
        this.placeholder = this.hotWord[a].name
      }, 5000)

    }
  },
  mounted() {
    this.getData()
    this.hot()
    this.hotqh()
    // 是否显示全部分类
    if (this.$route.path !== '/') {
      this.ishome = true
    } else {
      this.ishome = false
    }
  },
  computed: {},
  watch: {
    $route(val) {
      if (val.path !== '/') {
        this.ishome = true
      } else {
        this.ishome = false
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.navhead {
  .hot-box {
    position: absolute;
    background-color: #fff;
    right: 0;
    left: 0;
    z-index: 888;
    border: 1px solid #ff6700;
    .hot-item:hover {
      background-color: #fafafa;
      cursor: pointer;
    }
  }
  .logo {
    width: 60px;
    height: 60px;
  }
  .goods-box {
    border-top: 1px solid rgb(187, 186, 186);
    position: absolute;
    right: 0;
    left: 0;
    z-index: 999999;
    box-shadow: 0 2px 6px -1px gray; //底部阴影
    .box-item {
      width: ceil(96%/6);
    }
    .box {
      overflow-x: scroll;
      .img {
        width: 120px;
        height: 150px;
      }
    }
  }
}
</style>