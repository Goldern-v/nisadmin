import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Select, Input, DatePicker, message, Modal, Switch } from 'antd'
import { PaginationConfig } from 'src/vendors/antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import { appStore, authStore } from 'src/stores'
import createModal from 'src/libs/createModal'
import BatchDistribution from '../../components/BatchDistribution'
import { getCurrentMonthNow } from 'src/utils/date/currentMonth'
import FollowUpPatientsManageServices from '../services/FollowUpPatientsManageServices'
export interface Props { }
const api = new FollowUpPatientsManageServices();

export default function 已分配出院患者() {
  const batchDistribution = createModal(BatchDistribution)
  const [query, setQuery] = useState({
    submitTimeBegin: getCurrentMonthNow()[0].format('YYYY-MM-DD'),
    submitTimeEnd: getCurrentMonthNow()[1].format('YYYY-MM-DD'),
    keyWord: '',
    deptCode: '',
    audited: '0',
    noteType: '学习笔记',
    pageSize: 20,
    pageIndex: 1,
  })
  //表格数据载入状态
  const [pageLoading, setPageLoading] = useState(false)
  const [deptSelect, setDeptSelect] = useState('')
  //科室列表
  const [deptList, setDeptList] = useState([] as any)
  const [date, setDate]: any = useState(getCurrentMonthNow())
  const [selectedTemplate, setSelectedTemplate]: any = useState('')
  const [searchText, setSearchText] = useState('')
  const [dataSource, setDataSource] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[])
  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20
  })
  const [total, setTotal]: any = useState(0)
  const columns: ColumnProps<any>[] = [
    {
      title: '护理单元',
      dataIndex: '',
      width: 120
    },
    {
      title: '床号',
      dataIndex: '',
      width: 50
    },
    {
      title: '姓名',
      dataIndex: 'remark',
      width: 70
    },
    {
      title: '性别',
      dataIndex: '',
      width: 50
    },
    {
      title: '联系电话',
      dataIndex: 'name',
      width: 120,
      align: 'center'
    },
    {
      title: '联系人',
      dataIndex: '',
      width: 120,
      align: 'center'
    },
    {
      title: '病人ID',
      dataIndex: '',
      width: 120,
      align: 'center'
    },
    {
      title: '住院号',
      dataIndex: '',
      width: 100,
      align: 'center'
    },
    {
      title: '住院次数',
      dataIndex: '',
      width: 100,
      align: 'center'
    },
    {
      title: '管床医生',
      dataIndex: '',
      width: 100,
      align: 'center'
    },
    {
      title: '出院日期',
      dataIndex: '',
      width: 140,
      align: 'center'
    },
    {
      title: '诊断',
      dataIndex: '',
      width: 180,
      align: 'center'
    },
    {
      title: '操作',
      width: status == '1' ? 120 : 80,
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span onClick={() => onDistribution(record)}>分配随访小组</span>
          </DoCon>
        )
      }
    }
  ]
  const onChangeSearchText = (e: any) => {
    setSearchText(e.target.value)
  }
  const getData = () => {
    // setPageLoading(true)
    // let startDate = date[0] ? moment(date[0]).format('YYYY-MM-DD') : ''
    // let endDate = date[0] ? moment(date[1]).format('YYYY-MM-DD') : ''
    // wardLogService
    //   .findLog({
    //     ...pageOptions,
    //     wardCode: deptSelect,
    //     startDate,
    //     endDate,
    //     templateId: selectedTemplate,
    //     status
    //   })
    //   .then((res) => {
    //     setPageLoading(false)

    //     setSelectedRowKeys([])

    //     setTotal(res.data.totalCount)
    //     setDataSource(res.data.list)
    //   }, err => setPageLoading(false))
  }
  const getTableData = (newQuery: any) => {
  }
  useEffect(() => {
    getTableData(query)
  }, [query])

  const handleRowSelect = (rowKeys: string[] | number[]) => setSelectedRowKeys(rowKeys)

  const onDetail = (record: any) => {
    appStore.history.push(`/wardLogDetail?id=${record.id}`)
  }

  const onDistribution = (record: any) => {
    batchDistribution
      .show({})
  }
  
  useEffect(() => {
    getDeptList();
  }, []);

  const getDeptList = () => {
    api.getNursingUnitAll().then(res => {
      if (res.data.deptList instanceof Array) setDeptList(res.data.deptList);
    })
  }
  
  useEffect(() => {
    getData()
  }, [
    pageOptions.pageIndex,
    pageOptions.pageSize,
    date,
    selectedTemplate,
    deptSelect
  ])

  return <Wrapper>
    <PageHeader>
    <Place />
    <span className='label'>护理单元:</span>
      {/* <DeptSelect onChange={(val) => setDeptSelect(val)} /> */}
      <Select
        value={deptSelect}
        style={{ width: 180 }}
        showSearch
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        onChange={(val: string) => setDeptSelect(val)}>
        <Select.Option value={''}>全部</Select.Option>
        {deptList.map((item: any, idx: any) =>
          <Select.Option key={idx} value={item.code}>{item.name}</Select.Option>)}
      </Select>
      <span className='label'>出院时间:</span>
      <DatePicker.RangePicker
        allowClear={false}
        style={{ width: 220 }}
        value={date}
        onChange={(value: any) => setDate(value)}
      />
      <Input
        placeholder='请输入患者姓名/床号检索'
        style={{ width: 220 }}
        value={searchText}
        onChange={onChangeSearchText}
        className='ml-20'
      />
      <Button type='primary' onClick={() => getData()}>
        查询
      </Button>
      <Button  onClick={onDistribution} className='mr-20'>
        批量分配
      </Button>

    </PageHeader>
    <MainCon>
      <BaseTable
          loading={pageLoading}
          dataSource={dataSource}
          columns={columns}
          wrapperStyle={{ margin: '0 15px' }}
          type={['index']}
          rowKey='id'
          surplusHeight={260}
          surplusWidth={300}
          pagination={{
            current: pageOptions.pageIndex,
            pageSize: pageOptions.pageSize,
            total: total
          }}
          rowSelection={{
            selectedRowKeys,
            onChange: handleRowSelect,
            getCheckboxProps: (record: any) => ({
              // disabled: !deptSelect || !selectedTemplate,
              disabled: !selectedTemplate,
              name: record.name
            })
          }}
          onChange={(pagination: PaginationConfig) => {
            setPageOptions({
              pageIndex: pagination.current,
              pageSize: pagination.pageSize
            })
          }}
          onRow={(record: any) => {
            return { onDoubleClick: () => onDetail(record) }
          }}
        />
    </MainCon>
    <batchDistribution.Component />
  </Wrapper>
}

const Wrapper = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  .ml-20 {
    margin-left: 20px
  }
  .mr-20 {
    margin-right: 20px
  }
  .file-item{
    cursor: pointer;
    color: #00A680;
    word-break: break-all;
    & *{
      vertical-align: middle;
    }
    .download{
      margin-left: 5px;
    }
    .file-icon{
      width: 12px; 
      margin-right: 5px;
    }
  }
`
const MainCon = styled.div`
  flex: 1;
  padding: 0px;
  padding-bottom: 0;
  padding-top: 0;
`