import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Breadcrumb, Button } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { Link } from 'react-router-dom'
import BaseTable from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import { appStore } from 'src/stores'
import { advancedManageServices } from './services/AdvancedManageServices'

export interface Props { }

export default function 进修临床实践详情() {
  const { queryObj } = appStore
  const [tableData, setTableData] = useState([] as any[])

  const columns: ColumnProps<any>[] = [
    {
      title: '姓名',
      dataIndex: 'empName',
      width: 80,
      align: 'center',
    },
    {
      title: '科室',
      dataIndex: 'deptName',
      width: 120,
      align: 'center',
    },
    {
      title: '进修专科',
      dataIndex: 'juniorCollege',
      width: 180,
      align: 'center',
    },
    {
      title: '序号',
      width: 60,
      align: 'center',
      render: (text: any, record: any, idx: number) => idx + 1
    },
    {
      title: '计划名称',
      dataIndex: 'projectName',
      width: 120,
      align: 'center',
    },
    {
      title: '原因或理由',
      dataIndex: 'reason',
      width: 120,
      align: 'center',
    },
    {
      title: '完成场所',
      dataIndex: 'finishField',
      width: 120,
      align: 'center',
    },
    {
      title: '受众对象',
      dataIndex: 'audiencer',
      width: 120,
      align: 'center',
    },
    {
      title: '预计完成时间',
      dataIndex: 'startDate',
      width: 120,
      align: 'center',
      render: (text: string, record: any,) => {
        return (
          <div>
            <div>{record.differMonth}</div>
            <div>{`${record.startDate} - ${record.endDate}`}</div>
          </div>
        )
      }
    },
    {
      title: '具体措施',
      dataIndex: 'concreteMeasure',
      width: 120,
      align: 'center',
    },
    {
      title: '完成情况',
      dataIndex: 'completion',
      width: 120,
      align: 'center',
    },
    {
      title: '完成效果',
      dataIndex: 'impactAssessment',
      width: 120,
      align: 'center',
    },
  ]

  const getTableData = () => {
    advancedManageServices
      .getPageUserWorkPlanList(queryObj.evalPlanId)
      .then(res => {
        if (res.data.list) {
          setTableData(res.data.list || [])
        } else if (res.data instanceof Array) {
          setTableData(res.data || [])
        }
      })
  }

  useEffect(() => {
    getTableData()
  }, [])

  return <Wrapper>
    <PageHeader>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/continuingEdu/进修临床实践管理" replace>进修临床实践管理</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          详情
        </Breadcrumb.Item>
      </Breadcrumb>
      <Place />
      <Button>添加计划</Button>
      <Button>导出</Button>
    </PageHeader>
    <MainCon>
      <BaseTable
        columns={columns}
        dataSource={tableData}
      />
    </MainCon>
  </Wrapper>
}

const Wrapper = styled.div``

const MainCon = styled.div`
  height: calc( 100vh - 115px);
  padding: 0 15px;
`