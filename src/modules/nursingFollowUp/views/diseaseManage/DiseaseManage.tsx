import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker, Select, Input, ColumnProps, PaginationConfig, Modal, message, Switch } from 'src/vendors/antd'
import { getCurrentMonthNow } from 'src/utils/date/currentMonth'
import BaseTable from 'src/components/BaseTable'
import DiseaseModal from '../components/DiseaseModal'
import { appStore, authStore } from 'src/stores'
import DiseaseManageServices from './services/DiseaseManageServices'
export interface Props { }
const api = new DiseaseManageServices();
export default function DiseaseManage(props: any) {
  let [query, setQuery] = useState({
    pageSize: 20,
    pageIndex: 1
  })
  const [recordSelected, setRecordSelected] = useState({} as any)
  const [isAdd, setIsAdd] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)
  const [dataTotal, setDataTotal] = useState(0)
  const [deptSelect, setDeptSelect] = useState('')
  const [searchText, setSearchText] = useState('')
  const [tableData, setTableData] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as number[] | string[])
  //科室列表
  const [deptList, setDeptList] = useState([] as any)
  const onChangeSearchText = (e: any) => {
    setSearchText(e.target.value)
  }
  //查看随访问卷
  const setDetailModal = (formCode: any) => {
    appStore.history.push(`/nursingFollowUpDetail?patientId=${formCode}`)
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
      .visitDiseaseType({
        ...query,
        wardCode: deptSelect,
        keyword: searchText,
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
      dataIndex: 'diseaseTypeName',
      key: 'diseaseTypeName',
      align: 'center',
      width: 50,
    }
    ,
    {
      title: '随访周期',
      dataIndex: 'periods',
      key: 'periods',
      align: 'center',
      width: 50,
      render:( text: string, record: any) => {
        return (
          <div>
            {record.visitDiseaseTypeVsPeriodsList.map((item: any, index: number) => {
              if(index == record.visitDiseaseTypeVsPeriodsList.length-1){
                return (
                  <span key={index}>{item.periods}个月</span>
                )
              }
              return (
                <span key={index}>{item.periods}个月/</span>
              )
            })}
          </div>
        )
      }
    },
    {
      title: '随访问卷',
      dataIndex: 'visitTemplateList',
      key: 'visitTemplateList',
      align: 'center',
      width: 150,
      render: (text: string, record: any) => {
        return (
          <div>
            {record.visitTemplateList.map((item: any, index: number) => (
              <a href='javascript:;'onClick={() => setDetailModal(item.formCode)} key={item.formCode}>{item.formName}</a>
            ))}
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
        return (
          <div>
            <a href='javascript:;'onClick={() => handleEdit(record)}>编辑</a>
            <a href='javascript:;'onClick={() => handDelect(record)} className='ml-20'>删除</a>
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
  const handleAddGroup = () => {
    setIsAdd(true)
    setEditVisible(true)
  }
  const handleEdit = (record: any) => {
    setRecordSelected(record)
    setIsAdd(false)
    setEditVisible(true)
  }
  const handDelect = (record: any) => {
    api
      .delete({
        diseaseTypeId : record.diseaseTypeId
      })
      .then((res) => {
        message.success('删除成功')
        getData();
      }, err => setPageLoading(false))
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
      <Button onClick={() => handleAddGroup()}>
        添加疾病
      </Button>
    </PageHeader>
    <BaseTable 
      columns={columns}
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
    <DiseaseModal
      params={recordSelected}
      isAdd={isAdd}
      visible={editVisible}
      onOk={() => {
        setEditVisible(false)
        getData()
      }}
      onCancel={() => setEditVisible(false)} />
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