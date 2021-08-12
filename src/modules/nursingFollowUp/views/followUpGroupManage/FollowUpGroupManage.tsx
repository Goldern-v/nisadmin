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
import FollowUpGroupManageServices from './services/FollowUpGroupManageServices'
import moment from 'moment'

export interface Props { }
const api = new FollowUpGroupManageServices();

export default function FollowUpGroupManage(props: any) {
  let [query, setQuery] = useState({
    pageSize: 20,
    pageIndex: 1
  })
  const [date, setDate]: any = useState(getCurrentMonthNow())
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as number[] | string[])
  const [dataTotal, setDataTotal] = useState(0)
  const [deptSelect, setDeptSelect] = useState('')
  const [searchText, setSearchText] = useState('')
  const [selectedTemplate, setSelectedTemplate]: any = useState('')
  const [selectedDistribution, setSelectedDistribution]: any = useState('')
  const [templateList, setTemplateList]: any = useState([])
  const [distributionList, setDistributionList]: any = useState([])
  const [tableData, setTableData] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const followUpGroupModal = createModal(FollowUpGroupModal)
  //科室列表
  const [deptList, setDeptList] = useState([] as any)
  const onChangeSearchText = (e: any) => {
    setSearchText(e.target.value)
  }
  //设置随访小组
  const setFollowUpGroup = (record:any) => {
    followUpGroupModal
      .show({
      })
  }
  const handlePageSizeChange = (current: number, size: number) => {
    setQuery({ ...query, pageSize: size, pageIndex: 1 })
  }

  const handlePageChange = (current: number) => {
    setQuery({ ...query, pageIndex: current })
  }

  const handleDetailView = (bookId: string) => {
    
  }

  const getData = () => {
    setPageLoading(true)
    api
      .findLog({
        ...query,
        wardCode: deptSelect,
        templateId: selectedTemplate,
        distributionId: selectedDistribution,
        searchText: searchText,
        status
      })
      .then((res) => {
        setPageLoading(false)

        setSelectedRowKeys([])

        setDataTotal(res.data.totalCount)
        setTableData(res.data.list)
      }, err => setPageLoading(false))
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
      dataIndex: 'wardName',
      key: 'wardName',
      align: 'center',
      width: 150,
    }
    ,
    {
      title: '工号',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 80
    },
    {
      title: '姓名',
      dataIndex: 'senderName',
      key: 'senderName',
      align: 'center',
      width: 80
    },
    {
      title: '性别',
      dataIndex: 'senderName',
      key: 'senderName',
      align: 'center',
      width: 50
    },
    {
      title: '职称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 100
    },
    {
      title: '职务',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 100
    },
    {
      title: '层级',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 100
    },
    {
      title: '随访小组',
      dataIndex: 'name',
      key: 'name',
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

  useEffect(() => {
    getData()
  }, [
    query.pageIndex,
    query.pageSize,
    selectedTemplate,
    selectedDistribution,
    deptSelect
  ])
  
  useEffect(() => {
    getDeptList();
    getTemplateList();
    getDistributionList();
  }, []);

  const getDeptList = () => {
    api.getNursingUnitAll().then(res => {
      if (res.data.deptList instanceof Array) setDeptList(res.data.deptList);
    })
  }

  const getTemplateList = () => {
    // api.getNursingUnitAll().then(res => {
    //   if (res.data.deptList instanceof Array) setTemplateList(res.data.deptList);
    // })
    const a : any = [
    {code: "1", name: "随访1组"},
    {code: "2", name: "随访2组"},
    {code: "3", name: "随访3组"},
    {code: "4", name: "随访4组"}]
    setTemplateList(a)
  }

  const getDistributionList = () => {
    // api.getNursingUnitAll().then(res => {
    //   if (res.data.deptList instanceof Array) setTemplateList(res.data.deptList);
    // })
    const b : any = [
    {code: "1", name: "已分配"},
    {code: "2", name: "未分配"},]
    setDistributionList(b)
  }

  return <Wrapper>
    <PageHeader>
      <Place />
      <span className='label'>护理单元:</span>
        <Select
          value={deptSelect}
          style={{ width: 230 }}
          showSearch
          filterOption={(input: any, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={(val: string) => setDeptSelect(val)}>
          <Select.Option value={''}>全部</Select.Option>
          {deptList.map((item: any, idx: any) =>
            <Select.Option key={idx} value={item.code}>{item.name}</Select.Option>)}
        </Select>
        <span className='label'>随访小组:</span>
        <Select style={{ width: 180 }} value={selectedTemplate} onChange={(value: any) => setSelectedTemplate(value)}>
          <Select.Option value=''>全部</Select.Option>
          {templateList.map((item: any, index: number) => (
            <Select.Option key={index} value={item.name}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <span className='label'>分配情况:</span>
        <Select style={{ width: 180 }} value={selectedDistribution} onChange={(value: any) => setSelectedDistribution(value)}>
          <Select.Option value=''>全部</Select.Option>
          {distributionList.map((item: any, index: number) => (
            <Select.Option key={index} value={item.name}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <Input
          placeholder='请输入姓名/工号关键字检索'
          style={{ width: 220 }}
          value={searchText}
          onChange={onChangeSearchText}
          className='ml-20'
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
      <BaseTable columns={columns}
          dataSource={tableData}
          onRow={record => {
            return {
              onDoubleClick: () => handleDetailView(record.id)
            }
          }}
          pagination={{
            pageSizeOptions: ['10', '20', '30', '40', '50'],
            onShowSizeChange: handlePageSizeChange,
            onChange: handlePageChange,
            total: dataTotal,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: query.pageSize,
            current: query.pageIndex
          }}
          loading={pageLoading}
          surplusHeight={220} />
      <followUpGroupModal.Component />
  </Wrapper>
}
const Wrapper = styled.div`
width: 100%;
margin-left:20px;
.ml-20 {
  margin-left: 20px;
}
`