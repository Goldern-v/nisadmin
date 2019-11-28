import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Select, Modal } from 'antd'
import { PageTitle } from 'src/components/common'
import BaseTable, { TabledCon, DoCon, TableHeadCon } from 'src/components/BaseTable'
import { ColumnProps, message } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import moment from 'moment'
import { getCurrentMonth, getCurrentMonthNow } from 'src/utils/date/currentMonth'

import { useKeepAliveEffect } from 'react-keep-alive'
export interface Props { }

import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { qcOneSelectViewModal } from '../../QcOneSelectViewModal'

import { nurseMeetingRecordService } from './api/NurseMeetingRecordService'

const RangePicker = DatePicker.RangePicker
const Option = Select.Option

export default observer(function NurseMeetingRecord() {
  const { history } = appStore
  const auth = authStore.isRoleManage

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

  const [tableData, setTableData] = useState([] as any)
  const [loading, setLoading] = useState(false)

  const columns: ColumnProps<any>[] = [
    {
      dataIndex: 'meetingDate',
      title: '日期',
      align: 'center',
      width: 150,
    },
    {
      dataIndex: 'meetingType',
      title: '分类',
      align: 'center',
      width: 60,
      render: (meetingType: string) => {
        switch (meetingType) {
          case 'QCWMT001':
            return '周会'
          case 'QCWMT002':
            return '月会'
          default:
            return ''
        }
      }
    },
    {
      title: '主题',
      render: (text: string, record: any, indx: number) => {
        let text1 = record.meetingConveyed || ''
        let text2 = record.problemRectification || ''
        let text3 = record.nurseStatement || ''
        return <React.Fragment>
          <div className="ellips" title={text1}>会议传达：{text1}</div>
          <div className="ellips" title={text2}>问题及整改：{text2}</div>
          <div className="ellips" title={text3}>护士发言：{text3}</div>
        </React.Fragment>
      }
    },
    {
      dataIndex: 'comperes',
      title: '会议主持',
      align: 'center',
      width: 100
    },
    {
      dataIndex: 'recorderNames',
      title: '记录人',
      align: 'center',
      width: 100
    },
    {
      dataIndex: 'creatorName',
      title: '创建人',
      align: 'center',
      width: 80,
    },
    {
      dataIndex: 'createTime',
      title: '创建时间',
      align: 'center',
      width: 150,
    },
    {
      title: '状态',
      align: 'center',
      width: 80,
      render: (text: string, record: any, idx: number) => {
        let receiverList = record.receiverList
        let target = receiverList.find((item: any) => item.empNo.toLowerCase() == (authStore.user && authStore.user.empNo.toLowerCase()))
        if (target)
          return <span>已读</span>
        else
          return <span style={{ color: 'red' }}>未读</span>
      }
    },
    {
      title: '操作',
      align: 'center',
      width: 80,
      render: (text: string, record: any, idx: number) => {
        let deleteAuth = auth
        return <DoCon>
          <span onClick={() => handleDetail(record)}>查看</span>
          {deleteAuth && <span style={{ color: 'red' }} onClick={() => handleDelete(record)}>删除</span>}
          {!deleteAuth && <span style={{ cursor: 'default', color: '#999' }}>删除</span>}
        </DoCon>
      }
    }
  ]

  if (auth) columns.splice(7, 0, {
    dataIndex: '',
    title: '阅读情况',
    align: 'center',
    width: 80,
    render: (text: string, record: any, idx: number) => {
      return <span>
        {record.readReceiverSize || 0}人已读，{record.unreadReceiverSize || 0}人未读
      </span>
    }
  })

  const [dataTotal, setDataTotal] = useState(0)

  const handlePageChange = (current: number) => {
    setQuery({ ...query, pageIndex: current })
  }

  const handleSizeChange = (current: number, size: number) => {
    setQuery({ ...query, pageSize: size, pageIndex: 1 })
  }

  const getList = (query: any) => {
    setLoading(true)
    nurseMeetingRecordService
      .getPage(query)
      .then(res => {
        setLoading(false)
        if (res.data) {
          setTableData(res.data.list.map((item: any) => {
            return {
              ...item.nurseMeeting,
              comperes: item.comperes.map((item: any) => item.empName).join('、'),
              attendees: item.attendees.map((item: any) => item.empName).join('、'),
              recorderNames: item.recorders.map((item: any) => item.empName).join('、'),
              recorders: item.recorders,
              receiverList: item.receiverList || [],
              readReceiverSize: item.readReceiverSize,
              unreadReceiverSize: item.unreadReceiverSize
            }
          }))
          setDataTotal(res.data.totalCount)
        }
      }, () => setLoading(false))
  }

  const handleSearch = () => {
    getList(query)
  }

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: '提示',
      content: '是否删除该记录?',
      onOk: () => {
        setLoading(true)
        nurseMeetingRecordService
          .delete(record.id)
          .then(res => {
            message.success('删除成功')
            getList(query)
          }, () => setLoading(false))
      }
    })
  }

  const handleDetail = (record: any) => {
    history.push(`/nurseMeetingRecordDetail?id=${record.id}`)
  }

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
        <PageTitle>护士会议记录</PageTitle>
      </LeftIcon>
      <RightIcon>
        <span>日期:</span>
        <RangePicker
          style={{ width: 220 }}
          {...getDateOptions()}
          allowClear={false} />
        <span>科室:</span>
        <DeptSelect onChange={(wardCode) => setQuery({ ...query, wardCode })} />
        <span>类型:</span>
        <Select
          style={{ width: 80 }}
          onChange={(problemType: string) => setQuery({ ...query, problemType })}
          value={query.problemType}>
          <Option value="">全部</Option>
          <Option value="QCWMT001">周会</Option>
          <Option value="QCWMT002">月会</Option>
        </Select>
        <Button onClick={handleSearch} type="primary">查询</Button>
        {
          sameWard &&
          <Button type="primary" onClick={() => history.push('/nurseMeetingRecordEdit')}>添加</Button>
        }
      </RightIcon>
    </HeaderCon>
    <TableWrapper>
      <BaseTable
        loading={loading}
        type={['index']}
        surplusWidth={200}
        surplusHeight={225}
        dataSource={tableData}
        onRow={(record: any) => {
          return {
            onDoubleClick: () => handleDetail(record)
          }
        }}
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
.ellips{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  height: 19px;
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