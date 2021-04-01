/**
 * 背景：在开发中，有些提交保存按钮有时候会在短时间内被点击多次，这样就会多次重复请求后端接口，造成数据的混乱，比如新增表单的提交按钮，多次点击就会新增多条重复的数据。

   需求：防止按钮在短时间内被多次点击，使用防抖函数限制规定时间内只能点击一次。

   思路：

        1、定义一个延迟执行的方法，如果在延迟时间内再调用该方法，则重新计算执行时间。
        2、将事件绑定在 click 方法上

        使用：给 Dom 加上 v-debounce:[timeNum] 及回调函数即可
 */

const debounce = {
  inserted: function(el, binding) {
    const timeNum = binding.arg || 1000;
    let timer;
    el.addEventListener("click", () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        binding.value();
      }, timeNum);
    });
  }
};

export default debounce;
