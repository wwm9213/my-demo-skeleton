import copy from "./copy";
import longpress from "./longpress";
import debounce from "./debounce";
import LazyLoad from "./LazyLoad";
import waterMarker from "./waterMarker";
// 自定义指令
const directives = {
  copy,
  longpress,
  debounce,
  LazyLoad,
  waterMarker
};

export default {
  install(Vue) {
    Object.keys(directives).forEach(key => {
      Vue.directive(key, directives[key]);
    });
  }
};
