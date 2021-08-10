import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker, Select, Input, ColumnProps, PaginationConfig, Modal, message, Switch } from 'src/vendors/antd'
import { getCurrentMonthNow } from 'src/utils/date/currentMonth'
import BaseTable from 'src/components/BaseTable'
import { globalModal } from 'src/global/globalModal'
import emitter from 'src/libs/ev'
import FollowUpGroupModal from '../components/FollowUpGroupModal'
import createModal from 'src/libs/createModal'
import { appStore, authStore } from 'src/stores'



export interface Props { }

export default function FollowUpGroupManage(props: any) {
  const [date, setDate]: any = useState(getCurrentMonthNow())
  const [deptSelect, setDeptSelect] = useState('')
  const [deptListAll, setDeptListAll] = useState([] as any[])
  const [searchText, setSearchText] = useState('')
  const [selectedTemplate, setSelectedTemplate]: any = useState('')
  const [templateList, setTemplateList]: any = useState([])
  const [tableData, setTableData] = useState([])
  const [loadingTable, setLoadingTable] = useState(false)
  
  const followUpGroupModal = createModal(FollowUpGroupModal)

  const onChangeSearchText = (e: any) => {
    setSearchText(e.target.value)
  }
  
  //设置随访小组
  const setFollowUpGroup = (record:any) => {
    followUpGroupModal
      .show({
      })
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
  
  const columns: any = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 30,
    },
    {
      title: '护理单元',
      dataIndex: 'type',
      key: 'type',
      align: 'left',
      width: 150,
    }
    ,
    {
      title: '工号',
      dataIndex: 'messageTypeName',
      key: 'messageTypeName',
      align: 'left',
      width: 80
    },
    {
      title: '姓名',
      dataIndex: 'messageTypeName',
      key: 'messageTypeName',
      align: 'left',
      width: 80
    },
    {
      title: '性别',
      dataIndex: 'messageTypeName',
      key: 'messageTypeName',
      align: 'left',
      width: 50
    },
    {
      title: '职称',
      dataIndex: 'messageTypeName',
      key: 'messageTypeName',
      align: 'left',
      width: 100
    },
    {
      title: '职务',
      dataIndex: 'messageTypeName',
      key: 'messageTypeName',
      align: 'left',
      width: 100
    },
    {
      title: '层级',
      dataIndex: 'messageTypeName',
      key: 'messageTypeName',
      align: 'left',
      width: 100
    },
    {
      title: '随访小组',
      dataIndex: 'cz',
      key: 'cz',
      width: 100,
      align: 'center',
      render: (text: string, record: any) => {
        const DoCon = styled.div`
          display: flex;
          justify-content: space-around;
          font-size: 12px;
          color: ${(p) => p.theme.$mtc};
        `
        return (
          <div>
            <a href='javascript:;'onClick={() => setFollowUpGroup(record)}>神内1组</a>
          </div>
        )
      }
    }
  ]
  

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
          {deptListAll.map((item: any, idx: any) =>
            <Select.Option key={idx} value={item.code}>{item.name}</Select.Option>)}
        </Select>
        <span className='label'>随访小组:</span>
        <Select style={{ width: 180 }} value={selectedTemplate} onChange={(value: any) => setSelectedTemplate(value)}>
          <Select.Option value=''>全部</Select.Option>
          {templateList.map((item: any, index: number) => (
            <Select.Option key={index} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <span className='label'>分配情况:</span>
        <Select style={{ width: 180 }} value={selectedTemplate} onChange={(value: any) => setSelectedTemplate(value)}>
          <Select.Option value=''>全部</Select.Option>
          {templateList.map((item: any, index: number) => (
            <Select.Option key={index} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <Input
          placeholder='请输入姓名/工号关键字检索'
          style={{ width: 220 }}
          value={searchText}
          onChange={onChangeSearchText}
          className='input_hj'
        />
        <Button onClick={() => getData()}>
          查询
        </Button>
        <Button type='primary' onClick={() => getData()}>
          保存
        </Button>
        <Button onClick={setFollowUpGroup}>
          设置随访小组
        </Button>
      </PageHeader>
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={180}
        bordered
        loading={loadingTable}
      />
      <followUpGroupModal.Component />
  </Wrapper>
}
const Wrapper = styled.div`
width: 100%;
margin-left:20px;
.input_hj {
  margin-left: 20px;
}
`