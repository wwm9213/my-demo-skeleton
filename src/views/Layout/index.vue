<template>
  <!--  -->
  <div class="layout">
    <a-layout class="components-layout-demo-custom-trigger">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo" @click="$route.path !== '/home' && $router.push('/')">
          离心力
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
            height: '100%'
          }"
          v-waterMarker="{
            text: '离心力',
            textColor: 'rgba(180, 180, 180, 0.4)'
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

  .components-layout-demo-custom-trigger {
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

    .slide-fade-enter-active {
      transition: all 0.5s ease;
    }
    .slide-fade-leave-active {
      transition: all 0.2s;
    }
    .slide-fade-enter {
      transform: translateX(50px);
      opacity: 0;
    }
    .slide-fade-leave-to {
      opacity: 0;
    }
  }
}
</style>
