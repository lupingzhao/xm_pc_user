<template>
  <div class="p-10">
    <div class="home-c w1 flex pos-rel">
      <Carousel
        class="carousel width-100"
        autoplay
        radius-dot
        v-model="value2"
        arrow="always"
        loop
        :autoplay-speed="5000"
      >
        <CarouselItem v-for="(t,i) in banner" :key="i">
          <div>
            <img :src="t.url" alt class="img" />
          </div>
        </CarouselItem>
      </Carousel>
      <div class="cate-box">
        <Category></Category>
      </div>
    </div>
  </div>
</template>

<script>
import Category from '../category/Category.vue'
export default {
  name: '',
  props: {},
  data() {
    return {
      value2: 0,
      banner: []
    }
  },
  components: { Category },
  methods: {
    getData() {
      this.$api.getBanner().then(res => {
        if (res.code === 200) {
          this.banner = res.data
        }
      })
    },

  },
  mounted() {
    this.getData()
  },
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>
.home-c {
  .img {
    width: 100%;
    height: 590px;
  }
  .cate-box {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  }
}
</style>