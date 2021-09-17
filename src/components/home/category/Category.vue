<template>
  <div class="cate-box w1 flex a-i-fs heigth-100 width-100" v-if="isshow" @mouseleave="leave">
    <!-- 全部分类l -->

    <div class="left p-tb-20">
      <div
        class="flex p-15 jcsb font-s-16 box"
        @mouseenter="enter(t.list)"
        v-for="(t,i) in cate"
        :key="i"
      >
        <div>{{ t.name }}</div>
        <div>
          <i class="iconfont icon-jiantou-copy"></i>
        </div>
      </div>
    </div>
    <div class="rigth p-10" v-if="isright">
      <div class="p-lr-10 catebox-rigth flex-wrap">
        <div v-for="(t,i) in goods" :key="i" class="box mb-10">
          <div v-for="(t1,i1) in t.list" :key="i1">
            <div v-for="(value,key,index) in t1" :key="index">
              <div v-for="(t2,i2) in value" :key="i2" class="s-box" @click="goto(t2._id)">
                <div class="m-r-15">
                  <img :src="t2.cover" alt class="img" />
                </div>
                <div
                  style="writing-mode:lr-tb; white-space:pre-wrap;width:150px"
                  class="font-s-14 act-color"
                >{{ t2.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  data() {
    return {
      cate: [],
      goods: [],
      isshow: true,
      isright: false
    }
  },
  components: {},
  methods: {
    getData() {
      this.$api.getCategory().then(res => {
        if (res.code === 200) {
          this.cate = res.data.filter(i => {
            return i.isShow
          })
        }
      })
    },
    // 鼠标移入事件
    enter(arr) {
      this.goods = arr.filter(i => {
        return i.isShow
      })
      this.isright = true
    },
    // 去详情
    goto(id) {
      this.$router.push({
        path: "/Details",
        query: {
          id: id
        }
      })
      this.isshow = false
    },
    // 移除的时候 
    leave() {
      this.isright = false
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
.cate-box {
  padding-bottom: 20px;

  .left {
    width: 25%;
    background-color: #a19f9f;
    opacity: 0.8;
    color: #fff;
    z-index: 222;
    height: 590px;
    .box {
      &:hover {
        background-color: #ff6700;
        color: #fff;
      }
    }
  }
  .rigth {
    max-width: 75%;
    writing-mode: vertical-lr;
    height: 590px;
    z-index: 222;
    width: auto;
    background-color: #fff;
    .catebox-rigth {
      display: flex;
      flex-wrap: wrap;
    }
    .img {
      width: 80px;
      height: 80px;
    }
    .box {
      padding: 5px;
      margin-bottom: 5px;
      margin-right: 5px;
      height: ceil(540px/6);
      width: 250px;
    }
  }
}
</style>