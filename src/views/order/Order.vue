<template>
  <div class="order">
    <div class="w head">
      <!-- 头部 -->
      <div class="p-10">
        <img src="../../assets/icon1/logo-mi2.png" class="img" alt />
      </div>
      <div class="m-lr-10 font-s-18">确认订单</div>
    </div>

    <div class="w1 m-tb-25">
      <Card class="width-100 p-10">
        <!-- 收货地址 -->
        <div>
          <div class="m-tb-10">收货地址</div>
          <div class="flex flex-wrap b-box">
            <!-- 地址 -->
            <div
              class="p-10 adr-box mb-10"
              :class="{ 'd': i === act }"
              v-for="(t,i) in address"
              :key="i"
              @mouseleave="() => { enter = true, index = i }"
              @mouseenter="() => { enter = false, index = -1 }"
              @click="choose(t, i)"
              v-show="address.length && i < 4"
            >
              <div class="m-tb-10">{{ t.username }}</div>
              <div class="m-tb-10">{{ t.mobile.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2") }}</div>
              <div class="width-90">{{ t.address }},{{ t.detailAddress }}</div>
              <div
                class="m-tb-25 btn-1 btn"
                :class="[enter && index === i ? 'btn-2' : '']"
                @click.stop
              >
                <!-- \:class="[!enter && index === i ? 'btn-2' : '']" -->
                <Button type="warning" style="margin-right: 10px;" @click="edit(t)">编辑</Button>
                <Button type="error" @click="del(t.id)">删除</Button>
              </div>
            </div>
            <div class="adr-box flex jcc">
              <div class="t-a-c act-color" @click="add">
                <div>
                  <i class="iconfont icon-jia3-copy-copy font-s-20"></i>
                </div>
                <div>添加新地址</div>
              </div>
            </div>
          </div>
          <Collapse class="m-tb-10">
            <Panel>
              查看更多地址
              <div slot="content" class="flex flex-wrap m-tb-10">
                <!-- 地址 -->
                <div
                  class="p-10 adr-box mb-10"
                  :class="{ 'd': i === act }"
                  v-for="(t,i) in address"
                  :key="i"
                  @mouseleave="() => { enter = true, index = i }"
                  @mouseenter="() => { enter = false, index = -1 }"
                  @click="choose(t, i)"
                  v-show="address.length && i > 4"
                >
                  <div class="m-tb-10">{{ t.username }}</div>
                  <div class="m-tb-10">{{ t.mobile }}</div>
                  <div class="width-90">{{ t.address }},{{ t.detailAddress }}</div>
                  <div
                    class="m-tb-25 btn-1 btn"
                    :class="[enter && index === i ? 'btn-2' : '']"
                    @click.stop
                  >
                    <Button type="warning" style="margin-right: 10px;" @click="edit(t)">编辑</Button>
                    <Button type="error" @click="del(t.id)">删除</Button>
                  </div>
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>
        <!-- 订单 -->
        <Order ref="orderc" class="m-tb-25"></Order>
      </Card>
    </div>

    <!-- 添加地址 -->
    <Modal v-model="modal1" title="编辑收货地址" scrollable :footer-hide="true">
      <Add @cancel="cancel" :edit="edits" v-if="modal1"></Add>
    </Modal>

    <!-- 删除 -->
  </div>
</template>

<script>
import Order from "../../components/order/Order.vue"
import Add from "../../components/address/Add.vue"
export default {
  name: '',
  props: {},
  data() {
    return {
      defaultAddres: '',
      address: [],
      uAddress: '',
      uMObile: '',
      modal1: false,
      enter: false,
      edits: '',
      index: -1,
      act: 0
    }
  },
  components: { Order, Add },
  methods: {
    getAddress() {
      this.$api.getAppAddress(this.$store.state.user._id).then(res => {
        // 获取默认地址
        if (res.code === 200) {
          this.$refs.orderc.address = res.data[0].address + res.data[0].detailAddress
          this.$refs.orderc.mobile = res.data[0].mobile
          this.$refs.orderc.name = res.data[0].username
          res.data.length && res.data.map(i => {
            this.address.push(i)
          })
          this.address = res.data
        }
      })
    },
    add() {
      this.modal1 = true
      this.edits = ''
    },
    cancel(i) {
      typeof (i) === 'number' ? this.getAddress() : ''
      this.modal1 = false
    },
    // 选择地址
    choose(t, i) {
      this.act = i
      this.$refs.orderc.address = t.address + t.detailAddress
      this.$refs.orderc.mobile = t.mobile
      this.$refs.orderc.name = t.username
    },
    // 编辑
    edit(t) {
      this.edits = t
      this.modal1 = true
    },
    // 删除
    del(id) {
      this.$Modal.confirm({
        title: '删除地址',
        content: '<p>确认删除？</p>',
        onOk: () => {
          this.$api.delAddress({
            // 地址id
            addressId: id,
            // 用户id
            user_id: this.$store.state.user._id
          }).then(res => {
            if (res.code === 200) {
              this.$Message.success(res.msg);
              this.getAddress()
            }
          })
        },
      });
    }
  },
  mounted() {
    this.getAddress()
  },
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>
.order {
  .btn {
    display: none;
  }

  .btn-1 {
    animation: up 1s forwards;
  }
  .btn-2 {
    display: block !important;
    animation: down 1s forwards;
  }
  @keyframes up {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes down {
    from {
      transform: translateY(0);
    }
    to {
      opacity: 0;
      display: none;
      transform: translateY(100%);
    }
  }
  .head {
    border-bottom: 2px solid sandybrown;
  }
  .img {
    width: 80px;
    height: 80px;
  }

  .adr-box {
    border: 1px solid gainsboro;
    width: ceil($number: 95%/5);
    height: 200px;
    margin-right: ceil($number: 1%/4);
    &:hover {
      cursor: pointer;
      border: 1px solid #ff6700;
      .btn {
        display: block;
      }
    }
  }
  .b-box .adr-box:nth-child(5n) {
    margin-right: 0 !important;
  }
  // .b-box .adr-box :nth-child(5n) {
  //   background-color: chartreuse;
  //   margin-right: 0 !important;
  // }
  .d {
    border: 1px solid #ff6700;
  }
}
</style>