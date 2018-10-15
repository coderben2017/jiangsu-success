import './style.css';
import * as React from 'react';
import * as echarts from 'echarts';
import { Layout, Icon } from "antd";
import StatisticsEchartsPie from "../statistics-echarts-pie";
import StatisticsEchartsPillar from "../statistics-echarts-pillar";
import StatisticsEchartsLine from "../statistics-echarts-line";
import StatisticsSiderTree from "../statistics-sider-tree";
import StatisticsModule from "../../model/StatisticsModule";
import HttpClient from "../../services/HttpClient";

const {Sider, Content} = Layout;


class Statistics extends React.Component {

  state = {
    activeType: 1,      // 当前类，用于大中小类切换
    activeTab: 'rank',  // 当前标签，用于排行和占比切换
    typeCount: 0,       // 当前类数量
    singleCount: 0,     // 单像素数量
    multiCount: 0,      // 多像素数量
    sectionCount: 0,    // 切片图形数量
    content: (          // 用于渲染大类排行表格
      <div className='container-table'>
        <table>
          <thead>
            <tr><th>排名</th><th>类别名称</th><th>数据个数</th></tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    ),
    tableDatas: [],     // 大类排行（表格）数据
    pieDatas: [],       // 大类占比（饼图）数据
    pillarDatas: [],    // 柱状图数据
    lineDatas: []       // 折线图数据
  };

  // 更新统计量
  updateStatistics = (period: string) => {
    // 请求当前类、单像素、多像素、切片图形数量
    HttpClient.getTypesCount(period).then(res => {
      let count: any;
      switch (this.state.activeType) {
        case 1: count = res.typeCount1; break;
        case 2: count = res.typeCount2; break;
        case 3: count = res.typeCount3; break;
      }
      this.setState({
        typeCount: count,
        singleCount: res.singleCount,
        multiCount: res.multiCount,
        sectionCount: res.sectionCount,
      });
    });
    
    // 请求大类数据
    HttpClient.getBigTypesCount().then(res => {
      this.setState({
        pieDatas: res
      });

      const sortedArr = res;
      sortedArr.sort((a, b) => {
        return a.num - b.num;
      })
      this.setState({
        tableDatas: sortedArr
      });
    });

    // 请求各城市样例数量
    HttpClient.getCitySampleCount().then(res => {
      this.setState({
        pillarDatas: res
      });
    });

    // 请求各子类三种样例数量
    HttpClient.getChildTypesCount().then(res => {
      console.log('line data', res);
      this.setState({
        lineDatas: res
      });
    });
  }

  // 点击大类数量
  onClickType1 = () => {
    this.setState({
      activeType: 1
    }, () => {
      this.updateStatistics(StatisticsModule.getSelectedPeriod());
    });
  };

  // 点击中类数量
  onClickType2 = () => {
    this.setState({
      activeType: 2
    }, () => {
      this.updateStatistics(StatisticsModule.getSelectedPeriod());
    });
  };

  // 点击子类数量
  onClickType3 = () => {
    this.setState({
      activeType: 3
    }, () => {
      this.updateStatistics(StatisticsModule.getSelectedPeriod());
    });
  };

  // 点击大类排行
  clickRank = () => {
    this.setState({
      activeTab: 'rank',
      content: (
        <div className='container-table'>
          <table>
            <thead>
              <tr><th>排名</th><th>类别名称</th><th>数据个数</th></tr>
            </thead>
            <tbody>
              {this.loadTbody()}
            </tbody>
          </table>
        </div>
      )
    });
  }

  // 点击大类占比
  clickProportion = () => {
    this.setState({
      activeTab: 'proportion',
      content: (
        <StatisticsEchartsPie pieDatas={this.state.pieDatas} />  
      )
    });
  }

  // 渲染大类排行表格
  loadTbody(): any[] {
    let tds = [];
    const arr = this.state.tableDatas;
    for (let i = 0; i < arr.length; ++i) {
      if (i < 3) {
        tds.push(<tr key={i + 1}><td className='td-red'>{i + 1}</td><td>{arr[i].typeName}</td><td>{arr[i].sum}</td></tr>);
      } else {
        tds.push(<tr key={i + 1}><td>{i + 1}</td><td>{arr[i].typeName}</td><td>{arr[i].sum}</td></tr>);
      }
    }
    return tds;
  }

  render () {
    return (
      <Layout>
        <Sider className="sider">
          <StatisticsSiderTree updateStatistics={this.updateStatistics} />
        </Sider>
        <Content className='container-statistics'>
          <div className='container-top'>
            <div className='div-num'>
              <span className={this.state.activeType === 1 ? 'active' : ''} onClick={this.onClickType1}>大类数量</span>/
              <span className={this.state.activeType === 2 ? 'active' : ''} onClick={this.onClickType2}>中类数量</span>/
              <span className={this.state.activeType === 3 ? 'active' : ''} onClick={this.onClickType3}>子类数量</span><br />
              <span className='number'>{this.state.typeCount}</span>个
            </div>
            <div className='div-num'>
              <span>单像素样本总数</span><br />
              <span className='number'>{this.state.singleCount}</span>个
            </div>
            <div className='div-num'>
              <span>多像素样本总数</span><br />
              <span className='number'>{this.state.multiCount}</span>个
            </div>
            <div className='div-num'>
              <span>切片图形样本总数</span><br />
              <span className='number'>{this.state.sectionCount}</span>个
            </div>
          </div>

          <div className='container-middle'>
            <div className='container-city-samples'>
              <span className='icon-1' /><p className='p-title'>各个市三种样例数量统计对比</p>
              <StatisticsEchartsPillar pillarDatas={this.state.pillarDatas} />
            </div>
            
            <div className='container-bigtypes-count'>
              <div className='icon-1' /><p className='p-title'>各大类数据量统计<small>（请双击）</small></p>
              <span className={this.state.activeTab === 'rank' ? 'link link-active' : 'link'} onClick={this.clickRank}>排行</span>
              <span className={this.state.activeTab === 'proportion' ? 'link link-active' : 'link'} onClick={this.clickProportion}>占比</span>
              {this.state.content}
            </div>
          </div>

          <div className='container-bottom'>
            <span className='icon-1' /><p className='p-title'>各子类数据三种样例数量统计对比</p>
            <StatisticsEchartsLine lineDatas={this.state.lineDatas} />
          </div>
        </Content>
      </Layout>
    );
  }

}

export default Statistics;
