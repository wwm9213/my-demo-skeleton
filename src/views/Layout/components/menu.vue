<template>
  <!--  -->
  <a-menu
    mode="inline"
    :default-selectedKeys="['/home']"
    :selectedKeys="pathKeys"
    theme="dark"
    :inline-collapsed="collapsed"
  >
    <template v-for="menu in menuList">
      <!-- 含有二级菜单 -->
      <template v-if="menu.children && menu.children.length > 0">
        <a-sub-menu :key="menu.path">
          <span slot="title">
            <!-- <span :class="['iconfont', menu.icon]" /> -->
            <a-icon :type="menu.icon" />
            <span> {{ menu.name }}</span>
          </span>

          <a-menu-item v-for="subMenu in menu.children" :key="subMenu.path">
            <router-link :to="subMenu.path">
              <a-icon :type="subMenu.icon" />
              <span> {{ subMenu.name }}</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </template>
      <!-- 不包含二级菜单 -->
      <template v-else>
        <a-menu-item :key="menu.path">
          <router-link :to="menu.path">
            <div
              style="
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <span>
                <!-- <span :class="['iconfont', menu.icon]" /> -->
                <a-icon :type="menu.icon" />
                <span>{{ menu.name }}</span>
              </span>
              <a-icon
                v-if="!collapsed"
                type="right"
                style="position: relative; left: 11px"
              ></a-icon>
            </div>
          </router-link>
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>
<script>
import menuList from "../menuList";
export default {
  props: ["collapsed"],
  data() {
    return { menuList, pathKeys: ["/home"] };
  },
  created() {
    this.pathKeys = [this.$route.path];
  },
  watch: {
    ["$route"](val) {
      this.pathKeys = [val.path];
    }
  }
};
</script>
<style scoped>
.menu {
  justify-content: space-between;
}
</style>
