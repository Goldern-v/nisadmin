import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Select } from 'antd'
import { PageTitle } from 'src/components/common'
import BaseTable, { TabledCon, DoCon, TableHeadCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { qcOneSelectViewModal } from '../../QcOneSelectViewModal'
export interface Props { }


import { badEventRecordService } from './api/BadEventRecordService'
const Option = Select.Option
const RangePicker = DatePicker.RangePicker

export default observer(function BadEventRecord() {
  const { history } = appStore
  const auth = authStore.isRoleManage

  const [query, setQuery] = useState({
    wardCode: '',
    pageIndex: 1,
    pageSize: 15,
    problemType: '',
    type: '1',
    startDate: qcOneSelectViewModal.startDate,
    endDate: qcOneSelectViewModal.endDate,
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
      width: 120,
    },
    {
      dataIndex: 'wardName',
      title: '发生科室',
      width: 80
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
      dataIndex: 'briefCourseEvent',
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
      width: 120
    },
    {
      title: '操作',
      align: 'center',
      width: 90,
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
          setTableData(res.data.pages.map((item: any) => {
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

  useEffect(() => {
    getTypeList()
  }, [])

  useEffect(() => {
    if (
      query.wardCode &&
      qcOneSelectViewModal.startDate &&
      qcOneSelectViewModal.endDate
    ) {
      setQuery({
        ...query,
        startDate: qcOneSelectViewModal.startDate,
        endDate: qcOneSelectViewModal.endDate,
        pageIndex: 1
      })
    }

  }, [qcOneSelectViewModal.startDate, qcOneSelectViewModal.endDate])

  useEffect(() => {
    if (query.wardCode && query.endDate && query.startDate) getList(query)
  }, [query])

  return <Wrapper>
    <HeaderCon>
      <LeftIcon>
        <PageTitle>不良事件记录</PageTitle>
      </LeftIcon>
      <RightIcon>
        <span>日期:</span>
        <RangePicker
          style={{ width: 220 }}
          {...qcOneSelectViewModal.getDateOptions()}
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
        <Button onClick={handleSearch}>搜索</Button>
        {auth && <Button
          type="primary"
          onClick={() => history.push('/badEventRecordEdit')}>添加</Button>}
        <Button>导出</Button>
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
  padding: 0 0 0 15px;
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