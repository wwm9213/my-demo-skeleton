import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd, { message } from "ant-design-vue";
import Toast from './components/Message/index.js'
import "ant-design-vue/dist/antd.css";
import "@/styles/global.scss";

import echarts from "./plugins/eCharts";
import Directives from "./directive";

Vue.prototype.$message = message;
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

Vue.use(Directives);
Vue.use(Antd);
Vue.use(Toast)

window.$Vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
