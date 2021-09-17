<template>
  <div class="cate-box flex a-i-fs heigth-100" v-if="isshow">
    <!-- 详情页的全部分类l -->
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
    <div class="rigth p-10">
      <div class="p-lr-10 flex flex-wrap">
        <div v-for="(t,i) in goods" :key="i" class="box mb-10">
          <div v-for="(t1,i1) in t.list" :key="i1">
            <div v-for="(value,key,index) in t1" :key="index">
              <div v-for="(t2,i2) in value" :key="i2" class="flex" @click="goto(t2._id)">
                <div class="m-r-15">
                  <img :src="t2.cover" alt class="img" />
                </div>
                <div class="font-s-14 act-color">{{ t2.name }}</div>
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
      isshow: true
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
  background-color: #fff;
  .left {
    width: 25%;

    border: red solid 1px;
    .box {
      &:hover {
        background-color: #ff6700;
        color: #fff;
      }
    }
  }
  .rigth {
    width: 75%;
    height: 100%;
    // box-shadow: 0 0 3px gray;
    .img {
      width: 80px;
    }
    .box {
      width: ceil(96%/4);
      margin-right: 1%;
    }
  }
}
</style>