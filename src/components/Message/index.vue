<!--
 * @Date: 2021-05-06 16:03:44
 * @Author: wwm
 * @LastEditTime: 2021-05-06 18:17:55
 * @LastEditors: wwm
 * @Description: 使用vue.extend封装组件
-->
<template>
  <div :class="['comp-message', className]" id="compMessage" v-if="isShow">
    <span>{{ text }}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      text: "",
      className: "",
      timer: null
    };
  },
  methods: {
    success(text, cb, duration) {
      this.setDom("success", text, cb, duration);
    },
    warning(text, cb, duration) {
      this.setDom("warning", text, cb, duration);
    },
    danger(text, cb, duration) {
      this.setDom("danger", text, cb, duration);
    },
    info(text, cb, duration) {
      this.setDom("info", text, cb, duration);
    },

    setDom(type, text, cb, duration = 2000) {
      if (text === undefined || text === null) {
        return console.error("参数非法");
      }

      if (cb && typeof cb === "function") {
        cb();
      }

      if (cb && (typeof cb === "number" || typeof cb === "string")) {
        duration = Number(cb);
      }

      this.className = type;
      this.isShow = true;
      this.text = text;

      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.isShow = false;
        this.text = "";
      }, duration);
    }
  }
};
</script>
<style scoped lang="scss">
.comp-message {
  min-width: 180px;
  min-height: 30px;
  padding: 10px 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  color: #999;
  z-index: 9999;
  background: #fff;
  box-shadow: 3px 3px 10px #999;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.success {
  color: #67c23a;
}

.warning {
  color: #e6a23c;
}

.danger {
  color: #f56c6c;
}

.info {
  color: #909399;
}
</style>
