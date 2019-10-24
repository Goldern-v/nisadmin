import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Modal, Select, Popover, Checkbox } from 'antd'
import { PageTitle } from 'src/components/common'
import BaseTable, { TabledCon, DoCon, TableHeadCon } from 'src/components/BaseTable'
import { ColumnProps, Spin } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import { crrentMonth } from 'src/utils/moment/crrentMonth'
import moment from 'moment'
import qs from 'qs'

import service from 'src/services/api'
const commonApi = service.commonApiService

const Option = Select.Option
// console.log(commonApi)

import { nursingQualityCheckService } from './api/NursingQualityCheckService'

import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'

export interface Props { }

const RangePicker = DatePicker.RangePicker

export default observer(function NursingQualityCheck() {
  const { history } = appStore
  const [dateRange, setDateRange] = useState(crrentMonth() as any)
  const auth = authStore.isRoleManage

  const [tableData, setTableData] = useState([] as any)
  const [nurseList, setNurseList] = useState([] as any)
  const [loading, setLoading] = useState(false)

  const [query, setQuery] = useState({
    wardCode: '',
    empNo: '',
    pageIndex: 1,
    pageSize: 15,
    startDate: `${dateRange[0].format('YYYY-MM-DD')}`,
    endDate: `${dateRange[1].format('YYYY-MM-DD')}`,
  })

  const columns: ColumnProps<any>[] = [
    // {
    //   key: 'index',
    //   title: '序号',
    //   width: 70,
    //   align: 'center',
    //   render: (text: string, record: any, idx: number) =>
    //     (query.pageIndex - 1) * query.pageSize + idx + 1
    // },
    {
      dataIndex: 'wardName',
      title: '科室',
      width: 180,
    },
    {
      dataIndex: 'recordDate',
      title: '日期',
      align: 'center',
      width: 150,
    },
    {
      // dataIndex: '班次',
      key: '班次',
      title: '班次',
      width: 80,
      align: 'center',
    },
    {
      dataIndex: 'empName',
      title: '护士姓名',
      width: 80,
      align: 'center',
    },
    {
      dataIndex: 'content',
      title: '质控内容',
      width: 120,
      align: 'center',
      render: (text: string, record: any, idx: number) =>
        <div className="ellips" title={text}>{text}</div>
    },
    {
      dataIndex: 'result',
      title: '质控结果',
      align: 'center',
      width: 80,
      render: (text: string, record: any, idx: number) => {
        if (text == '有问题') return <span style={{ color: 'red' }}>{text}</span>
        return <span>{text}</span>
      }
    },
    {
      dataIndex: 'description',
      title: '质控详情',
      width: 230,
      align: 'left',
    },
    {
      dataIndex: 'deductScore',
      title: '星级扣分',
      align: 'center',
      width: 60,
      render: (text: string, record: any, idx: number) => {
        if (text == '0') return <span>{text}</span>
        return <span style={{ color: 'red' }}>{`-${text}`}</span>
      }
    },
    {
      dataIndex: 'type',
      title: '质控类别',
      width: 120,
      align: 'center',
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
      width: 120,
    },
    {
      key: 'operate',
      title: '操作',
      width: 130,
      render: (text: string, record: any, idx: number) => {
        const title = <div>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{record.empName}的星级考核</span>
          <span style={{ marginLeft: '15px', color: '#999' }}>选中一个扣1分</span>
        </div>

        let content = <Spin>
          <div style={{ width: '180px', height: '130px' }}></div>
        </Spin>

        if (record.checkItemList) content = record.checkItemList
          .map((item: any, itemIdx: number) =>
            <PopItemCon key={`pop-${itemIdx}`}>
              <Checkbox checked={item.checked} >
                <span className="pop-item-content">{`${itemIdx + 1}.${item.itemName}`}</span>
              </Checkbox>
            </PopItemCon>
          )

        return <DoCon>
          <Popover
            placement='right'
            trigger='click'
            title={title}
            content={content}>
            <span onClick={() => handleLoadDetail(record, idx)}>查看星级评分</span>
          </Popover>
          {auth && <span onClick={() => handleEdit(record)}>编辑</span>}
        </DoCon>
      }
    }
  ]

  const handleLoadDetail = (record: any, idx: number) => {
    if (!record.checkItemList)
      nursingQualityCheckService
        .getDetail(record.id)
        .then(res => {
          if (res.data.checkItemList) {
            let newTableData = [...tableData]
            newTableData[idx].checkItemList = res.data.checkItemList
            setTableData(newTableData)
          }
        })
  }

  const [dataTotal, setDataTotal] = useState(0)


  const handleRangeChange = (range: any) => {
    setDateRange(range)
  }

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

    nursingQualityCheckService
      .getPage(query)
      .then((res: any) => {
        setLoading(false)
        // console.log(res)
        if (res.data && res.data.list) {
          setTableData(res.data.list)
          setDataTotal(res.data.totalCount)
        }
      }, () => setLoading(false))
  }

  const handleWardCodeChange = (wardCode: string) => {
    commonApi
      .groupByDeptInDeptList('', wardCode)
      .then(res => {
        // console.log(res)
        if (res.data && res.data instanceof Array) {
          let target = res.data.find((item: any) => item.deptCode == wardCode)
          if (target && target.userList) setNurseList(target.userList)
        }
      })

    nursingQualityCheckService
      .getRangeByDeptCode(wardCode)
      .then(res => {
        console.log('range', res)
      })


    setQuery({ ...query, wardCode, empNo: '', pageIndex: 1 })
  }

  const handleCreate = () => {
    let createDate = moment()
    Modal.confirm({
      centered: true,
      title: '病区护理质量检查',
      content: <CreateWrapper>
        <span className="label">请选择检查日期:</span>
        <span style={{
          display: 'inline-block'
        }}>
          <DatePicker
            allowClear={false}
            format="YYYY-MM-DD"
            value={createDate}
            onChange={(newDate) => createDate = newDate} />
        </span>
      </CreateWrapper>,
      onOk: () => {
        history.push(`/nursingQualityCheckEdit?date=${createDate.format('YYYY-MM-DD')}`)
      }
    })
  }

  const handleEdit = (record: any) => {
    let query = {
      date: moment(record.recordDate).format('YYYY-MM-DD'),
      type: 'edit'
    }
    history.push(`/nursingQualityCheckEdit?${qs.stringify(query)}`)
  }

  useEffect(() => {
    if (query.wardCode && dateRange) {
      setQuery({
        ...query,
        startDate: `${dateRange[0].format('YYYY-MM-DD')}`,
        endDate: `${dateRange[1].format('YYYY-MM-DD')}`,
        pageIndex: 1
      })
    }
  }, [dateRange])

  useEffect(() => {
    if (query.wardCode && query.endDate && query.startDate) getList(query)
  }, [query])

  return <Wrapper>
    <HeaderCon>
      <LeftIcon>
        <PageTitle>病区质量检查</PageTitle>
      </LeftIcon>
      <RightIcon>
        <span>日期:</span>
        <RangePicker
          style={{ width: 220 }}
          format="YYYY-MM-DD"
          value={dateRange}
          onChange={handleRangeChange}
          allowClear={false} />
        <span>科室:</span>
        <DeptSelect onChange={handleWardCodeChange} />
        <span>护士:</span>
        <Select
          style={{ width: '120px' }}
          showSearch
          filterOption={(input: string, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={(empNo: string) => setQuery({ ...query, empNo })}
          value={query.empNo}>
          <Option value={''}>全部</Option>
          {nurseList.map((item: any, idx: number) =>
            <Option key={idx} value={item.empNo}>{item.empName}</Option>
          )}
        </Select>
        <Button onClick={handleSearch}>查询</Button>
        <Button type="primary" onClick={handleCreate}>新建</Button>
        <Button>导出</Button>
      </RightIcon>
    </HeaderCon>
    <TableWrapper>
      <BaseTable
        type={['index', 'fixedIndex']}
        loading={loading}
        surplusHeight={225}
        surplusWidth={200}
        dataSource={tableData}
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

const PopItemCon = styled.div`
  margin-bottom: 5px;
  label>span{
    vertical-align: top;
  }
  .ant-checkbox{
    position: relative;
    top: 3px;
  }
  .pop-item-content{
    display:inline-block;
    max-width: 350px;
    word-break: break-all;
  }
`

const CreateWrapper = styled.div`
  margin-top: 15px;
  .label{
    margin-right: 10px;
  }
`

const TableWrapper = styled(TabledCon)`
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