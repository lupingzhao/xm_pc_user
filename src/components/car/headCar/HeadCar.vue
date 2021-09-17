<template>
  <div class="width-100 head-car">
    <div class="box flex jcsb bor-b p-10" v-for="(t,i) in carData.data" :key="i">
      <div class="mr-5">
        <img :src="t.goods.cover" alt class="img" />
      </div>
      <div class="width-100 flex jcsb">
        <div class="spec">
          <span>{{ t.goods.name }}</span>
          <span v-for="(t1,i1) in t.spec" :key="i1">{{ t1 }}&nbsp;</span>
        </div>
        <div class="flex">
          <div class="mr-5">
            {{ t.goods.presentPrice }}元
            <span class>x</span>
            {{ t.count }} &nbsp;
          </div>
          <div class="p-5 del" @click="delCar(t._id, i)">X</div>
        </div>
      </div>
    </div>
    <div class="m-tb-10 flex jcsb">
      <div>
        <div>共计 {{ carData.data.length }} 件商品</div>
        <div>
          <span class="font-s-16 j-color">{{ sum }}</span>
          <span class="j-color">元</span>
        </div>
      </div>
      <div>
        <Button type="warning" @click="go" style="height:30px; background-color: #FF6A00;">去购物车结算</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    carData: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
    }
  },
  components: {},
  methods: {
    // 删除购物车
    delCar(id, i) {
      this.$api.delCart({
        // 用户id
        user_id: this.$store.state.user._id,
        // 商品id
        id: id
      }).then(res => {
        if (res.code === 200) {
          this.$Message.success(res.msg);
          this.carData.data.splice(i, 1)
        }
      })
    },
    // 去购物车
    go() {
      this.$router.push('/Car')
    }
  },
  mounted() {

  },
  computed: {
    sum() {
      let sum = 0
      this.carData.data.map(i => {
        sum += i.count * i.goods.presentPrice
      })
      return sum
    }
  },
  watch: {}
}
</script>

<style lang='scss' scoped>
.head-car {
  .box {
    &:hover {
      .del {
        visibility: inherit;
        cursor: pointer;
      }
    }
    .del {
      visibility: hidden;
    }
    .img {
      width: 60px;
      height: 60px;
    }
    .spec {
      width: 100px;
      text-align: left;
    }
  }
}
</style>