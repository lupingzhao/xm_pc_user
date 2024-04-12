<template>
  <div>
    <!-- 测试页 -->
    <div class="box-demo flex">
      <div>
        <div class="name" @click="click" :style="show ? 'font-size:12px' : 'font-size:20px'">哈哈哈</div>
        <Input v-model="value" ref="input" v-if="show" style="width: 300px" />
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
      show: false
    }
  },
  components: {},
  methods: {
    click() {
      this.show = true
      this.$refs.input.focus({
        cursor: type
      });
    }
  },
  mounted() { },
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>
.box-demo {
  margin: auto;
  width: 310px;
  height: 80px;
  border: chocolate 1px solid;
  margin-top: 10%;
  .name {
    margin-left: 10px;
  }
}
</style>