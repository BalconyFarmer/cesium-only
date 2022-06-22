// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Antd from 'ant-design-vue'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Antd)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

import * as Cesium from 'cesium/Cesium'
import * as widget from "cesium/Widgets/widgets.css";

Vue.config.silent = true
Vue.prototype.Cesium=Cesium;
