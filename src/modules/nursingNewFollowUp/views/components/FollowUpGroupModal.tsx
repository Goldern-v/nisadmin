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
    pageSize: 10,
    pageIndex: 1
  })
  let [query1, setQuery1] = useState({
    pageSize: 10,
    pageIndex: 1
  })
  const { visible, onOk, onCancel, isAdd, params, isOtherEmp } = props
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as number[] | string[])
  const [loading, setLoading] = useState(false)
  let user = JSON.parse(sessionStorage.getItem('user') || '[]')
  const [deptSelect, setDeptSelect] = useState(user.deptCode)
  const [deptList, setDeptList] = useState([] as any)
  const [pageLoading, setPageLoading] = useState(false)
  const [pageLoading1, setPageLoading1] = useState(false)
  const [dataTotal, setDataTotal] = useState(0)
  const [dataTotal1, setDataTotal1] = useState(0)
  const [tableData, setTableData] = useState([])
  const [memberTableData, setMemberTableData] = useState([])
  const [isShowInput, setIsShowInput] = useState(false)
  const [focusTeamName, setfocusTeamName] = useState('')

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

  useEffect(() => {
    if(c == 0){
      getMemberData();
      setC(c++)
    }
  }, [
    query1.pageIndex,
    query1.pageSize,
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
  //获取小组人员表格数据
  const getMemberData = () => { 
    setPageLoading1(true)
    api.queryPageList({
      ...query1,
      wardCode: deptSelect,
    })
      .then((res) => {
        setPageLoading1(false)
        setDataTotal1(res.data.totalCount)
        setMemberTableData(res.data.list)
      }, err => setPageLoading1(false))
  }

  const addFollowUpGroup = () => {
    let tableArr: any = [...tableData,{teamId :"", teamName:"",wardCode:deptSelect}]
    setTableData(tableArr)
  }

  //添加小组成员
  const addFollowUpMember = () => {
    
  }
  const handlePageSizeChange = (current: number, size: number) => {
    setQuery({ ...query, pageSize: size, pageIndex: 1 })
  }
  const handlePageChange = (current: number) => {
    setQuery({ ...query, pageIndex: current })
  }

  const handlePageSizeChange1 = (current: number, size: number) => {
    setQuery1({ ...query1, pageSize: size, pageIndex: 1 })
  }
  const handlePageChange1 = (current: number) => {
    setQuery1({ ...query1, pageIndex: current })
  }
  const handleRowSelect = (rowKeys: string[] | number[], row: any ) => {
    console.log(row);
    
    setSelectedRowKeys(rowKeys)
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
  const onClickRow = (record:any) => {
    return {
      onClick: () => {
        console.log(record.teamId);
        getMemberData()
        setSelectedRowKeys(['key0', 'key1'])
      },
    }
  }
  // 取代失焦事件,用来关闭弹窗
  const closeSelect = (e: any) => {
    let targetClass = [...e.target.classList]
    
    if (!targetClass.includes("show_input")) {
      setIsShowInput(false)
    }
  }
  const dbClick = (record:any) => {
    setfocusTeamName(record.teamName)
    setIsShowInput(true)
  }
  const handleOk = () => {
    console.log(selectedRowKeys);
    console.log(tableData);
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
          <div onDoubleClick={() => dbClick(record)} onBlur={() => setIsShowInput(false)} style={{ height: "30px", cursor: 'pointer'}}>
            {!isShowInput&&<div style={{ height: "30px", textAlign: "center", lineHeight: "30px"}}>{record.teamName}</div>}
            {isShowInput&&<Input
              style={{ width: 119, height: 29, textAlign:'center', fontSize:'13px' }}
              value={record.teamName}
              className={record.teamName === focusTeamName ? 'show_input' : ''}
              onBlur={() => setIsShowInput(false)}
              onChange={(e: any) => {
                record.teamName = e.currentTarget.value
                setTableData([...tableData])
              }}
            />}

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
            <span style={{color:"#ed7d51"}} onClick={() => onDelete(record,index)}>删除</span>
          </DoCon>
        )
      }
    }
  ]
  const columns2: any = [
    {
      title: '工号',
      dataIndex: 'key',
      key: 'key',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 50,
    },
    {
      title: '姓名',
      dataIndex: 'teamName',
      key: 'teamName',
      align: 'center',
      width: 80,
    },
    {
      title: '职务',
      dataIndex: 'teamName',
      key: 'teamName',
      align: 'center',
      width: 80,
    }
  ]
  return <Modal
    title={'设置随访小组'}
    width={700}
    centered
    okText={'保存'}
    confirmLoading={loading}
    afterClose={() => getData()}
    visible={visible}
    onOk={handleOk}
    onCancel={() => onCancel()}>
    <Wrapper onClickCapture={closeSelect}>
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
      <div className='table_box'>
        <div className='table_box_border' style={{marginRight: '10px'}}>
          <div className='table_box_title'>
            <div style={{ fontSize: '16px', fontWeight: 700 }}>随访小组</div>
            <Button onClick={addFollowUpGroup} type="primary" size='small'> +添加随访小组</Button>
          </div>
          <BaseTable 
            columns={columns}
            dataSource={tableData}
            pagination={{
              pageSizeOptions: ['10','20'],
              onShowSizeChange: handlePageSizeChange,
              onChange: handlePageChange,
              total: dataTotal,
              showSizeChanger: true,
              pageSize: query.pageSize,
              current: query.pageIndex
            }}
            onRow={onClickRow}
            loading={pageLoading}/>
        </div>
        <div className='table_box_border'>
          <div className='table_box_title'>
            <div style={{ fontSize: '16px', fontWeight: 700 }}>小组成员</div>
            <Button onClick={addFollowUpMember} type="primary" size='small'> +添加</Button>
          </div>
          <BaseTable 
            columns={columns2}
            dataSource={memberTableData}
            pagination={{
              pageSizeOptions: ['10','20'],
              onShowSizeChange: handlePageSizeChange1,
              onChange: handlePageChange1,
              total: dataTotal1,
              showSizeChanger: true,
              pageSize: query1.pageSize,
              current: query1.pageIndex
            }}
            rowSelection={{
              selectedRowKeys,
              onChange: handleRowSelect,
              getCheckboxProps: (record: any) => ({
                name: record.name
              })
            }}
            loading={pageLoading1}/>
        </div>
      </div>
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div`
.ml-20 {
  margin-left: 20px;
}
.table_box{
  margin-top: 20px;
  min-height: 476px;
  display: flex;
  justify-content: center;
  .table_box_border{
    border: 1px solid #ededed;
    border-radius: 10px;
    padding-bottom: 10px;
    .table_box_title{
      height: 45px;
      width: 88%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ededed;
    }
  }
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