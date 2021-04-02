import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd, { message } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "@/styles/global.scss";

import Directives from "./directive";

Vue.prototype.$message = message;
Vue.config.productionTip = false;

window.onload = () => router.push("/");

Vue.use(Directives);
Vue.use(Antd);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
