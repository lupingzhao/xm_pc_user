<template>
  <div class="login">
    <div class="w jcsb height-100">
      <img
        src=" https://cdn.web-global.fds.api.mi-img.com/mcfe--mi-account/static/static/media/banner.4994397e.jpg"
        alt
        class="left"
      />
      <!-- 右侧 -->

      <div class="right p-10 width-100">
        <div class="flex jcsb">
          <div class="flex">
            <img src="../../assets/icon1/logo-mi2.png" @click="$router.push('/')" alt class="log" />
            <div class="m-l-15 font-s-20 font-w-7">小米账号</div>
          </div>
          <div class="flex font-s-16">
            <div class="mr-10 act-color">用户协议</div>
            <div class="mr-10 act-color">隐私政策</div>
            <div class="mr-10 act-color">帮助中心</div>
            <div class="mr-10">
              <Dropdown @on-click="click">
                <div class="act-color">
                  {{ lang }}
                  <Icon type="ios-arrow-down"></Icon>
                </div>
                <DropdownMenu slot="list">
                  <DropdownItem name="中文(简体)">中文(简体)</DropdownItem>
                  <DropdownItem name="中文(繁体)">中文(繁体)</DropdownItem>
                  <DropdownItem name="English">English</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>

        <div class="login-box">
          <Login></Login>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "../../components/login/Login.vue"
export default {
  name: '',
  props: {},
  data() {
    return {
      lang: '中文(简体)'
    }
  },
  components: { Login },
  methods: {
    // 下来菜单
    click(e) {
      this.lang = e
    }
  },
  mounted() { },
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>
.login {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;

  .left {
    width: 450px;
    height: 100%;
  }
  .right {
    height: 100%;
    overflow: scroll;
    background-color: #ffffff;
    .log {
      width: 80px;
      height: 80px;
    }
    .login-box {
      width: 400px;
      padding: 20px;
      margin: auto;
      margin-top: 5%;
      box-shadow: lightgray 0 0 5px;
    }
  }
}
</style>