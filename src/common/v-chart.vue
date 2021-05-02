<template>
  <div id="main" style="height: 200px; width: 800px"></div>
</template>

<script>
var echarts = require("echarts");

export default {
  props:{
    titleText:{
    },
    dataAxis:{},
    data:{},
  },
  
  mounted() {
    var chartDom = document.getElementById("main");
    console.log("chartDom", chartDom);
    var myChart = echarts.init(chartDom, "light");
    var option;
 
 
    var yMax = 150;
    var dataShadow = [];

    for (var i = 0; i < this.data.length; i++) {
      dataShadow.push(yMax);
    }

    option = {
      title: {
        text: this.titleText ,
        subtext: "成绩一览无余",
      },
      xAxis: {
        data: this.dataAxis,
        axisLabel: {
          inside: true,
          textStyle: {
            color: "#fff",
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        z: 10,
      },
      yAxis: {
        type: 'value',
        data:[10,20,30,40,50,60,70,80,90,100,110,120,130,140,150],
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: "#999",
          },
        },
      },
      dataZoom: [
        {
          type: "inside",
        },
      ],
      series: [
        {
          type: "bar",
          showBackground: true,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#83bff6" },
              { offset: 0.5, color: "#188df0" },
              { offset: 1, color: "#188df0" },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#2378f7" },
                { offset: 0.7, color: "#2378f7" },
                { offset: 1, color: "#83bff6" },
              ]),
            },
          },
          data: this.data,
        },
      ],
    };

    // Enable data zoom when user click bar.
    var zoomSize = 6;
    let _this = this
    myChart.on("click", function (params) {
      // console.log(this.dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
      myChart.dispatchAction({
        type: "dataZoom",
        startValue: _this.dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue:
          _this.dataAxis[Math.min(params.dataIndex + zoomSize / 2, _this.data.length - 1)],
      });
    });

    option && myChart.setOption(option);
  },
};
</script>

<style>
#main {
  height: 800px !important;
  /* background: #000; */
}
</style>