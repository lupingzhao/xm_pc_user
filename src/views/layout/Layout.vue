<template>
  <div>
    <div class="head">
      <!-- 导航 -->
      <div class="flex w jcsb p-lr-10">
        <!-- 导航 -->
        <div class="flex">
          <div v-for="(item,index) in navs.title" :key="index" class="flex tit_item">
            <div class="shou m-lr-10" @click="home(index)">{{ item.name }}</div>
            <div class="line" v-if="index < navs.title.length - 1"></div>
          </div>
        </div>
        <div class="pos-rel">
          <div class="tit_item flex jce head-box">
            <Dropdown @on-click="dropdown" trigger="click" v-if="user">
              <div class="flex">
                <div class="shou mr-10">{{ user.username }}</div>
                <div class="line"></div>
              </div>
              <DropdownMenu slot="list">
                <DropdownItem>退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <div class="flex" v-else>
              <div class="shou m-lr-10" @click="dl">登录</div>
              <div class="line"></div>
              <div class="shou m-lr-10" @click="dl">注册</div>
            </div>

            <!-- <div class="line"></div> -->
            <div class="shou m-lr-10">消息通知</div>
            <div
              class="flex shou p-10 car-box"
              ref="car"
              @mouseenter="enter"
              @mouseleave="leave"
              :class="carsum > 0 ? 'act-car' : 'car'"
            >
              <i class="iconfont icon-gwc1 font-s-18 mr-5" v-if="carsum"></i>
              <i class="iconfont icon-gwc font-s-18 mr-5" v-else></i>
              <div>购物车({{ carsum }})</div>
            </div>
          </div>
          <div
            class="car-centent"
            :class="entering ? 'up' : 'down'"
            ref="carbox"
            @mouseenter="enter"
            @mouseleave="leave1"
          >
            <div class="box">
              <div class="p-10 t-a-c a-box" v-if="carsum === 0">购物车中还没有商品，赶紧选购吧！</div>
              <div class="p-10 t-a-c a-box" v-if="carsum">
                <HeadCar v-if="carData" :carData="carData"></HeadCar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 中间内容 -->
    <div class="caitner">
      <!-- <HeadNav></HeadNav> -->
      <router-view />
    </div>

    <!-- 底部 -->
    <div class="footer">
      <HomeFooter></HomeFooter>
    </div>

    <!-- 侧边信息栏 -->
    <div class="side-ino">
      <div class="p-5 m-b-5 bgc-white">
        <i class="iconfont icon-shouji font-s-18"></i>
        <!-- <div>手机App</div> -->
      </div>
      <div class="p-5 m-b-5 bgc-white">
        <i class="iconfont icon-yonghu"></i>
      </div>
      <div class="p-5 m-b-5 bgc-white">
        <i class="iconfont icon-weixiu"></i>
      </div>
      <div class="p-5 m-b-5 bgc-white">
        <img src="../../assets/side/kf.png" class="side-img" alt />
      </div>
      <div class="p-5 m-b-5 bgc-white" @click="my">
        <i class="iconfont icon-gwc font-s-18"></i>
      </div>
      <div class style="margin-top: 30px;">
        <BackTop></BackTop>
      </div>
    </div>

    <Modal v-model="modal5" @on-ok="login" title="当前登录状态" width="450">
      <div class="t-a-c m-tb-10 font-s-14">检测到您当前没有登录</div>
      <div class>是否前去登录？</div>
    </Modal>
  </div>
</template>

<script>
import nav from '../../nav/index'
import HeadNav from '../../components/home/HeadNav/HeadNav.vue'
import HeadCar from '../../components/car/headCar/HeadCar.vue'
import HomeFooter from '../../components/footer/HomeFooter.vue'
export default {
  name: '',
  props: {},
  data() {
    return {
      total: 0,
      navs: nav,
      entering: false,
      modal5: false,
      carData: ''
    }
  },
  components: { HeadNav, HeadCar, HomeFooter },
  methods: {
    // 检查登录
    checkLogin(next, item) {
      let user = localStorage.getItem('pc-user')
      if (user) {
        next(item)
      } else {
        this.modal5 = true
      }
    },
    // 去登陆
    login() {
      this.$router.push('/Login')
    },
    // 鼠标移入事件 控制财物车显示
    enter(e) {
      this.entering = true
    },
    //移出
    leave(e) {
      this.entering = false
      let top = this.$refs.car.getBoundingClientRect().top
      if (Math.abs(top - e.pageY) > 5) this.entering = false
    },
    // 去购物车
    my() {
      this.$router.push('/Car')
    },
    // 显示隐藏盒子购物车
    leave1(e) {
      // 后去dom元素上下左右的距离getBoundingClientRect()
      let top = this.$refs.carbox.getBoundingClientRect().top
      if (Math.abs(top - e.pageY) > 5) this.entering = false
    },
    // 去首页
    home(i) {
      if (this.$route.path !== '/' && i === 0) {
        // 去首页
        this.$router.push('/')
      }
    },
    // 登录
    dl() {
      this.$router.push('/Login')
    },
    // 下拉菜单
    dropdown(e) {
      localStorage.clear()
      if (this.$route.path !== '/') {
        this.$router.push('/')
      }
      this.$store.commit('setUser', '')
      this.$store.commit('setCarSum', 0)
    },
    // 获取购物车数据
    getCat() {
      this.$api.getCart(this.user._id).then(res => {
        if (res.code === 200) {
          this.carData = {
            data: res.data,
            total: res.total
          }
          this.$store.commit('setCarSum', res.total)
        }
      })
    }
  },
  mounted() {
    if (this.user) {
      this.getCat()
    }
  },
  computed: {
    // 获取vuex的值
    carsum() {
      return this.$store.state.carSum
    },
    user() {
      return this.$store.state.user
    }
  },
  watch: {}
}
</script>

<style lang='scss' scoped>
.caitner {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}

.head {
  background-color: #333333;
  .tit_item {
    color: #b0b0a4;
  }
  .head-box {
    position: relative;
    z-index: 999999999999;
    background-color: #333333;
    width: 300px;
    text-align: right;
  }
  .shou:hover {
    color: #fff;
  }
  .img {
    height: 25px;
    width: 20px;
    margin-right: 5px;
  }

  .car {
    background-color: #424242;
  }
  .car-box {
    &:hover {
      background-color: #fff;
      color: #ff6700;
    }
  }
  .act-car {
    background-color: #ff6700;
    color: #fff;
    &:hover {
      background-color: #fff;
      color: #ff6700;
    }
  }

  .none {
    display: none;
  }
  .block {
    display: block;
  }
  .car-centent {
    position: absolute;
    left: 10px;
    right: 0;
    background-color: #fff;
    z-index: 9999;
  }

  .up {
    animation: up 1s forwards;
  }
  .down {
    animation: down 1s forwards;
  }
  @keyframes up {
    from {
      opacity: 0;
      transform: translateY(-100%);
      box-shadow: 0 0px 0px gainsboro;
    }
    to {
      transform: translateY(0);
      box-shadow: 0 3px 10px gainsboro;
    }
  }
  @keyframes down {
    from {
      transform: translateY(0);
    }
    to {
      opacity: 0;
      display: none;
      transform: translateY(-100%);
    }
  }
}
.color:hover {
  color: #ff6700;
  cursor: pointer;
}
.color1 {
  color: #ff6700;
}
.side-ino {
  .side-img {
    width: 20px;
    height: 20px;
  }
  position: fixed;
  top: 50%;
  right: 30px;
}
</style>