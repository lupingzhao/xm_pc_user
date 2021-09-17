<template>
  <div class="login-boxs">
    <Tabs :value="tabs" @on-click="tab">
      <TabPane label="手机号登录" name="1"></TabPane>
      <TabPane label="账户登录" name="2"></TabPane>
      <TabPane label="注册" name="0"></TabPane>
    </Tabs>

    <Form class="t-a-c" ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="username" v-if="isLogin !== 1">
        <Input type="text" v-model="formInline.username" placeholder="用户名"></Input>
      </FormItem>
      <FormItem prop="password" v-if="isLogin !== 1">
        <Input type="password" v-model="formInline.password" password placeholder="请输入密码"></Input>
      </FormItem>
      <FormItem prop="mobile" v-if="isLogin !== 2">
        <Input v-model="formInline.mobile" placeholder="请输入电话号码"></Input>
      </FormItem>
      <div class="flex code jcc" v-if="isLogin !== 2">
        <FormItem prop="code">
          <Input v-model="formInline.code" placeholder="请输入验证码"></Input>
        </FormItem>
        <FormItem>
          <Button
            class="btn1"
            :disabled="isCode"
            @click="code"
            style="background-color: #FF6A00;"
          >{{ codeType }}</Button>
        </FormItem>
      </div>
    </Form>
    <div class="flex jcc m-tb-10">
      <Button class="btn" style="background-color: #FF6A00;" @click="handleSubmit">{{ type }}</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  data() {
    // 自定义验证
    const validatecede = (rule, value, callback) => {
      let a = /^(?:(?:\+|00)86)?1\d{10}$/
      if (a.test(value)) {
        this.isCode = false
        callback();
      } else {
        this.isCode = true
        return callback(new Error('请输入正确的手机号'));
      }
    };
    return {
      isLogin: 1,
      tabs: '1',
      type: '登录',
      isCode: true,
      codeType: '获取验证码',
      formInline: {
        username: '',
        password: '',
        code: '',
        mobile: ''
      },

      ruleInline: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '用户名密码不能为空', trigger: 'blur' },
          { type: 'string', min: 3, max: 6, message: '密码长度在3到6个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validatecede, trigger: 'blur' }
        ]
      }
    }
  },
  components: {},
  methods: {
    // 表单验证通过
    handleSubmit() {
      this.$refs.formInline.validate((valid) => {
        if (valid) {
          if (this.isLogin) {
            // 用户名登陆 或者手机号登陆
            if (this.formInline.mobile) {
              this.$api.mobileLogin(this.formInline).then(res => {
                if (res.code === 200) {
                  this.$Message.success(res.msg);
                  localStorage.setItem('pc-user', JSON.stringify(res.data))
                  localStorage.setItem('pc-liftToken', res.token)
                  this.$store.commit('setUser', res.data)
                  this.$router.back()
                } else this.$Message.error(res.msg)
              })
            } else {
              this.$api.userLogin(this.formInline).then(res => {
                if (res.code === 200) {
                  this.$Message.success(res.msg);
                  localStorage.setItem('pc-user', JSON.stringify(res.data))
                  localStorage.setItem('pc-liftToken', res.token)
                  this.$store.commit('setUser', res.data)
                  this.$router.back()
                } else this.$Message.error(res.msg)
              })
            }
          } else {
            // 注册接口
            this.$api.register(this.formInline).then(res => {
              if (res.code === 200) {
                this.tabs = '1'
                this.$Message.success(res.msg);
              } else this.$Message.error(res.msg)
            })
          }
        }
      })
    },
    // 标签页
    tab(e) {
      this.isLogin = Number(e)
      if (this.isLogin) {
        this.type = '登录'
      } else { this.type = '注册' }
      // 重置表单
      this.$refs.formInline.resetFields()
    },
    // 获取验证码
    code() {
      let time = 30
      let timer = setInterval(() => {
        time--
        this.codeType = `${time}s后重新发送`
        if (time === 0) {
          clearInterval(timer)
          this.codeType = '获取验证码'
        }
      }, 1000)
      this.$api.getCode({ mobile: this.formInline.mobile }).then(res => {
        this.$Message.success(res.msg);
      })
    },

  },
  mounted() {

  },
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>
.login-boxs {
  .btn {
    width: 305px;
    margin-left: -5px;
    height: 50px;
    color: #fff;
  }
  .btn1 {
    width: 110px;
    color: #fff;
  }
}
</style>