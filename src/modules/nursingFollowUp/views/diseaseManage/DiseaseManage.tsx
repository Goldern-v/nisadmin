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
import createModal from 'src/libs/createModal'
import { appStore, authStore } from 'src/stores'
import DiseaseManageServices from './services/DiseaseManageServices'



export interface Props { }
const api = new DiseaseManageServices();

export default function DiseaseManage(props: any) {
  const [date, setDate]: any = useState(getCurrentMonthNow())
  const [deptSelect, setDeptSelect] = useState('')
  const [deptListAll, setDeptListAll] = useState([] as any[])
  const [searchText, setSearchText] = useState('')
  const [selectedTemplate, setSelectedTemplate]: any = useState('')
  const [templateList, setTemplateList]: any = useState([])
  const [tableData, setTableData] = useState([])
  const [loadingTable, setLoadingTable] = useState(false)
  
  const addDiseaseModal = createModal(AddDiseaseModal)
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
      width: 50,
    },
    {
      title: '疾病名称',
      dataIndex: 'type',
      key: 'type',
      align: 'left',
      width: 150,
    }
    ,
    {
      title: '随访周期',
      dataIndex: 'messageTypeName',
      key: 'messageTypeName',
      align: 'left',
      width: 150
    },
    {
      title: '随访问卷',
      dataIndex: 'messageTypeName',
      key: 'messageTypeName',
      align: 'left',
      width: 300
    },
    {
      title: '操作',
      dataIndex: 'cz',
      key: 'cz',
      width: 150,
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
            <a href='javascript:;'onClick={() => setAddDiseaseModal(record)}>删除</a>
          </div>
        )
      }
    }
  ]
  
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
          className='input_hj'
        />
        <Button onClick={() => getData()}>
          查询
        </Button>
        <Button onClick={setAddDiseaseModal}>
          添加疾病
        </Button>
      </PageHeader>
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={180}
        bordered
        loading={loadingTable}
      />
      <addDiseaseModal.Component />
  </Wrapper>
}
const Wrapper = styled.div`
width: 100%;
margin-left:20px;
.input_hj {
  margin-left: 20px;
}
`