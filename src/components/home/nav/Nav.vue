<template>
  <div class="nav">
    <div class="w">
      <div class="nav-left flex jcc t-a-c flex-wrap">
        <div v-for="(t,i) in list" :key="i" class="item p-15">
          <div class="lin-l"></div>
          <div class="t-a-c">
            <div class="line-t"></div>
            <img :src="t.img" alt class="img" />
            <div>{{ t.title }}</div>
          </div>
        </div>
      </div>
      <div class="flex right">
        <div v-for="(t ,i) in img" :key="i" class="img-item">
          <img :src="t.img" alt />
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
      list: [
        {
          img: require('../../../assets/icon1/bz.png'),
          title: '保障服务'
        },
        {
          img: require('../../../assets/icon1/qy.png'),
          title: '企业团购'
        },
        {
          img: require('../../../assets/icon1/fm.png'),
          title: 'F码通道'
        },
        {
          img: require('../../../assets/icon1/mf.png'),
          title: '米粉卡'
        },
        {
          img: require('../../../assets/icon1/yjhx.png'),
          title: '以旧换新'
        },
        {
          img: require('../../../assets/icon1/cz.png'),
          title: '话费充值'
        },

      ],
      img: [
        {
          img: require('../../../assets/banner1.jpg')
        },
        {
          img: require('../../../assets/banner2.jpg'),
        },
        {
          img: require('../../../assets/banner3.png')
        }
      ]
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
.nav {
  background-color: #fff;
  padding-top: 25px;
  margin-bottom: 25px;
  padding: 10px;
  .nav-left {
    width: 25%;
    background-color: #5f5750;
    color: #cfccca;
    padding: 5px;
    height: 223px;
    .img {
      width: 50px;
      height: 50px;
    }
    .item {
      width: ceil(99%/3);
      position: relative;
    }

    .lin-l {
      top: 10px;
      left: 0;
      width: 1px;
      height: 80px;
      background-color: #70655c;
      position: absolute;
      z-index: 8888;
    }
    .line-t {
      position: absolute;
      top: -1px;
      left: 10px;
      width: 80px;
      height: 1px;
      background-color: #70655c;
    }
  }
  .right {
    width: 75%;
    height: 223px;
    .img-item {
      width: 33%;
      margin-left: 1%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        &:hover {
          box-shadow: 0 0 15px #dad8d8;
        }
      }
    }
  }
}
</style>