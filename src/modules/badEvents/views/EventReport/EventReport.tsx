import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from 'src/modules/badEvents/views/components/BaseLayout'
import BaseTable from 'src/modules/badEvents/views/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
// import createModal from 'src/libs/createModal'
// import EditAwardsModal from '../modal/EditAwardsModal'

export interface Props extends RouteComponentProps {}
export default observer(function EventReport (props: Props) {
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
      wardName: '神经内科',
      badEventCount: '30',
      rate: '30%'
    },
    {
      key: '2',
      wardName: '神经内科',
      badEventCount: '30',
      rate: '30%'
    },
    {
      key: '3',
      wardName: '神经内科',
      badEventCount: '30',
      rate: '30%'
    },
    {
      key: '4',
      wardName: '神经外科',
      badEventCount: '40',
      rate: '40%'
    }
  ]

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      render: (text: any, record: any, index: number) => (record.wardName ? index + 1 : ''),
      align: 'center',
      width: 60
    },
    {
      title: '护理单元',
      dataIndex: 'wardName',
      width: 100,
      align: 'center'
    },
    {
      title: '不良事件例数',
      dataIndex: 'badEventCount',
      width: 100,
      align: 'center'
    },
    {
      title: '占比',
      dataIndex: 'rate',
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
    console.log('genEmptyTable', newList)
  }

  const [count, setCount] = useState(0)
  const [tableSource, setTableSource] = useState(dataSource)

  useEffect(() => {
    console.log(count, setCount)

    genEmptyTable(dataSource)
    setTableSource(dataSource)
  }, [])

  let getTitle = () => {
    console.log('getTitle')
    return (
      <TitleBox>
        <h1>东 莞 市 厚 街 医 院</h1>
        <h3>不良事件统计表</h3>
        <h4>统计日期：2018-01-01 ~ 2018-01-20</h4>
      </TitleBox>
    )
  }

  return (
    <BaseLayout title='汇总报告' btnList={btnList}>
      <BaseTable title={getTitle()} dataSource={tableSource} columns={columns} />
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
