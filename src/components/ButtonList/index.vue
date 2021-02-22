<template>
  <!--  -->
  <div class="button-list">
    <slot name="header"></slot>
    <slot name="content"></slot>
    <slot name="footer"></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped lang="scss">
.button-list {
  display: flex;
  justify-content: space-between;
}
</style>
