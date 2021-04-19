<template>
  <!--  -->
  <div class="layout">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo" @click="$route.path !== '/home' && $router.push('/')">
          王清桓
        </div>
        <Menu :collapsed="collapsed" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0; display: flex">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="toggleCollapsed"
          />
          <Header />
        </a-layout-header>
        <a-layout-content
          :style="{
            margin: '20px 15px',
            padding: '20px',
            background: '#fff',
            minHeight: '280px',
          }"
          v-waterMarker="{
            text: '王清桓',
            textColor: 'rgba(180, 180, 180, 0.4)',
          }"
        >
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import Menu from "./components/menu";
import Header from "./components/header";
export default {
  components: {
    Menu,
    Header
  },
  data() {
    return {
      collapsed:
        window.sessionStorage.getItem("collapsed") === "true" ? "true" : "false"
    };
  },
  watch: {
    collapsed() {
      this.getCollapsed();
    }
  },
  created() {
    this.getCollapsed();
  },
  methods: {
    getCollapsed() {
      if (this.collapsed === "true") this.collapsed = true;
      if (this.collapsed === "false") this.collapsed = false;
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
      window.sessionStorage.setItem("collapsed", this.collapsed);
    }
  }
};
</script>
<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100%;

  #components-layout-demo-custom-trigger {
    width: 100%;
    height: 100%;

    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .logo {
      height: 32px;
      background: rgba(255, 255, 255, 0.2);
      margin: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
