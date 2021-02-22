<template>
  <!--  -->
  <a-menu mode="inline" :default-selected-keys="['1']" theme="dark">
    <template v-for="menu in menuList">
      <!-- 含有二级菜单 -->
      <template v-if="menu.children && menu.children.length > 0">
        <a-sub-menu :key="menu.name">
          <span slot="title">
            <span :class="['iconfont', menu.icon]" />{{ menu.name }}
          </span>

          <a-menu-item v-for="subMenu in menu.children" :key="subMenu.name">
            <router-link :to="subMenu.path">
              {{ subMenu.name }}
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </template>
      <!-- 不包含二级菜单 -->
      <template v-else>
        <a-menu-item :key="menu.name">
          <router-link :to="menu.path">
            <div
              style="width: 100%;display:flex;justify-content: space-between;align-items:center"
            >
              <span>
                <span :class="['iconfont', menu.icon]" />{{ menu.name }}
              </span>
              <a-icon
                v-if="!collapsed"
                type="right"
                style="position:relative;left:11px"
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
    return { menuList };
  },
  watch: {},
  methods: {}
};
</script>
<style scoped>
.menu {
  justify-content: space-between;
}
</style>
