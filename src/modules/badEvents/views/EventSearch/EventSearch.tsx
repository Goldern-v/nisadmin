import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from 'src/modules/badEvents/views/components/BaseLayout'
import BaseTable from 'src/modules/badEvents/views/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
// import EditAwardsModal from '../modal/EditAwardsModal'

import service from 'src/services/api'

export interface Props extends RouteComponentProps {}
export default observer(function EventSearch (props: Props) {
  // const editAwardsModal = createModal(EditAwardsModal)

  const [btnList, setBtnList] = useState([
    {
      label: '事件日期：',
      type: 'datetime'
    },
    {
      label: '科室：',
      type: 'select',
      defaultValue: '全院',
      style: { minWidth: '150px' }
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
    }
  ])

  const data = {
    key: '',
    eventOrder: '',
    wardName: '',
    eventType: '',
    happenDate: '',
    happenPlace: '',
    injuryLevel: '',
    sac: '',
    isSubmit: '',
    eventStatus: ''
  }
  let dataSource = [
    {
      key: '1',
      eventOrder: '20190129-SJNK-001',
      wardName: '神经内科',
      eventType: '跌倒事件',
      happenDate: '2019-01-10',
      happenPlace: '公共区域',
      injuryLevel: '轻度',
      sac: '',
      isSubmit: '否',
      eventStatus: '待安全委员会审核'
    },
    {
      key: '2',
      eventOrder: '20190129-SJNK-002',
      wardName: '神经内科',
      eventType: '跌倒事件',
      happenDate: '2019-01-10',
      happenPlace: '公共区域',
      injuryLevel: '轻度',
      sac: '',
      isSubmit: '是',
      eventStatus: '待安全委员会审核'
    },
    {
      key: '3',
      eventOrder: '20190129-SJNK-003',
      wardName: '神经内科',
      eventType: '跌倒事件',
      happenDate: '2019-01-10',
      happenPlace: '公共区域',
      injuryLevel: '轻度',
      sac: '',
      isSubmit: '否',
      eventStatus: '待安全委员会审核'
    }
  ]

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      render: (text: any, record: any, index: number) => (record.eventOrder ? index + 1 : ''),
      align: 'center',
      width: 60
    },
    {
      title: '事件单号',
      dataIndex: 'eventOrder',
      width: 200,
      align: 'center'
    },
    {
      title: '科室',
      dataIndex: 'wardName',
      width: 100,
      align: 'center'
    },
    {
      title: '事件类别',
      dataIndex: 'eventType',
      width: 100,
      align: 'center'
    },
    {
      title: '发生时间',
      dataIndex: 'happenDate',
      width: 100,
      align: 'center'
    },
    {
      title: '事件发生地点',
      dataIndex: 'happenPlace',
      width: 140,
      align: 'center'
    },
    {
      title: '患者伤害程度',
      dataIndex: 'injuryLevel',
      width: 140,
      align: 'center'
    },
    {
      title: 'SAC',
      dataIndex: 'sac',
      width: 100,
      align: 'center'
    },
    {
      title: '提交医院质量安全管理委员会',
      dataIndex: 'isSubmit',
      width: 150,
      align: 'center'
    },
    {
      title: '事件流程状态',
      dataIndex: 'eventStatus',
      width: 180,
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 100,
      align: 'center',
      render: (text: any, record: any) =>
        record.eventOrder ? (
          <DoCon>
            {/* <span>修改</span>
            <span>审核</span> */}
            <span>查看</span>
          </DoCon>
        ) : (
          ''
        )
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
    

    // empty raw
    genEmptyTable(dataSource)
    setTableSource(dataSource)

    service.commonApiService.getUintList().then((res) => {
      console.log('getUintList-res', res)
      if (res && res.data) {
        let newBTNlist = JSON.parse(JSON.stringify(btnList))
        let btn = btnList.find((b) => b.label.indexOf('科室') > -1)
        if (btn) {
          btn.options = res.data.deptList
          console.log('getUintList-btn', btn)
          setBtnList(newBTNlist)
        }
      }
      // btnList
    })

    // get units
  }, [])

  let tableConfig = {
    pagination: true,
    size: 'middle',
    loading: false
    // scroll: { x: '80%', y: 240 }
  }

  return (
    <BaseLayout title='查询' btnList={btnList}>
      <BaseTable config={tableConfig} dataSource={tableSource} columns={columns} />
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
