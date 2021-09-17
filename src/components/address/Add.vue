<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="收货人" prop="username">
        <Input v-model="formValidate.username" placeholder="请输入收货人名字"></Input>
      </FormItem>
      <FormItem label="手机号" prop="mobile">
        <Input v-model="formValidate.mobile" placeholder="请输入联系电话"></Input>
      </FormItem>
      <FormItem label="城市" prop="address">
        <Cascader :data="data" clearable v-model="s" placeholder="选择城市"></Cascader>
      </FormItem>
      <FormItem label="详细地址" prop="detailAddress">
        <Input v-model="formValidate.detailAddress" placeholder="请输入详细地址"></Input>
      </FormItem>
      <FormItem label="是否默认" required>
        <Checkbox v-model="formValidate.isDefault" />
      </FormItem>
      <FormItem FormItem class="t-a-r">
        <Button @click="cancel">取消</Button>
        <Button type="primary" style="margin-left: 15px" @click="add">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import city from '../../lib/city.js'
export default {
  name: '',
  props: {
    edit: {
      type: Object | ''
    }
  },
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
      data: city,
      s: [],
      formValidate: {
        username: '',
        mobile: '',
        address: '',
        detailAddress: '',
        isDefault: false,
        user_id: this.$store.state.user._id,
      },
      ruleValidate: {
        username: [
          { required: true, message: '收货人不能为空', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validatecede, trigger: 'blur' }
        ],
        address: [
          { required: true, message: '城市不能为空', trigger: 'blur' }
        ],
        detailAddress: [
          { required: true, message: '详细地址不能为空', trigger: 'change' }
        ],
      }
    }
  },
  components: {},
  methods: {
    // 取消、
    cancel(val) {
      this.$emit('cancel', val);
    },
    // 添加地址

    add() {
      this.formValidate.address = this.s.join(',')
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          if (this.edit) {
            this.$Message.info('编辑功能暂未开发')
            this.cancel(1)
            // this.$api.updateAddress(this.formValidate).then(res => {
            //   this.$Message.info(res.msg)
            //   this.cancel(1)
            // })
          } else {
            this.$api.addAddress({ ...this.formValidate }).then(res => {
              this.$Message.info(res.msg)
              this.cancel(1)
            })
          }

        }
      })
    }
  },
  mounted() {
    if (this.edit) {
      this.s = this.edit.address.split(',')
      this.formValidate = { ...this.edit }
    } else {
      this.$refs.formValidate.resetFields()
    }
  },
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>
</style>
