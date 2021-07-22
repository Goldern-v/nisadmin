import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Breadcrumb, Button, message, Modal } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { Link } from 'react-router-dom'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import { appStore } from 'src/stores'
import { advancedManageServices } from './services/AdvancedManageServices'
import 进修临床实践计划添加 from './components/进修临床实践计划添加'

export interface Props { }

export default function 进修临床实践详情() {
  const { queryObj } = appStore
  const [tableData, setTableData] = useState([] as any[])
  const [loading, setLoading] = useState(false)

  const getherCon = (text: string, idx: number) => ({
    props: { rowSpan: idx === 0 ? (tableData.length || 0) : 0 },
    children: <span>{text}</span>
  })

  const [editVisible, setEditVisible] = useState(false)
  const [editParmas, setEditParams] = useState({} as any)

  const columns: ColumnProps<any>[] = [
    {
      title: '姓名',
      dataIndex: 'empName',
      width: 80,
      align: 'center',
      render: (text: string, record: any, idx: number) => (getherCon(text, idx))
    },
    {
      title: '科室',
      dataIndex: 'deptName',
      width: 80,
      align: 'center',
      render: (text: string, record: any, idx: number) => (getherCon(text, idx))
    },
    {
      title: '进修专科',
      dataIndex: 'juniorCollege',
      width: 80,
      align: 'center',
      render: (text: string, record: any, idx: number) => (getherCon(text, idx))
    },
    {
      title: '序号',
      width: 50,
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
      width: 160,
      align: 'center',
      render: (text: string, record: any,) => (
        <div>
          <div>{record.differMonth}</div>
          <div>{`${record.startDate} - ${record.endDate}`}</div>
        </div>
      )
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
    {
      title: '操作',
      width: 120,
      align: 'center',
      render: (text: any, record: any) => (
        <DoCon>
          <span onClick={() => handleEdit(record)}>修改</span>
          <span onClick={() => handleDelete(record)}>删除</span>
        </DoCon>
      )
    }
  ]

  const getTableData = () => {
    setLoading(true)

    advancedManageServices
      .getPageUserWorkPlanList(queryObj.evalPlanId)
      .then(res => {
        setLoading(false)

        if (res.data.list) {
          setTableData(res.data.list || [])
        } else if (res.data instanceof Array) {
          setTableData(res.data || [])
        }
      }, () => setLoading(false))
  }

  const handleExport = () => {
    advancedManageServices
      .exportPageUserWorkPlanList(queryObj.evalPlanId)
  }

  const handleEdit = (record?: any) => {
    if (record) {
      setEditParams({ ...record })
    } else {
      setEditParams({})
    }

    setEditVisible(true)
  }

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: '提示',
      content: '是否删除该记录？',
      onOk: () => {
        setLoading(true)

        advancedManageServices
          .deleteUserWorkPlanById(record.id)
          .then(res => {
            setLoading(false)
            message.success('删除成功')
            getTableData()
          }, () => setLoading(false))
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
      <Button type="primary" onClick={() => handleEdit()}>添加计划</Button>
      <Button onClick={() => handleExport()}>导出</Button>
    </PageHeader>
    <MainCon>
      <BaseTable
        loading={loading}
        surplusWidth={1000}
        surplusHeight={185}
        columns={columns}
        dataSource={tableData}
      />
    </MainCon>
    <进修临床实践计划添加
      visible={editVisible}
      originParams={editParmas}
      advancedId={queryObj.evalPlanId}
      empName={queryObj.empName}
      empNo={queryObj.empNo}
      deptName={queryObj.deptName}
      juniorCollege={queryObj.juniorCollege}
      onOk={() => {
        getTableData()
        setEditVisible(false)
      }}
      onCancel={() => {
        setEditVisible(false)
      }} />
  </Wrapper>
}

const Wrapper = styled.div``

const MainCon = styled.div`
  height: calc( 100vh - 115px);
  padding: 0 15px;
`