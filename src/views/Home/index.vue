<!--
 * @Date: 2021-04-09 11:06:25
 * @Author: wwm
 * @LastEditTime: 2021-05-11 18:23:58
 * @LastEditors: wwm
 * @Description: ...
-->
<template>
  <div class="home" ref="home">
    <div class="content">
      <div class="content-left">
        <div
          class="content-left-item"
          v-for="el in list"
          :key="el.id"
          @click="getRight(el)"
        >
          <span :style="{ color: el.index === defaultId ? '#fff' : '' }">{{
            el.name
          }}</span>
          <div class="content-left-item-icon" v-if="el.num">{{ el.num }}</div>
        </div>
      </div>
      <div class="content-right">
        <div
          class="content-right-item"
          v-for="item in list[defaultId].children"
          :key="item.id"
          @click="selectItem(list[defaultId].children, item)"
          :style="{ color: item.flag ? 'red' : '' }"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      list: [
        {
          name: "北京",
          id: "1",
          num: 0,
          children: [
            {
              name: "东城区",
              id: "1-1",
              flag: false
            },
            {
              name: "西城区",
              id: "1-2",
              flag: false
            }
          ]
        },
        {
          name: "上海",
          id: 2,
          num: 0,
          children: [
            {
              name: "黄浦区",
              id: "2-1",
              flag: false
            },
            {
              name: "徐汇区",
              id: "2-2",
              flag: false
            }
          ]
        }
      ],
      defaultId: 0
    };
  },
  created() {
    this.list = this.list.map((el, index) => ({ ...el, index }));

    function josephRing(n, m) {
      if (n <= 1 || m < 1) {
        console.log(
          "you can't play Joseph's game. n must be bigger than 1, m must be bigger than 0"
        );
        return;
      }

      let r = 0;
      for (let i = 2; i <= n; i++) {
        //会先计算 n = 2 时的结果，最终得到的 r 就是胜利者
        r = (r + m) % i;
      }
      console.log(r + 1 + " is the winner.");
    }

    let start = new Date().getTime();
    josephRing(10, 1);
    let end = new Date().getTime();
    console.log("====" + (end - start) + "====");
  },
  mounted() {},
  methods: {
    getRight(el) {
      this.defaultId = el.index;
    },

    selectItem(children, item) {
      item.flag = !item.flag;

      let num = children.filter(el => el.flag).length;

      this.list[this.defaultId].num = num;
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;

  .content {
    width: 100%;
    height: 100%;
    display: flex;

    .content-left {
      width: 20%;
      height: 100%;
      overflow-y: auto;
      background: #eee;

      .content-left-item {
        width: 100%;
        background: #ccc;
        padding: 10px 0;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        border-bottom: 1px solid #eee;

        span {
          &:hover {
            color: #fff;
          }
        }

        .content-left-item-icon {
          position: absolute;
          right: 0;
          top: 0;
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          background: red;
          border-radius: 50%;
        }
      }
    }

    .content-right {
      width: 80%;
      height: 100%;
      background: #ccc;
      overflow-y: auto;

      .content-right-item {
        width: 100%;
        background: #eee;
        padding: 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          color: red;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
