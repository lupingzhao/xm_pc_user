<template>
  <div>
    <!-- 定位 -->
    <div>
      <i class="iconfont icon-position1"></i>
      {{ address }}
    </div>
    <div class="shou j-color m-tb-10" @click="edit">修改</div>

    <Modal v-model="modal1" title="修改定位" @on-ok="ok" width="610">
      <div id="container" class="m-c" style="width:580px; height:300px"></div>
      <div id="panel"></div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  data() {
    return {
      address: '',
      modal1: false,
      pos: [],
      // 地图点击事件的中间变量
      addre: '',
      pos1: []
    }
  },
  components: {},
  methods: {
    // 定位
    getAddress() {
      let _this = this
      AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: 'RB'
        })

        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)

        function onComplete(data) {
          _this.address = data.formattedAddress
          _this.pos[0] = data.position.lng
          _this.pos[1] = data.position.lat
          // data是具体的定位信息
        }

        function onError(data) {
          // 定位出错
          _this.address = '定位失败'
          _this.pos = []
        }
      })

      // 简单定位
      // AMap.plugin('AMap.CitySearch', function () {
      //   var citySearch = new AMap.CitySearch()
      //   citySearch.getLocalCity(function (status, result) {
      //     if (status === 'complete' && result.info === 'OK') {
      //       console.log(result)
      //       // 查询成功，result即为当前所在城市信息
      //       _this.address = result.province + result.city;
      //     }
      //   })
      // })
    },
    ok() {
      this.pos = this.pos1
      this.address = this.addre
    },
    edit() {
      this.setMap()
      this.modal1 = true
    },
    setMap() {
      let center = [116.397428, 39.90923]
      if (this.pos.length) {
        center = this.pos
      }
      var map = new AMap.Map('container', {
        zoom: 15,  //设置地图显示的缩放级别
        center: center,//设置地图中心点坐标
        viewMode: '2D',  //设置地图模式
        lang: 'zh_cn',  //设置地图语言类型
        resizeEnable: true
      });
      let _this = this
      // 创建一个 Marker 实例：
      var marker = new AMap.Marker({
        position: [...center],   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: this.address
      });

      // 将创建的点标记添加到已有的地图实例：
      map.add(marker);
      // 地图点击事件
      // map.on('click', showInfoClick);
      // function showInfoClick(e) {
      //   console.log(e)
      // }

      //为地图注册click事件获取鼠标点击出的经纬度坐标
      var lnglat = []
      map.on('click', (e) => {
        lnglat = [e.lnglat.getLng(), e.lnglat.getLat()]
        // 先移除之前的标记 就只会剩下一个标记  否则会有多个标记
        map.remove(marker);

        // 点击地图后根据经纬度 获取当前位置信息
        AMap.plugin('AMap.Geocoder', function () {
          var geocoder = new AMap.Geocoder({
            // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode 
            // city: '010'
          })
          _this.pos1 = lnglat
          geocoder.getAddress(lnglat, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              // result为对应的地理位置详细信息 
              _this.addre = result.regeocode.formattedAddress
            }
          })
        })


        // 创建新标记
        marker = new AMap.Marker({
          position: [...lnglat],   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: _this.addre
        });
        // 将创建的点标记添加到已有的地图实例：
        map.add(marker);

      });

      // 引入工具插件
      AMap.plugin('AMap.ToolBar', function () {//异步加载插件
        var toolbar = new AMap.ToolBar();
        map.addControl(toolbar);
      });
      //构造路线导航类
      // // 需要在引入key的地方应入Driving等导航插件 或者用 AMap.plugin引入插件
      // var driving = new AMap.Driving({
      //   map: map,
      //   // 路线提示盒子 要用可在public文件的index下引入样式表
      //   // panel: "panel"
      // });
      // // // 根据起终点经纬度规划驾车导航路线
      // driving.search(new AMap.LngLat(116.379028, 39.865042), new AMap.LngLat(116.427281, 39.903719), function (status, result) {
      //   // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
      //   if (status === 'complete') {
      //     log.success('绘制驾车路线完成')
      //   } else {
      //     log.error('获取驾车数据失败：' + result)
      //   }
      // });

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
#panel {
  position: fixed;
  background-color: white;
  max-height: 90%;
  overflow-y: auto;
  top: 10px;
  right: 10px;
  width: 280px;
}
#panel .amap-call {
  background-color: #009cf9;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
#panel .amap-lib-driving {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
}
</style>