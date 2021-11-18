import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, DatePicker, Input, InputNumber, Modal, Radio, Row, Select, Spin } from 'src/vendors/antd'
import BaseTable from 'src/components/BaseTable'
import { DoCon } from 'src/components/BaseTable'
import FollowUpGroupManageServices from '../followUpGroupManage/services/FollowUpGroupManageServices'
import { message } from 'antd/es'
const api = new FollowUpGroupManageServices();
export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  params?: any,
  isOtherEmp?: boolean,
  isAdd?: boolean,
}
export default function EidtModal(props: any) {
  let [query, setQuery] = useState({
    pageSize: 20,
    pageIndex: 1
  })
  const { visible, onOk, onCancel, isAdd, params, isOtherEmp } = props
  const [loading, setLoading] = useState(false)
  let user = JSON.parse(sessionStorage.getItem('user') || '[]')
  const [deptSelect, setDeptSelect] = useState(user.deptCode)
  const [deptList, setDeptList] = useState([] as any)
  const [pageLoading, setPageLoading] = useState(false)
  const [dataTotal, setDataTotal] = useState(0)
  const [tableData, setTableData] = useState([])
  let [c, setC] = useState(0);
  
  useEffect(() => {
    let list = props.deptList || []
    setDeptList([...list])
  }, [
    props
  ])

  useEffect(() => {
    setDeptSelect(user.deptCode)
  }, []);

  useEffect(() => {
    if(c == 0){
      getData();
      setC(c++)
    }
  }, [
    query.pageIndex,
    query.pageSize,
    deptSelect,
  ])
  
  const getData = () => { 
    setPageLoading(true)
    api.queryPageList({
        ...query,
        wardCode: deptSelect,
      })
      .then((res) => {
        setPageLoading(false)
        setDataTotal(res.data.totalCount)
        setTableData(res.data.list)
      }, err => setPageLoading(false))
  }
  const addFollowUpGroup = () => {
    let tableArr: any = [...tableData,{teamId :"", teamName:"",wardCode:deptSelect}]
    setTableData(tableArr)
  }
  const handlePageSizeChange = (current: number, size: number) => {
    setQuery({ ...query, pageSize: size, pageIndex: 1 })
  }
  const handlePageChange = (current: number) => {
    setQuery({ ...query, pageIndex: current })
  }
  //删除
  const onDelete = (record: any, index: any) => {
    Modal.confirm({
      title: '确认删除该随访小组？',
      centered: true,
      onOk: () => {
        tableData.splice(index, 1);
        let newArr = [...tableData];
        setTableData(newArr)
        if(record.teamId) {
          api
          .delete({
            teamId: record.teamId,
          })
          .then((res) => {
            message.success('删除成功')
          }, )
        }
      }
    })
  }
  const handleOk = () => {
    if (deptSelect == "") {
      message.error('请先选择护理单元！')
      return
    }
    let b = tableData.every((item: any) => item.teamName != "")
    if(b) {
      api
      .saveOrUpdate({
        visitTeamList:tableData
      })
      .then((res) => {
        message.success('操作成功')
        onOk && onOk()
    }, )
    }else {
      message.error('小组名称不能为空！')
    }
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
      title: '小组名称',
      dataIndex: 'teamName',
      key: 'teamName',
      align: 'center',
      className: 'ipt-cell',
      width: 100,
      render: (text: string, record: any) => {
        return (
          <div>
            <Input
              style={{ width: 170 }}
              value={record.teamName}
              onChange={(e: any) => {
                record.teamName = e.currentTarget.value
                setTableData([...tableData])
              }}
            />
          </div>
        )
      }
    },
    {
      title: '操作',
      width: 80,
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span onClick={() => onDelete(record,index)}>删除</span>
          </DoCon>
        )
      }
    }
  ]
  return <Modal
    title={'设置随访小组'}
    width={500}
    centered
    okText={'保存'}
    confirmLoading={loading}
    afterClose={() => getData()}
    visible={visible}
    onOk={handleOk}
    onCancel={() => onCancel()}>
    <Wrapper>
      <span className='ml-20'>护理单元:</span>
      <Select
        value={deptSelect}
        style={{ width: 200 }}
        showSearch
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        onChange={(val: string) => setDeptSelect(val)}>
        <Select.Option value={''}>全部</Select.Option>
        {deptList.map((item: any, idx: any) =>
          <Select.Option key={idx} value={item.code}>{item.name}</Select.Option>)}
      </Select>
      <Button onClick={addFollowUpGroup} className='ml-20'>
      添加小组
      </Button>
      <BaseTable 
        columns={columns}
        dataSource={tableData}
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
        loading={pageLoading}/>
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div`
.ml-20 {
  margin-left: 20px;
}
.ipt-cell{
    padding:0!important;
    textarea,.ant-select-selection,.ant-input{
      border:0;
      outline:0;
      border-radius:0;
      resize: none;
    }
    .ant-select-arrow{
      display:none;
    }
    .ant-select-selection-selected-value{
      padding-right:0!important;
    }
  }
`