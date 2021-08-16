import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker, Select, Input, ColumnProps, PaginationConfig, Modal, message, Switch } from 'src/vendors/antd'
import { getCurrentMonthNow } from 'src/utils/date/currentMonth'
import BaseTable from 'src/components/BaseTable'
import { globalModal } from 'src/global/globalModal'
import emitter from 'src/libs/ev'
import AddDiseaseModal from '../components/AddDiseaseModal'
import DetailModal from '../components/DetailModal'
import createModal from 'src/libs/createModal'
import { appStore, authStore } from 'src/stores'
import DiseaseManageServices from './services/DiseaseManageServices'
import moment from 'moment'



export interface Props { }
const api = new DiseaseManageServices();

export default function DiseaseManage(props: any) {
  let [query, setQuery] = useState({
    pageSize: 20,
    pageIndex: 1
  })
  const [pageLoading, setPageLoading] = useState(false)
  const [dataTotal, setDataTotal] = useState(0)
  const [date, setDate]: any = useState(getCurrentMonthNow())
  const [deptSelect, setDeptSelect] = useState('')
  const [searchText, setSearchText] = useState('')
  const [selectedTemplate, setSelectedTemplate]: any = useState('')
  const [templateList, setTemplateList]: any = useState([])
  const [tableData, setTableData] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as number[] | string[])
  const addDiseaseModal = createModal(AddDiseaseModal)
  const detailModal = createModal(DetailModal)

  //科室列表
  const [deptList, setDeptList] = useState([] as any)
  const onChangeSearchText = (e: any) => {
    setSearchText(e.target.value)
  }
  
  //设置随访小组
  const setAddDiseaseModal = (record:any) => {
    addDiseaseModal
      .show({
      })
  }

  //查看随访问卷
  const setDetailModal = (record:any) => {
    detailModal
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
      width: 15,
    },
    {
      title: '疾病名称',
      dataIndex: 'wardName',
      key: 'wardName',
      align: 'center',
      width: 50,
    }
    ,
    {
      title: '随访周期',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 50
    },
    {
      title: '随访问卷',
      dataIndex: 'sfwj',
      key: 'sfwj',
      align: 'center',
      width: 150,
      render: (text: string, record: any) => {
        const DoCon = styled.div`
          display: flex;
          justify-content: space-around;
          font-size: 12px;
          color: ${(p) => p.theme.$mtc};
        `
        return (
          <div>
            <a href='javascript:;'onClick={() => setDetailModal(record)}>《脑卒中随访调查表》</a>
            <a href='javascript:;'onClick={() => setDetailModal(record)} className='ml-20'>《2021年脑卒中随访调查表》</a>
          </div>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'cz',
      key: 'cz',
      width: 50,
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
            <a href='javascript:;'onClick={() => setAddDiseaseModal(record)}>编辑</a>
            <a href='javascript:;'onClick={() => setAddDiseaseModal(record)} className='ml-20'>删除</a>
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
    deptSelect
  ])

  useEffect(() => {
    getDeptList();
  }, []);

  const getDeptList = () => {
    api.getNursingUnitAll().then(res => {
      if (res.data.deptList instanceof Array) setDeptList(res.data.deptList);
    })
  }



  return <Wrapper>
    <PageHeader>
      <Place />
      <span className='label'>护理单元:</span>
        {/* <DeptSelect onChange={(val) => setDeptSelect(val)} /> */}
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
        <Input
          placeholder='请输入疾病名称随访问卷关键字检索'
          style={{ width: 300 }}
          value={searchText}
          onChange={onChangeSearchText}
          className='ml-20'
        />
        <Button onClick={() => getData()}>
          查询
        </Button>
        <Button onClick={setAddDiseaseModal}>
          添加疾病
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
      <addDiseaseModal.Component />
      <detailModal.Component />
  </Wrapper>
}
const Wrapper = styled.div`
  height: 100%;
  width: calc(100vw - 200px);
  margin-left:20px;
  .ml-20 {
    margin-left: 20px;
  }
`