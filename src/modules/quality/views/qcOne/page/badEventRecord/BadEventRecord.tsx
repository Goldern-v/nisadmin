import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Select, Modal } from 'antd'
import { PageTitle } from 'src/components/common'
import BaseTable, { TabledCon, DoCon, TableHeadCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { useKeepAliveEffect } from 'react-keep-alive'
import { qcOneSelectViewModal } from '../../QcOneSelectViewModal'
import moment from 'moment'
import { fileDownload } from 'src/utils/file/file'
import { getCurrentMonth, getCurrentMonthNow } from 'src/utils/date/currentMonth'

export interface Props { }


import { badEventRecordService } from './api/BadEventRecordService'
import YearPicker from 'src/components/YearPicker'
const Option = Select.Option
const RangePicker = DatePicker.RangePicker

export default observer(function BadEventRecord() {
  const { history } = appStore
  //是否护长
  const auth = authStore.isRoleManage
  //是否查看本科科室
  const sameWard = authStore.defaultDeptCode == authStore.selectedDeptCode

  const [query, setQuery] = useState({
    wardCode: '',
    pageIndex: 1,
    pageSize: 20,
    problemType: '',
    type: '1',
    // startDate: qcOneSelectViewModal.startDate,
    // endDate: qcOneSelectViewModal.endDate,
    startDate: getCurrentMonthNow()[0].format('YYYY-MM-DD') as string,
    endDate: getCurrentMonthNow()[1].format('YYYY-MM-DD') as string,
  })

  const [tableData, setTableData] = useState([] as any[])
  const [dataTotal, setDataTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const [typeList, setTypeList] = useState([] as any[])

  const columns: ColumnProps<any>[] = [
    {
      dataIndex: 'eventDate',
      title: '发生时间',
      align: 'center',
      width: 150,
    },
    {
      dataIndex: 'wardName',
      title: '发生科室',
      width: 150
    },
    {
      dataIndex: 'eventType',
      title: '事件种类',
      align: 'center',
      width: 120,
      render: (code: string) => {
        let target = typeList.find((item: any) => item.code == code)
        if (target) return target.name
        return ''
      }
    },
    {
      dataIndex: 'parties',
      title: '当事人',
      align: 'center',
      width: 120
    },
    {
      dataIndex: 'briefCourseEvent',
      title: '事情简要经过',
      align: 'center',
      width: 230
    },
    {
      dataIndex: 'result',
      title: '后果',
      align: 'center',
      width: 230
    },
    {
      dataIndex: 'creatorName',
      title: '创建人',
      align: 'center',
      width: 80
    },
    {
      dataIndex: 'createTime',
      title: '创建时间',
      align: 'center',
      width: 150
    },
    {
      title: '操作',
      align: 'center',
      width: 90,
      fixed: 'right',
      render: (text: string, record: string, idx: number) => {
        return <DoCon>
          <span onClick={() => handleDetail(record)}>查看详情</span>
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
    setQuery({ ...query, pageIndex: 1 })
  }

  const getList = (query: any) => {
    setLoading(true)
    badEventRecordService
      .getPage(query)
      .then(res => {
        setLoading(false)
        if (res.data) {
          setDataTotal(res.data.totalCount)
          setTableData(res.data.list.map((item: any) => {
            return {
              ...item.badEvent,
              parties: item.parties.map((item: any) => item.empName || '').join('、')
            }
          }))
        }
      }, () => setLoading(false))
  }

  const getTypeList = () => {
    badEventRecordService.getDict({
      groupCode: 'qc',
      dictCode: 'qc_bad_event_type'
    })
      .then(res => {
        if (res.data) setTypeList(res.data)
      })
  }

  const handleDetail = (record: any) => {
    history.push(`/badEventRecordDetail?id=${record.id}`)
  }

  const monthList = (() => {
    let currentMonth = 12;
    let monthArr = []
    while (currentMonth--) {
      monthArr.push(currentMonth + 1)
    }
    return monthArr
  })()

  const handleExport = () => {
    let year = moment()
    let month = moment(query.startDate).format('M')

    const exportContent = <ExportCon>
      <div>
        <span>年份: </span>
        <span>
          <YearPicker
            allowClear={false}
            value={year}
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
    </ExportCon>

    Modal.confirm({
      title: '导出年月选择',
      content: exportContent,
      onOk: () => {
        setLoading(true)
        badEventRecordService.exportData({
          wardCode: query.wardCode,
          year: year.format('YYYY'),
          month
        })
          .then((res: any) => {
            setLoading(false)
            fileDownload(res)
          }, () => setLoading(false))
      }
    })
  }

  const getDateOptions = () => {
    return {
      value: [moment(query.startDate), moment(query.endDate)] as [moment.Moment, moment.Moment],
      onChange: (date: any[]) => {
        let newQuery = { ...query }
        newQuery.startDate = date[0] ? moment(date[0]).format('YYYY-MM-DD') : ''
        newQuery.endDate = date[1] ? moment(date[1]).format('YYYY-MM-DD') : ''
        setQuery(newQuery)
      }
    }
  }

  useEffect(() => {
    getTypeList()
  }, [])

  // useEffect(() => {
  //   if (
  //     query.wardCode &&
  //     qcOneSelectViewModal.startDate &&
  //     qcOneSelectViewModal.endDate
  //   ) {
  //     setQuery({
  //       ...query,
  //       startDate: qcOneSelectViewModal.startDate,
  //       endDate: qcOneSelectViewModal.endDate,
  //       pageIndex: 1
  //     })
  //   }

  // }, [qcOneSelectViewModal.startDate, qcOneSelectViewModal.endDate])

  useEffect(() => {
    if (query.wardCode && query.endDate && query.startDate) getList(query)
  }, [query])

  useKeepAliveEffect(() => {
    if ((appStore.history && appStore.history.action) === 'POP') {
      if (query.wardCode && query.endDate && query.startDate) getList(query)
    }
    return () => { }
  })

  return <Wrapper>
    <HeaderCon>
      <LeftIcon>
        <PageTitle>不良事件记录</PageTitle>
      </LeftIcon>
      <RightIcon>
        <span>日期:</span>
        <RangePicker
          style={{ width: 220 }}
          {...getDateOptions()}
          allowClear={false} />
        <span>科室:</span>
        <DeptSelect
          onChange={(wardCode) => setQuery({ ...query, wardCode })} />
        <span>事件种类:</span>
        <Select
          value={query.problemType}
          onChange={(problemType: any) => setQuery({ ...query, problemType })}>
          <Option value={''}>全部</Option>
          {typeList.map((item: any) =>
            <Option value={item.code} key={item.code}>{item.name}</Option>
          )}
        </Select>
        <Button onClick={handleSearch} type="primary">查询</Button>
        {sameWard && <Button
          type="primary"
          onClick={() => history.push('/badEventRecordEdit')}>添加</Button>}
        {/* <Button onClick={handleExport}>导出</Button> */}
      </RightIcon>
    </HeaderCon>
    <TableWrapper>
      <BaseTable
        onRow={(record: any) => {
          return {
            onDoubleClick: () => handleDetail(record)
          }
        }}
        type={['index', 'fixedIndex']}
        loading={loading}
        dataSource={tableData}
        surplusHeight={225}
        surplusWidth={200}
        pagination={{
          current: query.pageIndex,
          pageSize: query.pageSize,
          total: dataTotal,
          onChange: handlePageChange,
          onShowSizeChange: handleSizeChange
        }}
        columns={columns}
      />
    </TableWrapper>
  </Wrapper>
})

const TableWrapper = styled(TabledCon)`
td{
  word-break: break-all;
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

`
const Wrapper = styled.div``

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