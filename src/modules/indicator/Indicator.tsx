import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import { HorizontalMenuItem } from 'src/types/horizontalMenu'
import TopCon from './components/TopCon'
import LeftMenu from 'src/components/LeftMenu'
import { appStore } from 'src/stores'
import moment from 'moment'
import BaseTable from 'src/components/BaseTable'
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
import { 高危药物静脉外渗率 } from './views2/高危药物静脉外渗率'
import { 输血输液反应倒数 } from './views2/输血输液反应倒数'
import { 非计划拔管发生率 } from './views2/非计划拔管发生率'
import { 导管相关血液感染发生率 } from './views2/导管相关血液感染发生率'
import { 尿管相关泌尿系感染发生率 } from './views2/尿管相关泌尿系感染发生率'
import { 手术相关肺部感染发生率 } from './views2/手术相关肺部感染发生率'
import { 患者入院前已有压疮统计 } from './views2/患者入院前已有压疮统计'
import { 入院时压疮高风险患者评估率 } from './views2/入院时压疮高风险患者评估率'
import { 住院压疮高风险压疮发生率 } from './views2/住院压疮高风险压疮发生率'
import { 住院患者手术室压疮发生率 } from './views2/住院患者手术室压疮发生率'
import { 排便失禁患者失禁性皮炎发生率 } from './views2/排便失禁患者失禁性皮炎发生率'
import { 跌倒坠床高风险患者评估率 } from './views2/跌倒坠床高风险患者评估率'
import { 住院患者跌倒发生率2 } from './views2/住院患者跌倒发生率'
import { 住院患者跌倒坠床伤害程度 } from './views2/住院患者跌倒坠床伤害程度'
import { 住院患者误吸高风险评估率 } from './views2/住院患者误吸高风险评估率'
import { 住院高风险患者误吸发生率 } from './views2/住院高风险患者误吸发生率'
import { 走失高风险住院患者评估阳性数 } from './views2/走失高风险住院患者评估阳性数'
import { 患者走失发生率 } from './views2/患者走失发生率'
import { 患者足下垂的发生率 } from './views2/患者足下垂的发生率'
import { 新生儿烧伤烫伤发生率 } from './views2/新生儿烧伤烫伤发生率'
import { 查对制度落实合格率 } from './views2/查对制度落实合格率'
import { 护理不良事件报告处理符合率 } from './views2/护理不良事件报告处理符合率'
import { 使用药物错误的发生率 } from './views2/使用药物错误的发生率'
import { 急救设备器材及药品完好合格率 } from './views2/急救设备器材及药品完好合格率'
import { 无菌物品合格率 } from './views2/无菌物品合格率'
import { 器械清洗合格率 } from './views2/器械清洗合格率'
import { 包装合格率 } from './views2/包装合格率'
import { 湿包发生率 } from './views2/湿包发生率'
import { LEFT_MENU } from './config'

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
  },
  {
    name: '高危药物静脉外渗率',
    columns: 高危药物静脉外渗率.columns,
    dataSource: 高危药物静脉外渗率.dataSource,
    keys: ['静脉使用高危药物发生外渗的例数'],
    gName: '护理单元',
    lineKey: '外渗率(%)'
  },
  {
    name: '输血输液反应倒数',
    columns: 输血输液反应倒数.columns,
    dataSource: 输血输液反应倒数.dataSource,
    keys: ['输血反应例数', '输液反应例数'],
    gName: '护理单元',
    lineKey: ''
  },
  {
    name: '非计划拔管发生率',
    columns: 非计划拔管发生率.columns,
    dataSource: 非计划拔管发生率.dataSource,
    keys: ['导管留置日数', 'UEX例数'],
    gName: '护理单元',
    lineKey: '发生率(%)'
  },
  {
    name: '导管相关血液感染发生率',
    columns: 导管相关血液感染发生率.columns,
    dataSource: 导管相关血液感染发生率.dataSource,
    keys: ['插管总日数', '感染人数'],
    gName: '护理单元',
    lineKey: '发生率(%)'
  },
  {
    name: '尿管相关泌尿系感染发生率',
    columns: 尿管相关泌尿系感染发生率.columns,
    dataSource: 尿管相关泌尿系感染发生率.dataSource,
    keys: ['插管总日数', '感染人数'],
    gName: '护理单元',
    lineKey: '发生率(%)'
  },
  {
    name: '手术相关肺部感染发生率',
    columns: 手术相关肺部感染发生率.columns,
    dataSource: 手术相关肺部感染发生率.dataSource,
    keys: ['插管总日数', '感染人数'],
    gName: '护理单元',
    lineKey: '发生率(%)'
  },
  {
    name: '患者入院前已有压疮统计',
    columns: 患者入院前已有压疮统计.columns,
    dataSource: 患者入院前已有压疮统计.dataSource,
    keys: ['插管总日数', '感染人数'],
    gName: '护理单元',
    lineKey: '发生率(%)'
  },
  {
    name: '入院时压疮高风险患者评估率',
    columns: 入院时压疮高风险患者评估率.columns,
    dataSource: 入院时压疮高风险患者评估率.dataSource,
    keys: ['插管总日数', '感染人数'],
    gName: '护理单元',
    lineKey: '发生率(%)'
  },
  {
    name: '住院压疮高风险压疮发生率',
    columns: 住院压疮高风险压疮发生率.columns,
    dataSource: 住院压疮高风险压疮发生率.dataSource,
    keys: ['插管总日数', '感染人数'],
    gName: '护理单元',
    lineKey: '发生率(%)'
  },
  {
    name: '住院患者手术室压疮发生率',
    columns: 住院患者手术室压疮发生率.columns,
    dataSource: 住院患者手术室压疮发生率.dataSource,
    keys: ['手术总人数', '发生压疮人数'],
    gName: '护理单元',
    lineKey: '发生率(%)'
  },
  {
    name: '排便失禁患者失禁性皮炎发生率',
    columns: 排便失禁患者失禁性皮炎发生率.columns,
    dataSource: 排便失禁患者失禁性皮炎发生率.dataSource,
    keys: ['失禁患者发生失禁性皮炎人数', '住院患者总人数'],
    gName: '护理单元',
    lineKey: '发生率(%)'
  },
  {
    name: '跌倒坠床高风险患者评估率',
    columns: 跌倒坠床高风险患者评估率.columns,
    dataSource: 跌倒坠床高风险患者评估率.dataSource,
    keys: ['跌倒/坠床高风险患者评估阳性例数', '入院时高风险患者总人数'],
    gName: '护理单元',
    lineKey: '评估率(%)'
  },
  {
    name: '住院患者跌倒发生率',
    columns: 住院患者跌倒发生率2.columns,
    dataSource: 住院患者跌倒发生率2.dataSource,
    keys: ['住院总人数', '跌倒人次'],
    gName: '护理单元',
    lineKey: '发生率(%)'
  },
  {
    name: '住院患者跌倒坠床伤害程度',
    columns: 住院患者跌倒坠床伤害程度.columns,
    dataSource: 住院患者跌倒坠床伤害程度.dataSource,
    keys: [],
    gName: '',
    lineKey: ''
  },
  {
    name: '住院患者误吸高风险评估率',
    columns: 住院患者误吸高风险评估率.columns,
    dataSource: 住院患者误吸高风险评估率.dataSource,
    keys: ['入院时评估误吸高风险患者总人数', '误吸高风险患者评估阳性例数'],
    gName: '护理单元',
    lineKey: '评估率(%)'
  },
  {
    name: '住院高风险患者误吸发生率',
    columns: 住院高风险患者误吸发生率.columns,
    dataSource: 住院高风险患者误吸发生率.dataSource,
    keys: ['住院患者总人数', '住院患者发生误吸例数'],
    gName: '护理单元',
    lineKey: '评估率(%)'
  },
  {
    name: '走失高风险住院患者评估阳性数',
    columns: 走失高风险住院患者评估阳性数.columns,
    dataSource: 走失高风险住院患者评估阳性数.dataSource,
    keys: ['住院高风险患者例数', '走失高风险住院患者评估阳性数'],
    gName: '护理单元',
    lineKey: '评估率(%)'
  },
  {
    name: '患者走失发生率',
    columns: 患者走失发生率.columns,
    dataSource: 患者走失发生率.dataSource,
    keys: ['住院患者总人数', '住院患者的走失例数'],
    gName: '护理单元',
    lineKey: '发生率(%)'
  },
  {
    name: '患者走失高风险患者评估率',
    columns: 患者走失发生率.columns,
    dataSource: 患者走失发生率.dataSource,
    keys: ['住院患者总人数', '住院患者的走失例数'],
    gName: '护理单元',
    lineKey: '发生率(%)'
  },
  {
    name: '患者足下垂的发生率',
    columns: 患者足下垂的发生率.columns,
    dataSource: 患者足下垂的发生率.dataSource,
    keys: ['住院患者总人数', '患者发生足下垂例数'],
    gName: '护理单元',
    lineKey: '发生率(%)'
  },
  {
    name: '新生儿烧伤烫伤发生率',
    columns: 新生儿烧伤烫伤发生率.columns,
    dataSource: 新生儿烧伤烫伤发生率.dataSource,
    keys: ['住新生儿总人数', '烧伤烫伤例数'],
    gName: '护理单元',
    lineKey: '发生率(%)'
  },
  {
    name: '查对制度落实合格率',
    columns: 查对制度落实合格率.columns,
    dataSource: 查对制度落实合格率.dataSource,
    keys: ['检查查对制度的总条款数', '查对制度不合格条款数'],
    gName: '护理单元',
    lineKey: '不合格率(%)'
  },
  {
    name: '护理不良事件报告处理符合率',
    columns: 护理不良事件报告处理符合率.columns,
    dataSource: 护理不良事件报告处理符合率.dataSource,
    keys: ['检查总次数', '不合格数'],
    gName: '护理单元',
    lineKey: '不合格率(%)'
  },
  {
    name: '使用药物错误的发生率',
    columns: 使用药物错误的发生率.columns,
    dataSource: 使用药物错误的发生率.dataSource,
    keys: ['急救设备器材及药品总件数', '急救设备器材及药品不合格件数'],
    gName: '护理单元',
    lineKey: '错误发生率(%)'
  },
  {
    name: '急救设备器材及药品完好合格率',
    columns: 急救设备器材及药品完好合格率.columns,
    dataSource: 急救设备器材及药品完好合格率.dataSource,
    keys: ['急救设备器材及药品总件数', '急救设备器材及药品不合格件数'],
    gName: '护理单元',
    lineKey: '不合格率(%)'
  },
  {
    name: '无菌物品合格率',
    columns: 无菌物品合格率.columns,
    dataSource: 无菌物品合格率.dataSource,
    keys: ['全院无菌物品总件数', '无菌物品合格总件数'],
    gName: '护理单元',
    lineKey: '合格率(%)'
  },
  {
    name: '器械清洗合格率',
    columns: 器械清洗合格率.columns,
    dataSource: 器械清洗合格率.dataSource,
    keys: ['CSSD清洗器械总件数', 'CSSD清洗器械合格件数'],
    gName: '护理单元',
    lineKey: '合格率(%)'
  },
  {
    name: '包装合格率',
    columns: 包装合格率.columns,
    dataSource: 包装合格率.dataSource,
    keys: ['CSSD灭菌包总件数', '合格灭菌器械包件数'],
    gName: '护理单元',
    lineKey: '合格率(%)'
  },
  {
    name: '湿包发生率',
    columns: 湿包发生率.columns,
    dataSource: 湿包发生率.dataSource,
    keys: ['CSSD灭菌包总件数', '湿包件数'],
    gName: '护理单元',
    lineKey: '湿包率(%)'
  }
]

export default function Indicator (props: Props) {
  let [showType, setShowType] = useState('详情')
  useEffect(() => {
    setShowType('详情')
    console.log(props)
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
        <LeftMenu config={LEFT_MENU} menuTitle='敏感指标' />
        {/* <StatisticLeftList /> */}
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
  height: 100%;
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
  padding: 10px 0px;
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
`

const RadioCon = styled.div`
  position: absolute;
  top: 20px;
  right: 35px;
`
