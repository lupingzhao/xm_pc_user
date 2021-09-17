<template>
  <div class="w jcc">
    <div class="img">
      <img src="../assets/404.jpg" alt="" />
      <div class="flex jcc">
        <div @click="click" class="btn m-c shou">返回首页</div>
      </div>
    </div>

    <!-- 循环对象 -->
    <!-- <div>
      <div v-for="(value, key, index) in obj" :key="index">
        {{ value }}++{{ key }}---{{ index }}
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      // obj: {
      //   name: "w",
      //   age: "11",
      //   arr: [11, 2, 3, 4, 5, 6, 7],
      // },
    };
  },
  components: {},
  methods: {
    click() {
      this.$router.push("/");
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.img {
  transform: translateY(50%);
  img {
    width: 600px;
  }
}
.btn {
  font-size: 18px;
  padding: 10px;
  color: white;
  border-radius: 10px;
  width: fit-content;
  background-color: rgb(113, 166, 209);
}
</style>