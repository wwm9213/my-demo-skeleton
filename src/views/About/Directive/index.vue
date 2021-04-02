<template>
  <!-- 自定义指令 -->
  <div class="directive">
    <a-button v-copy:[message]="copyFn">复制文本</a-button>
    <a-button v-longpress:[500]="longpress">长按</a-button>
    <a-button v-debounce:[500]="debounceClick">防抖</a-button>
  </div>
</template>
<script>
export default {
  name: "directive",
  data() {
    return {
      message: "hello world"
    };
  },
  created() {},
  methods: {
    longpress() {
      alert("长按指令生效");
    },
    debounceClick() {
      console.log("只触发一次");
    },
    copyFn(el) {
      if (el.id === 0) {
        this.$message.warning(el.msg);
      } else {
        this.$message.success(`${el.msg}, 内容为：${el.text}`);
      }
    }
  }
};
</script>
<style scoped lang="scss">
.directive {
  width: 100%;
  height: 100%;
}
</style>
