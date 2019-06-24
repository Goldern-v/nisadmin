import styled from 'styled-components'
import React, { Component, useState, useEffect } from 'react'
import BaseTable from 'src/components/BaseTable'
import { Modal, Input, message, Popconfirm } from 'antd'
import service from 'src/services/api'
export interface Props {
  isShow: any,
  setNoShow: any
}

// import { aMServices } from '../services/AMServices'


export default function AuditsTableDHSZ (props: Props) {
  let [opinion] = useState('')
  const [tableData, setTableData] = useState([])
  const setOpinion = (value: any) => {
    opinion = value
  }
  const handleOk = () => {
    let data = {
      type: opinion
    }
    service.healthyApiService.preservationHealthy(data).then((res) => {
      if (res){
        props.setNoShow()
        getMealList()
        message.success('添加成功')
      }
    })
  }
  const getMealList = () => {
    service.healthyApiService.getHealthyList().then((res) => {
      setTableData(res.data)
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
    getMealList()
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
