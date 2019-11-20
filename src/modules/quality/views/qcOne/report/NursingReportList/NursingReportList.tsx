import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { DatePicker, Select, Button, message, Modal } from 'antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import Moment from 'moment'
import { summaryReportService as api } from './api/SummaryReportService'
import { numToChinese } from 'src/utils/number/numToChinese'
import CreateSummaryReport from './components/CreateSummaryReport'
import { useKeepAliveEffect } from 'react-keep-alive'
import qs from 'qs'
import { PageTitle } from 'src/components/common'
import DeptSelect from 'src/components/DeptSelect'
import { numberToArray } from 'src/utils/array/array'
import { fileDownload } from 'src/utils/file/file'
import { globalModal } from 'src/global/globalModal'
import { qcOneSelectViewModal } from './../../QcOneSelectViewModal'
import CommitModal from './../../components/CommitModal'
import ArchiveModal from './../../components/ArchiveModal'
import { qcOneService } from './../../services/QcOneService'
import YearPicker from 'src/components/YearPicker'

const Option = Select.Option

export default observer(function NursingReportList() {
  const [yearPickerIsOpen, setYearPickerIsOpen] = useState(false)
  const [createAnalysisVisible, setCreateAnalysisVisible] = useState(false)
  const { history } = appStore
  const [bigDeptList, setBigDeptList] = useState([] as any[])
  const { wardCode, statusList, statusObj } = qcOneSelectViewModal
  const {
    deptList, //权限科室列表
    isRoleManage, //是否护士长
    isSupervisorNurse, //是否科护士长
    isDepartment //是否护理部
  } = authStore

  const defaultQuery = {
    year: Moment() as null | Moment.Moment,
    month: Number(Moment().format('MM')),
    pageIndex: 1,
    pageSize: 20,
    status: '',
    wardCode: ''
  } as any

  const [query, setQuery] = useState(defaultQuery)
  const [cacheQuery, setCacheQuery] = useState(defaultQuery)

  useEffect(() => {
    qcOneService.bigDeptListSelf().then(res => {
      if (res.data) setBigDeptList(res.data)
    })
  }, [])

  useEffect(() => {
    for (let x in query) {
      if (query[x] !== cacheQuery[x]) {
        setCacheQuery(query)
        getTableData()
        break
      }
    }
  }, [query])

  useKeepAliveEffect(() => {
    if (
      appStore.history &&
      (appStore.history.action === 'POP' || appStore.history.action === 'PUSH')
    ) {
      getTableData()
      // let newWardCode = qcOneSelectViewModal.initWardCode()
      // if (query.wardCode === newWardCode) {
      //   getTableData()
      // } else {
      //   setQuery({ ...query, wardCode: newWardCode })
      // }
    }
    return () => { }
  })

  const [dataTotal, setDataTotal] = useState(0 as number)

  const [tableData, setTableData] = useState([] as any)

  const [tableLoading, setTableLoading] = useState(false)

  const [commitVisible, setCommitVisible] = useState(false)
  const [archiveVisible, setArchiveVisible] = useState(false)

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      key: 'index',
      width: 50,
      align: 'center',
      render: (text: string, record: any, index: any) => index + 1
    },
    {
      title: '报告名称',
      key: 'reportName',
      dataIndex: 'reportName',
      className: 'align-left',
      align: 'left',
      width: 200,
      render: (name: string) => <div title={name}>{name}</div>
    },

    {
      title: '报告年度',
      key: 'year',
      dataIndex: 'year',
      width: 90,
      align: 'center',
      render: (year: string) => `${year}年`
    },
    {
      title: '汇总月份',
      key: 'month',
      dataIndex: 'month',
      width: 90,
      align: 'center',
      render: (text: string, item: any) => {
        return text ? `${text}月` : ''
      }
    },
    {
      title: '创建人',
      key: 'creatorName',
      dataIndex: 'creatorName',
      width: 90,
      align: 'center'
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      width: 120,
      align: 'center'
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      width: 80,
      align: 'center',
      render: (status: string) => {
        let statusText = statusObj[status] || '-'
        return statusText
      }
    },
    {
      title: '操作',
      key: 'operation',
      width: 90,
      align: 'center',
      render: (text: string, record: any) => {
        return <DoCon className="operate-group">
          <span onClick={() => handleReview(record)}>查看</span>
          {isRoleManage && <React.Fragment>
            {record.status === '0' && <span onClick={() => handlePublish(record)}>提交</span>}
            {record.status === '1' && <span onClick={() => handleCancelPublish(record)} style={{ color: 'red' }}>撤销</span>}
          </React.Fragment>}
          <span onClick={() => handleExport(record)}>导出</span>
        </DoCon>
      }
    }
  ]

  const handlePanelChange = (value: any) => {
    setYearPickerIsOpen(false)
    setQuery({ ...query, year: value })
  }

  const handleOpenChange = (status: boolean) => {
    setYearPickerIsOpen(status)
  }

  const handleYearClear = () => {
    setQuery({ ...query, year: null, type: '' })
  }

  const handleReview = (record: any) => {
    const obj = {
      year: record.year,
      month: record.month,
      wardCode: record.wardCode
    }

    history.push(`/qcOne/nursingReportDetail?${qs.stringify(obj)}`)
  }

  const handleSearch = () => {
    getTableData()
  }

  const handleCreate = () => {
    setCreateAnalysisVisible(true)
  }

  const handleCreateOk = (info: any) => {
    //汇总报告创建成功
    let { year, month, wardCode } = info
    getTableData()
    setCreateAnalysisVisible(false)
    history.push(`/qcOne/nursingReportDetail?${qs.stringify({ year, month, wardCode: authStore.selectedDeptCode })}`)
    setCreateAnalysisVisible(false)
  }

  const handleCreateCancel = () => {
    setCreateAnalysisVisible(false)
  }

  const getTableData = () => {
    setTableLoading(true)
    let year = ''
    if (query.year !== null) year = query.year.format('YYYY')

    let reqQuery = {
      ...query,
      year,
      wardCode
    }
    api
      .getPage(reqQuery)
      .then((res) => {
        setTableLoading(false)

        if (res.data.totalPage) setDataTotal(res.data.totalPage)
        else setDataTotal(0)

        if (res.data.list instanceof Array)
          setTableData(
            res.data.list.map((item: any, key: number) => {
              return {
                key,
                ...item
              }
            })
          )
      })
      .catch((res) => {
        setTableLoading(false)
      })
  }

  const handleWardCodeChange = (wardCode: string) => {
    setQuery({ ...query, wardCode })
    qcOneSelectViewModal.setWardCode(wardCode)
  }

  const handleExport = (record: any) => {
    // console.log(record)
    setTableLoading(true)
    // api.exportData({
    //   wardCode: record.wardCode,
    //   year: record.year,
    //   month: record.month
    // })
    qcOneService.export({
      wardCode: record.wardCode,
      year: record.year,
      month: record.month
    }, 'wn')
      .then(res => fileDownload(res)).finally(() => setTableLoading(false))
  }

  const handlePublish = (record: any) => {
    globalModal.confirm('提交确认', '你确定要提交该报告吗？').then((res) => {
      setTableLoading(true)
      api.publish({
        wardCode: record.wardCode,
        year: record.year,
        month: record.month
      }).then((res) => {
        message.success('提交成功')
        setTableLoading(false)
        getTableData()
      }, () => setTableLoading(false))
    })
  }

  const handleCancelPublish = (record: any) => {
    globalModal.confirm('撤销确认', '你确定要撤销该报告吗？').then((res) => {
      setTableLoading(true)
      api.cancelPublish({
        wardCode: record.wardCode,
        year: record.year,
        month: record.month
      }).then((res) => {
        message.success('提交成功')
        setTableLoading(false)
        getTableData()
      }, () => setTableLoading(false))
    })
  }

  const monthList = (() => {
    let currentMonth = 12;
    let monthArr = []
    while (currentMonth--) {
      monthArr.push(currentMonth + 1)
    }
    return monthArr
  })()

  const handleExportGather = (isBigDept?: boolean) => {
    let year = query.year
    let month = query.month || Moment().format('M')
    let $wardCode = ''
    if (bigDeptList.length > 0) $wardCode = bigDeptList[0].code

    const exportContent = <ExportCon>
      <div>
        <span>年份: </span>
        <span>
          <YearPicker
            allowClear={false}
            value={`${year}-01-01`}
            onChange={(_moment: any) => year = _moment} />
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
        setTableLoading(true)

        if (isBigDept)
          qcOneService.exportByBigDept({
            wardCode: $wardCode,
            year: year.format('YYYY'),
            month
          }, 'wn')
            .then((res: any) => {
              setTableLoading(false)
              fileDownload(res)
            }, () => setTableLoading(false))
        else
          qcOneService.exportByNd({
            year: year.format('YYYY'),
            month
          }, 'wn')
            .then((res: any) => {
              setTableLoading(false)
              fileDownload(res)
            }, () => setTableLoading(false))
      }
    })
  }

  return (
    <Wrapper>
      <div className='topbar'>
        <div className='float-left'>
          <PageTitle className="pannel-title">病区护理工作报表</PageTitle>
        </div>
        <div className='float-right'>
          <div className='item'>
            <div className='label'>科室：</div>
            <div className='content'>
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
            </div>
          </div>
          <div className='item'>
            <div className='label'>报告年度：</div>
            <div className='content'>
              <DatePicker
                style={{ width: 100 }}
                value={query.year}
                open={yearPickerIsOpen}
                allowClear={false}
                mode='year'
                className='year-picker'
                placeholder='全部'
                format='YYYY'
                onChange={handleYearClear}
                onOpenChange={handleOpenChange}
                onPanelChange={handlePanelChange}
              />
            </div>
          </div>
          <div className='item'>
            <div className='label'>月份：</div>
            <div className='content'>
              <Select
                style={{ width: 100 }}
                value={query.month}
                onChange={(value: any) => setQuery({ ...query, month: value })}
              >
                <Select.Option value={''}>全部</Select.Option>
                {numberToArray(11).map((item) => (
                  <Select.Option value={item + 1} key={item}>
                    {item + 1}月
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
          <div className='item'>
            <div className='label'>状态：</div>
            <div className='content'>
              <Select
                style={{ width: 110 }}
                value={query.status}
                onChange={(status: any) => {
                  setQuery({ ...query, status })
                }}
              >
                <Option value=''>全部</Option>
                {statusList.map((item: any) => <Option key={item.code} value={item.code}>{item.name}</Option>)}
              </Select>
            </div>
          </div>
          <div className='item'>
            <Button onClick={handleSearch}>查询</Button>
          </div>
          {isRoleManage && <div className="item">
            <Button type="primary" onClick={handleCreate}>新建</Button>
          </div>}
          {isSupervisorNurse && <div className="item">
            <Button onClick={() => setCommitVisible(true)}>提交</Button>
          </div>}
          {(isRoleManage || isSupervisorNurse || isDepartment) && <div className="item">
            <Button onClick={() => handleExportGather(true)}>片区导出</Button>
          </div>}
          {isDepartment && <div className="item">
            <div className="item">
              <Button onClick={() => handleExportGather()}>全院导出</Button>
            </div>
            <div className="item">
              <Button onClick={() => setArchiveVisible(true)}>汇总</Button>
            </div>
          </div>}
        </div>
      </div>
      <div className='main-contain'>
        <BaseTable
          columns={columns}
          dataSource={tableData}
          loading={tableLoading}
          surplusHeight={220}
          onRow={(record: any) => {
            return {
              onDoubleClick: () => record.reportName && handleReview(record)
            }
          }}
          pagination={{
            pageSizeOptions: ['10', '20', '30', '40', '50'],
            onShowSizeChange: (pageIndex, pageSize) => setQuery({ ...query, pageSize }),
            onChange: (pageIndex, pageSize) => setQuery({ ...query, pageIndex }),
            total: dataTotal,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: query.pageSize,
            current: query.pageIndex
          }}
        />
      </div>
      <CreateSummaryReport
        // allowClear={createClear}
        visible={createAnalysisVisible}
        onOk={handleCreateOk}
        onCancel={handleCreateCancel}
      // groupRoleList={groupRoleListSelf}
      />
      <CommitModal
        reportType='wn'
        visible={commitVisible}
        onCancel={() => {
          setCommitVisible(false)
          getTableData()
        }} />
      <ArchiveModal
        reportType='wn'
        visible={archiveVisible}
        onCancel={() => {
          setArchiveVisible(false)
          getTableData()
        }} />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  position: relative;
  padding-top: 50px;
  height: 100%;
  width: 100%;
  .pannel-title{
    @media (max-width: 1540px) {
      display: none;
    }
  }

  div.topbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px 5px 10px 15px;
    box-sizing: border-box;
    height: 50px;
    overflow: hidden;
    .float-left {
      float: left;
    }

    .float-right {
      float: right;
    }

    .item {
      display: inline-block;
      margin-right: 10px;
      vertical-align: middle;
      & > div {
        display: inline-block;
        vertical-align: middle;
      }
      .label {
      }
      .content {
        .year-picker {
          width: 75px;
        }
        .recode-type-select {
          min-width: 200px;
        }
        .month-select {
          width: 72px;
        }
      }
    }
  }

  .main-contain {
    height: 100%;
    width: 100%;
    padding: 15px;
    padding-top: 0;
    .align-left {
      position: relative;
      > div {
        position: absolute;
        left: 5px;
        right: 5px;
        top: 5px;
        height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`
const ExportCon = styled.div`
  &>div{
    margin-top: 15px;
  }
`