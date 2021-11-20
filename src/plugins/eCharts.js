import router from "../router";
import "./walden";
const _echarts = require("echarts/lib/echarts");

window.$echartInstance = {};

const echarts = {
  init: (ref, renderer) => {
    if (ref instanceof HTMLElement) {
      const echartsInstance = _echarts.init(ref, "walden", {
        renderer: renderer || "svg"
      });
      window.$echartInstance[echartsInstance.id] = echartsInstance;
      return echartsInstance;
    }
  }
};

const resizeEChartSize = (() => {
  let windowResizeTimer = null;

  return function () {
    windowResizeTimer && clearTimeout(windowResizeTimer);
    windowResizeTimer = setTimeout(() => {
      const obj = window.$echartInstance;
      for (const i in obj) {
        obj[i].resize && obj[i].resize();
      }
    }, 100);
  };
})();

window.addEventListener("resize", resizeEChartSize);
window.addEventListener("load", resizeEChartSize);

router.beforeEach((to, from, next) => {
  window.$echartInstance = {};
  resizeEChartSize();
  next();
});

export default echarts;
