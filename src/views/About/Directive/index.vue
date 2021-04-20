<template>
  <!-- 自定义指令 -->
  <div class="directive">
    <a-card class="directive-card" title="复制文本">
      <a-input-search v-model="message" @input="inp">
        <a-button slot="enterButton" v-copy:[message]="copyFn">复制</a-button>
      </a-input-search>
    </a-card>

    <a-card class="directive-card" title="长按触发">
      <!-- <a-button v-longpress:[500]="longpress">长按</a-button> -->
      <div class="turntable">
        <div
          :class="[
            'turntable-content',
            {
              'turntable-content-run': rotateFlag,
              'turntable-content-paused': !rotateFlag,
            },
          ]"
        >
          <img src="@/assets/images/cat.jpg" alt="" />
        </div>
        <div class="turntable-control">
          <a-icon
            class="icon"
            theme="twoTone"
            :type="!rotateFlag ? 'play-circle' : 'pause-circle'"
            v-longpress:[300]="longpress"
          />
        </div>
      </div>
    </a-card>

    <a-card class="directive-card" title="防抖">
      <a-statistic :value="number" style="margin-right: 50px">
        <template #suffix>
          个
          <a-button v-debounce:[300]="debounceClick">增加</a-button>
        </template>
      </a-statistic>
    </a-card>
  </div>
</template>
<script>
export default {
  name: "directive",
  data() {
    return {
      message: "",
      rotateFlag: false,
      number: 0
    };
  },
  created() {},
  methods: {
    inp() {
      this.message = this.message;
    },
    longpress() {
      this.rotateFlag = !this.rotateFlag;
    },
    debounceClick() {
      this.number++;
    },
    copyFn(el) {
      if (el.id === 0) {
        this.$message.warning(el.msg);
      } else {
        this.$message.success(`${el.msg}, 内容为：${el.text}`);
      }
    }
  }
};
</script>
<style scoped lang="scss">
@keyframes Tada {
  0% {
    transform: scale(0.8) rotate(0deg);
  }

  25% {
    transform: scale(0.9) rotate(90deg);
  }

  50% {
    transform: scale(1) rotate(180deg);
  }

  75% {
    transform: scale(0.9) rotate(270deg);
  }

  100% {
    transform: scale(0.8) rotate(360deg);
  }
}

.directive {
  width: 100%;
  height: 100%;

  .directive-card {
    &:not(:nth-child(1)) {
      margin-top: 20px;
    }

    .turntable {
      display: flex;
      justify-content: center;
      align-content: center;
      position: relative;

      .turntable-content {
        width: 300px;
        height: 300px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .turntable-content-run {
        animation: Tada 5s linear infinite;
      }

      .turntable-content-paused {
        animation: Tada 5s linear infinite paused;
      }

      .turntable-control {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -30px;
        margin-top: -30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        cursor: pointer;

        .icon {
          font-size: 60px;
        }
      }
    }
  }

  /deep/.ant-card {
    background: 0 !important;

    .ant-card-head {
      background: rgba(176, 239, 235, 0.5);

      .ant-card-head-wrapper {
        .ant-card-head-title {
          padding: 10px 0 !important;
          font-size: 14px;
          color: #666;
          cursor: default;
        }
      }
    }
  }
}
</style>
