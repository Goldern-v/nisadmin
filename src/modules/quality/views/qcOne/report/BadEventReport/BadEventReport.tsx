import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Select, message, Modal } from 'antd'
import { PageTitle } from 'src/components/common'
import BaseTable, { TabledCon, DoCon, TableHeadCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import YearPicker from 'src/components/YearPicker'
import moment from 'moment'
import qs from 'qs'
import { badEventReportService, ListQuery } from './api/BadEventReportService'
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

export default observer(function BadEventReport() {
  const { history } = appStore
  const { wardCode, statusList, statusObj } = qcOneSelectViewModal
  const {
    deptList, //权限科室列表
    isRoleManage, //是否护士长
    isSupervisorNurse, //是否科护士长
    isDepartment //是否护理部
  } = authStore

  const defaultQuery = {
    wardCode: wardCode,
    pageIndex: 1,
    status: '',
    year: moment().format('YYYY'),
    month: '',
    pageSize: 15,
  } as any

  const [query, setQuery] = useState(defaultQuery)
  const [cacheQuery, setCacheQuery] = useState(defaultQuery)
  const [bigDeptList, setBigDeptList] = useState([] as any[])

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
      dataIndex: 'month',
      title: '月份',
      align: 'center',
      width: 110,
      render: (text: string, record: any, idx: number) => `${record.year}年${record.month}月`
    },
    {
      dataIndex: 'status',
      title: '状态',
      align: 'center',
      width: 90,
      render: (status: string, record: any, idx: number) => {

        let statusText = statusObj[status] || '-'
        return statusText
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
      width: 120,
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
    let currentMonth = 12;
    let monthArr = []
    while (currentMonth--) {
      monthArr.push(currentMonth + 1)
    }
    return monthArr
  })()

  const getList = (query: any) => {
    setLoading(true)
    badEventReportService.getPage(query).then(res => {
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
    history.push(`/badEventReportEdit?${qs.stringify({
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
    }, 'qcBadEvent').then(res => fileDownload(res)).finally(() => setLoading(false))
  }

  const handlePublish = (record: any) => {
    globalModal.confirm('提交确认', '你确定要提交该报告吗？').then((res) => {
      setLoading(true)
      badEventReportService.publish({
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
      badEventReportService.cancelPublish({
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

  const handleExportGather = (isBigDept?: boolean) => {
    let year = query.year
    let month = query.month || moment().format('M')
    let $wardCode = ''
    if (bigDeptList.length > 0) $wardCode = bigDeptList[0].code

    const exportContent = <ExportCon>
      <div>
        <span>年份: </span>
        <span>
          <YearPicker
            allowClear={false}
            value={moment(year) || undefined}
            onChange={(_moment: any) => year = _moment.format('YYYY')} />
        </span>
      </div>
      <div>
        <span>月份: </span>
        <Select
          defaultValue={month}
          style={{ width: '70px' }}
          onChange={(_month: any) => month = _month}>
          {monthList.map((month: number) => <Option value={`${month}`} key={month}>{month}</Option>)}
        </Select>
      </div>
      {isBigDept && <div>
        <span>片区: </span>
        <Select
          defaultValue={$wardCode}
          onChange={(_wardCode: any) => $wardCode = _wardCode}>
          {bigDeptList.map((item) => <Option value={item.code} key={item.code}>{item.name}</Option>)}
        </Select>
      </div>}
    </ExportCon>

    Modal.confirm({
      title: isBigDept ? '片区导出' : "全院导出",
      content: exportContent,
      onOk: () => {
        setLoading(true)

        if (isBigDept)
          qcOneService.exportByBigDept({
            wardCode: $wardCode,
            year,
            month
          }, 'qcBadEvent')
            .then((res: any) => {
              setLoading(false)
              fileDownload(res)
            }, () => setLoading(false))
        else
          qcOneService.exportByNd({
            year,
            month
          }, 'qcBadEvent')
            .then((res: any) => {
              setLoading(false)
              fileDownload(res)
            }, () => setLoading(false))
      }
    })
  }

  useEffect(() => {
    qcOneService.bigDeptListSelf().then(res => {
      if (res.data) setBigDeptList(res.data)
    })
  }, [])

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
      let newWardCode = qcOneSelectViewModal.initWardCode()
      if (query.wardCode === newWardCode) {
        getList(query)
      } else {
        setQuery({ ...query, wardCode: newWardCode })
      }

    }
    return () => { }
  })

  return <Wrapper>
    <HeaderCon>
      <LeftIcon>
        <PageTitle>不良事件登记表</PageTitle>
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
        <span>月份:</span>
        <Select
          value={query.month}
          onChange={(month: string) => setQuery({ ...query, month })}
          className="month-select">
          <Option value="">全部</Option>
          {monthList.map((month: number) => <Option value={`${month}`} key={month}>{month}</Option>)}
        </Select>
        <span>状态:</span>
        <Select
          value={query.status}
          onChange={(status: string) => setQuery({ ...query, status })}
          style={{ width: '110px' }}>
          <Option value=''>全部</Option>
          {statusList.map((item: any) => <Option key={item.code} value={item.code}>{item.name}</Option>)}
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
        <Button type="primary" onClick={handleCreate}>新建</Button>
        {isSupervisorNurse && <Button onClick={() => setCommitVisible(true)}>提交</Button>}
        {(
          isRoleManage || isSupervisorNurse || isDepartment
        ) &&
          <Button onClick={() => handleExportGather(true)}>片区导出</Button>
        }
        {isDepartment && <React.Fragment>
          <Button onClick={() => handleExportGather()}>全院导出</Button>
          <Button onClick={() => setArchiveVisible(true)}>汇总</Button>
        </React.Fragment>}
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
      reportType='be'
      visible={commitVisible}
      onCancel={() => {
        setCommitVisible(false)
        getList(query)
      }} />
    <ArchiveModal
      reportType='be'
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
    width: 70px;
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

const ExportCon = styled.div`
  &>div{
    margin-top: 15px;
  }
`