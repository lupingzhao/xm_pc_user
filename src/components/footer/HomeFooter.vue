<template>
  <div class="footer m-tb-25">
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
</template>

<script>
import nav from '../../nav/index'
export default {
  name: '',
  props: {},
  data() {
    return {
      navs: nav,
    }
  },
  components: {},
  methods: {},
  mounted() { },
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>
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