import styled from 'styled-components'
import React, { Component, useState, useEffect } from 'react'
import BaseTable from 'src/components/BaseTable'
import { Modal, Input, message, Popconfirm, Select } from 'antd'
import service from 'src/services/api'
export interface Props {
  isShow: any,
  setNoShow: any
}

// import { aMServices } from '../services/AMServices'


export default function AuditsTableDHSZ (props: Props) {
  let [opinion, setOpinion] = useState('')
  let [messageType, setmessageType] = useState('')
  let [messageTypeName, setmessageTypeName] = useState('')
  let [selectData, setSelectData] = useState([])
  const [tableData, setTableData] = useState([])
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
      }
    })
  }
  const setSelect = (value: any) => {
    selectData.map((item:any) => {
      if (item.messageCode === value) {
        setmessageTypeName(item.messageName)
      }
    })
    setmessageType(value)
  }

  const getMealList = () => {
    service.healthyApiService.getHealthyList().then((res) => {
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
      dataIndex: '1',
      key: '1',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 50
    },
    {
      title: '类型名称',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      width: 100
    }
    ,
    {
      title: '微信推送类型',
      dataIndex: 'messageTypeName',
      key: 'messageTypeName',
      align: 'center',
      width: 100
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
          <Popconfirm
            title='确认要删除?'
            onConfirm={e => {
              service.healthyApiService.deteleHealthy(record).then((res) => {
                getMealList()
                message.success('删除成功')
              })
            }}
          >
            <a href='javascript:;'>删除</a>
          </Popconfirm>
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
        surplusHeight={305}
        // pagination={{
        //   total: 100,
        //   current: 1
        // }}
      />
      <Modal
        title="添加类别"
        visible={props.isShow}
        onOk={handleOk}
        okText="保存"
        cancelText="返回"
        onCancel={props.setNoShow}
      >
        <div className="category">
          <div>类别名称</div>
          <Input defaultValue=""
           onChange={(e) => setOpinion(e.target.value)}/>
        </div>
        <div className="category">
        <DivMargin>推送类型</DivMargin>
        <Select onChange={(value: any) => setSelect(value)} showSearch style={{ width: '100%' }} placeholder='选择类型'>
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
    width: 60%;
  }
  .category {
    display: flex;
  }
`
const DivMargin = styled.div`
margin-top:15px;
`
