/**
 * 需求：实现长按，用户需要按下并按住按钮几秒钟，触发相应的事件

   思路：

        1、创建一个计时器， timeNum 秒后执行函数
        2、当用户按下按钮时触发 mousedown 事件，启动计时器；用户松开按钮时调用mouseout 事件。
        3、如果 mouseup 事件 timeNum 秒内被触发，就清除计时器，当作一个普通的点击事件
        4、如果计时器没有在 timeNum 秒内清除，则判定为一次长按，可以执行关联的函数。
        5、在移动端要考虑 touchstart，touchend 事件

        使用：给 Dom 加上 v-longpress:[timeNum] 及回调函数即可
 */

const longpress = {
  bind: function(el, binding) {
    if (typeof binding.value !== "function") {
      throw "callback must be a function";
    }

    const timeNum = binding.arg || 1000;

    // 定义变量
    let pressTimer = null;
    // 创建计时器（ 2秒后执行函数 ）
    let start = e => {
      if (e.type === "click" && e.button !== 0) {
        return;
      }
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          handler();
        }, timeNum);
      }
    };
    // 取消计时器
    let cancel = () => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
    };
    // 运行函数
    const handler = e => {
      binding.value(e);
    };
    // 添加事件监听器
    el.addEventListener("mousedown", start);
    el.addEventListener("touchstart", start);
    // 取消计时器
    el.addEventListener("click", cancel);
    el.addEventListener("mouseout", cancel);
    el.addEventListener("touchend", cancel);
    el.addEventListener("touchcancel", cancel);
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
    el.$value = value;
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener("click", el.handler);
  }
};

export default longpress;
