<template>
  <div class="wrap" @click="click($event)">
    <div class="mark" v-if="isMark">
      <a-spin tip="Loading..." />
    </div>
    <div class="top-bar">
      <a class="name">消息</a>
      <a-icon class="setting" type="setting" @click="showDrawer" />
    </div>
    <div
      class="message-area"
      ref="messageArea"
      :style="{ background: messageAreaFlag ? '#fff' : '#f5f5f5' }"
    >
      <template v-if="arr.length">
        <div
          class="box"
          v-for="(el, index) in arr"
          :key="index"
          :title="el.msg"
        >
          <div
            class="box-msg"
            :style="{ background: index % 2 === 0 ? '#509fd9' : '#55cdae ' }"
          >
            {{ el.msg }}
          </div>
          <div class="box-date">{{ el.date }}</div>
        </div>
      </template>
      <div class="empty" v-if="isEmpty">
        <a-empty description="暂无消息" />
      </div>
    </div>
    <div
      class="input-area"
      :style="{ background: isFocus ? '#fff' : '#F5F5F5' }"
    >
      <a-textarea
        class="message-input"
        ref="textarea"
        :rows="4"
        v-model.trim="input"
        @pressEnter="send"
        @focus="isFocus = true"
        @blur="isFocus = false"
      />
      <div class="options">
        <a-button-group>
          <a-button @click="clearInput">清空消息</a-button>
          <a-tooltip
            placement="topRight"
            :visible="tooltipFlag"
            trigger="click"
            overlayClassName="wrap-tooltip"
          >
            <template slot="title">
              <span>不能发送空白消息</span>
            </template>
            <a-button type="primary" @click="send">发送</a-button>
          </a-tooltip>
        </a-button-group>
      </div>
    </div>

    <a-drawer
      title="设置"
      placement="right"
      :closable="false"
      :visible="visible"
      :get-container="false"
      :wrap-style="{ position: 'absolute' }"
      @close="onClose"
    >
      <p @click="clearAll"><a style="color: red">删除聊天记录</a></p>
    </a-drawer>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      isFocus: false,
      arr: [],
      input: "",
      visible: false,
      isMark: true,
      isEmpty: false,
      messageAreaFlag: false,
      tooltipFlag: false,
      timer: null
    };
  },
  watch: {
    arr(val) {
      this.isEmpty = !val.length;
    }
  },
  created() {
    setTimeout(() => {
      this.isMark = false;
      this.getFocus();
      const messageInfo = window.localStorage.getItem("messageInfo");
      this.arr = JSON.parse(messageInfo) || [];
      this.back();
    }, 500);
  },

  methods: {
    click({ target }) {
      if (!this.isMark && !this.isEmpty) {
        const current = target.className;
        const domArr = this.formatDom();
        const flag = domArr.includes(current);
        this.messageAreaFlag = flag;
      }
    },

    send() {
      this.getFocus();
      if (!this.input) {
        if (this.timer) {
          this.tooltipFlag = true;
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.tooltipFlag = false;
        }, 1500);
        return;
      }
      this.arr.push({
        msg: this.input,
        date: moment().format("YYYY-MM-DD HH:mm:ss")
      });
      window.localStorage.setItem("messageInfo", JSON.stringify(this.arr));
      this.input = "";
      this.back();
    },

    back() {
      this.$nextTick(() => {
        const messageArea = this.$refs.messageArea;
        const { scrollHeight } = messageArea;
        messageArea.scrollTo(0, scrollHeight);
      });
    },

    clearAll() {
      this.$message.loading("清除中...", 1.5).then(() => {
        this.arr = [];
        window.localStorage.setItem("messageInfo", JSON.stringify([]));
        this.getFocus();
        this.$message.success("清除成功", 1.5);
      });
    },

    clearInput() {
      this.input = "";
      this.getFocus();
    },

    showDrawer() {
      this.visible = true;
    },

    onClose() {
      this.visible = false;
    },

    getFocus() {
      this.$refs.textarea.focus();
    },

    formatDom() {
      const messageArea = this.$refs.messageArea;
      const nodes = [messageArea, ...messageArea.getElementsByTagName("*")].map(
        el => el.className
      );
      return nodes;
    }
  }
};
</script>
<style scoped lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  .mark {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .top-bar {
    width: 100%;
    height: 50px;
    background: #fff;
    border-bottom: 1px solid #ececec;
    border-radius: 5px 5px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 18px;

    .setting {
      cursor: pointer;
      &:hover {
        color: #4395ff;
      }
    }
  }

  .message-area {
    flex: 1;
    width: 100%;
    // background: #f5f5f5;
    overflow-y: auto;
    padding: 20px;
    box-sizing: border-box;

    .box {
      display: flex;
      align-items: center;

      &:not(:nth-child(1)) {
        margin-top: 20px;
      }

      .box-msg {
        width: 500px;
        font-size: 18px;
        color: #fff;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-radius: 10px;

        &:hover {
          box-shadow: 3px 3px 3px #888888;
          + .box-date {
            display: block;
          }
        }
      }

      .box-date {
        font-size: 16px;
        margin-left: 20px;
        display: none;
      }
    }

    .empty {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .input-area {
    width: 100%;
    height: 150px;
    border-top: 1px solid #ececec;

    .message-input {
      width: 100%;
      height: 115px;
      max-height: 115px;
      background: 0;
      border: 0;
      resize: none;
    }

    .options {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding-right: 10px;
      box-sizing: border-box;
    }
  }
}
</style>

<style lang="scss">
.wrap {
  textarea,
  textarea.ant-input:hover,
  textarea:focus {
    border: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
}
.wrap-tooltip {
  .ant-tooltip-content {
    .ant-tooltip-arrow::before {
      background: #fff !important;
    }
    .ant-tooltip-inner {
      background: #fff !important;
      color: #000;
      cursor: default;
    }
  }
}
</style>
