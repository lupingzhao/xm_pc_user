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
          <div class="tit_item flex">
            <Dropdown style="margin-right: 10px" @on-click="dropdown" trigger="click" v-if="user">
              <span class="shou">{{ user.username }}</span>
              <DropdownMenu slot="list">
                <DropdownItem>退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <div class="flex" v-else>
              <div class="shou m-lr-10" @click="dl">登录</div>
              <div class="line"></div>
              <div class="shou m-lr-10" @click="dl">注册</div>
            </div>

            <div class="line"></div>
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
            :class="entering ? 'dh' : 'dh1'"
            ref="carbox"
            @mouseenter="enter"
            @mouseleave="leave1"
          >
            <div class="p-10 t-a-c a-box" v-if="carsum === 0 && entering">购物车中还没有商品，赶紧选购吧！</div>
            <div class="p-10 t-a-c a-box" v-if="carsum && entering">
              <HeadCar v-if="carData" :carData="carData"></HeadCar>
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
      <div class="c">
        <div class="flex jcsa foot1 width-100 bor-b">
          <div
            v-for="(i,index) in navs.foot"
            :key="index"
            class="flex jcc font-s-16 foot-item"
            :class="index < navs.foot.length - 1 ? 'l' : ''"
          >
            <i class="iconfont" :class="i.icon"></i>
            <div class="m-lr-10">{{ i.name }}</div>
          </div>
        </div>

        <!-- 2 -->
        <div class="flex jcsa a-i-fs">
          <div v-for="(i,index) in navs.foot2" :key="index">
            <div class="font-s-18 m-tb-10">{{ i.t1 }}</div>
            <div class="color m-tb-10" v-for="(i1,index1) in i.child" :key="index1">{{ i1 }}</div>
          </div>
          <div class="tel t-a-c">
            <div class="font-s-18 mb-10 color1">400-100-5678</div>
            <div>8:00-18:00 (仅收市话费)</div>
            <div class="rg-box">
              <i class="iconfont font-s-18 icon-xinxi"></i>
              人工客服
            </div>
            <div>
              关注小米：
              <i class="iconfont color mr-5 font-s-18 icon-weibo-copy"></i>
              <i class="iconfont color font-s-18 icon-weixin"></i>
              <div class="t-a-r e-box">
                <img src="../../assets/ewm.png" class="ewming" alt />
              </div>
            </div>
          </div>
        </div>

        <div class="t-a-c m-tb-25 foot3" style="margin-top: 80px;">让全球每个人都能享受科技带来的美好生活</div>
      </div>
    </div>

    <!-- 侧边信息栏 -->
    <div class="side-ino">
      <div class="p-5 m-b-5 bgc-white">
        <i class="iconfont icon-shouji font-s-18"></i>
        <!-- <div>手机App</div> -->
      </div>
      <div class="p-5 m-b-5 bgc-white" @click="my">
        <i class="iconfont icon-yonghu"></i>
      </div>
      <div class="p-5 m-b-5 bgc-white">
        <i class="iconfont icon-weixiu"></i>
      </div>
      <div class="p-5 m-b-5 bgc-white">
        <img src="../../assets/side/kf.png" class="side-img" alt />
      </div>
      <div class="p-5 m-b-5 bgc-white">
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
  components: { HeadNav, HeadCar },
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
      // this.entering = false
      // 
      let top = this.$refs.car.getBoundingClientRect().top
      if (Math.abs(top - e.pageY) > 5) this.entering = false
    },
    // 去我的
    my() {
      this.$router.push('/My')
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

  .car-centent {
    position: absolute;
    left: -120px;
    right: 0;
    z-index: 9999;
    background-color: #fff;
    box-shadow: 0 3px 10px gainsboro;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dh {
    animation: cardh 0.5s 1 forwards;
    display: block !important;
  }
  .dh1 {
    animation: cardh1 0.5s 1 forwards;
    display: block;
  }

  // 创建动画
  @keyframes cardh {
    from {
      display: none;
      // 字一开始显示  解决 设置透明度
      // & ~ .a-box {
      //   display: none;
      // }
    }
    to {
      height: auto;
      opacity: 1;
      display: flex !important;
    }
  }
  // 创建动画
  @keyframes cardh1 {
    from {
      height: auto;
    }
    to {
      height: 0;
      display: none !important;
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
.footer {
  .foot3 {
    color: gray;
    font-size: 18px;
  }
  .icon-weixin:hover ~ .e-box {
    display: block;
    position: absolute;
  }
  .e-box {
    display: none;
  }
  .ewming {
    margin-top: 8px;
    width: 100px;
    height: 100px;
  }
  .rg-box {
    margin: 10px;
    color: #ff6700;
    border: #ff6700 1px solid;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;
    &:hover {
      cursor: pointer;
      color: #fff;
      background-color: #ff6700;
    }
  }
  .tel {
    padding-top: 20px;
  }
  .foot1 {
    padding-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 20px;
  }
  background-color: #fff;
  padding: 10px;
  .c {
    min-width: 1000px;
    max-width: 1500px;
    margin: auto;
    font-size: 12px;
  }
  .foot-item {
    width: ceil(90%/6);
    &:hover {
      color: #ff6700;
    }
  }
  .l {
    border-right: #424242 1px solid;
  }
}
</style>