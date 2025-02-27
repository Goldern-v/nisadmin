import styled from 'styled-components'
import React, { Component, useState, useEffect } from 'react'
import BaseTable from 'src/components/BaseTable'
import { Modal, Input, message, Popconfirm, Select } from 'antd'
import service from 'src/services/api'
import emitter from 'src/libs/ev'

export interface Props {
  isShow: any,
  setNoShow: any
}

export default function AuditsTableDHSZ (props: Props) {
  let [opinion, setOpinion] = useState('')
  let [messageType, setMessageType] = useState('')
  let [messageTypeName, setMessageTypeName] = useState('')
  let [selectData, setSelectData] = useState([])
  let [loadingTable, setLoadingTable] = useState(false)
  const [tableData, setTableData] = useState([])

  //保存
  const handleOk = () => {
    let data = {
      type: opinion,
      messageType: messageType,
      messageTypeName: messageTypeName
    }
    service.healthyApiService.preservationHealthy(data).then((res) => {
      if (res){
        props.setNoShow()
        getMealList()
        setOpinion('')
        message.success('添加成功')
        setMessageType('')
        setMessageTypeName('')
      }
    })
  }

  //删除
  const handleDelete = (record:any) => {
    Modal.confirm({
      title: '提示',
      content: '是否删除该推送宣教?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered:true,
      onOk: () => {
        service.healthyApiService.deteleHealthy(record).then((res) => {
          getMealList()
          message.success('删除成功')
        })
      }
    })
  }

  const setSelect = (value: any) => {
    selectData.map((item:any) => {
      if (item.messageCode === value) {
        setMessageTypeName(item.messageName)
      }
    })
    setMessageType(value)
  }

  const getMealList = () => {
    setLoadingTable(true)
    service.healthyApiService.getHealthyList().then((res) => {
      setLoadingTable(false)
      setTableData(res.data)
    })
  }
  const getData = () => {
    getMealList()
    getSelectData()
  }
  
  const getSelectData = () => {
    service.healthyApiService.getPushType().then((res) => {
      if (res && res.data) {
        setSelectData(res.data)
      }
    })
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
      title: '类型名称',
      dataIndex: 'type',
      key: 'type',
      align: 'left',
      width: 120,
    }
    ,
    {
      title: '微信推送类型',
      dataIndex: 'messageTypeName',
      key: 'messageTypeName',
      align: 'left',
      width: 80
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
            <a href='javascript:;' onClick={() => handleDelete(record)}>删除</a>
          </div>
        )
      }
    }
  ]
  useEffect(() => {
    getData()
  }, [])
  return (
    <Wrapper>
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={180}
        bordered
        loading={loadingTable}
      />
      <Modal
        centered={true}
        title="添加类别"
        visible={props.isShow}
        onOk={handleOk}
        width='550px'
        okText="保存"
        cancelText="返回"
        onCancel={props.setNoShow}
      >
        <div className="category" style={{marginTop: '20px'}}>
          <SpanOne>类别名称:</SpanOne>
          <Input value={opinion} defaultValue="" style={{ width: '72%'}}
           onChange={(e) => setOpinion(e.target.value)}/>
        </div>
        <div className="category" style={{marginTop: '30px',marginBottom: '30px'}}>  
        <DivMargin>推送类型:</DivMargin>
        <Select value={messageType} onChange={(value: any) => setSelect(value)} showSearch style={{ width: '72%' }} placeholder='选择类型'>
          {selectData.map((item: any) => (
            <Select.Option value={item.messageCode} key={item.messageCode}>
              {item.messageName}
            </Select.Option>
          ))}
        </Select>
        </div>
      </Modal>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .ant-table-wrapper {
    width: 40%;
  }
  .ant-modal-content{
    width:450px!important
  }
  .ant-table-body {
    .ant-table-row td:nth-child(2){
      padding-left:20px!important; 
    }    
    .ant-table-row td:nth-child(3){
      padding-left:20px!important; 
    }
  }
  .category {
    display: flex;
  }
`
const DivMargin = styled.span`
margin-top:15px;
display:inline-block;
width:72px;
margin-left: 30px;
`
const SpanOne = styled.span`
display:inline-block;
width:72px;
margin-left: 30px;
`

