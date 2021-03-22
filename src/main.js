import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Antd, { message } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(Antd);
Vue.prototype.$message = message;
Vue.config.productionTip = false;
import "@/styles/global.scss";
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
