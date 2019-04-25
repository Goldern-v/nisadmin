import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from 'src/modules/badEvents/views/components/BaseLayout'
import BaseTable from 'src/modules/badEvents/views/components/BaseTable'
import PagesBox from 'src/modules/badEvents/views/components/PagesBox'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import CreateReportModal from 'src/modules/badEvents/views/modal/CreateReportModal'

export interface Props extends RouteComponentProps {}
export default observer(function EventAlanysis (props: Props) {
  const createReportModal = createModal(CreateReportModal)
  let history = appStore.history
  const [btnList, setBtnList] = useState([
    {
      label: '分析报告：',
      type: 'select',
      defaultValue: '2019年 第二季度',
      style: { minWidth: '150px' },
      options: [
        { code: '2019年 第二季度', name: '2019年 第二季度' },
        { code: '2019年 第一季度', name: '2019年 第一季度' },
        { code: '2018年 第四季度', name: '2018年 第四季度' },
        { code: '2018年 第三季度', name: '2018年 第三季度' },
        { code: '2018年 第二季度', name: '2018年 第二季度' },
        { code: '2018年 第一季度', name: '2018年 第一季度' }
      ]
    },
    {
      label: '编辑',
      type: 'button',
      onClick: () => {
        history.push(history.location.pathname + '/edit')
        // console.log('编辑props', props, history.location.pathname)
      }
    },
    {
      label: '删除',
      type: 'button'
      // onClick: () => {}
      // CreateReportModal.show({
      //   id: '12'
      // })
    },
    {
      label: '打印',
      type: 'button'
      // onClick: () => {}
      // CreateReportModal.show({
      //   id: '12'
      // })
    },
    {
      label: '创建',
      type: 'button',
      btnType: 'primary',
      style: { right: '10px', position: 'absolute' },
      onClick: () => {
        console.log('创建')
        createReportModal.show({
          id: '12'
        })
      }
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
        <h3>不良事件分析报告</h3>
        <h4>统计日期：2018-01-01 ~ 2018-01-20</h4>
      </TitleBox>
    )
  }

  return (
    <BaseLayout title='分析报告' btnList={btnList}>
      {/* <BaseTable title={getTitle()} dataSource={tableSource} columns={columns} /> */}
      <createReportModal.Component />
      <PagesBox />
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
