import { Button, Input, Modal, Switch, message } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { PageContainer, PageHeader, PageTitle, Place } from 'src/components/common'
import { Obj } from 'src/libs/types'
import styled from 'styled-components'
import FixedBaseInfo from './detail/baseInfo'
import FixedGrade from './detail/grade'
import FixedSummary from './detail/summary'
import { trainingSettingApi } from '../api/TrainingSettingApi'
export interface IProps {
}
const STATIC_TABLE_DATA = [
  {
    tableName: '规培生基本信息',
    content: FixedBaseInfo,
  },
  {
    tableName: '个人总结',
    content: FixedSummary,
  },
  {
    tableName: '岗前培训考核成绩',
    content: FixedGrade,
  },
]
const templateType = 4
/**固定表列表 */
export default observer(function FixedTable(props: IProps) {
  const [kw, setKw] = useState('')

  const [tableData, setTableData] = useState([])

  const onSwitch = (e: boolean, record: any) => {
    trainingSettingApi.saveOrUpdate({ ...record, status: Number(e) }).then(res => {
      message.success(res.desc)
      onSearch()
    })
  }

  const columns: ColumnProps<any>[] = [
    {
      key: 'idx',
      dataIndex: 'idx',
      title: '序号',
      width: 30,
      align: 'center',
      render(text: any, record: any, idx: number) {
        return idx + 1
      }
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: '状态',
      width: 50,
      align: 'center',
      render(text: any, record: any, idx: number) {
        return <Switch size='small' checked={!!text} onChange={(e) => onSwitch(e, record)} />
      }
    },
    {
      key: 'tableName',
      dataIndex: 'tableName',
      title: '文件名称',
      width: 100,
      align: 'center',
    },
    {
      key: 'deptName',
      dataIndex: 'deptName',
      title: '科室',
      width: 70,
      align: 'center',
    },
    {
      key: 'hierarchy',
      dataIndex: 'hierarchy',
      title: '层级',
      width: 70,
      align: 'center',
    },
    {
      key: 'createName',
      dataIndex: 'createName',
      title: '创建人',
      width: 70,
      align: 'center',
    },
    {
      key: 'createTime',
      dataIndex: 'createTime',
      title: '创建时间',
      width: 70,
      align: 'center',
    },
    {
      key: 'switch',
      dataIndex: 'switch',
      title: '操作',
      width: 70,
      align: 'center',
      render(text: any, record: any, idx: number) {
        return <DoCon>
          <span onClick={() => onPreview(record)}>预览</span>
        </DoCon>
      }
    },
  ]

  const onPreview = (item: Obj) => {
    const cur = STATIC_TABLE_DATA.find(v => v.tableName === item.tableName)
    if (!cur) return message.warning('找不到预览页')
    Modal.info({
      title: `预览`,
      content: <cur.content isPreview />,
      width: '240mm'
    })
  }
  const onSearch = () => {
    trainingSettingApi.getTemplateList({ templateType, tableName: kw }).then(res => {
      setTableData(res?.data?.list || [])
    })
  }
  useEffect(() => {
    onSearch()
  }, [kw])
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>表单配置</PageTitle>
        <Place />
        <span className='label'>文件名称</span>
        <Input placeholder='请输入文件名称' value={kw} onChange={(e) => setKw(e.target.value)} />
        <Button type='primary' onClick={onSearch}>查询</Button>
      </PageHeader>
      <PageContainer>
        <BaseTable
          columns={columns}
          surplusHeight={210}
          dataSource={tableData} />
      </PageContainer>
    </Wrapper>

  )
})

const Wrapper = styled.div`

`