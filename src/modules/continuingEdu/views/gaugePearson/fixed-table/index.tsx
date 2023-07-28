import { Button, Input, Modal, Switch, message } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { observer } from 'mobx-react'
import React, { useCallback, useEffect, useState } from 'react'
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
    key: 'info',
    content: FixedBaseInfo,
  },
  {
    tableName: '个人总结',
    key: 'summary',
    content: FixedSummary,
  },
  {
    tableName: '岗前培训考核成绩',
    key: 'grade',
    content: FixedGrade,
  },
]
const templateType = 4
// type TKey = (typeof STATIC_TABLE_DATA)[number]['key']
/**固定表列表 */
export default observer(function FixedTable(props: IProps) {
  const [kw, setKw] = useState('')

  const [tableData, setTableData] = useState(STATIC_TABLE_DATA)

  const onSwitch = (e: boolean, record: any) => {
    const { id, deptCode, hierarchy, tableName } = record
    trainingSettingApi.saveOrUpdate({ id, deptCode, hierarchy, tableName, status: Number(e) }).then(res => {
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
      render(text: any, record: any, idx: number) {
        return '全院'
      }
    },
    {
      key: 'hierarchy',
      dataIndex: 'hierarchy',
      title: '层级',
      width: 70,
      align: 'center',
      render(text: any, record: any, idx: number) {
        return '全部'
      }
    },
    {
      key: 'person',
      dataIndex: 'person',
      title: '创建人',
      width: 70,
      align: 'center',
      render(text: any, record: any, idx: number) {
        return '系统'
      }
    },
    {
      key: 'createTime',
      dataIndex: 'createTime',
      title: '创建时间',
      width: 70,
      align: 'center',
      render(text: any, record: any, idx: number) {
        return '2023-08-01 00:00:00'
      }
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
    Modal.info({
      title: `${item.name}预览`,
      content: <item.content />,
      width: '240mm'
    })
  }
  const onSearch = () => {
    trainingSettingApi.getTemplateList({ templateType }).then(res => {
      setTableData(res.data || [])
    })
  }
  useEffect(() => {
    onSearch()
  }, [])
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
          surplusHeight={400}
          dataSource={tableData} />
      </PageContainer>
    </Wrapper>

  )
})

const Wrapper = styled.div`

`