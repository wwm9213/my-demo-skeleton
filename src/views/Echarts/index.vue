<template>
  <!--  -->
  <div class="echarts-demo" ref="chart"></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.chart = this.$echarts.init(this.$refs.chart);
    this.loadChart();
  },
  methods: {
    loadChart() {
      const data = [
        {
          name: "Mon",
          value: 100
        },
        {
          name: "Tue",
          value: 200
        },
        {
          name: "Wed",
          value: 300
        },
        {
          name: "Thu",
          value: 400
        },
        {
          name: "Fri",
          value: 500
        },
        {
          name: "Sat",
          value: 600
        },
        {
          name: "Sun",
          value: 700
        }
      ];
      this.chart.setOption({
        xAxis: {
          type: "category",
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          data: data.map(el => el.name)
        },
        yAxis: {
          type: "value",
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        series: [
          {
            type: "bar",
            data
          }
        ]
      });
    }
  }
};
</script>
<style scoped lang="scss">
.echarts-demo {
  width: 100%;
  height: 100%;
}
</style>
