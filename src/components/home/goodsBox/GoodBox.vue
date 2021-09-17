<template>
  <div class="p-10">
    <div class="w1 goods-box">
      <div class="font-s-18 mb-10 flex jcsb">
        <div>{{ titles }}</div>
        <div>查看更多 ></div>
      </div>
      <div class="flex a-i-fs">
        <div v-for="(t,i1) in list[0].list[0]" :key="i1" class="item-box1" @click="go(t[0]._id)">
          <img :src="t[0].cover" alt />
        </div>
        <div class="flex flex-wrap right">
          <div v-for="(t,i1) in list" v-show="i1 > 0 && i1 < 9" :key="i1" class="item-box">
            <div class="t-a-c font-s-16">
              <div v-for="(t1,i) in t.list" :key="i">
                <div v-for="(t2,i) in t.list[0]" :key="i" @click="go(t2[0]._id)">
                  <img :src="t2[0].cover" alt />
                  <div>{{ t2[0].name }}</div>
                  <div class="j-color mt-10">{{ t2[0].presentPrice }}元起</div>
                </div>
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
  props: {
    titles: {
      type: String,
      require: true
    },
    list: {
      type: []
    }
  },
  data() {
    return {
    }
  },
  components: {},
  methods: {
    // 去详情
    go(id) {
      this.$router.push({
        path: "/Details",
        query: {
          id: id
        }
      })
    }
  },
  mounted() {
  },
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>
.goods-box {
  margin-bottom: 25px;
  .item-box1 {
    width: 24%;
    height: 100%;
    img {
      width: 100%;
      height: 607px;
      &:hover {
        box-shadow: rgb(173, 173, 173) 0 0 16px;
      }
    }
  }
  .item-box {
    flex: 1;
    min-width: 23%;
    height: 295px;
    margin-bottom: 15px;
    margin-left: 13px;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #fff;
    img {
      width: 60%;
      height: 150px;
      margin-bottom: 15px;
    }
  }
  .right {
    width: 76%;
  }
  .item-box:hover {
    box-shadow: rgb(173, 173, 173) 0 0 25px;
  }
}
</style>