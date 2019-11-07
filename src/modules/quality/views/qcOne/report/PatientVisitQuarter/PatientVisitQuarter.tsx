import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Select, message } from 'antd'
import { PageTitle } from 'src/components/common'
import BaseTable, { TabledCon, DoCon, TableHeadCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import YearPicker from 'src/components/YearPicker'
import moment from 'moment'
import qs from 'qs'
import { patientVisitQuarterService, ListQuery } from './api/PatientVisitQuarterService'
import { numToChinese } from 'src/utils/number/numToChinese'

import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { useKeepAliveEffect } from 'react-keep-alive'

import ReportCreateModal from './components/ReportCreateModal'
import { globalModal } from 'src/global/globalModal'
import { qcOneSelectViewModal } from './../../QcOneSelectViewModal'
import CommitModal from './../../components/CommitModal'
import ArchiveModal from './../../components/ArchiveModal'
import { fileDownload } from 'src/utils/file/file'
import { qcOneService } from './../../services/QcOneService'

export interface Props { }

const Option = Select.Option

export default observer(function PatientVisitQuarter() {
  const { history } = appStore
  const {
    deptList, //权限科室列表
    isRoleManage, //是否护士长
    isSupervisorNurse, //是否科护士长
    isDepartment //是否护理部
  } = authStore

  const defaultQuery = {
    wardCode: qcOneSelectViewModal.wardCode,
    pageIndex: 1,
    status: '',
    year: moment().format('YYYY'),
    month: '',
    pageSize: 15,
  } as any

  const [query, setQuery] = useState(defaultQuery)
  const [cacheQuery, setCacheQuery] = useState(defaultQuery)

  const [createVisible, setCreateVisible] = useState(false)

  const [tableData, setTableData] = useState([] as any[])

  const [loading, setLoading] = useState(false)

  const [dataTotal, setDataTotal] = useState(0)

  const [commitVisible, setCommitVisible] = useState(false)
  const [archiveVisible, setArchiveVisible] = useState(false)

  const columns: ColumnProps<any>[] = [
    {
      key: 'index',
      title: '序号',
      width: 80,
      align: 'center',
      render: (text: string, record: any, idx: number) =>
        (query.pageIndex - 1) * query.pageSize + idx + 1
    },
    {
      dataIndex: 'reportName',
      title: '标题',
      align: 'left',
      render: (text: string, record: any, idx: number) =>
        <div className="ellips" title={text}>{text}</div>
    },
    {
      dataIndex: 'wardName',
      key: 'wardName',
      title: '科室',
      width: 180,
    },
    {
      key: 'month',
      title: '月份',
      align: 'center',
      width: 110,
      render: (text: string, record: any, idx: number) => `${record.year}年${record.month}月`
    },
    {
      key: 'status',
      title: '状态',
      align: 'center',
      width: 90,
      render: (text: string, record: any, idx: number) => {
        if (record.status == '0') return '保存'
        if (record.status == '1') return '提交'
        return ''
      }
    },
    {
      dataIndex: 'creatorName',
      key: 'creatorName',
      title: '创建人',
      align: 'center',
      width: 80
    },
    {
      dataIndex: 'createTime',
      key: 'createTime',
      title: '创建时间',
      align: 'center',
      width: 140
    },
    {
      key: 'operate',
      title: '操作',
      width: 90,
      render: (text: string, record: any) => {
        return <DoCon className="operate-group">
          <span onClick={() => handleEdit(record)}>查看</span>
          {isRoleManage && <React.Fragment>
            {record.status === '0' && <span onClick={() => handlePublish(record)}>提交</span>}
            {record.status === '1' && <span onClick={() => handleCancelPublish(record)} style={{ color: 'red' }}>撤销</span>}
          </React.Fragment>}
          <span onClick={() => handleExport(record)}>导出</span>
        </DoCon>
      }
    }
  ]

  const handlePageChange = (current: number) => {
    setQuery({ ...query, pageIndex: current })
  }

  const handleSizeChange = (current: number, size: number) => {
    setQuery({ ...query, pageSize: size, pageIndex: 1 })
  }

  const handleSearch = () => {
    if (query.pageIndex == 1) getList(query)

    setQuery({ ...query, pageIndex: 1 })
  }

  const monthList = (() => {
    let currentMonth = 4;
    let monthArr = []
    while (currentMonth--) {
      monthArr.push(4 - currentMonth)
    }
    return monthArr
  })()

  const getList = (query: any) => {
    setLoading(true)
    patientVisitQuarterService.getPage(query).then(res => {
      setLoading(false)
      if (res.data) {
        setTableData(res.data.list)
        setDataTotal(res.data.totalCount)
      }
    }, () => setLoading(false))
  }

  const handleCreate = () => {
    setCreateVisible(true)
  }

  const handleCancel = () => {
    setCreateVisible(false)
  }

  const handleOk = () => {
    handleCancel()
    getList(query)
  }

  const handleEdit = (record: any) => {
    history.push(`/patientVisitQuarterEdit?${qs.stringify({
      wardCode: record.wardCode,
      year: record.year,
      month: record.month
    })}`)
  }

  const handleWardCodeChange = (wardCode: string) => {
    setQuery({ ...query, wardCode })
    qcOneSelectViewModal.setWardCode(wardCode)
  }

  const handleExport = (record: any) => {
    // console.log(record)
    setLoading(true)
    qcOneService.export({
      wardCode: record.wardCode,
      year: record.year,
      month: record.month
    }, 'qcPatientVisitQuarter').then(res => fileDownload(res)).finally(() => setLoading(false))
  }

  const handlePublish = (record: any) => {
    globalModal.confirm('提交确认', '你确定要提交该报告吗？').then((res) => {
      setLoading(true)
      patientVisitQuarterService.publish({
        wardCode: record.wardCode,
        year: record.year,
        month: record.month
      }).then((res) => {
        message.success('提交成功')
        setLoading(false)
        getList(query)
      }, () => setLoading(false))
    })
  }

  const handleCancelPublish = (record: any) => {
    globalModal.confirm('撤销确认', '你确定要撤销该报告吗？').then((res) => {
      setLoading(true)
      patientVisitQuarterService.cancelPublish({
        wardCode: record.wardCode,
        year: record.year,
        month: record.month
      }).then((res) => {
        message.success('提交成功')
        setLoading(false)
        getList(query)
      }, () => setLoading(false))
    })
  }

  useEffect(() => {
    for (let x in query) {
      if (query[x] !== cacheQuery[x]) {
        setCacheQuery(query)
        getList(query)
        break
      }
    }
  }, [query])

  useKeepAliveEffect(() => {
    if (
      appStore.history &&
      (appStore.history.action === 'POP' || appStore.history.action === 'PUSH')
    ) {
      getList(query)
    }
    return () => { }
  })

  return <Wrapper>
    <HeaderCon>
      <LeftIcon>
        <PageTitle>季度随访汇总表</PageTitle>
      </LeftIcon>
      <RightIcon>
        <span>年份:</span>
        <span className="year-select">
          <YearPicker
            allowClear={false}
            value={moment(query.year) || undefined}
            onChange={(newMoment: any) => {
              if (newMoment)
                setQuery({ ...query, year: newMoment.format('YYYY') })
              else
                setQuery({ ...query, year: '' })
            }} />
        </span>
        <span>季度:</span>
        <Select
          value={query.month}
          onChange={(month: string) => setQuery({ ...query, month })}
          className="month-select">
          <Option value="">全部</Option>
          {monthList.map((month: number) => <Option value={`${month}`} key={month}>第{numToChinese(month)}季度</Option>)}
        </Select>
        <span>状态:</span>
        <Select
          value={query.status}
          onChange={(status: string) => setQuery({ ...query, status })}
          style={{ width: '75px' }}>
          <Option value=''>全部</Option>
          <Option value='0'>保存</Option>
          <Option value='1'>提交</Option>
        </Select>
        <span>科室:</span>
        {/* <DeptSelect onChange={(wardCode) => setQuery({ ...query, wardCode })} /> */}
        <Select
          showSearch
          value={query.wardCode}
          onChange={handleWardCodeChange}
          filterOption={(input: string, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          style={{ width: '176px' }}>
          <Option value=''>全部</Option>
          {deptList.map((item) => <Option value={item.code} key={item.code}>{item.name}</Option>)}
        </Select>
        <Button onClick={handleSearch} type="primary">查询</Button>
        {isRoleManage && <Button type="primary" onClick={handleCreate}>新建</Button>}
        {isSupervisorNurse && <Button onClick={() => setCommitVisible(true)}>提交</Button>}
        {isDepartment && <Button onClick={() => setArchiveVisible(true)}>汇总</Button>}
        {/* <Button >导出</Button> */}
      </RightIcon>
    </HeaderCon>
    <TableWrapper>
      <BaseTable
        onRow={(record: any) => {
          return {
            onDoubleClick: () => handleEdit(record)
          }
        }}
        surplusHeight={225}
        dataSource={tableData}
        loading={loading}
        columns={columns}
        pagination={{
          current: query.pageIndex,
          pageSize: query.pageSize,
          total: dataTotal,
          onChange: handlePageChange,
          onShowSizeChange: handleSizeChange
        }}
      />
    </TableWrapper>
    <ReportCreateModal
      onOk={handleOk}
      deptCode={query.wardCode}
      visible={createVisible}
      onCancel={handleCancel} />
    <CommitModal
      reportType='pvq'
      visible={commitVisible}
      onCancel={() => {
        setCommitVisible(false)
        getList(query)
      }} />
    <ArchiveModal
      reportType='pvq'
      visible={archiveVisible}
      onCancel={() => {
        setArchiveVisible(false)
        getList(query)
      }} />
  </Wrapper>
})

const TableWrapper = styled(TabledCon)`
td{
  position: relative;
  word-break: break-all;
  .ellips{
    position: absolute;
    left:0;
    top: 0;
    height: 30px;
    line-height: 30px;
    right: 0;
    padding: 0 5px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
}
`

const HeaderCon = styled(TableHeadCon)`
  justify-content: space-between;
  .ant-select {
    width: 150px;
    margin-right: 20px;
  }
  .ant-calendar-picker {
    margin-right: 20px;
  }
  button {
    margin-left: 10px;
  }
  .checkButton {
    margin-left: 0px;
  }
  .month-select{
    width: 100px;
  }
  .year-select{
    width: 100px;
    display:inline-block;
  }
`
const Wrapper = styled.div`
  .operate-group{
    .delete{
      color: red;
    }
  }
`

const LeftIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  /* padding: 0 0 0 15px; */
  display: flex;
  align-items: center;
`

const RightIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
`