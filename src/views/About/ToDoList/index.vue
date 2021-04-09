<template>
  <!--  -->

  <div class="todolist">
    <div class="title">
      <span>ToDoList</span>
      <a-input
        v-model="input"
        allowClear
        style="width: 200px; margin-left: 20px"
      ></a-input>
      <a-button type="link" @click="add">添加</a-button>

      <a-button type="link" @click="sort">按照时间排序</a-button>
    </div>
    <!-- 待完成 -->
    <div class="To-start" v-if="befaultList.length">
      <h2>待完成</h2>

      <div v-for="(el, index) in befaultList" :key="el.id">
        <a-dropdown placement="bottomRight" v-if="!el.isEdit">
          <a class="ant-dropdown-link"
            >{{ index + 1 }}. {{ el.name }}<a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;" @click="option('over', el, index)"
                >已完成</a
              >
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="option('edit', el, index)">编辑</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="option('del', el, index)">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>

        <div v-else>
          <a-input
            style="width: 200px; margin-right: 20px"
            autofocus="autofocus"
            :placeholder="el.name"
            v-model="editInput"
          ></a-input>
          <a-button @click="confirm(el)">确定</a-button>
        </div>
      </div>
    </div>
    <!-- 已完成 -->
    <div class="done" v-if="afterList.length">
      <h2>已完成</h2>
      <p v-for="(el, index) in afterList" :key="el.id">
        {{ index + 1 }}. {{ el.name }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
      editInput: "",
      befaultList: [], // 待完成列表
      afterList: [], // 已完成列表
      sortFlag: true // 排序标志
    };
  },
  created() {
    this.befaultList = window.sessionStorage.getItem("befaultList")
      ? JSON.parse(window.sessionStorage.getItem("befaultList"))
      : [];
    this.afterList = window.sessionStorage.getItem("afterList")
      ? JSON.parse(window.sessionStorage.getItem("afterList"))
      : [];
  },
  methods: {
    add(e) {
      e.preventDefault();
      let input = this.input.trim();
      if (!input) return;
      this.befaultList.push({
        name: input,
        id: +new Date(),
        isEdit: false
      });
      this.formatStore("befaultList", this.befaultList);
      this.input = "";
    },

    sort(e) {
      e.preventDefault();
      this.sortFlag = !this.sortFlag;
      if (this.sortFlag) {
        this.afterList = this.afterList.sort((a, b) => a.id - b.id);
        this.befaultList = this.befaultList.sort((a, b) => a.id - b.id);
      } else {
        this.afterList = this.afterList.sort((a, b) => b.id - a.id);
        this.befaultList = this.befaultList.sort((a, b) => b.id - a.id);
      }
    },

    option(type, el, index) {
      if (type === "over") {
        this.afterList.push({ ...el, id: +new Date() });
        this.befaultList.splice(index, 1);
        this.formatStore("afterList", this.afterList);
        this.formatStore("befaultList", this.befaultList);
      } else if (type === "del") {
        this.befaultList.splice(index, 1);
        this.formatStore("befaultList", this.befaultList);
      } else if (type === "edit") {
        el.isEdit = true;
      }
    },

    confirm(el) {
      let input = this.editInput.trim();
      if (!input) {
        el.isEdit = false;
      }

      if (input) {
        el.name = input;
        el.isEdit = false;
      }

      this.formatStore("befaultList", this.befaultList);
    },

    formatStore(name, data) {
      window.sessionStorage.setItem(name, JSON.stringify(data));
    }
  }
};
</script>
<style scoped lang="scss">
.todolist {
  width: 100%;
  height: 100%;

  .title {
    display: flex;
    align-items: center;
  }
}
</style>