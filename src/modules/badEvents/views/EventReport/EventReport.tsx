import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from 'src/modules/badEvents/views/components/BaseLayout'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import BaseTable from 'src/modules/indicator/components/BaseTable'
// import createModal from 'src/libs/createModal'
// import EditAwardsModal from '../modal/EditAwardsModal'
import { Radio } from 'antd'
import BaseChart from 'src/modules/indicator/components/BaseChart'
import moment from 'moment'
export interface Props extends RouteComponentProps {}
export default observer(function EventReport(props: Props) {
  // const editAwardsModal = createModal(EditAwardsModal)
  const [btnList, setBtnList] = useState([
    {
      label: '日期：',
      type: 'datetime'
    },
    {
      label: '事件分类：',
      type: 'select',
      defaultValue: '全部',
      style: { minWidth: '150px' },
      options: [
        { code: '', name: '全部' },
        { code: '药物事件', name: '药物事件' },
        { code: '跌倒事件', name: '跌倒事件' },
        { code: '手术事件', name: '手术事件' },
        { code: '输血事件', name: '输血事件' },
        { code: '医疗处置事件', name: '医疗处置事件' },
        { code: '公共意外事件', name: '公共意外事件' },
        { code: '治安事件', name: '治安事件' },
        { code: '伤害事件', name: '伤害事件' },
        { code: '管路事件', name: '管路事件' },
        { code: '院内不预期心跳呼吸停止事件', name: '院内不预期心跳呼吸停止事件' },
        { code: '麻醉事件', name: '麻醉事件' },
        { code: '检查/检验/病理标本事件', name: '检查/检验/病理标本事件' },
        { code: '其他事件', name: '其他事件' }
      ]
    },
    {
      label: '查询',
      type: 'button'
      // onClick: () => {}
      // editAwardsModal.show({
      //   id: '12'
      // })
    },
    {
      label: '导出Excel',
      type: 'button'
      // onClick: () => {}
      // editAwardsModal.show({
      //   id: '12'
      // })
    }
  ])

  const data = {
    key: '',
    wardName: '',
    badEventCount: '',
    rate: ''
  }
  let dataSource = [
    {
      key: '1',
      护理单元: '五官科护理单元',
      不良事件例数: '30',
      占比: '30%',
      '占(%)': 30
    },
    {
      key: '2',
      护理单元: '关节护理单元',
      不良事件例数: '17',
      占比: '17%',
      '占(%)': 17
    },
    {
      key: '3',
      护理单元: '普外护理单元',
      不良事件例数: '18',
      占比: '18%',
      '占(%)': 17
    },
    {
      key: '4',
      护理单元: '泌尿外科护理单元',
      不良事件例数: '28',
      占比: '28%',
      '占(%)': 28
    },
    {
      key: '5',
      护理单元: '创骨护理单元',
      不良事件例数: '8',
      占比: '8%',
      '占(%)': 8
    },
    {
      key: '6',
      护理单元: '产科护理单元',
      不良事件例数: '9',
      占比: '9%',
      '占(%)': 9
    },
    {
      key: '7',
      护理单元: '儿科护理单元',
      不良事件例数: '13',
      占比: '13%',
      '占(%)': 13
    },
    {
      key: '8',
      护理单元: '呼吸科护理单元',
      不良事件例数: '11',
      占比: '11%',
      '占(%)': 11
    },
    {
      key: '9',
      护理单元: '心内护理单元',
      不良事件例数: '12',
      占比: '12%',
      '占(%)': 12
    },
    {
      key: '10',
      护理单元: '合计',
      不良事件例数: '101',
      占比: '100%',
      '占(%)': 100
    }
  ]

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 60
    },
    {
      title: '护理单元',
      dataIndex: '护理单元',
      width: 100,
      align: 'center'
    },
    {
      title: '不良事件例数',
      dataIndex: '不良事件例数',
      width: 100,
      align: 'center'
    },
    {
      title: '占比',
      dataIndex: '占比',
      width: 100,
      align: 'center'
    }
  ]

  const genEmptyTable = (newList: any) => {
    let rowNum = 10
    // 补空行
    let diff = rowNum - (newList.length % rowNum)
    if (diff > 0 && newList.length !== rowNum) {
      for (let j = 0; j < diff; j++) {
        let newData = JSON.parse(JSON.stringify(data))
        if (newData.hasOwnProperty('key')) {
          newData.key = 'empty' + j
        }
        newList.push(newData)
      }
    }
  }

  let [showType, setShowType] = useState('详情')
  useEffect(() => {
    //
    // genEmptyTable(dataSource)
    // setTableSource(dataSource)
  }, [])

  let GetTitle = () => {
    return (
      <TitleBox>
        <h1>东 莞 市 厚 街 医 院</h1>
        <h3>不良事件统计表</h3>
        <h4>统计日期：2018-01-01 ~ 2018-01-20</h4>
      </TitleBox>
    )
  }
  let startDate = moment()
    .subtract(1, 'M')
    .format('YYYY-MM-DD')
  let endDate = moment().format('YYYY-MM-DD')
  return (
    <BaseLayout title='汇总报告' btnList={btnList}>
      <MainScroll>
        <MainInner>
          <RadioCon>
            <Radio.Group value={showType} buttonStyle='solid' onChange={(e: any) => setShowType(e.target.value)}>
              <Radio.Button value='详情'>详情</Radio.Button>
              <Radio.Button value='图表'>图表</Radio.Button>
            </Radio.Group>{' '}
          </RadioCon>

          <HisName>东莞厚街医院</HisName>
          <Title>不良事件统计表</Title>
          <Date>
            日期：{startDate} 至 {endDate}
          </Date>
          {showType === '详情' && <BaseTable dataSource={dataSource} columns={columns} />}
          {showType === '图表' && (
            <BaseChart dataSource={dataSource} keys={['不良事件例数']} name={'护理单元'} lineKey={'占(%)'} />
          )}
        </MainInner>
      </MainScroll>
    </BaseLayout>
  )
})
const Wrapper = styled.div``

const DoCon = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: ${(p) => p.theme.$mtc};
`
const TitleBox = styled.div`
  text-align: center;
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
