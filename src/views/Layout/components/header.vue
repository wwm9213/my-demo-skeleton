<template>
  <!--  -->
  <div class="menu-header">
    <a-row>
      <a-col :span="12">
        <div class="menu-header-date">现在是北京时间{{ date }}</div>
      </a-col>
      <a-col :span="12" style="text-align:right">
        <a-dropdown placement="bottomCenter">
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            <span style="margin-right:10px">{{ userName }}</span>
            <a-avatar shape="square" icon="user" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">个人信息</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="exit">退出登录</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import moment from "moment";
import { storage } from "@/utils";
export default {
  data() {
    return {
      timer: null,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
      userName: ""
    };
  },
  created() {
    this.getDate();
    this.userName = storage.get().userName;
  },
  methods: {
    getDate() {
      this.timer = setTimeout(() => {
        setInterval(() => {
          this.date = moment().format("YYYY-MM-DD HH:mm:ss");
        }, 1000);
      });
    },
    exit() {
      const _this = this;
      this.$confirm({
        title: "提示",
        content: "确定退出吗？",
        onOk() {
          storage.del().then(res => {
            res && _this.$router.push("/login");
          });
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.menu-header {
  width: 100%;
  height: 100%;
  padding-right: 24px;
  box-sizing: border-box;

  .menu-header-date {
    font-size: 18px;
    font-weight: 600;
    cursor: default;
  }
}
</style>
