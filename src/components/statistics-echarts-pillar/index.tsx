import * as React from "react";
import * as echarts from "echarts";
import HttpClient from "../../services/HttpClient";

interface IndexProps {
  pillarDatas: any
}

class StatisticsEchartsPillar extends React.Component<IndexProps, {}> {

  componentDidUpdate() {
    const pillar = echarts.init(document.getElementById('container-city-samples'));

    const datas = this.props.pillarDatas; // 接收父组件数据，用于柱状图渲染
    const cities: string[] = [];          // 城市名数组
    const counts_single: number[] = [];   // 单像素值数组
    const counts_multi: number[] = [];    // 多像素值数组
    const counts_section: number[] = [];  // 切片图形值数组
    datas.forEach((value, index) => {
      cities.push(value.city);
      counts_single.push(value.pixelWiseSum);
      counts_multi.push(value.patchWiseSum);
      counts_section.push(value.imgWiseSum);
    });
    const option_pillar = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        show: false
      },
      legend: {
        data: ['单像素', '多像素', '切片图形']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: {
        type: 'value'
      },
      xAxis: {
        type: 'category',
        data: cities
      },
      series: [
        {
          name: '单像素',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: counts_single,
          barWidth: 30
        },
        {
          name: '多像素',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: counts_multi,
          barWidth: 30
        },
        {
          name: '切片图形',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: counts_section,
          barWidth: 30
        },
      ],
      color: ['#83a9e6', '#6fc7aa', '#f6d8a6']
    };

    pillar.setOption(option_pillar);
  }

  render() {
    return (
      <div id='container-city-samples' />
    );
  }
}

export default StatisticsEchartsPillar;