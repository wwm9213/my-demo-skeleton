<template>
  <div class="wrap">
    <div class="wrap-mark" v-if="isMark">
      <a-spin tip="Loading..." />
    </div>
    <div class="wrap-top-bar">
      <div>
        <a-badge :status="badgeStatus" />
        <a class="name">聊天室（{{ peolpeNum }}人在线）</a>
      </div>
      <a-icon class="setting" type="setting" @click="showDrawer" />
    </div>

    <div class="wrap-content">
      <div class="wrap-content-message-area" ref="messageArea">
        <template v-if="msgList.length">
          <div
            class="wrap-content-message-area-box"
            v-for="(el, index) in msgList"
            :key="index"
          >
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
        class="wrap-content-input-area"
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
        <div class="wrap-content-input-area-options">
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
              <a-button type="primary" @click="send"> 发送 </a-button>
            </a-tooltip>
          </a-button-group>
        </div>
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
import tokenInfo from "@/utils/tokenInfo";
import * as TYPE from "./types";
import WsConfig from "./WsConfig";

export default {
  data() {
    return {
      isFocus: false,
      input: "",
      visible: false,
      isMark: true,
      isEmpty: false,
      messageAreaFlag: false,
      tooltipFlag: false,
      timer: null,
      badgeStatus: "default",
      msgList: [],
      peolpeNum: 0
    };
  },
  watch: {
    msgList(val) {
      this.isEmpty = !val.length;
      const len = val.length;
      this.peolpeNum = val[len - 1].peopleNum;
    }
  },
  created() {
    setTimeout(() => {
      this.isMark = false;
      this.getFocus();
      this.back();
    }, 500);
  },

  mounted() {
    this.getSocket();
  },

  methods: {
    getSocket() {
      const WsConf = new WsConfig("ws://localhost:8000");
      this.ws = WsConf.ws;
      const ws = WsConf.ws;

      // 用户进入房间
      WsConf.onopen(() => {
        this.badgeStatus = "success";

        const msgInfo = {
          msg: `${tokenInfo.get().userName}进入了房间`,
          date: moment().format("HH:mm:ss"),
          name: tokenInfo.get().userName,
          id: tokenInfo.get().token,
          type: TYPE.TYPE_ENTER
        };
        ws.send(JSON.stringify(msgInfo));
      });

      // 连接出现错误
      WsConf.onerror(() => {
        console.log("error", e);
        this.badgeStatus = "error";
      });

      // 收到服务端发来的信息
      WsConf.onmessage(e => {
        let data = JSON.parse(e.data);
        this.msgList.push(data);
        this.msgList = this.msgList.filter(
          el => el.type !== TYPE.TYPE_HEART_CHECK
        );
        this.msgList = this.msgList.map(el => ({
          ...el,
          status: this.formatStatus(el)
        }));
        // this.input = "";
        data.type !== TYPE.TYPE_HEART_CHECK && this.back();
      });

      // 用户连开了房间
      WsConf.onclose(e => {
        console.log("close", e);
        this.badgeStatus = "default";
      });
    },

    send() {
      // this.getFocus();
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
        name: tokenInfo.get().userName,
        id: tokenInfo.get().token,
        type: TYPE.TYPE_MSG
      };
      this.ws.send(JSON.stringify(msgInfo));
      this.clearInput();
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

    // 处理消息类型
    formatStatus(el) {
      let num = null;
      const myToken = tokenInfo.get().token;
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
  },

  beforeRouteLeave(to, from, next) {
    const msgInfo = {
      msg: `${tokenInfo.get().userName}离开了房间`,
      date: moment().format("HH:mm:ss"),
      name: tokenInfo.get().userName,
      id: tokenInfo.get().token,
      type: TYPE.TYPE_LEAVE
    };
    this.ws.send(JSON.stringify(msgInfo));
    this.ws.close();

    next();
  }
};
</script>
<style scoped lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  .wrap-mark {
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

  .wrap-top-bar {
    width: 100%;
    height: 50px;
    background: #fff;
    border-bottom: 1px solid #ececec;
    border-radius: 5px 5px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 18px;

    .setting {
      cursor: pointer;
      &:hover {
        color: #4395ff;
      }
    }
  }
  .wrap-content {
    height: calc(100% - 50px);
    .wrap-content-message-area {
      width: 100%;
      height: calc(100% - 20%);
      background: #f5f5f5;
      overflow-y: auto;
      padding: 20px;
      box-sizing: border-box;

      .wrap-content-message-area-box {
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
            padding: 10px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            border-radius: 5px;
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
            padding: 10px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            border-radius: 5px;
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

    .wrap-content-input-area {
      width: 100%;
      height: 20%;
      display: flex;
      flex-direction: column;
      border-top: 1px solid #ececec;

      .message-input {
        width: 100%;
        flex: 1;
        overflow-y: auto;
        background: 0;
        border: 0;
        resize: none;
      }

      .wrap-content-input-area-options {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding-right: 10px;
        box-sizing: border-box;
      }
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
