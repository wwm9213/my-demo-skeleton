/**
 * 需求：实现一个拖拽指令，可在页面可视区域任意拖拽元素。

   思路：

        1、设置需要拖拽的元素为相对定位，其父元素为绝对定位。
        2、鼠标按下(onmousedown)时记录目标元素当前的 left 和 top 值。
        3、鼠标移动(onmousemove)时计算每次移动的横向距离和纵向距离的变化值，并改变元素的 left 和 top 值
        4、鼠标松开(onmouseup)时完成一次拖拽
 
        使用: 在 Dom 上加上 v-draggable 即可
        dragElSelector 被拖拽元素
        <div class="simple-drag" v-draggable="{dragElSelector: '.simple-drag'}">
            <div class="simple-drag-header">
                <h4 class="simple-drag-title">简单拖拽</h4>
                <button type="button" class="close-btn">×</button>
            </div>
        </div>
*/

const draggable = {
  //指令绑定到元素
  bind(el, binding) {
    /*
     *  el  指令绑定的元素，可以用来直接操作dom
     *      指令传入的参数，修饰符，值，v-指令名称:参数.修饰符=值
     *  binding 一个对象，包含许多的属性
     */
    el.onmousedown = function(e) {
      console.log("开始拖动");
      let disX = e.clientX - el.offsetLeft;
      let disY = e.clientY - el.offsetTop;

      document.onmousemove = function(e) {
        let L = e.clientX - disX;
        let T = e.clientY - disY;
        if (binding.modifiers.limit) {
          if (L < 0) {
            L = 0;
          } else if (T < 0) {
            T = 0;
          }
        }

        console.log("拖动中");

        el.style.left = L + "px";
        el.style.top = T + "px";
      };
      document.onmouseup = function() {
        document.onmousemove = null;
        console.log("拖动结束");
      };
      return false;
    };
  }
};

export default draggable;
