<template>
  <div class="p-10">
    <div class="w1 electrical">
      <div class="font-s-18 mb-10 flex jcsb">
        <div>{{ titles }}</div>
        <div class="flex">
          <div class="m-lr-10 shou act-color">热门</div>
          <div class="m-lr-10 shou act-color">电视影音</div>
        </div>
      </div>
      <div class="flex a-i-fs">
        <div class="flex flex-wrap right jcsb">
          <div v-for="(t,i1) in list" :key="i1" class="item-box">
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
.electrical {
  margin-bottom: 25px;
  .shou {
    border-bottom: transparent 3px solid;
    &:hover {
      border-bottom: #ff6700 3px solid;
    }
  }

  .item-box {
    flex: 1;
    min-width: 24%;
    max-width: 49.5%;
    height: 295px;
    margin-bottom: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #fff;
    img {
      width: 60%;
      height: 150px;
      margin-bottom: 15px;
    }
  }

  .item-box:hover {
    box-shadow: rgb(173, 173, 173) 0 0 25px;
  }
}
</style>