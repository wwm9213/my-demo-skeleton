<template>
  <div class="wrap">
    <div class="mark" v-if="isMark">
      <a-spin tip="Loading..." />
    </div>
    <div class="top-bar">
      <div>
        <a-badge :status="badgeStatus" text="" />
        <a class="name">消息</a>
      </div>
      <a-icon class="setting" type="setting" @click="showDrawer" />
    </div>

    <div class="message-area" ref="messageArea">
      <template v-if="msgList.length">
        <div class="box" v-for="(el, index) in msgList" :key="index">
          <!-- 别人发送的 -->
          <div v-if="el.status === 1" class="box1">
            <div class="box-head-portrait">
              <a-avatar size="default">
                {{ el.name }}
              </a-avatar>
            </div>
            <div class="box-msg">
              {{ el.msg }}
            </div>
            <div class="box-date">{{ el.date }}</div>
          </div>

          <!-- 我发送的 -->
          <div v-if="el.status === 0" class="box0">
            <div class="box-date">{{ el.date }}</div>
            <div class="box-msg">
              {{ el.msg }}
            </div>
            <div class="box-head-portrait">
              <a-avatar size="default">
                {{ el.name }}
              </a-avatar>
            </div>
          </div>

          <!-- 系统消息 -->
          <div v-if="el.status === 2" class="box2">
            {{ el.msg }}
          </div>
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
import { storage } from "@/utils";
import * as TYPE from "./types";
export default {
  data() {
    return {
      isFocus: false,
      // arr: [],
      input: "",
      visible: false,
      isMark: true,
      isEmpty: false,
      messageAreaFlag: false,
      tooltipFlag: false,
      timer: null,
      badgeStatus: "default",
      msgList: []
    };
  },
  watch: {
    msgList(val) {
      this.isEmpty = !val.length;
    }
  },
  created() {
    setTimeout(() => {
      this.isMark = false;
      this.getFocus();
      // const messageInfo = window.localStorage.getItem("messageInfo");
      // this.msgList = JSON.parse(messageInfo) || [];
      this.back();
    }, 500);
  },

  mounted() {
    this.getSocket();
  },

  methods: {
    getSocket() {
      const ws = new WebSocket("ws://localhost:8000/");
      this.ws = ws;

      // 用户进入房间
      ws.addEventListener("open", () => {
        this.badgeStatus = "success";

        const msgInfo = {
          msg: `${storage.get().userName}进入了房间`,
          date: moment().format("HH:mm:ss"),
          name: storage.get().userName,
          id: storage.get().token,
          type: TYPE.TYPE_ENTER
        };
        ws.send(JSON.stringify(msgInfo));
      });

      // 连接出现错误
      ws.addEventListener("error", e => {
        console.log("error", e);
        this.badgeStatus = "error";
      });

      // 收到服务端发来的信息
      ws.addEventListener("message", e => {
        const data = JSON.parse(e.data);
        this.msgList.push(data);
        this.msgList = this.msgList.map(el => ({
          ...el,
          status: this.formatStatus(el)
        }));
        // window.localStorage.setItem(
        //   "messageInfo",
        //   JSON.stringify(this.msgList)
        // );
        this.input = "";
        this.back();
      });

      // 用户连开了房间
      ws.addEventListener("close", e => {
        console.log("close", e);

        this.badgeStatus = "default";

        const msgInfo = {
          msg: `${storage.get().userName}离开了房间`,
          date: moment().format("HH:mm:ss"),
          name: storage.get().userName,
          id: storage.get().token,
          type: TYPE.TYPE_LEAVE
        };
        ws.send(JSON.stringify(msgInfo));
      });
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
      const msgInfo = {
        msg: this.input,
        date: moment().format("HH:mm:ss"),
        name: storage.get().userName,
        id: storage.get().token,
        type: TYPE.TYPE_MSG
      };
      this.ws.send(JSON.stringify(msgInfo));
    },

    back() {
      this.$nextTick(() => {
        if (!this.$refs.messageArea || !this.$refs.messageArea.scrollHeight)
          return;
        const messageArea = this.$refs.messageArea;
        const { scrollHeight } = messageArea;
        scrollHeight && messageArea.scrollTo(0, scrollHeight);
      });
    },

    clearAll() {
      this.$message.loading("清除中...", 1.5).then(() => {
        this.msgList = [];
        // window.localStorage.setItem("messageInfo", JSON.stringify([]));
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
    },

    // 处理消息类型
    formatStatus(el) {
      let num = null;
      const myToken = storage.get().token;
      if (el.type === TYPE.TYPE_MSG && el.id === myToken) {
        // 我发送的消息
        num = 0;
      } else if (el.type === TYPE.TYPE_MSG && el.id !== myToken) {
        // 别人发送的消息
        num = 1;
      } else if (el.type !== TYPE.TYPE_MSG) {
        // 系统消息
        num = 2;
      }
      return num;
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
    background: #f5f5f5;
    overflow-y: auto;
    padding: 20px;
    box-sizing: border-box;

    .box {
      display: flex;
      align-items: center;

      &:not(:nth-child(1)) {
        margin-top: 20px;
      }

      .box0 {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        &:hover {
          .box-date {
            display: block;
          }
        }

        .box-head-portrait {
          margin-left: 10px;
        }

        .box-msg {
          max-width: 300px;
          font-size: 14px;
          background: #9eea6a;
          color: #000;
          padding: 15px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          border-radius: 10px;
          border: 1px solid #9eea6a;

          &:hover {
            background: #98e165;
          }
        }

        .box-date {
          font-size: 16px;
          margin-right: 20px;
          display: none;
        }
      }

      .box1 {
        width: 100%;
        display: flex;
        align-items: center;

        &:hover {
          .box-date {
            display: block;
          }
        }

        .box-head-portrait {
          margin-right: 10px;
        }

        .box-msg {
          max-width: 300px;
          font-size: 14px;
          background: #fff;
          color: #000;
          padding: 15px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          border-radius: 10px;
          border: 1px solid #e7e7e7;

          &:hover {
            background: #f6f6f6;
          }
        }

        .box-date {
          font-size: 16px;
          margin-left: 20px;
          display: none;
        }
      }

      .box2 {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ccc;
        cursor: default;
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
