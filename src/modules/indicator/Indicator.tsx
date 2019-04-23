import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import { HorizontalMenuItem } from 'src/types/horizontalMenu'
import TopCon from './components/TopCon'
import LeftMenu from './components/LeftMenu'
import { appStore } from 'src/stores'
import moment from 'moment'
import BaseTable from './components/BaseTable'
import { Radio } from 'antd'
import BaseChart from './components/BaseChart'
import StatisticLeftList from './components/StatisticLeftList'
import { 床护比统计 } from './views/床护比统计'
import { 护患比统计 } from './views/护患比统计'
import { 小时平均护理时数 } from './views/24小时平均护理时数'
import { 不同级别护士配置 } from './views/不同级别护士配置'
import { 护士离职率 } from './views/护士离职率'
import { 住院患者跌倒发生率 } from './views/住院患者跌倒发生率'
import { 院内压疮发生率 } from './views/院内压疮发生率'
import { 住院患者身体约束率 } from './views/住院患者身体约束率'
import { 插管患者非计划拔管发生率 } from './views/插管患者非计划拔管发生率'
import { 导尿管相关尿路感染发生率 } from './views/导尿管相关尿路感染发生率'
import { 中心导管相关血流感染发生率 } from './views/中心导管相关血流感染发生率'
import { 呼吸机相关性肺炎发生率 } from './views/呼吸机相关性肺炎发生率'
import { 产科护理质量数据 } from './views/产科护理质量数据'

export interface Props extends RouteComponentProps<{ name?: string }> {}

const ROUTE_LIST = [
  {
    name: '床护比统计',
    columns: 床护比统计.columns,
    dataSource: 床护比统计.dataSource,
    keys: ['实际开放床位数', '实际配备护士数'],
    gName: '护理单元',
    lineKey: '实际床护比'
  },
  {
    name: '护患比统计',
    columns: 护患比统计.columns,
    dataSource: 护患比统计.dataSource,
    keys: ['患者数', '护士数'],
    gName: '护理单元',
    lineKey: '每天平均护患比'
  },
  {
    name: '24小时平均护理时数',
    columns: 小时平均护理时数.columns,
    dataSource: 小时平均护理时数.dataSource,
    keys: ['平均每天护理时数', '平均每天住院患者'],
    gName: '护理单元',
    lineKey: '每住院患者24小时平均护理时数'
  },
  {
    name: '不同级别护士配置',
    columns: 不同级别护士配置.columns,
    dataSource: 不同级别护士配置.dataSource,
    keys: ['护士总人数'],
    gName: '护理单元',
    lineKey: ''
  },
  {
    name: '护士离职率',
    columns: 护士离职率.columns,
    dataSource: 护士离职率.dataSource,
    keys: ['离职率'],
    gName: '护理单元',
    lineKey: ''
  },
  {
    name: '住院患者跌倒发生率',
    columns: 住院患者跌倒发生率.columns,
    dataSource: 住院患者跌倒发生率.dataSource,
    keys: ['跌倒发生率'],
    gName: '护理单元',
    lineKey: ''
  },
  {
    name: '院内压疮发生率',
    columns: 院内压疮发生率.columns,
    dataSource: 院内压疮发生率.dataSource,
    keys: ['压疮病例数', '同期患者数'],
    gName: '护理单元',
    lineKey: '压疮发生率(%)'
  },
  {
    name: '住院患者身体约束率',
    columns: 住院患者身体约束率.columns,
    dataSource: 住院患者身体约束率.dataSource,
    keys: ['约束天数', '患者人日数'],
    gName: '护理单元',
    lineKey: '身体约束率(%)'
  },
  {
    name: '插管患者非计划拔管发生率',
    columns: 插管患者非计划拔管发生率.columns,
    dataSource: 插管患者非计划拔管发生率.dataSource,
    keys: ['导管留置日数', 'UEX例数'],
    gName: '护理单元',
    lineKey: 'UEX发生率'
  },
  {
    name: '导尿管相关尿路感染发生率',
    columns: 导尿管相关尿路感染发生率.columns,
    dataSource: 导尿管相关尿路感染发生率.dataSource,
    keys: ['感染例数', '插管例数'],
    gName: '护理单元',
    lineKey: '感染率'
  },
  {
    name: '中心导管相关血流感染发生率',
    columns: 中心导管相关血流感染发生率.columns,
    dataSource: 中心导管相关血流感染发生率.dataSource,
    keys: ['感染例数', '插管例数'],
    gName: '护理单元',
    lineKey: '感染率'
  },
  {
    name: '呼吸机相关性肺炎发生率',
    columns: 呼吸机相关性肺炎发生率.columns,
    dataSource: 呼吸机相关性肺炎发生率.dataSource,
    keys: ['感染例数', '插管例数'],
    gName: '护理单元',
    lineKey: '感染率'
  },
  {
    name: '产科护理质量数据',
    columns: 产科护理质量数据.columns,
    dataSource: 产科护理质量数据.dataSource,
    keys: ['人数'],
    gName: '统计项目',
    lineKey: ''
  }
]

export default function Indicator (props: Props) {
  let [showType, setShowType] = useState('详情')
  useEffect(() => {
    setShowType('详情')
  }, [props.match.params.name])
  let currentRouteName = props.match.params.name
  let currentRoute = ROUTE_LIST.find((item) => item.name === currentRouteName)
  let startDate = moment()
    .subtract(1, 'M')
    .format('YYYY-MM-DD')
  let endDate = moment().format('YYYY-MM-DD')
  return (
    <Wrapper>
      <LeftMenuCon>
        {/* <LeftMenu routeList={ROUTE_LIST} /> */}
        <StatisticLeftList />
      </LeftMenuCon>
      <MainCon>
        <TopCon />
        <MainScroll>
          <MainInner>
            <RadioCon>
              <Radio.Group value={showType} buttonStyle='solid' onChange={(e: any) => setShowType(e.target.value)}>
                <Radio.Button value='详情'>详情</Radio.Button>
                <Radio.Button value='图表'>图表</Radio.Button>
              </Radio.Group>{' '}
            </RadioCon>

            <HisName>东莞厚街医院</HisName>
            <Title>{currentRoute!.name}</Title>
            <Date>
              日期：{startDate} 至 {endDate}
            </Date>
            {showType === '详情' && <BaseTable dataSource={currentRoute!.dataSource} columns={currentRoute!.columns} />}
            {showType === '图表' && (
              <BaseChart
                dataSource={
                  currentRoute!.name === '护士离职率' ? 住院患者跌倒发生率.dataSource : currentRoute!.dataSource
                }
                keys={currentRoute!.keys}
                name={currentRoute!.gName}
                lineKey={currentRoute!.lineKey}
              />
            )}
          </MainInner>
        </MainScroll>
      </MainCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: stretch;
`

const LeftMenuCon = styled.div`
  width: 200px;
  position: relative;
  z-index: 1;
  background: rgba(248, 248, 248, 1);
  box-shadow: 3px 7px 7px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(228, 228, 228, 1);
  border-top: 0;
`
const MainCon = styled.div`
  flex: 1;
  width: 0;
  align-items: stretch;
  display: flex;
  flex-direction: column;
`
const MainScroll = styled.div`
  flex: 1;
  overflow: auto;
`

const MainInner = styled.div`
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  border: 1px solid rgba(219, 224, 228, 1);
  min-height: calc(100vh - 168px);
  margin: 15px;
  padding: 10px 30px;
  position: relative;
`

const HisName = styled.div`
  font-size: 20px;
  color: #333;
  text-align: center;
  font-weight: bold;
  letter-spacing: 4px;
`
const Title = styled.div`
  font-size: 15px;
  color: #333;
  text-align: center;
`
const Date = styled.div`
  font-size: 13px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`

const RadioCon = styled.div`
  position: absolute;
  top: 20px;
  right: 35px;
`
