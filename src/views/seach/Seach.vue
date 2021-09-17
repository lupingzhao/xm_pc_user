<template>
  <div class="seach">
    <HeadNav @seach="seach"></HeadNav>
    <div class="bgc-white p-10">
      <div class="w1 p-10">
        <div class="flex">
          <div class="mr-10 act-color">
            <a href="/" style="color:none">首页 ></a>
          </div>
          <div class="mr-10 act-color" @click="seach('')">全部商品 ></div>
          <div>{{ value ? value : '全部商品' }}</div>
        </div>
        <!--条件排序 -->
        <div class="flex p-tb-10 font-s-16 jcsb">
          <div class="flex">
            <div v-for="(t,i) in list" :key="i" class="flex">
              <div
                class="t act-color"
                :class="{ 'br': i < list.length - 1, 'j-color': act === i }"
                @click="sort(t, i)"
              >
                {{ t }}
                <span v-if="i === list.length - 1">
                  <i class="iconfont icon-jiantou" v-if="up"></i>
                  <i class="iconfont icon-xiajiantou" v-else></i>
                </span>
              </div>
            </div>
          </div>

          <!-- 选择地址 -->
          <div>
            <RadioGroup v-model="animal">
              <Radio label="促销"></Radio>
              <Radio label="分期"></Radio>
              <Radio label="仅看有货"></Radio>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>

    <div class="p-10">
      <div class="w p-10 flex-wrap">
        <div class="width-100 m-tb-10" v-if="!total">
          <div class="flex jcc">
            <img src="http://m.mi.com/static/img/icon-search-empty.3d766c8b3f.png" alt />
          </div>
          <div class="t-a-c p-10 m-tb-10">对应筛选条件下没有找到商品，换个筛选条件吧!</div>
        </div>

        <div class="t-a-c box1" v-for="(t1,i) in goods" :key="i" @click="goto(t1._id)">
          <img :src="t1.cover" alt class="cover" />
          <div class="name">{{ t1.name }}</div>
          <div class="j-color font-s-18">{{ t1.presentPrice }}元</div>
          <div class="flex jcc">
            <div v-for="(t,i1) in t1.pic" :key="i1" v-show="i1 < 4">
              <img
                :src="t"
                alt
                class="pic"
                @mouseenter="enter(t1, t, i, i1)"
                @click.stop="picing(i, i1)"
                :class="{ 'bor': actPic[i] === i1 }"
              />
            </div>
          </div>
        </div>
      </div>
      <Page
        v-if="total"
        :total="total"
        show-elevator
        :page-size="5"
        :page-size-opts="[5, 10, 15]"
        show-sizer
        show-total
        size="small"
        @on-change="change"
        @on-page-size-change="size"
        class="t-a-c"
      />
      <Recommend></Recommend>
    </div>
  </div>
</template>

<script>
import HeadNav from '../../components/home/HeadNav/HeadNav.vue'
import Recommend from '../../components/recommend/Recommend.vue'
export default {
  name: '',
  props: {},
  data() {
    return {
      value: '',
      list: [
        '综合',
        '新品',
        '销量',
        '价格',
      ],
      up: true,
      act: 0,
      animal: '',
      goods: [],
      current: 1,
      pageSize: 5,
      actPic: [],
      total: 0
    }
  },
  components: { HeadNav, Recommend },
  methods: {
    seach(e) {
      this.value = e
      this.getData(e)
    },
    // 排序
    sort(t, i) {
      this.act = i
      this.$Message.info(`当前是${t}排序`);
      if (i === 3) {
        this.up = !this.up
      }
    },
    // 获取搜索商品
    getData(val) {
      this.value = val
      this.$api.search({
        current: this.current,
        pageSize: this.pageSize,
        query: val
      }).then(res => {
        if (res.code === 200) {
          this.goods = res.data
          this.total = res.total
        }
      })
    },
    // 小图高亮
    picing(i, i1) {
      this.$set(this.actPic, i, i1);
    },
    // 鼠标经过时换图
    enter(t1, t, i, i1) {
      t1.cover = t
      this.$set(this.actPic, i, i1);
    },
    gotop() {
      // 滚动到页面顶部
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    },
    // 页数
    change(e) {
      this.current = e
      this.getData(this.value)
      this.gotop()
    },
    size(e) {
      this.gotop()
      this.pageSize = e
      this.getData(this.value)
    },
    // 去详情
    goto(id) {
      this.$router.push({
        path: "/Details",
        query: {
          id: id
        }
      })
    }
  },
  mounted() {
    this.value = this.$route.query.keyWord
    this.getData(this.value)
  },
  computed: {},
  watch: {
    // 监听路由变化
    $route: {
      handler(val) {
        if (val.query.keyWord) {
          this.getData(val.query.keyWord)
        }
      },
      deep: true
    }
  }
}
</script>

<style lang='scss' scoped>
.seach {
  a {
    color: #000;
    &:hover {
      color: #ff6700 !important;
    }
  }
  .box1 {
    width: 24%;
    margin-left: 1%;
    background-color: #fff;
    margin-bottom: 15px;
    padding: 30px 0;
    animation: none;
    .name {
      margin: 15px 0;
    }
    &:hover {
      .name {
        color: #ff6700;
      }
      animation: show 1s forwards;
    }
    .j-color {
      margin-bottom: 15px;
    }
    .cover {
      width: 40%;
      height: 110px;
    }

    @keyframes show {
      to {
        box-shadow: 0 0 25px #bebec0;
      }
    }
    .bor {
      border: orangered 1px solid;
    }
    .pic {
      width: 30px;
      height: 30px;
      margin-left: 5px;
      padding: 1px;
      &:hover {
        border: orangered 1px solid;
      }
    }
  }
  .t {
    margin-top: 20px;
    padding: 0 25px;
  }
  .br {
    border-right: 1px solid #bebbbb;
  }
}
</style>