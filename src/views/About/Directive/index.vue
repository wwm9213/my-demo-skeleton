<template>
  <!-- 自定义指令 -->
  <div
    class="directive"
    v-waterMarker="{
      text: '王雯茂版权所有',
      textColor: 'rgba(180, 180, 180, 0.4)'
    }"
  >
    <button v-copy="message">复制文本</button>
    <button v-longpress:[500]="longpress">长按</button>
    <button v-debounce:[500]="debounceClick">防抖</button>

    <div class="simple-drag" v-draggable.limit></div>
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
  created() {
    console.log(this);
  },
  methods: {
    longpress() {
      alert("长按指令生效");
    },
    debounceClick() {
      console.log("只触发一次");
    }
  }
};
</script>
<style scoped lang="scss">
.directive {
  width: 100%;
  height: 100%;
  position: relative;

  .simple-drag {
    width: 500px;
    height: 200px;
    border: 1px solid #ccc;
    position: absolute;
    left: 0;
    top: 0;
    background: red;
  }
}
</style>
